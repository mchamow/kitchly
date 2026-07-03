import Link from "next/link";
import { notFound } from "next/navigation";
import { getFeaturedPosts, posts } from "@/lib/data";
import { getDictionary, hasLocale } from "@/dictionaries";
import PostGrid from "@/components/RecipeGrid";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: PageProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  return {
    title: lang === "pl" ? "777 przepisów mostownicy — Strona główna" : "Lucy's 777 recipes — Home",
  };
}

export default async function HomePage({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang);
  const d = dict.home;
  const featured = getFeaturedPosts(6);

  return (
    <>
      {/* ── Hero ── */}
      <section
        className="relative h-[350px] bg-cover bg-center bg-no-repeat flex items-center overflow-hidden"
        style={{ backgroundImage: `url('/img/ext/7d617a5c8a_muffinki_2520jesienne_25203.jpg')` }}
      >
        {/* Gradient overlay for text contrast and premium depth */}
        <div className="absolute inset-0 bg-gradient-to-r from-stone-950/85 via-stone-950/70 to-stone-900/35" />

        <div className="relative max-w-5xl w-full mx-auto px-6 z-10 text-white">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold font-handwritten tracking-wide mb-4 text-white drop-shadow-md">
              {d.headline}
            </h1>
            <p className="text-sm md:text-base text-stone-200 leading-relaxed mb-6 max-w-lg drop-shadow-sm">
              {d.body}
            </p>
            <div className="flex items-center gap-3">
              <Link
                href={`/${lang}/recipes`}
                id="hero-cta-primary"
                className="bg-amber-600 text-white font-semibold text-sm px-5 py-2.5 rounded-lg hover:bg-amber-500 transition-all duration-200 shadow-lg shadow-amber-900/40 hover:shadow-amber-900/60 hover:-translate-y-0.5"
              >
                {d.cta_primary}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Divider ── */}
      <div className="max-w-5xl mx-auto px-6"><div className="divider" /></div>

      {/* ── Latest Posts ── */}
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
        <PostGrid posts={featured} lang={lang} />
      </section>
    </>
  );
}
