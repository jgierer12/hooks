import * as React from "react";

/**
 * Run a callback only on rerenders, but not on initial mount
 * @param {Function} effect Effect callback to run
 * @param {Array} deps Dependencies. Will be passed through to `useEffect`
 *
 * @example
 * useRerender(() => {
 *   props.onChange(value);
 * }, [value]);
 */
export const useRerender = (effect, deps) => {
  const justMounted = React.useRef(true);
  React.useEffect(() => {
    if (justMounted.current) {
      justMounted.current = false;
      return;
    }

    return effect();
  }, deps);
};
