import { redirect } from "next/navigation";

export default async function CategoryDetailPage({
  params,
}: PageProps<"/[lang]/categories/[slug]">) {
  const { lang } = await params;
  redirect(`/${lang}/recipes`);
}
