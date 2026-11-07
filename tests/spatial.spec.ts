import { chromium, expect, test } from "@playwright/test";

test("live 3D survives motion preference changes and falls back after context loss", async ({
  browserName,
  baseURL,
}) => {
  test.skip(
    browserName !== "chromium",
    "The software WebGL renderer is verified with Chromium.",
  );
  const browser = await chromium.launch({
    args: ["--use-angle=swiftshader", "--enable-unsafe-swiftshader"],
  });
  try {
    const page = await browser.newPage({
      viewport: { width: 1440, height: 1000 },
    });
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    await page.goto(baseURL!);
    const scene = page.locator(".orbital-scene").first();
    await scene.scrollIntoViewIfNeeded();
    await expect(scene).toHaveAttribute("data-scene-state", "ready", {
      timeout: 15000,
    });
    await expect(scene.locator("canvas")).toHaveCount(1);
    const card = page.locator(".experience-tilt").first();
    await card.hover({ position: { x: 20, y: 30 } });
    await expect(card).toHaveAttribute("data-tilting", "true");
    await page.emulateMedia({ reducedMotion: "reduce" });
    await expect(scene).toHaveAttribute("data-scene-state", "static");
    await expect(scene.locator("canvas")).toHaveCount(0);
    await expect(card).not.toHaveAttribute("data-tilting");
    await page.emulateMedia({ reducedMotion: "no-preference" });
    await expect(scene).toHaveAttribute("data-scene-state", "ready");
    expect(
      await scene.locator("canvas").evaluate((canvas) => {
        const context = (canvas as HTMLCanvasElement).getContext("webgl2");
        const extension = context?.getExtension("WEBGL_lose_context");
        extension?.loseContext();
        return !!extension;
      }),
    ).toBe(true);
    await expect(scene).toHaveAttribute("data-scene-state", "fallback");
    await expect(scene.locator("canvas")).toHaveCount(0);
    await expect(scene.locator(".orbital-fallback")).toBeVisible();
    expect(errors).toEqual([]);
  } finally {
    await browser.close();
  }
});
