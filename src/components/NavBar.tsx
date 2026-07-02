"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import LanguageSwitcher from "./LanguageSwitcher";
import { locales } from "@/dictionaries/config";

interface NavDict {
  home: string;
  recipes: string;
  browse: string;
}

interface NavBarProps {
  lang: string;
  nav: NavDict;
}

export default function NavBar({ lang, nav }: NavBarProps) {
  const pathname = usePathname();

  const navLinks = [
    { href: `/${lang}`, label: nav.home },
    { href: `/${lang}/recipes`, label: nav.recipes },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#fafaf8]/90 backdrop-blur-md border-b border-stone-200">
      <nav className="max-w-5xl mx-auto px-6 h-16 flex items-center gap-8">
        {/* Logo */}
        <Link href={`/${lang}`} className="flex items-center gap-2 flex-shrink-0">
          <span className="text-xl">🍴</span>
          <span className="font-bold text-stone-900 text-base tracking-tight">
            Cookbook
          </span>
        </Link>

        {/* Nav links */}
        <ul className="hidden md:flex items-center gap-0.5 list-none m-0 p-0 flex-1">
          {navLinks.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className={`text-sm px-3.5 py-2 rounded-lg transition-colors duration-150 ${pathname === href
                    ? "text-stone-900 font-semibold bg-stone-100"
                    : "text-stone-500 hover:text-stone-800 hover:bg-stone-100 font-medium"
                  }`}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3 ml-auto">
          {/* Language switcher */}
          <LanguageSwitcher
            currentLang={lang}
            locales={[...locales]}
          />

          {/* CTA */}
          <Link
            href={`/${lang}/recipes`}
            id="nav-cta"
            className="hidden md:block flex-shrink-0 bg-stone-900 text-white font-semibold text-sm px-4 py-2 rounded-lg transition-all duration-150 hover:bg-stone-700"
          >
            {nav.browse}
          </Link>
        </div>
      </nav>
    </header>
  );
}
