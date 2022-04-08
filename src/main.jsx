import { createRoot } from "act";

const App = () => (
  <div>
    <div>
      <p>Hello world</p>
      <p>This is JSX</p>
      <p></p>
    </div>
  </div>
);

const container = document.querySelector("#container");
createRoot(container).mount(<App />);
