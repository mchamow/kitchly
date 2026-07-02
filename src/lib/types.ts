export interface Post {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  publishedAt: string; // "YYYY-MM-DDTHH:mm:ss"
  modifiedAt: string;
}

export interface SearchFilters {
  query: string;
}
