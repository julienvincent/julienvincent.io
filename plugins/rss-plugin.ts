import path from 'node:path';
import { promises as fs } from 'node:fs';
import ts from 'typescript';
import type { Plugin } from 'vite';

type RssPluginOptions = {
  site_url: string;
  site_title: string;
  site_description: string;
  feed_path?: string;
  posts_dir?: string;
};

type PostEntry = {
  title: string;
  date: string;
  description?: string;
  path: string;
};

type ParsedBlogRoute = {
  route_path?: string;
  title?: string;
  date?: string;
  description?: string;
  hidden?: boolean;
};

const default_posts_dir = 'src/routes';
const default_feed_path = 'rss.xml';

function escapeXml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function extractString(node: ts.Node | undefined) {
  if (!node) {
    return undefined;
  }

  if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) {
    return node.text;
  }

  return undefined;
}

function extractBoolean(node: ts.Node | undefined) {
  if (!node) {
    return undefined;
  }

  if (node.kind === ts.SyntaxKind.TrueKeyword) {
    return true;
  }

  if (node.kind === ts.SyntaxKind.FalseKeyword) {
    return false;
  }

  return undefined;
}

function getPropertyName(node: ts.ObjectLiteralElementLike) {
  if (!ts.isPropertyAssignment(node)) {
    return undefined;
  }

  if (ts.isIdentifier(node.name)) {
    return node.name.text;
  }

  if (ts.isStringLiteral(node.name)) {
    return node.name.text;
  }

  return undefined;
}

function extractMetaFromStaticData(node: ts.ObjectLiteralExpression) {
  let static_data: ts.ObjectLiteralExpression | undefined;

  for (const property of node.properties) {
    const property_name = getPropertyName(property);
    if (!property_name || !ts.isPropertyAssignment(property)) {
      continue;
    }

    if (property_name === 'staticData') {
      if (ts.isObjectLiteralExpression(property.initializer)) {
        static_data = property.initializer;
      }
    }
  }

  if (!static_data) {
    return undefined;
  }

  let meta: ts.ObjectLiteralExpression | undefined;

  for (const property of static_data.properties) {
    const property_name = getPropertyName(property);
    if (!property_name || !ts.isPropertyAssignment(property)) {
      continue;
    }

    if (property_name === 'meta') {
      if (ts.isObjectLiteralExpression(property.initializer)) {
        meta = property.initializer;
      }
    }
  }

  if (!meta) {
    return undefined;
  }

  const extracted: ParsedBlogRoute = {};
  let is_post = false;

  for (const property of meta.properties) {
    const property_name = getPropertyName(property);
    if (!property_name || !ts.isPropertyAssignment(property)) {
      continue;
    }

    if (property_name === 'type') {
      const type_value = extractString(property.initializer);
      if (type_value === 'post') {
        is_post = true;
      }
    }

    if (property_name === 'title') {
      const title = extractString(property.initializer);
      if (title) {
        extracted.title = title;
      }
    }

    if (property_name === 'date') {
      const date = extractString(property.initializer);
      if (date) {
        extracted.date = date.trim();
      }
    }

    if (property_name === 'description') {
      const description = extractString(property.initializer);
      if (description) {
        extracted.description = description;
      }
    }

    if (property_name === 'hidden') {
      const hidden = extractBoolean(property.initializer);
      if (hidden !== undefined) {
        extracted.hidden = hidden;
      }
    }
  }

  if (!is_post) {
    return undefined;
  }

  return extracted;
}

function parseBlogRoute(source_text: string) {
  const source_file = ts.createSourceFile(
    'route.tsx',
    source_text,
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TSX,
  );

  const parsed: ParsedBlogRoute = {};

  function visit(node: ts.Node) {
    if (ts.isObjectLiteralExpression(node)) {
      const extracted = extractMetaFromStaticData(node);
      if (extracted) {
        parsed.title = extracted.title ?? parsed.title;
        parsed.date = extracted.date ?? parsed.date;
        parsed.description = extracted.description ?? parsed.description;
        parsed.hidden = extracted.hidden ?? parsed.hidden;
      }
    }

    if (ts.isCallExpression(node)) {
      if (ts.isIdentifier(node.expression)) {
        if (node.expression.text === 'createFileRoute') {
          const route_path = extractString(node.arguments[0]);
          if (route_path) {
            parsed.route_path = route_path;
          }
        }

        if (node.expression.text === 'createBlogRoute') {
          const arg = node.arguments[0];
          if (arg && ts.isObjectLiteralExpression(arg)) {
            for (const property of arg.properties) {
              const property_name = getPropertyName(property);
              if (!property_name || !ts.isPropertyAssignment(property)) {
                continue;
              }

              if (property_name === 'title') {
                const title = extractString(property.initializer);
                if (title) {
                  parsed.title = title;
                }
              }

              if (property_name === 'date') {
                const date = extractString(property.initializer);
                if (date) {
                  parsed.date = date.trim();
                }
              }

              if (property_name === 'description') {
                const description = extractString(property.initializer);
                if (description) {
                  parsed.description = description;
                }
              }

              if (property_name === 'hidden') {
                const hidden = extractBoolean(property.initializer);
                if (hidden !== undefined) {
                  parsed.hidden = hidden;
                }
              }
            }
          }
        }
      }
    }

    ts.forEachChild(node, visit);
  }

  visit(source_file);

  return parsed;
}

