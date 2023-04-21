import { useState } from "react";
import "./PokeballItem.css";
import shoppingCartIcon from "../../assets/shoppingCartIcon.png";

export default function PokeballItem({ userBall, onBuy }) {
  const [quantityToBuy, setQuantityToBuy] = useState(0);

  return (
    <div key={userBall.bagballId} className="card_shopping">
      <div className="card_shopping_title">
        <p>{userBall.pokeballName}</p>
      </div>
      <div className="card_shopping_pokeball_icon">
        <img src={userBall.pokeballUrl} alt={userBall.pokeballUrl} />
      </div>
      <div className="quantity_shopping_balls">
        <p>Your have: {userBall.quantity}</p>
      </div>
      <div className="button_input_shopping">
        <input
          type="number"
          min="0"
          max="999"
          step="1"
          value={quantityToBuy}
          onChange={(e) => setQuantityToBuy(parseInt(e.target.value, 10))}
        />
        <button
          type="button"
          onClick={() => onBuy(userBall.bagballId, quantityToBuy)}
        >
          <img src={shoppingCartIcon} alt={shoppingCartIcon} />
        </button>
      </div>
    </div>
  );
}
