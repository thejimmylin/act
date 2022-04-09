import { render } from "act";

const Foo = () => {
  return (
    <>
      <p>Foo</p>
    </>
  );
};

const Bar = () => {
  return <Baz />;
};

const Baz = () => {
  return (
    <>
      <p>Baz</p>
    </>
  );
};

const App = () => {
  console.log("App");
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
