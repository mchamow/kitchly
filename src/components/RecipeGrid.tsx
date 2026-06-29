import { Recipe } from "@/lib/types";
import RecipeCard from "./RecipeCard";

interface DifficultyLabels {
  difficulty_Easy: string;
  difficulty_Medium: string;
  difficulty_Hard: string;
}

interface RecipeGridProps {
  recipes: Recipe[];
  lang: string;
  difficultyLabels: DifficultyLabels;
  emptyMessage?: string;
}

export default function RecipeGrid({
  recipes,
  lang,
  difficultyLabels,
  emptyMessage = "No recipes found.",
}: RecipeGridProps) {
  if (recipes.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4 text-center">
        <span className="text-6xl opacity-50 grayscale">🍽️</span>
        <p className="text-stone-500 text-base max-w-xs">{emptyMessage}</p>
      </div>
    );
  }

  const labelFor = (difficulty: Recipe["difficulty"]) => {
    const map: Record<Recipe["difficulty"], string> = {
      Easy: difficultyLabels.difficulty_Easy,
      Medium: difficultyLabels.difficulty_Medium,
      Hard: difficultyLabels.difficulty_Hard,
    };
    return map[difficulty];
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {recipes.map((recipe) => (
        <RecipeCard
          key={recipe.id}
          recipe={recipe}
          lang={lang}
          difficultyLabel={labelFor(recipe.difficulty)}
        />
      ))}
    </div>
  );
}
