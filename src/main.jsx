import { render } from "act";

const jsx = (
  <>
    <h1>Hello World</h1>
    <p>This is a simple example of a React like component</p>
    <h2 foo="bar" children={["This is a text child"]} kids={["This is a text kid"]}>
    </h2>
  </>
);
render(jsx, document.querySelector("#root"));
