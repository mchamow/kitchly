export type DifficultyLevel = "Easy" | "Medium" | "Hard";

export interface Ingredient {
  name: string;
  amount: string;
  unit?: string;
}

export interface NutritionInfo {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

export interface Recipe {
  id: string;
  slug: string;
  title: string;
  description: string;
  image: string;
  category: string;
  tags: string[];
  difficulty: DifficultyLevel;
  prepTime: number; // minutes
  cookTime: number; // minutes
  servings: number;
  ingredients: Ingredient[];
  steps: string[];
  nutrition?: NutritionInfo;
  featured?: boolean;
  author: string;
  createdAt: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  color: string;
  recipeCount: number;
}

export interface SearchFilters {
  query: string;
  category?: string;
  difficulty?: DifficultyLevel;
  maxTime?: number;
}
