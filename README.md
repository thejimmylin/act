# act

My tiny React. This is just for fun now.

# Installation & Run

```bash
git clone https://github.com/j3ygh/act
cd act
npm ci
npm run dev
```

# API & Usage

For now, there are only `useState` and `mount`.
Use them like this:

```jsx
import { useState, mount } from "act";

const Foo = () => {
  console.log("Foo is rendering");
  return [<p>Foo</p>];
};

const Bar = () => {
  console.log("Bar is rendering");
  return <Baz />;
};

const Baz = () => {
  console.log("Baz is rendering");
  return (
    <>
      <p>Baz</p>
    </>
  );
};

const App = () => {
  const [state, setState] = useState({ count: 0 });
  return (
    <>
      <div>
        {[
          <>
            <h1>12345</h1>
            <>
              <p>hello wrold</p>
            </>
          </>,
        ]}
        <div>{[<p>foo</p>, <p>bar</p>, [<p>baz</p>, [[[<h1>fuzz</h1>]]]]]}</div>
        <p>Hello world</p>
        <p>
          This is <a href="https://jsx.org">JSX</a>
        </p>
        <button
          onClick={() => {
            setState({ count: state.count + 1 });
          }}
        >
          Click me
        </button>
        <h1>{`The count is ${state.count}`}</h1>
        <Foo />
        <Bar />
      </div>
    </>
  );
};

mount(<App />, document.querySelector("#container"));
```
