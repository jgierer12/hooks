import { useMount } from "./use-mount";

/**
 * Listen for a specified event and run a callback when it occurs
 * @param {String} type Type of the event to listen for
 * @param {Function} listener Callback to run when the event occurs
 * @param {EventTarget} target DOM element to attach the listener to
 *
 * @example
 * useEventListener(`click`, event => {
 *   console.log(`Clicked on ${event.target}`);
 * });
 *
 * @example
 * useEventListener(`focus`, event => {
 *   console.log(`Input was focused`);
 * }, myInput);
 */
export const useEventListener = (type, listener, target = document) => {
  useMount(() => {
    if (!target) return;

    target.addEventListener(type, listener);
    return () => target.removeEventListener(type, listener);
  });
};
