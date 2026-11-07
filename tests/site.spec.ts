import { expect, test } from "@playwright/test";

test("all pages fit phone, tablet, and desktop in both themes", async ({
  page,
}) => {
  test.setTimeout(90000);
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/contact");
  for (const theme of ["light", "dark"]) {
    await page.evaluate((value) => localStorage.setItem("theme", value), theme);
    for (const width of [375, 768, 1024, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      for (const path of ["/", "/services", "/process", "/about", "/contact"]) {
        await page.goto(path);
        // Let static-page prefetches finish before the next full document navigation.
        await page.waitForLoadState("networkidle");
        await expect(page.locator("html")).toHaveClass(new RegExp(theme));
        await expect(page.locator("main h1")).toBeVisible();
        await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
          "content",
          "noindex, nofollow",
        );
        expect(
          await page.evaluate(
            () => document.documentElement.scrollWidth <= innerWidth,
          ),
          `${theme} ${width}px ${path}`,
        ).toBe(true);
      }
    }
  }
  expect(errors).toEqual([]);
});

test("mobile navigation supports Escape, focus return, and route changes", async ({
  page,
}) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("/");
  const trigger = page.getByRole("button", { name: "Open navigation" });
  await trigger.click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).toBeHidden();
  await expect(trigger).toBeFocused();
  await trigger.click();
  await page
    .getByRole("navigation", { name: "Mobile navigation" })
    .getByRole("link", { name: "Services", exact: true })
    .click();
  await expect(page).toHaveURL(/\/services$/);
  await expect(page.getByRole("dialog")).toBeHidden();
  await page.goBack();
  await expect(page).toHaveURL(/\/$/);
  await trigger.click();
  await page
    .getByRole("navigation", { name: "Mobile navigation" })
    .getByRole("link", { name: "Our process", exact: true })
    .click();
  await expect(page).toHaveURL(/\/process$/);
  await expect(page.getByRole("dialog")).toBeHidden();
});

test("dark is the default and light selection persists through navigation and refresh", async ({
  page,
}) => {
  await page.goto("/");
  await expect(page.locator("html")).toHaveClass(/dark/);
  await page.getByRole("button", { name: "Switch color theme" }).click();
  await expect(page.locator("html")).toHaveClass(/light/);
  await page
    .getByRole("navigation", { name: "Main navigation" })
    .getByRole("button", { name: "Services", exact: true })
    .click();
  await page
    .locator(".header-services-content")
    .getByRole("link", { name: "Explore all services", exact: true })
    .click();
  await expect(page).toHaveURL(/\/services$/);
  await page.reload();
  await expect(page.locator("html")).toHaveClass(/light/);
});

test("the services dropdown opens by keyboard and Escape returns focus", async ({
  page,
}) => {
  await page.goto("/");
  const trigger = page
    .getByRole("navigation", { name: "Main navigation" })
    .getByRole("button", { name: "Services", exact: true });
  await trigger.focus();
  await page.keyboard.press("Enter");
  await expect(trigger).toHaveAttribute("aria-expanded", "true");
  const overview = page
    .locator(".header-services-content")
    .getByRole("link", { name: "Explore all services", exact: true });
  await expect(overview).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(trigger).toHaveAttribute("aria-expanded", "false");
  await expect(trigger).toBeFocused();
  await page.keyboard.press("Space");
  await expect(overview).toBeVisible();
  await overview.click();
  await expect(page).toHaveURL(/\/services$/);
  await expect(trigger).toHaveAttribute("aria-expanded", "false");
});

