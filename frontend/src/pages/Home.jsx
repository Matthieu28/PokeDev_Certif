import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useCurrentUserContext } from "../contexts/CurrentUserContext";

import "./Home.css";

export default function Home() {
  const { currentUser } = useCurrentUserContext();
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState([]);
  const [xpBar, setXpBar] = useState(0);
  const [bagPokemonUser, setBagPokemonUser] = useState([]);

  const getUserInfo = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/all/${currentUser.id}`
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

  const getBagPokemonUser = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/bagpokemons/all/${
          currentUser.id
        }`
      );
      setBagPokemonUser(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getBagPokemonUser();
  }, []);

  let randomPokemon = null;

  if (bagPokemonUser.length > 0) {
    const randomIndex = Math.floor(Math.random() * (bagPokemonUser.length - 1));
    randomPokemon = bagPokemonUser[randomIndex];
  }

  return (
    <div className="div_container_home">
      <div className="div_player_home_name_role">
        <div className="div_player_welcome">
          <p>Welcome</p>
          <p>{currentUser.username}</p>
          <p>!</p>
        </div>
        <p>{userInfo.nameRole}</p>
      </div>
      <div className="div_container_picture_user">
        <div className="div_container_picture_user_inside">
          <div>
            <img src={userInfo.urlAvatar} alt={userInfo.nameAvatar} />
          </div>
          <div>
            {randomPokemon && (
              <div>
                <img src={randomPokemon.url} alt={randomPokemon.name} />
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="div_container_xpbar_lvl">
        <p>level : {userInfo.levelAccount}</p>
        <div className="progressBar">
          <p>{`${Math.round(xpBar * 100) / 100}%`}</p>
          <div className="progressBar__fill" style={{ width: `${xpBar}%` }} />
        </div>
      </div>
      <button type="button" onClick={() => logOut()}>
        Log Out
      </button>
    </div>
  );
}
