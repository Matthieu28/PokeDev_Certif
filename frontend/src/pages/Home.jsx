import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCurrentUserContext } from "../contexts/CurrentUserContext";

import "./Home.css";

export default function Home() {
  const { currentUser } = useCurrentUserContext();
  const navigate = useNavigate();
  const [roleName, setRoleName] = useState("");

  const getRoleName = () => {
    switch (currentUser.roleID) {
      case 2:
        setRoleName("VIP");
        break;
      case 3:
        setRoleName("Admin");
        break;
      default:
        setRoleName("Basic");
    }
  };

  useEffect(() => {
    getRoleName();
  }, []);

  const logOut = () => {
    navigate("/");
    window.location.reload();
  };

  // eslint-disable-next-line no-restricted-syntax
  console.log(currentUser);
  return (
    <section>
      <h1>Home Page</h1>
      <p>Welcome {currentUser.username}</p>
      <p>Role : {roleName}</p>
      <button type="button" onClick={() => logOut()}>
        Log Out
      </button>
    </section>
  );
}
