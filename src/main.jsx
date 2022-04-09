import { render } from "act";

const Foo = () => {
  return <p>Foo</p>;
};

const Bar = () => {
  return <p>Bar</p>;
};

const App = () => (
  <div>
    <div>
      <p>Hello world</p>
      <p>This is <a href="https://zh-hant.reactjs.org/docs/introducing-jsx.html">JSX</a></p>
      <Foo />
      <Bar />
    </div>
  </div>
);

render(<App />, document.querySelector("#container"));
