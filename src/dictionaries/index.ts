import "server-only";
import { type Locale } from "./config";

export { locales, defaultLocale, hasLocale, type Locale } from "./config";

const dictionaries: Record<Locale, () => Promise<typeof import("./en.json")>> = {
  en: () => import("./en.json"),
  pl: () => import("./pl.json"),
};

export const getDictionary = async (locale: Locale) =>
  dictionaries[locale]();

export type Dictionary = Awaited<ReturnType<typeof getDictionary>>;
