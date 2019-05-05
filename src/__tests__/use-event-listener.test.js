import { renderHook } from "./test-utils";

import { useEventListener } from "../use-event-listener";

test(`Adds event listener on mount`, () => {
  const type = `click`;
  const listener = jest.fn();
  const target = {
    addEventListener: jest.fn(),
  };

  renderHook(() => useEventListener(type, listener, target));
  expect(target.addEventListener).toHaveBeenCalledWith(type, listener);
});

test(`Removes event listener on unmount`, () => {
  const type = `click`;
  const listener = jest.fn();
  const target = {
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
  };

  const { unmount } = renderHook(() =>
    useEventListener(type, listener, target)
  );
  unmount();
  expect(target.removeEventListener).toHaveBeenCalledWith(type, listener);
});
