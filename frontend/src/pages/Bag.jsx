import { useEffect, useState } from "react";
import axios from "axios";
import "./Bag.css";

export default function Bag() {
  const [pokemonInventory, setPokemonInventory] = useState([]);

  const getPokemonInventory = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/bagpokemons`
      );
      setPokemonInventory(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getPokemonInventory();
  }, []);

  return (
    <div>
      <p>Your bag</p>
      {pokemonInventory.map((invPoke) => (
        <div key={`${invPoke}+${Math.random()}`}>
          <p>{invPoke.name}</p>
          <img src={invPoke.url} alt={invPoke.name} />
        </div>
      ))}
    </div>
  );
}
