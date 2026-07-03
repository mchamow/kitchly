import { describe, it, expect, vi } from "vitest";

vi.mock("../../lib/posts.json", () => {
  return {
    default: [
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
      {
        id: "3",
        slug: "recipe-3",
        title: "Chocolate Cake",
        excerpt: "Rich sweet chocolate cake.",
        intro: "Sweet dessert",
        ingredients: "flour, sugar, cocoa",
        equipment: "pan",
        execution: "bake it",
        coverImage: "/cake.jpg",
        author: "Chef John",
        publishedAt: "2026-07-03T12:00:00",
        modifiedAt: "2026-07-03T12:00:00",
      },
    ],
  };
});

import { getPosts, getFeaturedPosts, getPostBySlug, searchPosts } from "../../lib/data";

describe("data logic utils", () => {
  it("getPosts returns all posts", () => {
    const results = getPosts();
    expect(results).toHaveLength(3);
    expect(results[0].slug).toBe("recipe-1");
  });

  it("getFeaturedPosts returns sliced posts by count", () => {
    const results = getFeaturedPosts(2);
    expect(results).toHaveLength(2);
    expect(results[0].slug).toBe("recipe-1");
    expect(results[1].slug).toBe("recipe-2");
  });

  it("getFeaturedPosts uses default count of 6", () => {
    const results = getFeaturedPosts();
    expect(results).toHaveLength(3);
  });

  it("getPostBySlug finds post by exact slug", () => {
    const post = getPostBySlug("recipe-2");
    expect(post).toBeDefined();
    expect(post?.title).toBe("Healthy Salad");
  });

  it("getPostBySlug returns undefined for non-existent slug", () => {
    const post = getPostBySlug("unknown-slug");
    expect(post).toBeUndefined();
  });

  it("searchPosts filters posts case-insensitively", () => {
    const pizzaResult = searchPosts("pizza");
    expect(pizzaResult).toHaveLength(1);
    expect(pizzaResult[0].title).toBe("Delicious Pizza");

    const mixResult = searchPosts("GARDEN");
    expect(mixResult).toHaveLength(1);
    expect(mixResult[0].title).toBe("Healthy Salad");
  });

  it("searchPosts returns empty array when no matches are found", () => {
    const results = searchPosts("nonexistentkeyword");
    expect(results).toHaveLength(0);
  });
});
