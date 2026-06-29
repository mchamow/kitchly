import Link from "next/link";
import { Recipe } from "@/lib/types";

const categoryEmoji: Record<string, string> = {
  Breakfast: "🍳",
  Pasta: "🍝",
  Salads: "🥗",
  Soups: "🍲",
  Desserts: "🍰",
  Grilling: "🔥",
};

const difficultyConfig = {
  Easy: { dot: "bg-emerald-500", text: "text-emerald-700" },
  Medium: { dot: "bg-amber-500", text: "text-amber-700" },
  Hard: { dot: "bg-red-500", text: "text-red-700" },
};

interface RecipeCardProps {
  recipe: Recipe;
  lang: string;
  difficultyLabel: string; // translated label for the difficulty value
}

export default function RecipeCard({ recipe, lang, difficultyLabel }: RecipeCardProps) {
  const totalTime = recipe.prepTime + recipe.cookTime;
  const diff = difficultyConfig[recipe.difficulty];
  const emoji = categoryEmoji[recipe.category] ?? "🍽️";

  return (
    <Link href={`/${lang}/recipes/${recipe.slug}`} className="block group">
      <article className="card h-full flex flex-col overflow-hidden">
        {/* Image area */}
        <div className="relative h-44 bg-stone-50 flex items-center justify-center border-b border-stone-100 overflow-hidden">
          <span className="text-5xl transition-transform duration-300 group-hover:scale-110">
            {emoji}
          </span>
          <span className="absolute top-3 left-3 label bg-white border border-stone-200 px-2.5 py-1 rounded-full">
            {recipe.category}
          </span>
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col gap-2 flex-1">
          <h3 className="text-[15px] font-semibold text-stone-900 leading-snug group-hover:text-amber-800 transition-colors duration-150">
            {recipe.title}
          </h3>
          <p className="text-[13px] text-stone-500 leading-relaxed line-clamp-2">
            {recipe.description}
          </p>

          {/* Meta */}
          <div className="flex items-center gap-4 mt-auto pt-3 divider">
            <span className="flex items-center gap-1.5 text-[12px] text-stone-400 font-medium">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
              </svg>
              {totalTime} min
            </span>
            <span className="flex items-center gap-1.5 text-[12px] text-stone-400 font-medium">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
              </svg>
              {recipe.servings}
            </span>
            <span className={`ml-auto flex items-center gap-1.5 text-[12px] font-semibold ${diff.text}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${diff.dot}`} />
              {difficultyLabel}
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}
