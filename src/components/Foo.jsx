import { useState } from "act";

const Foo = () => {
  const [count, setCount] = useState(0);
  console.log("Foo is rendering");
  return (
    <>
      <h1 style={{ fontSize: "36px" }}>Foo</h1>
      <button onClick={() => setCount((v) => v + 1)}>
        Foo count: {String(count)}
      </button>
    </>
  );
};

export default Foo;
