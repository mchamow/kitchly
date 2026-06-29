"use client";

import { useRecipeSearch } from "@/hooks/useRecipeSearch";
import RecipeGrid from "@/components/RecipeGrid";
import SearchBar from "@/components/SearchBar";
import { DifficultyLevel } from "@/lib/types";

interface RecipesDict {
  page_label: string;
  page_title: string;
  search_placeholder: string;
  difficulty_Easy: string;
  difficulty_Medium: string;
  difficulty_Hard: string;
  time_30: string;
  time_60: string;
  time_90: string;
  clear: string;
  count_one: string;
  count_other: string;
  empty: string;
}

interface RecipesClientProps {
  dict: RecipesDict;
  lang: string;
}

const difficulties: DifficultyLevel[] = ["Easy", "Medium", "Hard"];

export default function RecipesClient({ dict, lang }: RecipesClientProps) {
  const {
    recipes,
    filters,
    setQuery,
    setDifficulty,
    setMaxTime,
    clearFilters,
    totalCount,
  } = useRecipeSearch();

  const hasFilters = filters.query || filters.difficulty || filters.maxTime;

  const timeOptions = [
    { label: dict.time_30, value: 30 },
    { label: dict.time_60, value: 60 },
    { label: dict.time_90, value: 90 },
  ];

  const difficultyLabels: Record<DifficultyLevel, string> = {
    Easy: dict.difficulty_Easy,
    Medium: dict.difficulty_Medium,
    Hard: dict.difficulty_Hard,
  };

  const countLabel =
    totalCount === 1 ? dict.count_one : dict.count_other;

  return (
    <div className="max-w-5xl mx-auto px-6 py-14">
      {/* Header */}
      <div className="mb-10">
        <p className="label mb-1">{dict.page_label}</p>
        <h1 className="text-3xl md:text-4xl font-bold text-stone-900 tracking-tight">
          {dict.page_title}
        </h1>
      </div>

      {/* Filter bar */}
      <div className="flex flex-wrap items-center gap-2 mb-3">
        <SearchBar
          value={filters.query}
          onChange={setQuery}
          placeholder={dict.search_placeholder}
        />

        <div className="w-px h-6 bg-stone-200 mx-1 hidden sm:block" />

        {difficulties.map((d) => (
          <button
            key={d}
            onClick={() => setDifficulty(filters.difficulty === d ? undefined : d)}
            className={`text-xs font-semibold px-3 py-2 rounded-lg border transition-all duration-150 cursor-pointer ${
              filters.difficulty === d
                ? "bg-stone-900 text-white border-stone-900"
                : "bg-white text-stone-500 border-stone-200 hover:border-stone-400 hover:text-stone-700"
            }`}
          >
            {difficultyLabels[d]}
          </button>
        ))}

        <div className="w-px h-6 bg-stone-200 mx-1 hidden sm:block" />

        {timeOptions.map(({ label, value }) => (
          <button
            key={value}
            onClick={() => setMaxTime(filters.maxTime === value ? undefined : value)}
            className={`text-xs font-semibold px-3 py-2 rounded-lg border transition-all duration-150 cursor-pointer ${
              filters.maxTime === value
                ? "bg-stone-900 text-white border-stone-900"
                : "bg-white text-stone-500 border-stone-200 hover:border-stone-400 hover:text-stone-700"
            }`}
          >
            {label}
          </button>
        ))}

        {hasFilters && (
          <button
            onClick={clearFilters}
            className="text-xs text-stone-400 hover:text-stone-700 transition-colors font-medium underline underline-offset-2 cursor-pointer ml-1"
          >
            {dict.clear}
          </button>
        )}
      </div>

      {/* Count */}
      <p className="text-xs text-stone-400 font-medium mb-8">
        {totalCount} {countLabel}
      </p>

      <RecipeGrid
        recipes={recipes}
        lang={lang}
        difficultyLabels={{
          difficulty_Easy: dict.difficulty_Easy,
          difficulty_Medium: dict.difficulty_Medium,
          difficulty_Hard: dict.difficulty_Hard,
        }}
        emptyMessage={dict.empty}
      />
    </div>
  );
}
