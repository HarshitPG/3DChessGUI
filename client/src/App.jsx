import "./App.css";
import Modal3dChess from "./components/Model3d";
import Scene from "./pages/Experience";

import { GlobalProvider } from "./store/GlobalProvider";

function App() {
  return (
    <GlobalProvider>
      <Modal3dChess />
      <Scene />
    </GlobalProvider>
  );
}

export default App;
