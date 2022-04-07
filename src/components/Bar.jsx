export const Bar = () => {
  console.log("Bar is rendering");
  const handleClick = () => {
    console.log("Bar button is being clicked");
  };
  return (
    <>
      <h1 style={{ fontSize: "36px" }}>Bar</h1>
      <button onClick={handleClick}>Click me</button>
    </>
  );
};
