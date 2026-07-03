export interface Post {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  intro: string;
  ingredients: string | null;
  equipment: string | null;
  execution: string;
  coverImage: string | null;
  author: string;
  publishedAt: string; // "YYYY-MM-DDTHH:mm:ss"
  modifiedAt: string;
}

export interface SearchFilters {
  query: string;
}

export enum RecipeSection {
  INGREDIENTS = "ingredients",
  EQUIPMENT = "equipment",
}

