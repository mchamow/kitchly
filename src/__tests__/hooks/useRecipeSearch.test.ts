import { describe, it, expect } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { usePostSearch } from "../../hooks/useRecipeSearch";
import { Post } from "../../lib/types";

const mockPosts: Post[] = [
  {
    id: "1",
    slug: "recipe-1",
    title: "Delicious Pizza",
    excerpt: "A delicious Italian pizza.",
    intro: "Intro text",
    ingredients: "dough, sauce, cheese",
    equipment: "oven",
    execution: "bake it",
    coverImage: "/pizza.jpg",
    author: "Chef John",
    publishedAt: "2026-07-01T12:00:00",
    modifiedAt: "2026-07-01T12:00:00",
  },
  {
    id: "2",
    slug: "recipe-2",
    title: "Healthy Salad",
    excerpt: "Fresh garden salad.",
    intro: "Garden fresh",
    ingredients: "lettuce, tomato, cucumber",
    equipment: "bowl",
    execution: "mix it",
    coverImage: "/salad.jpg",
    author: "Chef Sally",
    publishedAt: "2026-07-02T12:00:00",
    modifiedAt: "2026-07-02T12:00:00",
  },
];

describe("usePostSearch hook", () => {
  it("initializes with default values and provided posts", () => {
    const { result } = renderHook(() => usePostSearch(mockPosts));

    expect(result.current.posts).toEqual(mockPosts);
    expect(result.current.filters.query).toBe("");
    expect(result.current.totalCount).toBe(2);
  });

  it("filters posts when setQuery is called", () => {
    const { result } = renderHook(() => usePostSearch(mockPosts));

    act(() => {
      result.current.setQuery("pizza");
    });

    expect(result.current.filters.query).toBe("pizza");
    expect(result.current.posts).toHaveLength(1);
    expect(result.current.posts[0].id).toBe("1");
    expect(result.current.totalCount).toBe(1);
  });

  it("filters posts case-insensitively and checks excerpt", () => {
    const { result } = renderHook(() => usePostSearch(mockPosts));

    act(() => {
      result.current.setQuery("GARDEN");
    });

    expect(result.current.posts).toHaveLength(1);
    expect(result.current.posts[0].id).toBe("2");
  });

  it("clears filters when clearFilters is called", () => {
    const { result } = renderHook(() => usePostSearch(mockPosts));

    act(() => {
      result.current.setQuery("pizza");
    });

    expect(result.current.posts).toHaveLength(1);

    act(() => {
      result.current.clearFilters();
    });

    expect(result.current.filters.query).toBe("");
    expect(result.current.posts).toHaveLength(2);
    expect(result.current.totalCount).toBe(2);
  });
});
