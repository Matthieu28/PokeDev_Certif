import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useCurrentUserContext } from "../contexts/CurrentUserContext";
import { useExpContext } from "../contexts/ExpContext";

import "./Home.css";

export default function Home() {
  const { currentUser } = useCurrentUserContext();
  const { userInfo, setUserInfo, xpBar } = useExpContext();
  const [classRoleColor, setClassRoleColor] = useState("");
  const navigate = useNavigate();
  const [bagPokemonUser, setBagPokemonUser] = useState([]);

  const getColorRole = () => {
    switch (userInfo.nameRole) {
      case "VIP":
        setClassRoleColor("gold");
        break;
      default:
        setClassRoleColor("");
    }
  };

  useEffect(() => {
    getColorRole();
  }, []);

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

  const logOut = () => {
    navigate("/");
    window.location.reload();
  };

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

  let favoritePokemon = null;

  if (bagPokemonUser.length > 0) {
    const findFavoritePokemon = bagPokemonUser.find(
      (poke) => poke.isFavorite === 1
    );
    if (findFavoritePokemon) {
      favoritePokemon = findFavoritePokemon;
    } else {
      const randomIndex = Math.floor(Math.random() * bagPokemonUser.length);
      favoritePokemon = bagPokemonUser[randomIndex];
    }
  }

  const date = new Date(userInfo.createdAccount);
  const options = { year: "numeric", month: "2-digit", day: "2-digit" };
  const formattedDate = date.toLocaleDateString("fr-CA", options);
  const today = new Date();
  const timeDifference = today - date;
  const daysSinceCreation = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

  const getNumberUnit = (number) => {
    if (number >= 1000000) {
      const divideNumber = number / 1000000;
      const newNumber = `${divideNumber.toFixed(1)}M`;
      return newNumber;
    }
    if (number >= 1000) {
      const divideNumber = number / 1000;
      const newNumber = `${divideNumber.toFixed(1)}K`;
      return newNumber;
    }
    return number;
  };

  return (
    <div className="div_container_home">
      <div className="first_div_container_home">
        <div className="div_player_home_name_role">
          <div className="div_player_welcome">
            <p>Welcome</p>
            <p className={classRoleColor}>&nbsp;{currentUser.username}&nbsp;</p>
            <p>!</p>
          </div>
          <p className={classRoleColor}>{userInfo.nameRole}</p>
        </div>
        <div className="div_container_picture_user">
          <div className="div_container_picture_user_inside">
            <div>
              <img src={userInfo.urlAvatar} alt={userInfo.nameAvatar} />
            </div>
            <div>
              {favoritePokemon && (
                <div>
                  <img src={favoritePokemon.url} alt={favoritePokemon.name} />
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
      </div>
      <div className="second_div_container_home">
        <div className="div_statistic_account">
          <div className="div_statistic_account_title">
            <h1>Statistics</h1>
          </div>
          <div className="div_statistic_container">
            <div className="div_statistic_container_date_played">
              <h1>Account :</h1>
              <div className="div_statistic_container_created_date">
                <p>Created : </p>
                <p>&nbsp;{formattedDate}</p>
              </div>
              <div className="div_statistic_container_time_played">
                <p>Time Played : </p>
                <p>&nbsp;{daysSinceCreation} days</p>
              </div>
            </div>
            <div className="div_bar_horizon" />
            <div className="div_statistic_container_gold_bought_master">
              <h1>Shop :</h1>
              <div className="div_statistic_container_total_gold">
                <p>Total Gold earned : </p>
                <p>&nbsp;{getNumberUnit(userInfo.totalGold)}</p>
              </div>
              <div className="div_statistic_container_total_bought">
                <p>Total Ball bought : </p>
                <p>&nbsp;{userInfo.totalBallBought}</p>
              </div>
              <div className="div_statistic_container_total_bought_master">
                <p>Total MasterBall bought : </p>
                <p>&nbsp;{userInfo.totalMasterBallBought}</p>
              </div>
            </div>
            <div className="div_bar_horizon" />
            <div className="div_statistic_container_gold_caught_commun_rare_superrare_legendary_mega_shiny_xp_sent">
              <h1>Catch :</h1>
              <div className="div_statistic_container_total_caught">
                <p>Total Pokemon caught : </p>
                <p>&nbsp;{userInfo.totalCaught}</p>
              </div>
              <div className="div_statistic_container_total_caught_commun">
                <p>Total Commun caught : </p>
                <p>&nbsp;{userInfo.totalCaughtC}</p>
              </div>
              <div className="div_statistic_container_total_caught_rare">
                <p>Total Rare caught : </p>
                <p>&nbsp;{userInfo.totalCaughtR}</p>
              </div>
              <div className="div_statistic_container_total_caught_superrare">
                <p>Total SuperRare caught : </p>
                <p>&nbsp;{userInfo.totalCaughtSR}</p>
              </div>
              <div className="div_statistic_container_total_caught_legendary">
                <p>Total Legendary caught : </p>
                <p>&nbsp;{userInfo.totalCaughtL}</p>
              </div>
              <div className="div_statistic_container_total_caught_mega">
                <p>Total Mega caught : </p>
                <p>&nbsp;{userInfo.totalCaughtM}</p>
              </div>
              <div className="div_statistic_container_total_caught_shiny">
                <p>Total Shiny caught : </p>
                <p>&nbsp;{userInfo.totalCaughtS}</p>
              </div>
              <div className="div_statistic_container_total_xp">
                <p>Total XP earned : </p>
                <p>&nbsp;{getNumberUnit(userInfo.totalAllXp)}</p>
              </div>
              <div className="div_statistic_container_ball_sent">
                <p>Total Ball sent : </p>
                <p>&nbsp;{userInfo.totalBallSent}</p>
              </div>
            </div>
          </div>
        </div>
        <button type="button" onClick={() => logOut()}>
          Log Out
        </button>
      </div>
    </div>
  );
}
