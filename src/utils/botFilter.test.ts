import { describe, expect, it } from "vitest";
import { istBotUserAgent } from "./botFilter";

describe("istBotUserAgent", () => {
  it("erkennt PageSpeed Insights und Crawler", () => {
    expect(istBotUserAgent("Mozilla/5.0 (Linux; Android 11; moto g power (2022)) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Mobile Safari/537.36")).toBe(true);
    expect(istBotUserAgent("Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko); compatible; Shap-User/0.1.0")).toBe(true);
    expect(istBotUserAgent("Mozilla/5.0 (compatible; Googlebot/2.1)")).toBe(true);
    expect(istBotUserAgent("Mozilla/5.0 HeadlessChrome/150.0.0.0 Safari/537.36")).toBe(true);
  });

  it("lässt echte Browser durch", () => {
    expect(istBotUserAgent("Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Mobile Safari/537.36")).toBe(false);
    expect(istBotUserAgent("Mozilla/5.0 (iPhone; CPU iPhone OS 18_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.7 Mobile/15E148 Safari/604.1")).toBe(false);
    expect(istBotUserAgent("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Safari/537.36")).toBe(false);
  });
});
