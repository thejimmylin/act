import { Foo } from "./Foo";
import { Bar } from "./Bar";

export const App = () => {
  console.log("App is rendering");
  const handleClick = () => {
    console.log("App button is being clicked");
  };
  return (
    <>
      <h1 style={{ fontSize: "36px" }}>Parent</h1>
      <button onClick={handleClick}>Click me</button>
      <Foo />
      <Bar />
    </>
  );
};
