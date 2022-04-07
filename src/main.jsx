import { createRoot } from "act";

const YourName = ({ children }) => {
  return <p>{children}</p>;
};

const App = () => {
  return (
    <div>
      <h1>Hello World</h1>
      <div>
        hello{" "}
        <YourName>
          <span style={{ color: "pink" }}>Jimmy Lin</span>
        </YourName>
      </div>
    </div>
  );
};

const container = document.querySelector("#container");
const root = createRoot(container);
root.mount(<App />);
