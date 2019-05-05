import { renderHook, convertState } from "./test-utils";
import { act } from "react-hooks-testing-library";

import { usePersistentState } from "../use-persistent-state";

let consoleSpy;

beforeEach(() => {
  consoleSpy = jest.spyOn(console, `error`).mockImplementation(() => {});
});

afterEach(() => {
  consoleSpy.mockRestore();
  window.localStorage.clear();
});

test(`Acts like useState`, () => {
  const key = `key`;
  const value1 = `hello`;
  const value2 = `world`;

  const { result } = renderHook(() => usePersistentState(key, value1));
  expect(convertState(result.current).value).toBe(value1);
  act(() => convertState(result.current).setValue(value2));
  expect(convertState(result.current).value).toBe(value2);
});

test(`Gets initial value from localStorage`, () => {
  const key = `key`;
  const value1 = `hello`;
  const value2 = `world`;

  window.localStorage.setItem(key, JSON.stringify(value2));
  const { result } = renderHook(() => usePersistentState(key, value1));

  expect(convertState(result.current).value).toBe(value2);
});

test(`Saves new values to localStorage`, () => {
  const key = `key`;
  const value1 = `hello`;
  const value2 = `world`;

  const { result } = renderHook(() => usePersistentState(key, value1));
  expect(JSON.parse(window.localStorage.getItem(key))).toBe(value1);
  act(() => convertState(result.current).setValue(value2));
  expect(JSON.parse(window.localStorage.getItem(key))).toBe(value2);
});
