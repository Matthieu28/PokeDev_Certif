import { Routes, Route } from "react-router-dom";

import { useCurrentUserContext } from "./contexts/CurrentUserContext";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import MakeList from "./pages/MakeList";
import CreateMake from "./pages/CreateMake";

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
          <Route path="/create-make" element={<CreateMake />} />
          {currentUser.id && <Route path="/makes" element={<MakeList />} />}
          <Route path="*" element={<p>404 Not Found</p>} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
