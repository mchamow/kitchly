"use client";

import { usePostSearch } from "@/hooks/useRecipeSearch";
import PostGrid from "@/components/RecipeGrid";
import SearchBar from "@/components/SearchBar";

interface PostsDict {
  page_label: string;
  page_title: string;
  search_placeholder: string;
  count_one: string;
  count_other: string;
  empty: string;
}

interface PostsClientProps {
  dict: PostsDict;
  lang: string;
}

export default function PostsClient({ dict, lang }: PostsClientProps) {
  const { posts, filters, setQuery, clearFilters, totalCount } =
    usePostSearch();

  const countLabel = totalCount === 1 ? dict.count_one : dict.count_other;

  return (
    <div className="max-w-5xl mx-auto px-6 py-14">
      {/* Header */}
      <div className="mb-10">
        <p className="label mb-1">{dict.page_label}</p>
        <h1 className="text-3xl md:text-4xl font-bold text-stone-900 tracking-tight">
          {dict.page_title}
        </h1>
      </div>

      {/* Search */}
      <div className="flex items-center gap-3 mb-3">
        <SearchBar
          value={filters.query}
          onChange={setQuery}
          placeholder={dict.search_placeholder}
        />
        {filters.query && (
          <button
            onClick={clearFilters}
            className="text-xs text-stone-400 hover:text-stone-700 transition-colors font-medium underline underline-offset-2 cursor-pointer"
          >
            Clear
          </button>
        )}
      </div>

      {/* Count */}
      <p className="text-xs text-stone-400 font-medium mb-8">
        {totalCount} {countLabel}
      </p>

      <PostGrid
        posts={posts}
        lang={lang}
        emptyMessage={dict.empty}
      />
    </div>
  );
}
