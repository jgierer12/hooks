export { renderHook } from "react-hooks-testing-library";

export const doTimes = (times, callback) => {
  for (let i = 0; i < times; i++) {
    callback(i);
  }
};

export const convertState = ([value, setValue]) => ({ value, setValue });
