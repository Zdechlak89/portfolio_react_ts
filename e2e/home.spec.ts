import { test, expect } from "@playwright/test";

test.describe("Home page", () => {
  test("renders hero, scrolls to Story via nav, and shows skill tiers", async ({
    page,
  }) => {
    await page.goto("/");

    await expect(
      page.getByRole("heading", { level: 1, name: "Emil Augustynowicz" }),
    ).toBeVisible();

    await page.getByRole("link", { name: "Story", exact: true }).click();
    await expect(page.locator("#story h2")).toBeInViewport();

    await page.locator("#skills").scrollIntoViewIfNeeded();

    const everyDayTier = page.locator(".skill-tier", {
      hasText: "Every day",
    });
    await expect(everyDayTier).toBeVisible();
    await expect(
      everyDayTier.locator(".skill-tier__item", { hasText: "JavaScript" }),
    ).toBeVisible();
  });

  test("scrolls the story rail with the next/previous buttons", async ({
    page,
  }) => {
    await page.goto("/");

    await page.locator("#story").scrollIntoViewIfNeeded();

    const rail = page.locator(".story__rail");
    const initialScrollLeft = await rail.evaluate((el) => el.scrollLeft);

    await page.getByRole("button", { name: "Next role" }).click();
    await expect
      .poll(() => rail.evaluate((el) => el.scrollLeft))
      .toBeGreaterThan(initialScrollLeft);
  });
});

test.describe("Mobile header layout (<=600px)", () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test("collapses nav to horizontal layout and hides the rail", async ({
    page,
  }) => {
    await page.goto("/");

    await expect(page.locator(".mobile-menu__nav")).toHaveCSS(
      "writing-mode",
      "horizontal-tb",
    );
    await expect(page.locator("header > div").first()).toBeHidden();
  });
});
