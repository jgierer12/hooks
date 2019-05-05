import * as React from "react";

/**
 * Run a callback function after waiting for a specified duration
 * @param {Function} callback Callback to run after the timeout
 * @param {Number} ms Time to wait in milliseconds
 * @param {Array} deps Dependencies. Will be passed through to `useEffect`
 * @param {Function} useEffect Function to use instead of `React.useEffect`
 *
 * @example
 * useTimeout(() => {
 *   console.log(`2 seconds have passed since the component was mounted`);
 * }, 2000, null, useMount);
 *
 * @example
 * useTimeout(() => {
 *   console.log(`100 milliseconds have passed since the component was last rendered`);
 * }, 100);
 *
 * @example
 * useTimeout(() => {
 *   console.log(`0.5 seconds have passed since myVar was last changed`);
 * }, 500, [myVar], useRerender);
 */
export const useTimeout = (callback, ms, deps, useEffect = React.useEffect) => {
  useEffect(() => {
    const timeout = setTimeout(callback, ms);
    return () => clearTimeout(timeout);
  }, deps);
};
