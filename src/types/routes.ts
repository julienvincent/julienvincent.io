export type PostRouteMetadata = {
  type: 'post';
  title: string;
  date: string;
  hidden?: boolean;
};

export type ProjectRouteMetadata = {
  type: 'project';
  title: string;
  description: string;
  hidden?: boolean;
};

export type RouteMetadata = PostRouteMetadata | ProjectRouteMetadata;
