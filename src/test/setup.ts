import "@testing-library/jest-dom/vitest";
import { afterEach, vi } from "vitest";
import { cleanup } from "@testing-library/react";
import { gsapMock, scrollTriggerMock } from "./gsapMock";

vi.mock("gsap", () => ({ gsap: gsapMock, default: gsapMock }));
vi.mock("gsap/ScrollTrigger", () => ({ ScrollTrigger: scrollTriggerMock }));
vi.mock("gsap/ScrollToPlugin", () => ({ ScrollToPlugin: {} }));

if (!window.matchMedia) {
  window.matchMedia = vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }));
}

afterEach(() => {
  cleanup();
});
