import { expect, test } from "@playwright/test";

test("all pages fit phone, tablet, and desktop in both themes", async ({
  page,
}) => {
  test.setTimeout(90000);
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  for (const theme of ["light", "dark"]) {
    await page.addInitScript(
      (value) => localStorage.setItem("theme", value),
      theme,
    );
    for (const width of [375, 768, 1024, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      for (const path of ["/", "/services", "/about", "/contact"]) {
        await page.goto(path);
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
});

test("theme selection persists through navigation and refresh", async ({
  page,
}) => {
  await page.goto("/");
  await expect(page.locator("html")).toHaveClass(/light/);
  await page.getByRole("button", { name: "Switch color theme" }).click();
  await expect(page.locator("html")).toHaveClass(/dark/);
  await page
    .getByRole("navigation", { name: "Main navigation" })
    .getByRole("link", { name: "Services", exact: true })
    .click();
  await page.reload();
  await expect(page.locator("html")).toHaveClass(/dark/);
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
  await page.addInitScript(() => localStorage.setItem("theme", "dark"));
  await page.emulateMedia({ reducedMotion: "reduce" });
  const mediaRequests: string[] = [];
  page.on("request", (request) => {
    if (request.url().endsWith(".mp4")) mediaRequests.push(request.url());
  });
  await page.goto("/");
  await expect(page.locator(".emblem-still")).toHaveCSS("opacity", "1");
  await expect(page.locator(".animation-toggle")).toBeHidden();
  await expect(page.locator("video")).not.toHaveAttribute("src");
  expect(mediaRequests).toEqual([]);
});

test("the phone hero stays static until animation is explicitly requested", async ({
  page,
}) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.addInitScript(() => localStorage.setItem("theme", "dark"));
  await page.goto("/");
  await expect(page.locator("html")).toHaveClass(/dark/);
  await expect(page.locator("video")).not.toHaveAttribute("src");
  await expect(page.locator(".emblem-still")).toHaveCSS("opacity", "1");
});

test("the light theme uses the original transparent emblem without a video download", async ({
  page,
}) => {
  await page.goto("/");
  await expect(page.locator("html")).toHaveClass(/light/);
  await expect(page.locator("video")).not.toHaveAttribute("src");
  await expect(page.locator(".animation-toggle")).toBeHidden();
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
