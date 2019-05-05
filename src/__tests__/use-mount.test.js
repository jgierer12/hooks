import { renderHook, doTimes } from "./test-utils";

import { useMount } from "../use-mount";

test(`Runs callback on initial mount`, () => {
  const effect = jest.fn();

  renderHook(() => useMount(effect));
  expect(effect).toHaveBeenCalled();
});

test(`Does not run callback again on rerender`, () => {
  const effect = jest.fn();
  const times = 5;

  const { rerender } = renderHook(() => useMount(effect));
  doTimes(times, () => {
    rerender();
  });
  expect(effect).toHaveBeenCalledTimes(1);
});
