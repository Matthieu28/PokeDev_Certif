import { useState } from "react";

import "./PokeballItem.css";

export default function PokeballItem({ userBall, onBuy }) {
  const [quantityToBuy, setQuantityToBuy] = useState(0);

  return (
    <div key={userBall.bagballId}>
      <p>{userBall.pokeballName}</p>
      <img src={userBall.pokeballUrl} alt="" />
      <p>Your quantity: {userBall.quantity}</p>
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
        Buy
      </button>
    </div>
  );
}