test("inquiry validates, preserves ordinary typing, and sends no data", async ({
  page,
}) => {
  await page.goto("/contact");
  const unexpected: string[] = [];
  page.on("request", (request) => {
    if (
      request.method() !== "GET" ||
      request.url().includes("unique-inquiry-marker")
    )
      unexpected.push(request.url());
  });
  await page.getByRole("button", { name: "Preview inquiry" }).click();
  await expect(page.getByLabel("Your name")).toBeFocused();
  await expect(
    page.getByText("Tell us your name.", { exact: true }),
  ).toBeVisible();
  await page.getByLabel("Your name").fill("   ");
  await page.getByLabel("Email address").fill("invalid");
  await page.getByRole("button", { name: "Preview inquiry" }).click();
  await expect(page.getByLabel("Your name")).toBeFocused();
  await expect(page.getByText("Enter a valid email address.")).toBeVisible();
  const message =
    "An idea, with spaces & punctuation.\nA second line: unique-inquiry-marker.";
  await page.getByLabel("Your name").fill("Alex Morgan");
  await page.getByLabel("Email address").fill("alex@example.com");
  await page.getByLabel("What can we help with?").selectOption("web-apps");
  await page.getByLabel("A little about your project").fill(message);
  await page.getByRole("button", { name: "Preview inquiry" }).click();
  await expect(page.getByRole("status")).toHaveText(
    "Demo complete. Nothing was sent.",
  );
  await expect(page.getByLabel("A little about your project")).toHaveValue(
    message,
  );
  expect(
    await page.evaluate(() =>
      JSON.stringify({
        local: { ...localStorage },
        session: { ...sessionStorage },
      }),
    ),
  ).not.toContain("unique-inquiry-marker");
  expect(page.url()).not.toContain("?");
  expect(unexpected).toEqual([]);
  await page.getByRole("button", { name: "Reset form" }).click();
  await expect(page.getByLabel("Your name")).toHaveValue("");
  await expect(page.getByLabel("A little about your project")).toHaveValue("");
  await expect(page.getByRole("status")).toBeEmpty();
});

test("without JavaScript the demo form cannot collect or submit values", async ({
  browser,
}) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto("http://127.0.0.1:3100/contact");
  await expect(page.getByLabel("Your name")).toBeDisabled();
  await expect(
    page.getByRole("button", { name: "Preview inquiry" }),
  ).toBeDisabled();
  await context.close();
});

test("reduced motion keeps the emblem static and avoids the video download", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  const mediaRequests: string[] = [];
  page.on("request", (request) => {
    if (request.url().endsWith(".mp4")) mediaRequests.push(request.url());
  });
  await page.goto("/contact");
  for (const theme of ["light", "dark"]) {
    await page.evaluate((value) => localStorage.setItem("theme", value), theme);
    await page.goto("/");
    await expect(page.locator("html")).toHaveClass(new RegExp(theme));
    await expect(page.locator(".emblem-still")).toHaveCSS("opacity", "1");
    await expect(page.locator(".animation-toggle")).toBeHidden();
    await expect(page.locator("video")).not.toHaveAttribute("src");
    const scene = page.locator(".orbital-scene").first();
    await scene.scrollIntoViewIfNeeded();
    await expect(scene).toHaveAttribute("data-scene-state", "static");
    await expect(scene.locator(".orbital-fallback")).toBeVisible();
    await expect(page.locator("canvas")).toHaveCount(0);
  }
  expect(mediaRequests).toEqual([]);
});

test("the phone hero stays static until animation is explicitly requested", async ({
  page,
}) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("/contact");
  for (const theme of ["light", "dark"]) {
    await page.evaluate((value) => localStorage.setItem("theme", value), theme);
    await page.goto("/");
    await expect(page.locator("html")).toHaveClass(new RegExp(theme));
    await expect(page.locator("video")).not.toHaveAttribute("src");
    await expect(page.locator(".emblem-still")).toHaveCSS("opacity", "1");
    await page.getByRole("button", { name: "Play emblem animation" }).click();
    await expect(page.locator("video")).toHaveAttribute(
      "src",
      theme === "light"
        ? "/brand/emblem-motion-light.mp4"
        : "/brand/emblem-motion.mp4",
    );
  }
});

test("the desktop hero loads the emblem animation in both themes", async ({
  page,
}) => {
  await page.goto("/contact");
  for (const theme of ["light", "dark"]) {
    await page.evaluate((value) => localStorage.setItem("theme", value), theme);
    await page.goto("/");
    await expect(page.locator("html")).toHaveClass(new RegExp(theme));
    await expect(page.locator("video")).toHaveAttribute(
      "src",
      theme === "light"
        ? "/brand/emblem-motion-light.mp4"
        : "/brand/emblem-motion.mp4",
    );
    await expect(page.locator(".animation-toggle")).toBeVisible();
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  }
});

