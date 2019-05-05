import { renderHook, doTimes } from "./test-utils";

import { useRerender } from "../use-rerender";

test(`Does not run callback on initial mount`, () => {
  const effect = jest.fn();

  renderHook(() => useRerender(effect));
  expect(effect).not.toHaveBeenCalled();
});

test(`Runs callback on each rerender`, () => {
  const effect = jest.fn();
  const times = 5;

  const { rerender } = renderHook(() => useRerender(effect));
  doTimes(times, () => {
    rerender();
  });
  expect(effect).toHaveBeenCalledTimes(times);
});
