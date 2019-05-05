import { renderHook } from "./test-utils";

import { useEventListener } from "../use-event-listener";

const createTargetMock = () => {
  let callbacks = {};
  const fire = type => {
    callbacks[type] && callbacks[type].forEach(callback => callback());
  };

  const addEventListener = jest.fn((type, callback) => {
    if (!callbacks[type]) {
      callbacks[type] = [callback];
      return;
    }

    callbacks[type].includes(callback) || callbacks[type].push(callback);
  });

  const removeEventListener = jest.fn((type, callback) => {
    if (!(callbacks[type] && callbacks[type].includes(callback))) {
      return;
    }

    callbacks[type] = callbacks[type].filter(fn => fn !== callback);
  });

  return {
    addEventListener,
    removeEventListener,
    fire,
    getCallbacks: () => callbacks,
  };
};

test(`Adds event listener on mount`, () => {
  const type = `click`;
  const listener = jest.fn();
  const target = createTargetMock();

  renderHook(() => useEventListener(type, listener, target));
  target.fire(type);

  expect(target.addEventListener).toHaveBeenCalledWith(
    type,
    expect.any(Function)
  );
  expect(listener).toHaveBeenCalled();
});

test(`Removes event listener on unmount`, () => {
  const type = `click`;
  const listener = jest.fn();
  const target = createTargetMock();

  const { unmount } = renderHook(() =>
    useEventListener(type, listener, target)
  );
  unmount();
  target.fire(type);

  expect(target.removeEventListener).toHaveBeenCalledWith(
    type,
    expect.any(Function)
  );
  expect(listener).not.toHaveBeenCalled();
});

test(`Uses correct handler when it is changed`, () => {
  const type = `click`;
  const handler1 = jest.fn();
  const handler2 = jest.fn();
  const target = createTargetMock();

  const { rerender } = renderHook(
    handler => useEventListener(type, handler, target),
    { initialProps: handler1 }
  );
  target.fire(type);
  rerender(handler2);
  target.fire(type);

  expect(handler1).toHaveBeenCalledTimes(1);
  expect(handler2).toHaveBeenCalledTimes(1);
});

test(`Uses correct target when it is changed`, () => {
  const type = `click`;
  const handler = jest.fn();
  const target1 = createTargetMock();
  const target2 = createTargetMock();

  const { rerender } = renderHook(
    target => useEventListener(type, handler, target),
    { initialProps: target1 }
  );
  rerender(target2);

  expect(target1.addEventListener).toHaveBeenCalled();
  expect(target1.removeEventListener).toHaveBeenCalled();
  expect(target2.addEventListener).toHaveBeenCalled();
});

test(`Uses correct type when it is changed`, () => {
  const type1 = `click`;
  const type2 = `focus`;
  const handler = jest.fn();
  const target = createTargetMock();

  const { rerender } = renderHook(
    type => useEventListener(type, handler, target),
    { initialProps: type1 }
  );
  rerender(type2);

  expect(target.getCallbacks()[type1].length).toBe(0);
  expect(target.getCallbacks()[type2].length).toBe(1);
});
