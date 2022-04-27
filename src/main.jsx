import { useState, mount } from "act";

const ArrayComp = () => {
  return ["This ", "is ", "an ", "array component. "];
};

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
  console.log(state())
  return (
    <button
      style={{ display: "block", marginTop: "10px" }}
      onClick={() => {
        setState({ count: state().count + 1 });
      }}
    >
      This is count component. Count: {`${state().count}`}
    </button>
  );
};

const App = () => {
  return (
    <>
      <h1>This is a h1</h1>
      <p>This is a p</p>
      <ArrayComp />
      <NestedArrayComp />
      <EmptyStringComp />
      <EmptyFragmentComp />
      <CountComp />
    </>
  );
};

mount([<h1>Hello</h1>,<h2>World</h2>, <App/>], document.querySelector("#container"));
