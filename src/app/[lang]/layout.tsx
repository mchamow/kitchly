import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { notFound } from "next/navigation";
import NavBar from "@/components/NavBar";
import { getDictionary, hasLocale, locales } from "@/dictionaries";
import "../globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  const isPolish = lang === "pl";
  return {
    title: {
      default: "777 przepisów mostownicy Łucji",
      template: "%s | 777 przepisów mostownicy Łucji",
    },
    description: isPolish
      ? "Odkryj starannie dobrane przepisy — od śniadań po desery."
      : "Explore curated recipes from breakfast to dessert.",
  };
}

export default async function RootLayout({
  children,
  params,
}: LayoutProps<"/[lang]">) {
  const { lang } = await params;

  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang);

  return (
    <html lang={lang} className={inter.variable}>
      <body className="bg-[#fafaf8] text-stone-900 antialiased min-h-screen" suppressHydrationWarning>
        <NavBar lang={lang} nav={dict.nav} />
        <main>{children}</main>

        <footer className="mt-24 divider">
          <div className="max-w-5xl mx-auto px-6 py-10 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/img/logo.png"
                alt="777 przepisów mostownicy Łucji"
                className="w-12 h-12 object-contain mix-blend-multiply"
              />
              <span className="font-semibold text-stone-800 text-2xl font-handwritten tracking-wide">
                777 przepisów mostownicy Łucji
              </span>
            </div>
            <p className="text-stone-400 text-xs">
              © {new Date().getFullYear()} 777 przepisów mostownicy Łucji.{" "}
              {dict.footer.rights}
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
