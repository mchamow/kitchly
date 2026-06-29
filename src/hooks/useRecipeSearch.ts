"use client";

import { useState, useMemo } from "react";
import { Recipe, SearchFilters, DifficultyLevel } from "@/lib/types";
import { recipes } from "@/lib/data";

export function useRecipeSearch(initialRecipes: Recipe[] = recipes) {
  const [filters, setFilters] = useState<SearchFilters>({
    query: "",
    category: undefined,
    difficulty: undefined,
    maxTime: undefined,
  });

  const filteredRecipes = useMemo(() => {
    return initialRecipes.filter((recipe) => {
      const q = filters.query.toLowerCase();
      const matchesQuery =
        !q ||
        recipe.title.toLowerCase().includes(q) ||
        recipe.description.toLowerCase().includes(q) ||
        recipe.tags.some((t) => t.toLowerCase().includes(q));

      const matchesCategory =
        !filters.category ||
        recipe.category.toLowerCase() === filters.category.toLowerCase();

      const matchesDifficulty =
        !filters.difficulty || recipe.difficulty === filters.difficulty;

      const totalTime = recipe.prepTime + recipe.cookTime;
      const matchesTime =
        !filters.maxTime || totalTime <= filters.maxTime;

      return matchesQuery && matchesCategory && matchesDifficulty && matchesTime;
    });
  }, [initialRecipes, filters]);

  const setQuery = (query: string) =>
    setFilters((prev) => ({ ...prev, query }));

  const setCategory = (category: string | undefined) =>
    setFilters((prev) => ({ ...prev, category }));

  const setDifficulty = (difficulty: DifficultyLevel | undefined) =>
    setFilters((prev) => ({ ...prev, difficulty }));

  const setMaxTime = (maxTime: number | undefined) =>
    setFilters((prev) => ({ ...prev, maxTime }));

  const clearFilters = () =>
    setFilters({ query: "", category: undefined, difficulty: undefined, maxTime: undefined });

  return {
    recipes: filteredRecipes,
    filters,
    setQuery,
    setCategory,
    setDifficulty,
    setMaxTime,
    clearFilters,
    totalCount: filteredRecipes.length,
  };
}