async function collectRouteFiles(routes_dir: string) {
  const entries = await fs.readdir(routes_dir, { withFileTypes: true });
  const route_files: string[] = [];

  for (const entry of entries) {
    const entry_path = path.join(routes_dir, entry.name);
    if (entry.isDirectory()) {
      const nested_files = await collectRouteFiles(entry_path);
      route_files.push(...nested_files);
      continue;
    }

    if (entry.isFile() && entry.name.endsWith('.tsx')) {
      route_files.push(entry_path);
    }
  }

  return route_files;
}

async function loadPosts(posts_dir: string) {
  const route_files = await collectRouteFiles(posts_dir);
  const posts: PostEntry[] = [];

  for (const route_file of route_files) {
    const source_text = await fs.readFile(route_file, 'utf8');
    const parsed = parseBlogRoute(source_text);

    if (!parsed.route_path || !parsed.title || !parsed.date) {
      continue;
    }

    if (parsed.hidden) {
      continue;
    }

    posts.push({
      title: parsed.title,
      date: parsed.date,
      description: parsed.description,
      path: parsed.route_path,
    });
  }

  posts.sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  return posts;
}

function buildRssFeed(options: RssPluginOptions, posts: PostEntry[]) {
  const site_url = options.site_url.replace(/\/$/, '');
  const last_build_date = posts[0]?.date ?? new Date().toISOString();
  const feed_url = new URL(
    options.feed_path ?? default_feed_path,
    site_url,
  ).toString();

  const items = posts
    .map((post) => {
      const post_url = new URL(post.path, site_url).toString();
      const description = post.description?.trim() ?? '';
      const pub_date = new Date(post.date).toUTCString();

      const lines = [
        '    <item>',
        `      <title>${escapeXml(post.title)}</title>`,
        `      <link>${escapeXml(post_url)}</link>`,
        `      <guid isPermaLink="true">${escapeXml(post_url)}</guid>`,
        `      <pubDate>${escapeXml(pub_date)}</pubDate>`,
      ];

      if (description) {
        lines.push(
          `      <description>${escapeXml(description)}</description>`,
        );
      }

      lines.push('    </item>');

      return lines.join('\n');
    })
    .join('\n');

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">',
    '  <channel>',
    `    <title>${escapeXml(options.site_title)}</title>`,
    `    <link>${escapeXml(site_url)}</link>`,
    `    <description>${escapeXml(options.site_description)}</description>`,
    `    <lastBuildDate>${escapeXml(
      new Date(last_build_date).toUTCString(),
    )}</lastBuildDate>`,
    `    <atom:link href="${escapeXml(feed_url)}" rel="self" type="application/rss+xml" />`,
    items,
    '  </channel>',
    '</rss>',
  ].join('\n');
}

export function rssPlugin(options: RssPluginOptions): Plugin {
  const raw_feed_path = options.feed_path ?? default_feed_path;
  const feed_path = raw_feed_path.replace(/^\/+/, '');
  const posts_dir = options.posts_dir ?? default_posts_dir;
  const feed_route = `/${feed_path}`;

  return {
    name: 'rss-feed-generator',
    async generateBundle() {
      const posts = await loadPosts(posts_dir);
      const rss = buildRssFeed({ ...options, feed_path }, posts);

      this.emitFile({
        type: 'asset',
        fileName: feed_path,
        source: rss,
      });
    },
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const request_path = req.url?.split('?')[0];
        if (!request_path || request_path !== feed_route) {
          return next();
        }

        try {
          const posts = await loadPosts(posts_dir);
          const rss = buildRssFeed({ ...options, feed_path }, posts);

          res.statusCode = 200;
          res.setHeader('Content-Type', 'text/xml; charset=utf-8');
          res.end(rss);
        } catch (error) {
          server.config.logger.error(
            `[rss-feed-generator] Failed to build rss feed: ${String(error)}`,
          );
          res.statusCode = 500;
          res.end('Failed to generate rss feed');
        }
      });
    },
  };
}
