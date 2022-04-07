export const Foo = () => {
  console.log("Foo is rendering");
  const handleClick = () => {
    console.log("Bar button is being clicked");
  };
  return (
    <>
      <h1 style={{ fontSize: "36px" }}>Foo</h1>
      <button onClick={handleClick}>Click me</button>
    </>
  );
};
