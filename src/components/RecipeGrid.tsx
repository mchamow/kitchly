import { Post } from "@/lib/types";
import PostCard from "./RecipeCard";

interface PostGridProps {
  posts: Post[];
  lang: string;
  emptyMessage?: string;
}

export default function PostGrid({
  posts,
  lang,
  emptyMessage = "No posts found.",
}: PostGridProps) {
  if (posts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4 text-center">
        <span className="text-6xl opacity-50 grayscale">🍽️</span>
        <p className="text-stone-500 text-base max-w-xs">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} lang={lang} />
      ))}
    </div>
  );
}
