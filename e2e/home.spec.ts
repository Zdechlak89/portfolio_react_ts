import { test, expect } from "@playwright/test";

test.describe("Home page", () => {
  test("renders hero, scrolls to Story via nav, shows skills with star ratings", async ({
    page,
  }) => {
    await page.goto("/");

    await expect(
      page.getByRole("heading", { level: 1, name: "Emil Augustynowicz" }),
    ).toBeVisible();

    await page.getByRole("link", { name: "Story", exact: true }).click();
    await expect(page.locator("#story h2")).toBeInViewport();

    await page.locator("#skills").scrollIntoViewIfNeeded();

    const jsTag = page.locator(".tech-stack__item", { hasText: "JavaScript" });
    await expect(jsTag).toBeVisible();
    await expect(jsTag.locator(".tech-stack__star--filled")).toHaveCount(5);
  });
});

test.describe("Mobile header layout (<=600px)", () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test("collapses nav to horizontal layout and hides the social links column", async ({
    page,
  }) => {
    await page.goto("/");

    await expect(page.locator("header nav")).toHaveCSS(
      "writing-mode",
      "horizontal-tb",
    );
    await expect(page.locator("header > div").first()).toBeHidden();
  });
});
