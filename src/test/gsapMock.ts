import { vi } from "vitest";

function createTween() {
  return { kill: vi.fn(), play: vi.fn(), pause: vi.fn() };
}

function createTimeline() {
  const timeline = {
    to: vi.fn(() => timeline),
    from: vi.fn(() => timeline),
    fromTo: vi.fn(() => timeline),
    set: vi.fn(() => timeline),
    kill: vi.fn(),
    play: vi.fn(() => timeline),
    pause: vi.fn(() => timeline),
  };
  return timeline;
}

export const gsapMock = {
  registerPlugin: vi.fn(),
  timeline: vi.fn(() => createTimeline()),
  to: vi.fn(() => createTween()),
  from: vi.fn(() => createTween()),
  fromTo: vi.fn(() => createTween()),
  set: vi.fn(),
  killTweensOf: vi.fn(),
  matchMedia: vi.fn(() => ({
    add: vi.fn(
      (
        _query: string,
        callback: (context: { conditions: Record<string, boolean> }) => void,
      ) => {
        callback({ conditions: {} });
      },
    ),
    revert: vi.fn(),
  })),
};

export const scrollTriggerMock = {
  create: vi.fn(),
  getAll: vi.fn(() => []),
  refresh: vi.fn(),
  kill: vi.fn(),
};
