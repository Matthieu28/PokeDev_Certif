import { useEffect, useState } from "react";
import axios from "axios";
import "./Shop.css";
import { useCurrentUserContext } from "../contexts/CurrentUserContext";

import PokeballItem from "./sous_pages/PokeballItem";

export default function Shop() {
  const { currentUser } = useCurrentUserContext();
  const [bagBallUser, setBagBallUser] = useState([]);

  const getPokeballUser = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/bagballs/all/${currentUser.id}`
      );
      setBagBallUser(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getPokeballUser();
  }, [currentUser.id]);

  const getBagBallShop = async (ballId, quantity) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/bagballs/${ballId}`
      );
      const currentQuantity = response.data.quantity;
      const newQuantity = currentQuantity + quantity;
      await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/bagballs/${ballId}`,
        { quantity: newQuantity }
      );
      setBagBallUser((prevPokeball) =>
        prevPokeball.map((ball) =>
          ball.bagballId === ballId ? { ...ball, quantity: newQuantity } : ball
        )
      );
    } catch (err) {
      console.error(err);
    }
  };

  // eslint-disable-next-line no-restricted-syntax
  console.log(bagBallUser);

  return (
    <div>
      <h1>Shop Page</h1>
      {bagBallUser.map((userBall) => (
        <PokeballItem
          key={userBall.bagballId}
          userBall={userBall}
          onBuy={getBagBallShop}
        />
      ))}
    </div>
  );
}
