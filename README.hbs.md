> My personal library of reusable React hooks

# Installation

<details>

<summary>GitHub Package Registry</summary>

This package is published on both the
[GitHub Package Registry](https://github.com/features/package-registry) and the
npm registry. To use the GPR, change the registry for the `@jgierer12` scope
before installing:

```sh
echo "@jgierer12:registry=https://npm.pkg.github.com" >> .npmrc
```

</details>

```sh
npm install @jgierer12/hooks
```

```js
import { useMount } from "@jgierer12/hooks";
useMount(...)

// or

import * as hooks from "@jgierer12/hooks";
hooks.useMount(...)
```

# API

{{>main}}

# License

[MIT](LICENSE) &copy; 2019 Jonas Gierer
