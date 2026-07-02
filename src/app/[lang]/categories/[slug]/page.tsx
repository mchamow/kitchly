import { notFound } from "next/navigation";
import Link from "next/link";
import { categories, getRecipesByCategory } from "@/lib/data";
import { getDictionary, hasLocale, locales } from "@/dictionaries";
import RecipeGrid from "@/components/RecipeGrid";
import type { Metadata } from "next";

export async function generateStaticParams() {
  return locales.flatMap((lang) =>
    categories.map((cat) => ({ lang, slug: cat.slug }))
  );
}

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/categories/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const category = categories.find((c) => c.slug === slug);
  if (!category) return { title: "Not found" };
  return {
    title: category.name,
    description: category.description,
  };
}

export default async function CategoryDetailPage({
  params,
}: PageProps<"/[lang]/categories/[slug]">) {
  const { lang, slug } = await params;
  if (!hasLocale(lang)) notFound();

  const category = categories.find((c) => c.slug === slug);
  if (!category) notFound();

  const dict = await getDictionary(lang);
  const d = dict.categories;
  const recipesDict = dict.recipes;

  const recipes = getRecipesByCategory(category.name);

  const difficultyLabels = {
    difficulty_Easy: recipesDict.difficulty_Easy,
    difficulty_Medium: recipesDict.difficulty_Medium,
    difficulty_Hard: recipesDict.difficulty_Hard,
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-stone-400 mb-10 font-medium">
        <Link href={`/${lang}`} className="hover:text-stone-700 transition-colors">
          {dict.nav.home}
        </Link>
        <span className="text-stone-300">/</span>
        <Link href={`/${lang}/categories`} className="hover:text-stone-700 transition-colors">
          {dict.nav.categories}
        </Link>
        <span className="text-stone-300">/</span>
        <span className="text-stone-600">{category.name}</span>
      </nav>

      {/* Header */}
      <div className="flex items-start gap-5 mb-12">
        <div
          className="flex-shrink-0 w-16 h-16 rounded-2xl flex items-center justify-center text-3xl"
          style={{ backgroundColor: `${category.color}18` }}
        >
          {category.icon}
        </div>
        <div>
          <p className="label mb-1" style={{ color: category.color }}>
            {d.page_label}
          </p>
          <h1 className="text-3xl md:text-4xl font-bold text-stone-900 tracking-tight">
            {category.name}
          </h1>
          <p className="text-stone-500 mt-2 text-base leading-relaxed max-w-md">
            {category.description}
          </p>
        </div>
      </div>

      {/* Recipe grid */}
      <RecipeGrid
        recipes={recipes}
        lang={lang}
        difficultyLabels={difficultyLabels}
        emptyMessage={d.no_recipes}
      />

      {/* Back */}
      <div className="mt-16 pt-8 divider">
        <Link
          href={`/${lang}/categories`}
          className="inline-flex items-center gap-1.5 text-sm text-stone-400 hover:text-stone-700 transition-colors font-medium"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          {d.all_recipes}
        </Link>
      </div>
    </div>
  );
}
