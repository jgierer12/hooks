import { renderHook } from "./test-utils";

import { useTimeout } from "../use-timeout";

test(`Runs callback after timeout`, done => {
  const effect = jest.fn();

  renderHook(() => useTimeout(effect, 50));
  expect(effect).not.toHaveBeenCalled();
  setTimeout(() => {
    expect(effect).toHaveBeenCalled();
    done();
  }, 51);
});

test(`Uses custom useEffect if specified`, () => {
  const effect = jest.fn();
  const deps = [];
  const useEffect = jest.fn();

  renderHook(() => useTimeout(effect, 50, deps, useEffect));
  expect(useEffect).toHaveBeenCalledWith(expect.any(Function), deps);
});
