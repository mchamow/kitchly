import Link from "next/link";
import { Post } from "@/lib/types";

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
      <article className="card h-full flex flex-col p-5 gap-3">
        <time
          dateTime={post.publishedAt}
          className="label"
        >
          {formatDate(post.publishedAt, lang)}
        </time>

        <h3 className="text-[15px] font-semibold text-stone-900 leading-snug group-hover:text-amber-800 transition-colors duration-150">
          {post.title}
        </h3>

        <p className="text-[13px] text-stone-500 leading-relaxed line-clamp-3 flex-1">
          {post.excerpt}
        </p>

        <span className="text-[12px] font-semibold text-amber-800 flex items-center gap-1 mt-auto">
          {lang === "pl" ? "Czytaj więcej" : "Read more"}
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </span>
      </article>
    </Link>
  );
}
