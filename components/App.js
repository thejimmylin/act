import { useState } from "fre";

const App = () => {
  const [count, setCount] = useState(0);
  console.log("App is rendering");
  return (
    <>
      <h1 style={{ fontSize: "32px" }}>{`${count}`}</h1>
      <button onClick={() => setCount((v) => v + 1)}>App+</button>
      <Foo />
      <Bar />
    </>
  );
};

const Foo = () => {
  const [count, setCount] = useState(0);
  console.log("Foo is rendering");
  return (
    <>
      <h1 style={{ fontSize: "32px" }}>{`${count}`}</h1>
      <button onClick={() => setCount((v) => v + 1)}>Foo+</button>
    </>
  );
};

const Bar = () => {
  const [count, setCount] = useState(0);
  console.log("Bar is rendering");
  return (
    <>
      <h1 style={{ fontSize: "32px" }}>{`${count}`}</h1>
      <button onClick={() => setCount((v) => v + 1)}>Bar+</button>
    </>
  );
};

export default App;
