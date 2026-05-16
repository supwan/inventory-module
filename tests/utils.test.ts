import { describe, expect, it, vi } from "vitest";
import { cn, delay } from "../lib/utils";

describe("cn", () => {
  it("merges class names", () => {
    expect(cn("a", false && "b", "c")).toBe("a c");
  });

  it("dedupes tailwind classes", () => {
    expect(cn("p-2", "p-4")).toBe("p-4");
  });
});

describe("delay", () => {
  it("resolves after the given time", async () => {
    vi.useFakeTimers();

    const promise = delay(250);
    vi.advanceTimersByTime(250);

    await expect(promise).resolves.toBeUndefined();
    vi.useRealTimers();
  });
});
