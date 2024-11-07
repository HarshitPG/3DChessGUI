import "./App.css";
import Scene from "./pages/Experience";

import { GlobalProvider } from "./store/GlobalProvider";

function App() {
  return (
    <GlobalProvider>
      <Scene />
    </GlobalProvider>
  );
}

export default App;
