import { notFound } from "next/navigation";
import { categories } from "@/lib/data";
import { getDictionary, hasLocale } from "@/dictionaries";
import CategoryCard from "@/components/CategoryCard";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/categories">): Promise<Metadata> {
  const { lang } = await params;
  return {
    title: lang === "pl" ? "Kategorie" : "Categories",
    description:
      lang === "pl"
        ? "Przeglądaj przepisy według kategorii."
        : "Browse recipes by category.",
  };
}

export default async function CategoriesPage({
  params,
}: PageProps<"/[lang]/categories">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang);
  const d = dict.categories;

  return (
    <div className="max-w-5xl mx-auto px-6 py-14">
      <div className="mb-10">
        <p className="label mb-1">{d.page_label}</p>
        <h1 className="text-3xl md:text-4xl font-bold text-stone-900 tracking-tight">
          {d.page_title}
        </h1>
        <p className="text-stone-500 mt-3 text-base max-w-md leading-relaxed">
          {d.page_body}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((category) => (
          <CategoryCard
            key={category.id}
            category={category}
            lang={lang}
            recipesLabel={d.recipes_count}
          />
        ))}
      </div>
    </div>
  );
}
