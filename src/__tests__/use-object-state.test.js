import { renderHook, act } from "react-hooks-testing-library";
import { convertState } from "./test-utils";

import { useObjectState } from "../use-object-state";

const exampleState = {
  name: {
    first: `Jonas`,
    middle: `Ben`,
    last: `Gierer`,
  },
  age: 4,
};

test(`Sets initial state`, () => {
  const { result } = renderHook(() => useObjectState(exampleState));
  expect(convertState(result.current).value).toEqual(exampleState);
});

test(`Sets fallback initial state`, () => {
  const { result } = renderHook(() => useObjectState());
  expect(convertState(result.current).value).toEqual({});
});

test(`Shallow-merges states`, () => {
  const { result } = renderHook(() => useObjectState(exampleState));
  act(() => {
    convertState(result.current).setValue({ age: 20 });
  });
  expect(convertState(result.current).value).toEqual({
    name: {
      first: `Jonas`,
      middle: `Ben`,
      last: `Gierer`,
    },
    age: 20,
  });
});

test(`Deep-merges states`, () => {
  const { result } = renderHook(() => useObjectState(exampleState));
  act(() => {
    convertState(result.current).setValue({ name: { middle: `` }, age: 20 });
  });
  expect(convertState(result.current).value).toEqual({
    name: {
      first: `Jonas`,
      middle: ``,
      last: `Gierer`,
    },
    age: 20,
  });
});
