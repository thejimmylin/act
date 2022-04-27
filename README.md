# act

My tiny React.

# Overview

All source codes live in [local_modules/act/index.js](https://github.com/j3ygh/act/tree/main/local_modules/act/index.js) now.

# Installation & Run

```bash
git clone https://github.com/j3ygh/act
cd act
npm ci
npm run dev
```

# Public APIs

For now, there are only `useState` and `mount`.
Use them like this:

```jsx
import { mount, useState } from "act";

const NestedArrayComp = () => {
  return ["This ", ["is ", [["a ", [[[" nested array component."]]]]]]];
};

const EmptyStringComp = () => {
  return "";
};

const EmptyFragmentComp = () => {
  return <></>;
};

const CountComp = () => {
  const [state, setState] = useState({ count: 0 });
  return (
    <button
      styles={{ display: "block", marginTop: "10px" }}
      onClick={() => {
        setState({ count: state.count + 1 });
      }}
    >
      This is count component. Count: {`${state.count}`}
    </button>
  );
};

const App = () => {
  return (
    <>
      <h1>
        Hello <span styles={{ color: "green" }}>world</span>
      </h1>
      <p>This is a p</p>
      <NestedArrayComp />
      <EmptyStringComp />
      <EmptyFragmentComp />
      <CountComp />
    </>
  );
};

mount(<App />, document.querySelector("#container"));
```
