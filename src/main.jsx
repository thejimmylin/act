import { render } from "act";

const Foo = () => {
  console.log("Foo is rendering");
  return (
    [
      <p>Foo</p>
    ]
  );
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
  console.log("App is rendering");
  return (
    <>
      <div>
        <p>Hello world</p>
        <p>
          This is{" "}
          <a href="https://zh-hant.reactjs.org/docs/introducing-jsx.html">
            JSX
          </a>
        </p>
        <Foo />
        <Bar />
      </div>
      <div>12345</div>
    </>
  );
};

render(<App />, document.querySelector("#container"));
