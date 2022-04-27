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
