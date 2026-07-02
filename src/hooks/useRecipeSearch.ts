"use client";

import { useState, useMemo } from "react";
import { Post, SearchFilters } from "@/lib/types";
import { posts } from "@/lib/data";

export function usePostSearch(initialPosts: Post[] = posts) {
  const [filters, setFilters] = useState<SearchFilters>({ query: "" });

  const filtered = useMemo(() => {
    if (!filters.query.trim()) return initialPosts;
    const q = filters.query.toLowerCase();
    return initialPosts.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.excerpt.toLowerCase().includes(q)
    );
  }, [initialPosts, filters.query]);

  const setQuery = (query: string) =>
    setFilters((prev) => ({ ...prev, query }));

  const clearFilters = () => setFilters({ query: "" });

  return {
    posts: filtered,
    filters,
    setQuery,
    clearFilters,
    totalCount: filtered.length,
  };
}
