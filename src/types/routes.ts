export type PostRouteMetadata = {
  type: 'post';
  title: string;
  date: string;
};

export type ProjectRouteMetadata = {
  type: 'project';
  title: string;
  description: string;
};

export type RouteMetadata = PostRouteMetadata | ProjectRouteMetadata;
