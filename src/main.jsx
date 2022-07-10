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