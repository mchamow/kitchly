import { Post } from "./types";
import postsData from "./posts.json";

export const posts: Post[] = postsData as unknown as Post[];

export const getPosts = (): Post[] => posts;

export const getFeaturedPosts = (count = 6): Post[] => posts.slice(0, count);

export const getPostBySlug = (slug: string): Post | undefined =>
  posts.find((p) => p.slug === slug);

export const searchPosts = (query: string): Post[] => {
  const q = query.toLowerCase();
  return posts.filter(
    (p) =>
      p.title.toLowerCase().includes(q) ||
      p.excerpt.toLowerCase().includes(q)
  );
};
