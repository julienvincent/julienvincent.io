export type RouteMetadata = {
  type: 'project' | 'post';
  title: string;
  date?: string;
  description?: string;
  hidden?: boolean;
  keywords?: string[];
  include_in_rss_feed?: boolean;
};
