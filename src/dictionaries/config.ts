// Locale configuration — safe to import on both server and client
export const locales = ["en", "pl"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "pl";

export const hasLocale = (locale: string): locale is Locale =>
  (locales as readonly string[]).includes(locale);
