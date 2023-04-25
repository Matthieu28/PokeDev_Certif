import { Routes, Route } from "react-router-dom";

import { useCurrentUserContext } from "./contexts/CurrentUserContext";
import NavBar from "./components/NavBar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Pokedex from "./pages/Pokedex";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
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
          {!currentUser.id && <Route path="/" element={<Login />} />}
          {!currentUser.id && <Route path="/register" element={<Register />} />}
          <Route path="/pokedex" element={<Pokedex />} />
          {currentUser.id && <Route path="/home" element={<Home />} />}
          {currentUser.id && <Route path="/catch" element={<Catch />} />}
          {currentUser.id && <Route path="/bag" element={<Bag />} />}
          {currentUser.id && <Route path="/shop" element={<Shop />} />}
          <Route path="*" element={<p>404 Not Found</p>} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
