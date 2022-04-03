import { useState } from "act";

export const Bar = () => {
  const [count, setCount] = useState(0);
  console.log("Bar is rendering");
  return (
    <>
      <h1 style={{ fontSize: "36px" }}>Bar</h1>
      <button onClick={() => setCount((v) => v + 1)}>
        Bar count: {String(count)}
      </button>
    </>
  );
};
