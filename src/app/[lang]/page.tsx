import Link from "next/link";
import { notFound } from "next/navigation";
import { getFeaturedRecipes, categories } from "@/lib/data";
import { getDictionary, hasLocale } from "@/dictionaries";
import RecipeGrid from "@/components/RecipeGrid";
import CategoryCard from "@/components/CategoryCard";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: PageProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  return {
    title: lang === "pl" ? "Cookbook — Strona główna" : "Cookbook — Home",
  };
}

export default async function HomePage({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang);
  const d = dict.home;
  const featured = getFeaturedRecipes();

  const difficultyLabels = {
    difficulty_Easy: dict.recipes.difficulty_Easy,
    difficulty_Medium: dict.recipes.difficulty_Medium,
    difficulty_Hard: dict.recipes.difficulty_Hard,
  };

  return (
    <>
      {/* ── Hero ── */}
      <section className="max-w-5xl mx-auto px-6 pt-20 pb-16">
        <div className="max-w-2xl">
          <p className="label mb-4">{d.tagline}</p>
          <h1 className="text-5xl md:text-6xl font-bold text-stone-900 leading-[1.1] tracking-tight mb-6">
            {d.headline}
          </h1>
          <p className="text-lg text-stone-500 leading-relaxed mb-8 max-w-lg">
            {d.body}
          </p>
          <div className="flex items-center gap-3">
            <Link
              href={`/${lang}/recipes`}
              id="hero-cta-primary"
              className="bg-stone-900 text-white font-semibold text-sm px-6 py-3 rounded-lg hover:bg-stone-700 transition-colors duration-150"
            >
              {d.cta_primary}
            </Link>
            <Link
              href={`/${lang}/categories`}
              id="hero-cta-secondary"
              className="text-stone-500 font-medium text-sm px-6 py-3 rounded-lg border border-stone-200 hover:border-stone-400 hover:text-stone-700 transition-all duration-150 bg-white"
            >
              {d.cta_secondary}
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-10 mt-14 pt-10 divider">
          {[
            ["80+", d.stats_recipes],
            ["6", d.stats_categories],
            ["3", d.stats_chefs],
          ].map(([num, label]) => (
            <div key={label}>
              <div className="text-2xl font-bold text-stone-900">{num}</div>
              <div className="text-xs text-stone-400 font-medium mt-0.5">{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Divider ── */}
      <div className="max-w-5xl mx-auto px-6"><div className="divider" /></div>

      {/* ── Featured Recipes ── */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="label mb-1">{d.featured_label}</p>
            <h2 className="text-2xl font-bold text-stone-900 tracking-tight">
              {d.featured_title}
            </h2>
          </div>
          <Link
            href={`/${lang}/recipes`}
            className="text-sm text-stone-500 hover:text-stone-900 transition-colors font-medium flex items-center gap-1"
          >
            {d.view_all}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
        <RecipeGrid
          recipes={featured}
          lang={lang}
          difficultyLabels={difficultyLabels}
        />
      </section>

      {/* ── Divider ── */}
      <div className="max-w-5xl mx-auto px-6"><div className="divider" /></div>

      {/* ── Categories ── */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <div className="mb-8">
          <p className="label mb-1">{d.categories_label}</p>
          <h2 className="text-2xl font-bold text-stone-900 tracking-tight">
            {d.categories_title}
          </h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {categories.map((cat) => (
            <CategoryCard
              key={cat.id}
              category={cat}
              lang={lang}
              recipesLabel={dict.categories.recipes_count}
            />
          ))}
        </div>
      </section>
    </>
  );
}
