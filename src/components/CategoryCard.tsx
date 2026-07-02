import Link from "next/link";


// CategoryCard is kept for reference but no longer used after category removal.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function CategoryCard({ category, lang, recipesLabel }: { category: any; lang: string; recipesLabel: string }) {
  return (
    <Link href={`/${lang}/categories/${category.slug}`} className="block group">
      <div className="card p-5 flex flex-col gap-3 h-full">
        {/* Colour accent bar */}
        <div
          className="w-8 h-1 rounded-full"
          style={{ backgroundColor: category.color }}
        />

        <span className="text-3xl">{category.icon}</span>

        <div className="flex-1">
          <h3 className="text-sm font-semibold text-stone-900 group-hover:text-amber-800 transition-colors duration-150">
            {category.name}
          </h3>
          <p className="text-[12.5px] text-stone-400 mt-0.5 leading-relaxed">
            {category.description}
          </p>
        </div>

        <div className="flex items-center justify-between pt-3 divider">
          <span className="label">
            {category.recipeCount} {recipesLabel}
          </span>
          <span className="text-[11px] font-semibold text-stone-400 group-hover:text-stone-700 transition-all duration-150 group-hover:translate-x-0.5">
            →
          </span>
        </div>
      </div>
    </Link>
  );
}
