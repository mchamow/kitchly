"use client";

import { usePathname, useRouter } from "next/navigation";

const localeLabels: Record<string, string> = {
  en: "EN",
  pl: "PL",
};

interface LanguageSwitcherProps {
  currentLang: string;
  locales: string[];
}

export default function LanguageSwitcher({
  currentLang,
  locales,
}: LanguageSwitcherProps) {
  const pathname = usePathname();
  const router = useRouter();

  const switchLocale = (locale: string) => {
    if (locale === currentLang) return;
    // Swap the first path segment (the locale) and keep the rest
    const segments = pathname.split("/");
    segments[1] = locale;
    router.push(segments.join("/"));
  };

  return (
    <div className="flex items-center bg-stone-100 rounded-lg p-0.5">
      {locales.map((locale) => (
        <button
          key={locale}
          onClick={() => switchLocale(locale)}
          className={`text-xs font-semibold px-2.5 py-1.5 rounded-md transition-all duration-150 cursor-pointer ${
            currentLang === locale
              ? "bg-white text-stone-900 shadow-sm"
              : "text-stone-400 hover:text-stone-600"
          }`}
          aria-label={`Switch to ${locale.toUpperCase()}`}
        >
          {localeLabels[locale] ?? locale.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
