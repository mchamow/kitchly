import { describe, it, expect } from "vitest";
import { locales, defaultLocale, hasLocale } from "../../dictionaries/config";

describe("dictionaries config", () => {
  it("defines supported locales correctly", () => {
    expect(locales).toContain("en");
    expect(locales).toContain("pl");
    expect(locales).toHaveLength(2);
  });

  it("defines defaultLocale as pl", () => {
    expect(defaultLocale).toBe("pl");
  });

  it("hasLocale returns true for supported locales", () => {
    expect(hasLocale("en")).toBe(true);
    expect(hasLocale("pl")).toBe(true);
  });

  it("hasLocale returns false for unsupported locales", () => {
    expect(hasLocale("fr")).toBe(false);
    expect(hasLocale("de")).toBe(false);
    expect(hasLocale("")).toBe(false);
  });
});
