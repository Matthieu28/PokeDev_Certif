import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useCurrentUserContext } from "../contexts/CurrentUserContext";

import "./Home.css";

export default function Home() {
  const { currentUser } = useCurrentUserContext();
  const navigate = useNavigate();
  const [roleName, setRoleName] = useState("");
  const [userInfo, setUserInfo] = useState([]);
  const [xpBar, setXpBar] = useState(0);

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

  const getUserInfo = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/${currentUser.id}`
      );
      setUserInfo(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  const updateLevelAccount = async () => {
    if (userInfo.totalXp >= userInfo.xpLimit) {
      try {
        const response = await axios.put(
          `${import.meta.env.VITE_BACKEND_URL}/api/users/${currentUser.id}`,
          {
            totalXp: 0,
            levelAccount: userInfo.levelAccount + 1,
            xpLimit: userInfo.xpLimit * 1.5,
          }
        );
        setUserInfo(response.data);
        setXpBar(0);
      } catch (err) {
        console.error(err);
      }
    }
  };

  useEffect(() => {
    updateLevelAccount();
  }, [userInfo.totalXp, userInfo.xpLimit]);

  const logOut = () => {
    navigate("/");
    window.location.reload();
  };

  const getXpBar = () => {
    const xpDiff = (userInfo.totalXp * 100) / userInfo.xpLimit;
    setXpBar(xpDiff);
  };

  useEffect(() => {
    getXpBar();
  }, [userInfo.totalXp, userInfo.xpLimit]);

  return (
    <section>
      <h1>Home Page</h1>
      <p>Welcome {currentUser.username}</p>
      <p>Role : {roleName}</p>
      <p>Total xp : {userInfo.totalXp}</p>
      <p>cap : {userInfo.xpLimit}</p>
      <p>level : {userInfo.levelAccount}</p>
      <div className="progressBar">
        <div className="progressBar__fill" style={{ width: `${xpBar}%` }} />
      </div>
      <button type="button" onClick={() => logOut()}>
        Log Out
      </button>
    </section>
  );
}
