import "server-only";
import { type Locale } from "./config";

export { locales, defaultLocale, hasLocale, type Locale } from "./config";

const dictionaries: Record<Locale, () => Promise<typeof import("./en.json")["default"]>> = {
  en: () => import("./en.json").then((m) => m.default),
  pl: () => import("./pl.json").then((m) => m.default),
};

export const getDictionary = async (locale: Locale) =>
  dictionaries[locale]();

export type Dictionary = Awaited<ReturnType<typeof getDictionary>>;
