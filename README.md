# act

My tiny React, for fun purposes.

# Overview

All source codes live in [local_modules/act/index.ts](https://github.com/j3ygh/act/tree/main/local_modules/act/index.ts) now.

# Installation & Run

```bash
git clone https://github.com/j3ygh/act
cd act
npm ci
npm run dev
```

# APIs

For now, there are only `useState` and `mount`.
Use them like this:

```jsx
import { mount, useState } from "act";

const App = () => {
  const [state, setState] = useState({ count: 0 });
  return (
    <button
      styles={{ fontFamily: "sans-serif", padding: "1rem" }}
      onClick={() => {
        setState({ count: state.count + 1 });
      }}
    >
      {`You've clicked me ${state.count} times!`}
    </button>
  );
};

mount(<App />, document.querySelector("#container"));
```

# JSX spread children

To add an array to the children, you need to use JSX spread children:

```jsx
const App = () => {
  return <div>{...["hello", "spread", "children"]}</div>;
};
```

In React, this would be an error, because it expects a normal array (`[]` instead of `...[]`). This is actually a bit weird. If you don't feel it, just think about this:

```jsx
const App = () => {
  return <div>foo{["bar", "baz"]}</div>;
};
```

How could `foo`, `bar` and `baz` be in a same flat array (`div.children`)? Their shape is more like a `["foo", ["bar", "baz"]]`!

Well, this is because React flattens everything internally to avoid nested arrays. In fact, you can write this in React, too:

```jsx
const App = () => {
  return <div>{["first", ["second"], [["third"]]]}</div>
}
```

The `div.children` will end up `["first", "second", "third"]`!

This is maybe for performance reasons. React want you to keep arrays their original shapes to make `key` prop work better. 

However, it creates a complex type system and some unintuitive codes internally, because the nested arrays are passed around and eventually flattened. I want to solve this.

So, I created an issue from [ESbuild](https://github.com/evanw/esbuild). The author was very nice, understanding the situation very quickly and changing the behavior of ESBuild immediately.

For more detail, you can take a look of my [issue](https://github.com/evanw/esbuild/issues/2245).
