import Link from "next/link";
import { Post } from "@/lib/types";
import { getImageUrl } from "@/lib/images";

interface PostCardProps {
  post: Post;
  lang: string;
}

function formatDate(iso: string, lang: string) {
  return new Date(iso).toLocaleDateString(lang === "pl" ? "pl-PL" : "en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function PostCard({ post, lang }: PostCardProps) {
  return (
    <Link href={`/${lang}/recipes/${post.slug}`} className="block group">
      <article className="card h-full flex flex-col overflow-hidden">
        {/* ── Thumbnail ── */}
        <div className="relative w-full aspect-[4/3] bg-stone-100 overflow-hidden flex-shrink-0">
          {post.coverImage ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={getImageUrl(post.coverImage)}
              alt={post.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-amber-50 to-stone-100">
              <span className="text-5xl opacity-30">🍽️</span>
            </div>
          )}
        </div>

        {/* ── Body ── */}
        <div className="flex flex-col flex-1 p-5 gap-2">
          <time dateTime={post.publishedAt} className="label">
            {formatDate(post.publishedAt, lang)}
          </time>

          <h3 className="text-[15px] font-semibold text-stone-900 leading-snug group-hover:text-amber-800 transition-colors duration-150">
            {post.title}
          </h3>

          <p className="text-[13px] text-stone-500 leading-relaxed line-clamp-3 flex-1">
            {post.excerpt}
          </p>

          <span className="text-[12px] font-semibold text-amber-800 flex items-center gap-1 mt-2">
            {lang === "pl" ? "Czytaj więcej" : "Read more"}
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </span>
        </div>
      </article>
    </Link>
  );
}
