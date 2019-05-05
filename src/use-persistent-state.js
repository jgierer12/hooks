import * as React from "react";

const safeStorage = (action, ...args) => {
  try {
    return window.localStorage[action](...args);
  } catch (error) {
    console.error(`Error while trying to access localStorage: ${error}`);
  }
};

const safeJSON = (action, ...args) => {
  try {
    return JSON[action](...args);
  } catch (error) {
    console.error(`Error while trying to ${action} JSON: ${error}`);
  }
};

/**
 * `useState` while persisting the state to `localStorage` across sessions
 * @param {String} key The key under which the value should be stored
 * @param {*} initialValue Fallback initial value. Will be overwritten by value from `localStorage` if available
 *
 * @example
 * const [name, setName] = usePersistentState(`name`, `Mike`);
 * setName(`Jonas`); // `name` will be initialized to `Jonas` instead of `Mike` in all future sessions
 */
export const usePersistentState = (key, initialValue) => {
  const [value, setValue] = React.useState(() => {
    const json = safeStorage(`getItem`, key);
    return safeJSON(`parse`, json) || initialValue;
  });

  React.useEffect(() => {
    safeStorage(`setItem`, key, safeJSON(`stringify`, value));
  }, [key, value]);

  return [value, setValue];
};
