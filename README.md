> My personal library of reusable React hooks

# Installation

```sh
yarn add @jgierer12/hooks
```

```js
import { useMount } from "@jgierer12/hooks";
useMount(...)

// or

import * as hooks from "@jgierer12/hooks";
hooks.useMount(...)
```

# API

## Constants

<dl>
<dt><a href="#useEventListener">useEventListener</a></dt>
<dd><p>Listen for a specified event and run a callback when it occurs</p>
</dd>
<dt><a href="#useMount">useMount</a></dt>
<dd><p>Run a callback only on initial mount, but not on rerenders</p>
</dd>
<dt><a href="#useObjectState">useObjectState</a></dt>
<dd><p>On <code>setState</code>, deep-merge old and new state objects.
This resembles <code>React.Component</code>&#39;s <code>this.setState</code>, but with deep merging
instead of shallow merging</p>
</dd>
<dt><a href="#usePersistentState">usePersistentState</a></dt>
<dd><p><code>useState</code> while persisting the state to <code>localStorage</code> across sessions</p>
</dd>
<dt><a href="#useRerender">useRerender</a></dt>
<dd><p>Run a callback only on rerenders (if dependencies changed), but not on initial mount</p>
</dd>
<dt><a href="#useTimeout">useTimeout</a></dt>
<dd><p>Run a callback function after waiting for a specified duration</p>
</dd>
</dl>

<a name="useEventListener"></a>

## useEventListener

Listen for a specified event and run a callback when it occurs

**Kind**: global constant

| Param   | Type                     | Description                           |
| ------- | ------------------------ | ------------------------------------- |
| type    | <code>String</code>      | Type of the event to listen for       |
| handler | <code>function</code>    | Callback to run when the event occurs |
| target  | <code>EventTarget</code> | DOM element to attach the listener to |

**Example**

```js
useEventListener(`click`, event => {
  console.log(`Clicked on ${event.target}`);
});
```

**Example**

```js
useEventListener(
  `focus`,
  event => {
    console.log(`Input was focused`);
  },
  myInput
);
```

<a name="useMount"></a>

## useMount

Run a callback only on initial mount, but not on rerenders

**Kind**: global constant

| Param  | Type                  | Description            |
| ------ | --------------------- | ---------------------- |
| effect | <code>function</code> | Effect callback to run |

**Example**

```js
useMount(() => {
  fetchExtraResources();
});
```

<a name="useObjectState"></a>

## useObjectState

On `setState`, deep-merge old and new state objects. This resembles
`React.Component`'s `this.setState`, but with deep merging instead of shallow
merging

**Kind**: global constant

| Param        | Type                | Description   |
| ------------ | ------------------- | ------------- |
| initialState | <code>Object</code> | Initial state |

**Example**

```js
const [state, setState] = useObjectState({
  name: {
    first: `Jonas`,
    middle: `Ben`,
    last: `Gierer`,
  },
  age: 4,
});

setState({
  name: {
    middle: ``,
  },
  age: 20,
});

console.log(state);
// {
//    name: {
//      first: `Jonas`,
//      middle: ``,
//      last: `Gierer`,
//    },
//    age: 20,
// }
```

<a name="usePersistentState"></a>

## usePersistentState

`useState` while persisting the state to `localStorage` across sessions

**Kind**: global constant

| Param        | Type                | Description                                                                           |
| ------------ | ------------------- | ------------------------------------------------------------------------------------- |
| key          | <code>String</code> | The key under which the value should be stored                                        |
| initialValue | <code>\*</code>     | Fallback initial value. Will be overwritten by value from `localStorage` if available |

**Example**

```js
const [name, setName] = usePersistentState(`name`, `Mike`);
setName(`Jonas`); // `name` will be initialized to `Jonas` instead of `Mike` in all future sessions
```

<a name="useRerender"></a>

## useRerender

Run a callback only on rerenders (if dependencies changed), but not on initial
mount

**Kind**: global constant

| Param  | Type                  | Description                                         |
| ------ | --------------------- | --------------------------------------------------- |
| effect | <code>function</code> | Effect callback to run                              |
| deps   | <code>Array</code>    | Dependencies. Will be passed through to `useEffect` |

**Example**

```js
useRerender(() => {
  props.onChange(value);
}, [value]);
```

<a name="useTimeout"></a>

## useTimeout

Run a callback function after waiting for a specified duration

**Kind**: global constant

| Param     | Type                  | Description                                         |
| --------- | --------------------- | --------------------------------------------------- |
| callback  | <code>function</code> | Callback to run after the timeout                   |
| ms        | <code>Number</code>   | Time to wait in milliseconds                        |
| deps      | <code>Array</code>    | Dependencies. Will be passed through to `useEffect` |
| useEffect | <code>function</code> | Function to use instead of `React.useEffect`        |

**Example**

```js
useTimeout(
  () => {
    console.log(`2 seconds have passed since the component was mounted`);
  },
  2000,
  null,
  useMount
);
```

**Example**

```js
useTimeout(() => {
  console.log(
    `100 milliseconds have passed since the component was last rendered`
  );
}, 100);
```

**Example**

```js
useTimeout(
  () => {
    console.log(`0.5 seconds have passed since myVar was last changed`);
  },
  500,
  [myVar],
  useRerender
);
```

# License

[MIT](LICENSE) &copy; 2019 Jonas Gierer
