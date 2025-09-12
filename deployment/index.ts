import * as kubernetes from '@pulumi/kubernetes';
import * as pulumi from '@pulumi/pulumi';
import * as docker from '@pulumi/docker';
import * as cp from 'node:child_process';

const sha = new Promise(async (resolve) => {
  const out = cp.execSync('git rev-parse --short HEAD');
  resolve(Buffer.from(out).toString().trim());
});

const cluster_reference = new pulumi.StackReference('cluster', {
  name: 'julienvincent/daedalus-cluster/root',
});

const k8s = new pulumi.StackReference('kubernetes', {
  name: 'julienvincent/daedalus-kubernetes/root',
});

const provider = new kubernetes.Provider('root-provider', {
  kubeconfig: cluster_reference.requireOutput('kubeconfig_yaml'),
});

const issuers = k8s.requireOutput('issuers') as pulumi.Output<
  Record<string, string>
>;

const image = new docker.Image('api', {
  imageName: pulumi.interpolate`registry.julienvincent.io/site:${sha}`,
  build: {
    context: '../',
    dockerfile: '../Dockerfile',
    platform: 'linux/arm64',
  },
});

const options = {
  provider,
};

const namespace = new kubernetes.core.v1.Namespace(
  'julienvincent-io',
  {},
  {
    provider,
  },
).metadata.name;

const labels = {
  app: 'julienvincent-io',
};

new kubernetes.apps.v1.Deployment(
  'julienvincent-io',
  {
    metadata: {
      namespace,
      labels,
    },
    spec: {
      selector: {
        matchLabels: labels,
      },
      replicas: 3,
      template: {
        metadata: {
          labels,
        },
        spec: {
          nodeSelector: {
            'daedalus/network': 'home',
          },
          containers: [
            {
              name: 'default',
              image: image.imageName,
              resources: {
                requests: {
                  memory: '50Mi',
                  cpu: '10m',
                },
                limits: {
                  memory: '50Mi',
                },
              },
              ports: [
                {
                  containerPort: 80,
                  name: 'http',
                },
              ],

              startupProbe: {
                httpGet: {
                  path: '/',
                  port: 80,
                },
                periodSeconds: 1,
                failureThreshold: 500,
                successThreshold: 1,
                timeoutSeconds: 1,
              },
              livenessProbe: {
                httpGet: {
                  path: '/',
                  port: 80,
                },
                periodSeconds: 10,
                failureThreshold: 3,
                successThreshold: 1,
                timeoutSeconds: 1,
              },
            },
          ],
        },
      },
    },
  },
  options,
);
const service = new kubernetes.core.v1.Service(
  'ingress',
  {
    metadata: {
      namespace,
      labels,
      annotations: {
        'pulumi.com/skipAwait': 'true',
      },
    },
    spec: {
      selector: labels,
      ports: [
        {
          port: 80,
          name: 'http',
          targetPort: 'http',
        },
      ],
    },
  },
  options,
);

const domain = 'julienvincent.io';
const cert_secret_name = `julienvincent-io-tls`;
new kubernetes.apiextensions.CustomResource(
  'julienvincent-io',
  {
    apiVersion: 'cert-manager.io/v1',
    kind: 'Certificate',
    metadata: {
      namespace,
      labels: {
        solver: 'dns01',
      },
    },
    spec: {
      secretName: cert_secret_name,
      dnsNames: [domain],
      issuerRef: {
        kind: 'ClusterIssuer',
        name: issuers.letsencrypt,
      },
    },
  },
  options,
);

new kubernetes.networking.v1.Ingress(
  'julienvincent-io',
  {
    metadata: {
      namespace,
      annotations: {
        // External-dns  fails to manage DNS records at the apex:
        // https://github.com/kubernetes-sigs/external-dns/issues/449
        //
        // Wild right?
        'external-dns.alpha.kubernetes.io/ingress-hostname-source':
          'annotation-only',
      },
    },
    spec: {
      ingressClassName: 'nginx-external',
      tls: [
        {
          hosts: [domain],
          secretName: cert_secret_name,
        },
      ],
      rules: [
        {
          host: domain,
          http: {
            paths: [
              {
                pathType: 'Prefix',
                path: '/',
                backend: {
                  service: {
                    name: service.metadata.name,
                    port: {
                      name: 'http',
                    },
                  },
                },
              },
            ],
          },
        },
      ],
    },
  },
  options,
);
