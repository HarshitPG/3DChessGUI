import "./App.css";
import Scene from "./pages/Experience";

import { GlobalProvider } from "./store/GlobalProvider";

console.log =
  console.info =
  console.warn =
  console.debug =
  console.error =
    () => {};

function App() {
  return (
    <GlobalProvider>
      <Scene />
    </GlobalProvider>
  );
}

export default App;
