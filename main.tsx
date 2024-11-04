import React from "react";
import { createRoot } from "react-dom/client";

function Main() {
  return <p>Hello!</p>;
}

const root = createRoot(document.getElementById("root"));
console.log("root", root);
root.render(<Main />);
console.log("done");
