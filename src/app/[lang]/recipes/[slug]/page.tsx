import { notFound } from "next/navigation";
import Link from "next/link";
import { getPostBySlug, posts } from "@/lib/data";
import { getDictionary, hasLocale, locales } from "@/dictionaries";
import type { Metadata } from "next";

export async function generateStaticParams() {
  return locales.flatMap((lang) =>
    posts.map((p) => ({ lang, slug: p.slug }))
  );
}

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/recipes/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Not found" };
  return { title: post.title, description: post.excerpt };
}

function formatDate(iso: string, lang: string) {
  return new Date(iso).toLocaleDateString(lang === "pl" ? "pl-PL" : "en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function RecipeDetailPage({
  params,
}: PageProps<"/[lang]/recipes/[slug]">) {
  const { lang, slug } = await params;
  if (!hasLocale(lang)) notFound();

  const post = getPostBySlug(slug);
  if (!post) notFound();

  const dict = await getDictionary(lang);
  const d = dict.detail;

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
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
        <span className="text-stone-600 truncate max-w-[200px]">{post.title}</span>
      </nav>

      {/* Header */}
      <header className="mb-10">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-handwritten text-stone-900 tracking-wide mb-5">
          {post.title}
        </h1>

        <div className="flex items-center gap-4 text-sm text-stone-400 font-medium">
          <span className="flex items-center gap-1.5">
            <span className="text-base">👨‍🍳</span>
            {d.recipe_by} <span className="text-stone-600">{post.author}</span>
          </span>
          <span className="w-px h-4 bg-stone-200" />
          <time dateTime={post.publishedAt}>
            {formatDate(post.publishedAt, lang)}
          </time>
        </div>
      </header>

      {/* Divider */}
      <div className="divider mb-10" />

      {/* Content */}
      <div
        className="prose"
        dangerouslySetInnerHTML={{
          __html: post.content.replace(
            /\/pl\/recipes\/([a-zA-Z0-9_-]+)/g,
            `/${lang}/recipes/$1`
          ),
        }}
      />

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
