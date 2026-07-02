import { redirect } from "next/navigation";

export default async function CategoriesPage({
  params,
}: PageProps<"/[lang]/categories">) {
  const { lang } = await params;
  redirect(`/${lang}/recipes`);
}
