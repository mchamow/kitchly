import { notFound } from "next/navigation";
import Link from "next/link";
import { getRecipeBySlug, recipes } from "@/lib/data";
import { getDictionary, hasLocale, locales } from "@/dictionaries";
import type { Metadata } from "next";

export async function generateStaticParams() {
  // The [lang] parent generates locale params; this generates slug params per locale
  return locales.flatMap((lang) =>
    recipes.map((r) => ({ lang, slug: r.slug }))
  );
}

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/recipes/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const recipe = getRecipeBySlug(slug);
  if (!recipe) return { title: "Not found" };
  return { title: recipe.title, description: recipe.description };
}

const categoryEmoji: Record<string, string> = {
  Breakfast: "🍳",
  Pasta: "🍝",
  Salads: "🥗",
  Soups: "🍲",
  Desserts: "🍰",
  Grilling: "🔥",
};

const difficultyStyle = {
  Easy: "text-emerald-700 bg-emerald-50 border-emerald-200",
  Medium: "text-amber-700 bg-amber-50 border-amber-200",
  Hard: "text-red-700 bg-red-50 border-red-200",
};

export default async function RecipeDetailPage({
  params,
}: PageProps<"/[lang]/recipes/[slug]">) {
  const { lang, slug } = await params;
  if (!hasLocale(lang)) notFound();

  const recipe = getRecipeBySlug(slug);
  if (!recipe) notFound();

  const dict = await getDictionary(lang);
  const d = dict.detail;

  const totalTime = recipe.prepTime + recipe.cookTime;

  const difficultyLabel: Record<string, string> = {
    Easy: dict.recipes.difficulty_Easy,
    Medium: dict.recipes.difficulty_Medium,
    Hard: dict.recipes.difficulty_Hard,
  };
  const emoji = categoryEmoji[recipe.category] ?? "🍽️";

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-stone-400 mb-10 font-medium">
        <Link href={`/${lang}`} className="hover:text-stone-700 transition-colors">
          {dict.nav.home}
        </Link>
        <span className="text-stone-300">/</span>
        <Link href={`/${lang}/recipes`} className="hover:text-stone-700 transition-colors">
          {dict.nav.recipes}
        </Link>
        <span className="text-stone-300">/</span>
        <span className="text-stone-600">{recipe.title}</span>
      </nav>

      {/* Top section: title + emoji */}
      <div className="grid md:grid-cols-[1fr_auto] gap-8 items-start mb-10">
        <div>
          {/* Badges */}
          <div className="flex items-center gap-2 mb-4">
            <span className="label bg-stone-100 px-2.5 py-1 rounded-full border border-stone-200">
              {recipe.category}
            </span>
            <span className={`label px-2.5 py-1 rounded-full border text-[10px] font-semibold ${difficultyStyle[recipe.difficulty]}`}>
              {difficultyLabel[recipe.difficulty]}
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-stone-900 tracking-tight leading-[1.1] mb-4">
            {recipe.title}
          </h1>
          <p className="text-base text-stone-500 leading-relaxed max-w-xl">
            {recipe.description}
          </p>

          <div className="flex items-center gap-2 mt-6">
            <span className="text-xl">👨‍🍳</span>
            <div>
              <p className="text-[11px] text-stone-400 font-medium uppercase tracking-wider">
                {d.recipe_by}
              </p>
              <p className="text-sm font-semibold text-stone-700">{recipe.author}</p>
            </div>
          </div>
        </div>

        {/* Emoji */}
        <div className="hidden md:flex w-48 h-48 bg-stone-50 border border-stone-200 rounded-2xl items-center justify-center flex-shrink-0">
          <span className="text-7xl">{emoji}</span>
        </div>
      </div>

      {/* Stats strip */}
      <div className="grid grid-cols-4 gap-0 bg-white border border-stone-200 rounded-xl overflow-hidden mb-12">
        {[
          { label: d.prep, value: `${recipe.prepTime} min` },
          { label: d.cook, value: `${recipe.cookTime} min` },
          { label: d.total, value: `${totalTime} min` },
          { label: d.servings, value: `${recipe.servings}` },
        ].map(({ label, value }, i) => (
          <div
            key={label}
            className={`py-5 text-center ${i > 0 ? "border-l border-stone-200" : ""}`}
          >
            <p className="text-lg font-bold text-stone-900">{value}</p>
            <p className="label mt-0.5">{label}</p>
          </div>
        ))}
      </div>

      {/* Body */}
      <div className="grid md:grid-cols-[280px_1fr] gap-12">
        {/* Ingredients */}
        <aside>
          <h2 className="text-base font-bold text-stone-900 mb-4">{d.ingredients}</h2>
          <ul className="space-y-0">
            {recipe.ingredients.map((ing, i) => (
              <li key={i} className="flex items-center justify-between py-3 border-b border-stone-100 last:border-0">
                <span className="text-sm text-stone-700 capitalize">{ing.name}</span>
                <span className="text-sm text-stone-400 font-medium tabular-nums">
                  {ing.amount}{ing.unit ? ` ${ing.unit}` : ""}
                </span>
              </li>
            ))}
          </ul>

          {recipe.nutrition && (
            <div className="mt-8 bg-stone-50 border border-stone-200 rounded-xl p-5">
              <h3 className="label mb-4">{d.nutrition}</h3>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: d.calories, value: recipe.nutrition.calories, unit: "kcal" },
                  { label: d.protein, value: recipe.nutrition.protein, unit: "g" },
                  { label: d.carbs, value: recipe.nutrition.carbs, unit: "g" },
                  { label: d.fat, value: recipe.nutrition.fat, unit: "g" },
                ].map(({ label, value, unit }) => (
                  <div key={label}>
                    <p className="text-base font-bold text-stone-900">
                      {value}
                      <span className="text-xs text-stone-400 font-normal ml-0.5">{unit}</span>
                    </p>
                    <p className="label mt-0.5">{label}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {recipe.tags.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-1.5">
              {recipe.tags.map((tag) => (
                <span key={tag} className="text-[11px] text-stone-500 bg-white border border-stone-200 px-2.5 py-1 rounded-full font-medium">
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </aside>

        {/* Steps */}
        <div>
          <h2 className="text-base font-bold text-stone-900 mb-6">{d.instructions}</h2>
          <ol className="space-y-6">
            {recipe.steps.map((step, i) => (
              <li key={i} className="flex gap-5">
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-stone-900 text-white flex items-center justify-center text-xs font-bold mt-0.5">
                  {i + 1}
                </span>
                <p className="text-sm text-stone-600 leading-relaxed pt-1">{step}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>

      {/* Back */}
      <div className="mt-16 pt-8 divider">
        <Link
          href={`/${lang}/recipes`}
          className="inline-flex items-center gap-1.5 text-sm text-stone-400 hover:text-stone-700 transition-colors font-medium"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          {d.back}
        </Link>
      </div>
    </div>
  );
}
