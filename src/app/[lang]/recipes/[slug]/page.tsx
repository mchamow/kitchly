import { notFound } from "next/navigation";
import Link from "next/link";
import { getPostBySlug, posts } from "@/lib/data";
import { getDictionary, hasLocale, locales } from "@/dictionaries";
import type { Metadata } from "next";
import { RecipeSection } from "@/lib/types";

export async function generateStaticParams() {
  return locales.flatMap((lang) =>
    posts.map((p) => ({ lang, slug: p.slug }))
  );
}

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/recipes/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Not found" };
  return { title: post.title, description: post.excerpt };
}

function formatDate(iso: string, lang: string) {
  return new Date(iso).toLocaleDateString(lang === "pl" ? "pl-PL" : "en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

interface IconRule {
  keywords: string[];
  icon: string;
}

const INGREDIENT_RULES: IconRule[] = [
  { keywords: ["mąk", "flour", "proszek", "soda"], icon: "🌾" },
  { keywords: ["cukier", "cukru", "sugar", "puder"], icon: "🍬" },
  { keywords: ["masł", "butter", "margaryn", "tłuszcz"], icon: "🧈" },
  { keywords: ["jaj", "egg", "żółtk", "białk"], icon: "🥚" },
  { keywords: ["mlek", "milk", "śmietan", "jogurt", "ser", "twaróg"], icon: "🥛" },
  { keywords: ["wod", "water", "sok", "płyn"], icon: "💧" },
  { keywords: ["czekolad", "chocolate", "kakao"], icon: "🍫" },
  { keywords: ["orzech", "nut", "migdał", "nerkowc"], icon: "🥜" },
  { keywords: ["miód", "miodu", "honey"], icon: "🍯" },
  { keywords: ["cynamon", "imbir", "goździk", "kardamon", "przypraw", "sól", "soli"], icon: "🧂" },
  { keywords: ["jabłk", "apple"], icon: "🍎" },
  { keywords: ["wiśn", "cherry", "malin", "truskaw", "papaj", "banan", "cytryn", "owoc", "borówk"], icon: "🍋" },
];

const EQUIPMENT_RULES: IconRule[] = [
  { keywords: ["wag"], icon: "⚖️" },
  { keywords: ["misk"], icon: "🥣" },
  { keywords: ["nóż", "noż"], icon: "🔪" },
  { keywords: ["wałek"], icon: "🥖" },
  { keywords: ["foremk", "tortownic", "keksówk"], icon: "🧁" },
  { keywords: ["blach", "papilot"], icon: "🥘" },
  { keywords: ["piekarnik", "mikrofal"], icon: "♨️" },
  { keywords: ["mikser", "blender", "trzepaczk", "szpryc"], icon: "🌪️" },
  { keywords: ["łyżk", "łyżecz", "widelec", "szpatułk", "pędzel"], icon: "🥄" },
  { keywords: ["garn", "pateln", "rondel"], icon: "🍳" },
  { keywords: ["papier"], icon: "📄" },
  { keywords: ["sitko"], icon: "🥅" },
];

function getIngredientIcon(text: string): string {
  const t = text.toLowerCase();
  const rule = INGREDIENT_RULES.find((r) => r.keywords.some((k) => t.includes(k)));
  return rule ? rule.icon : "🔸";
}

function getEquipmentIcon(text: string): string {
  const t = text.toLowerCase();
  const rule = EQUIPMENT_RULES.find((r) => r.keywords.some((k) => t.includes(k)));
  return rule ? rule.icon : "🛠️";
}

function renderStructuredList(rawHtml: string | null, type: RecipeSection, dictDetail: any): string {
  if (!rawHtml) return "";
  
  const ulRegex = /<ul[^>]*?>([\s\S]*?)<\/ul>/i;
  const ulMatch = rawHtml.match(ulRegex);
  if (!ulMatch) return "";
  
  const listContent = ulMatch[1];
  
  let subtitle = "";
  const headingPart = rawHtml.split("<ul")[0];
  const cleanHeading = headingPart.replace(/<[^>]*?>/g, "").replace(/\\t|\\n/g, "").trim();
  const subtitleMatch = cleanHeading.match(/\(([^)]+)\)/);
  if (subtitleMatch) {
    subtitle = subtitleMatch[1];
  }
  
  const getIcon = type === RecipeSection.INGREDIENTS ? getIngredientIcon : getEquipmentIcon;
  
  const listItems = listContent.replace(/<li[^>]*?>([\s\S]*?)<\/li>/g, (m, itemText) => {
    const cleanText = itemText.replace(/\\t|\\n/g, "").trim();
    const icon = getIcon(cleanText);
    return `
      <li class="flex items-start gap-2 py-1 m-0">
        <span class="flex-shrink-0 text-sm mt-0.5">${icon}</span>
        <span class="text-stone-700 text-sm leading-relaxed">${cleanText}</span>
      </li>
    `;
  });
  
  const title = type === RecipeSection.INGREDIENTS ? dictDetail.ingredients : dictDetail.equipment;
  
  return `
    <div class="recipe-compact-section">
      <div class="mb-2 border-b border-stone-200 pb-1.5">
        <h3 class="text-xs font-bold uppercase tracking-wider text-stone-400 m-0">${title}</h3>
        ${subtitle ? `<span class="text-xs text-stone-400 font-normal block mt-0.5 leading-normal">${subtitle}</span>` : ""}
      </div>
      <ul class="list-none p-0 m-0 space-y-0.5">
        ${listItems}
      </ul>
    </div>
  `;
}

function renderImageGrid(images: string[]): string {
  if (images.length === 1) {
    return `<div class="my-6 not-prose flex justify-center">${images[0]}</div>`;
  }
  
  const gridCols = `grid-cols-1 sm:grid-cols-2${images.length >= 3 ? " md:grid-cols-3" : ""}`;
  
  const cells = images.map((img) => {
    let styledImg = img;
    if (styledImg.includes("<img")) {
      styledImg = styledImg.replace(
        /<img\b/gi,
        '<img class="rounded-lg object-cover w-full h-auto max-h-[300px] shadow-sm hover:scale-[1.01] transition-transform duration-200"'
      );
    }
    return `<div class="flex justify-center items-center w-full">${styledImg}</div>`;
  }).join("\n");
  
  return `
    <div class="grid ${gridCols} gap-4 my-8 not-prose w-full">
      ${cells}
    </div>
  `;
}

function groupConsecutiveImages(html: string): string {
  const imageBlockRegex = /((?:<p[^>]*?>\s*)?(?:<a\b[^>]*?>\s*?<img\b[^>]*?>\s*?<\/a>|<img\b[^>]*?>)(?:\s*<\/p>)?)/gi;
  const parts = html.split(imageBlockRegex);
  let result = "";
  let collectedImages: string[] = [];
  
  for (let i = 0; i < parts.length; i++) {
    const part = parts[i];
    
    if (i % 2 === 0) {
      const clean = part.replace(/&nbsp;|<br\s*\/?>|<\/?p>\s*<\/?p>|\s/gi, "").trim();
      if (clean === "") {
        continue;
      } else {
        if (collectedImages.length > 0) {
          result += renderImageGrid(collectedImages);
          collectedImages = [];
        }
        result += part;
      }
    } else {
      let cleanImage = part.trim();
      if (cleanImage.toLowerCase().startsWith("<p")) {
        cleanImage = cleanImage.replace(/^<p[^>]*?>/i, "").replace(/<\/p>$/i, "").trim();
      }
      collectedImages.push(cleanImage);
    }
  }
  
  if (collectedImages.length > 0) {
    result += renderImageGrid(collectedImages);
  }
  
  return result;
}

export default async function RecipeDetailPage({
  params,
}: PageProps<"/[lang]/recipes/[slug]">) {
  const { lang, slug } = await params;
  if (!hasLocale(lang)) notFound();

  const post = getPostBySlug(slug);
  if (!post) notFound();

  const dict = await getDictionary(lang);
  const d = dict.detail;

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-stone-400 mb-10 font-medium">
        <Link href={`/${lang}`} className="hover:text-stone-700 transition-colors">
          {dict.nav.home}
        </Link>
        <span className="text-stone-300">/</span>
        <Link href={`/${lang}/recipes`} className="hover:text-stone-700 transition-colors">
          {dict.nav.recipes}
        </Link>
        <span className="text-stone-300">/</span>
        <span className="text-stone-600 truncate max-w-[200px]">{post.title}</span>
      </nav>

      {/* Header */}
      <header className="mb-10">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-handwritten text-stone-900 tracking-wide mb-5">
          {post.title}
        </h1>

        <div className="flex items-center gap-4 text-sm text-stone-400 font-medium">
          <span className="flex items-center gap-1.5">
            <span className="text-base">👨‍🍳</span>
            {d.recipe_by} <span className="text-stone-600">{post.author}</span>
          </span>
          <span className="w-px h-4 bg-stone-200" />
          <time dateTime={post.publishedAt}>
            {formatDate(post.publishedAt, lang)}
          </time>
        </div>
      </header>

      {/* Divider */}
      <div className="divider mb-10" />

      {/* Intro */}
      {post.intro && (
        <div
          className="prose mb-6"
          dangerouslySetInnerHTML={{
            __html: groupConsecutiveImages(
              post.intro.replace(
                /\/pl\/recipes\/([a-zA-Z0-9_-]+)/g,
                `/${lang}/recipes/$1`
              )
            ),
          }}
        />
      )}

      {/* Ingredients and Equipment Grid */}
      {(post.ingredients || post.equipment) && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-8 not-prose">
          {post.ingredients ? (
            <div
              dangerouslySetInnerHTML={{
                __html: renderStructuredList(post.ingredients, RecipeSection.INGREDIENTS, d),
              }}
            />
          ) : (
            <div />
          )}
          {post.equipment ? (
            <div
              dangerouslySetInnerHTML={{
                __html: renderStructuredList(post.equipment, RecipeSection.EQUIPMENT, d),
              }}
            />
          ) : (
            <div />
          )}
        </div>
      )}

      {/* Execution / Preparation */}
      {post.execution && (
        <div
          className="prose mt-6"
          dangerouslySetInnerHTML={{
            __html: groupConsecutiveImages(
              post.execution.replace(
                /\/pl\/recipes\/([a-zA-Z0-9_-]+)/g,
                `/${lang}/recipes/$1`
              )
            ),
          }}
        />
      )}

      {/* Back */}
      <div className="mt-16 pt-8 divider">
        <Link
          href={`/${lang}/recipes`}
          className="inline-flex items-center gap-1.5 text-sm text-stone-400 hover:text-stone-700 transition-colors font-medium"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          {d.back}
        </Link>
      </div>
    </div>
  );
}
