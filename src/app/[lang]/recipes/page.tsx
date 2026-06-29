import { notFound } from "next/navigation";
import { getDictionary, hasLocale } from "@/dictionaries";
import RecipesClient from "@/components/RecipesClient";

export default async function RecipesPage({ params }: PageProps<"/[lang]/recipes">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang);

  return <RecipesClient dict={dict.recipes} lang={lang} />;
}
