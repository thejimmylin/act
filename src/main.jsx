import { render } from "act";

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
  console.log("App is rendering");
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
        <Foo />
        <Bar />
      </div>
    </>
  );
};

render(<App />, document.querySelector("#container"));