test("failed emblem playback leaves the static artwork usable", async ({
  page,
}) => {
  await page.addInitScript(() => localStorage.setItem("theme", "dark"));
  await page.route("**/brand/emblem-motion.mp4", (route) => route.abort());
  await page.goto("/");
  await expect(page.locator("video")).toHaveAttribute(
    "src",
    "/brand/emblem-motion.mp4",
  );
  await expect(page.locator(".emblem-still")).toHaveCSS("opacity", "1");
  await expect(
    page.getByRole("link", { name: "Start a project" }).first(),
  ).toHaveAttribute("href", "/contact");
});

test("FAQ interaction and the branded missing page work", async ({ page }) => {
  await page.goto("/");
  const question = page.getByRole("button", {
    name: "What can we build together?",
  });
  await question.focus();
  await page.keyboard.press("Enter");
  await expect(question).toHaveAttribute("aria-expanded", "true");
  await expect(
    page.getByText(/A company website, a custom web application/),
  ).toBeVisible();
  const response = await page.goto("/not-a-page");
  expect(response?.status()).toBe(404);
  await expect(page.getByRole("link", { name: "Back to home" })).toBeVisible();
});

test("each service has a direct page and SaaS is available in the inquiry", async ({
  page,
}) => {
  for (const [slug, name] of [
    ["websites", "Websites"],
    ["web-apps", "Web applications"],
    ["mobile-apps", "Mobile applications"],
    ["saas", "SaaS development"],
  ]) {
    await page.goto(`/services/${slug}`);
    await expect(page.getByRole("heading", { level: 1 })).toContainText(name);
    await expect(
      page.getByRole("link", { name: "Start a project" }).first(),
    ).toHaveAttribute("href", "/contact");
  }
  const missingService = await page.goto("/services/not-a-service");
  expect(missingService?.status()).toBe(404);
  await expect(page.getByRole("link", { name: "Back to home" })).toBeVisible();
  await page.goto("/services");
  await expect(
    page.getByRole("heading", { name: "SaaS development", exact: true }),
  ).toBeVisible();
  await expect(
    page.locator('main a[href="/services/saas"]').first(),
  ).toBeVisible();
  await page.goto("/contact");
  await page.getByLabel("What can we help with?").selectOption("saas");
  await expect(page.getByLabel("What can we help with?")).toHaveValue("saas");
});

test("testimonial previews disclose fictional quotes and people", async ({
  page,
}) => {
  await page.goto("/");
  const testimonials = page.locator("#testimonials");
  await expect(
    testimonials.getByRole("heading", {
      name: "Good partnerships. Great possibilities.",
    }),
  ).toBeVisible();
  await expect(
    testimonials.getByText(
      "Illustrative quotes and fictional people for this design preview. These are not client endorsements.",
    ),
  ).toBeVisible();
  await expect(
    testimonials.getByText("Sample quote", { exact: true }),
  ).toHaveCount(3);
  await expect(testimonials.getByText(/Fictional /)).toHaveCount(3);
});

test("unsupported WebGL keeps the 3D artwork and page content usable", async ({
  page,
}) => {
  await page.addInitScript(() => {
    const getContext = HTMLCanvasElement.prototype.getContext;
    HTMLCanvasElement.prototype.getContext = function (
      this: HTMLCanvasElement,
      contextType: string,
      ...args: unknown[]
    ) {
      if (contextType === "webgl" || contextType === "webgl2") return null;
      return Reflect.apply(getContext, this, [contextType, ...args]);
    } as typeof getContext;
  });
  await page.goto("/");
  const scene = page.locator(".orbital-scene").first();
  await scene.scrollIntoViewIfNeeded();
  await expect(scene).toHaveAttribute("data-scene-state", "fallback");
  await expect(scene.locator(".orbital-fallback")).toBeVisible();
  await expect(scene.locator("canvas")).toHaveCount(0);
  await expect(page.locator("#services-heading")).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Start a project" }).first(),
  ).toHaveAttribute("href", "/contact");
});
