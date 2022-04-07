import { createRoot } from "act";

const container = document.querySelector("#container");
const root = createRoot(container);
root.mount(
  <div>
    <div>
      <p>Hello world</p>
      <p>This is JSX</p>
      <p></p>
    </div>
  </div>
);
