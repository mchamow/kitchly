"use client";

import { useEffect } from "react";
import { defaultLocale } from "@/dictionaries/config";

export default function RootPage() {
  useEffect(() => {
    const path = window.location.pathname;
    const isRoot = path === "/" || path === "" || path === "/index.html";

    if (isRoot) {
      // Using explicit index.html to ensure Capacitor finds the file
      window.location.replace(`/${defaultLocale}/index.html`);
    }
  }, []);

  return (
    <div className="relative flex h-screen w-full flex-col items-center justify-center bg-[#0C0A09] overflow-hidden">
      <div className="relative z-10 flex flex-col items-center gap-6 px-6 text-center">
        <div className="relative flex h-48 w-48 items-center justify-center rounded-full bg-white/10 p-8 shadow-2xl border border-white/20 backdrop-blur-md">
          <img
            src="/img/logo.png"
            alt="Logo"
            className="h-full w-full object-contain animate-pulse brightness-0 invert"
          />
        </div>
      </div>
    </div>
  );
}
