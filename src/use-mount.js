import * as React from "react";

/**
 * Run a callback only on initial mount, but not on rerenders
 * @param {Function} effect Effect callback to run
 *
 * @example
 * useMount(() => {
 *   fetchExtraResources();
 * });
 */
export const useMount = effect => {
  return React.useEffect(effect, []);
};
