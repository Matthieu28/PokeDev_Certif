import { useEffect, useState } from "react";
import axios from "axios";

import "./Shop.css";
import goldCoin from "../assets/goldCoin.png";

export default function Shop() {
  const [pokeballShop, setPokeballShop] = useState([]);
  const [quantityBalls, setQuantityBalls] = useState({});

  const getPokeballShop = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/pokeballs`
      );
      setPokeballShop(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getPokeballShop();
  }, []);

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
      setQuantityBalls((prevQuantityBalls) => ({
        ...prevQuantityBalls,
        [ballId]: 0,
      }));
    } catch (err) {
      console.error(err);
    }
  };

  const handleQuantityChange = (ballId, newQuantity) => {
    setQuantityBalls((prevQuantityBalls) => ({
      ...prevQuantityBalls,
      [ballId]: newQuantity,
    }));
  };

  return (
    <div className="container_all_shop">
      <div className="div_title_shop">
        <h1>Shop</h1>
      </div>
      <div className="div_container_item">
        <div className="list_chose_item">
          <button type="button">PokeBalls</button>
          <button type="button">Pokemons</button>
          <button type="button">Items</button>
        </div>
        <div className="list_container_item">
          <div className="all_gold_user">
            <div className="gold_quantity">
              <img src={goldCoin} alt={goldCoin} />
              <p>2400</p>
            </div>
          </div>
          <div className="all_list_buy_item">
            {pokeballShop.map((ballShop) => (
              <div key={ballShop.id} className="card_shop_ball">
                <div className="card_shop_ball_picture">
                  <img src={ballShop.url} alt={ballShop.nameBall} />
                </div>
                <div className="card_shop_ball_title">
                  <p>{ballShop.nameBall}</p>
                </div>
                <div className="card_shop_ball_button">
                  <input
                    type="number"
                    min="0"
                    max="999"
                    step="1"
                    value={quantityBalls[ballShop.id] || 0}
                    onChange={(e) =>
                      handleQuantityChange(
                        ballShop.id,
                        parseInt(e.target.value, 10)
                      )
                    }
                  />
                  <button
                    type="button"
                    onClick={() =>
                      getBagBallShop(
                        ballShop.id,
                        quantityBalls[ballShop.id] || 0
                      )
                    }
                  >
                    <p className="price">
                      {!quantityBalls[ballShop.id]
                        ? ballShop.price
                        : quantityBalls[ballShop.id] * ballShop.price}
                    </p>
                    <img src={goldCoin} alt={goldCoin} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
