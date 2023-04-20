import { Routes, Route } from "react-router-dom";

import { useCurrentUserContext } from "./contexts/CurrentUserContext";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Shop from "./pages/Shop";
import Pokedex from "./pages/Pokedex";
import Catch from "./pages/Catch";
import Bag from "./pages/Bag";

import "./App.css";

function App() {
  const { currentUser } = useCurrentUserContext();
  return (
    <div className="App">
      <NavBar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/pokedex" element={<Pokedex />} />
          {currentUser.id && <Route path="/shop" element={<Shop />} />}
          {currentUser.id && <Route path="/catch" element={<Catch />} />}
          {currentUser.id && <Route path="/bag" element={<Bag />} />}
          <Route path="*" element={<p>404 Not Found</p>} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
