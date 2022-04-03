import { useState } from "act";
import Foo from "./Foo";
import Bar from "./Bar";

const App = () => {
  const [count, setCount] = useState(0);
  console.log("App is rendering");
  return (
    <>
      <h1 style={{ fontSize: "36px" }}>Parent</h1>
      <button onClick={() => setCount((v) => v + 1)}>
        App count: {String(count)}
      </button>
      <Foo />
      <Bar />
    </>
  );
};

export default App;
