import { render } from "act";

const YourName = ({ name }) => {
  return <span>{name}</span>;
};

const App = () => {
  return (
    <div>
      <h1>Hello World</h1>
      <p>
        hello <YourName name={"Jimmy Lin"} />
      </p>
    </div>
  );
};

render(<App />, document.querySelector("#root"));
