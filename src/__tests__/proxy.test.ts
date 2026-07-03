import { describe, it, expect, vi, beforeEach } from "vitest";
import { proxy } from "../proxy";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

vi.mock("next/server", () => {
  return {
    NextResponse: {
      redirect: vi.fn((url: any) => ({
        status: 307,
        headers: { location: url.toString() },
        url,
      })),
    },
  };
});

describe("proxy middleware logic", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should do nothing (return undefined) if the pathname already starts with a supported locale", () => {
    const mockReqEn = {
      nextUrl: { pathname: "/en/recipes" },
    } as unknown as NextRequest;

    const resEn = proxy(mockReqEn);
    expect(resEn).toBeUndefined();
    expect(NextResponse.redirect).not.toHaveBeenCalled();

    const mockReqPl = {
      nextUrl: { pathname: "/pl" },
    } as unknown as NextRequest;

    const resPl = proxy(mockReqPl);
    expect(resPl).toBeUndefined();
    expect(NextResponse.redirect).not.toHaveBeenCalled();
  });

  it("should redirect to the default locale (pl) if the pathname does not start with a supported locale", () => {
    const mockReq = {
      nextUrl: { pathname: "/recipes" },
    } as unknown as NextRequest;

    const res = proxy(mockReq);

    expect(mockReq.nextUrl.pathname).toBe("/pl/recipes");
    expect(NextResponse.redirect).toHaveBeenCalledWith(mockReq.nextUrl);
    expect(res).toBeDefined();
  });

  it("should handle root path redirect correctly", () => {
    const mockReq = {
      nextUrl: { pathname: "/" },
    } as unknown as NextRequest;

    const res = proxy(mockReq);

    expect(mockReq.nextUrl.pathname).toBe("/pl/");
    expect(NextResponse.redirect).toHaveBeenCalledWith(mockReq.nextUrl);
    expect(res).toBeDefined();
  });
});
