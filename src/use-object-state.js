import * as React from "react";
import deepMerge from "merge-deep";

/**
 * On `setState`, deep-merge old and new state objects.
 * This resembles `React.Component`'s `this.setState`, but with deep merging
 * instead of shallow merging
 * @param {Object} initialState Initial state
 *
 * @example
 * const [state, setState] = useObjectState({
 *   name: {
 *     first: `Jonas`,
 *     middle: `Ben`,
 *     last: `Gierer`,
 *   },
 *   age: 4,
 * });
 *
 * setState({
 *   name: {
 *     middle: ``,
 *   },
 *   age: 20,
 * });
 *
 * console.log(state);
 * // {
 * //    name: {
 * //      first: `Jonas`,
 * //      middle: ``,
 * //      last: `Gierer`,
 * //    },
 * //    age: 20,
 * // }
 */
export const useObjectState = (initialState = {}) => {
  return React.useReducer(
    (oldState, newState) => deepMerge(oldState, newState),
    initialState
  );
};
