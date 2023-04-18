import { useEffect, useState } from "react";
import axios from "axios";
import "./Catch.css";

export default function Catch() {
  const [spawnPokemon, setSpawnPokemon] = useState([]);
  const [randomPokemon, setRandomPokemon] = useState(null);

  const getSpawnPokemon = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/pokemons`
      );
      setSpawnPokemon(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getSpawnPokemon();
  }, []);

  const shuffleArray = (array) => {
    const newArray = [...array];
    // eslint-disable-next-line no-plusplus
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  const getRandomPokemon = () => {
    const randomNum = Math.random();
    let selectedPokemon = null;
    let tierChanceSum = 0;
    const shuffledSpawnPokemon = shuffleArray(spawnPokemon);
    for (let i = 0; i < shuffledSpawnPokemon.length; i += 1) {
      const pokemon = shuffledSpawnPokemon[i];
      let tierChance = 0;
      if (pokemon.tierID === 1) {
        tierChance = 0.5; // 50% chance
      } else if (pokemon.tierID === 2) {
        tierChance = 0.25; // 25% chance
      } else if (pokemon.tierID === 3) {
        tierChance = 0.05; // 5% chance
      } else if (pokemon.tierID === 4) {
        tierChance = 0.005; // 0.5% chance
      } else if (pokemon.tierID === 5) {
        tierChance = 0.001; // 0.1% chance
      }
      tierChanceSum += tierChance;

      if (randomNum <= tierChanceSum) {
        selectedPokemon = pokemon;
        break;
      }
    }
    setRandomPokemon(selectedPokemon);
  };

  return (
    <div>
      <h1>hello</h1>
      <button type="button" onClick={getRandomPokemon}>
        Click
      </button>
      {randomPokemon && (
        <div>
          <p>{randomPokemon.name}</p>
          <img
            src={randomPokemon.url}
            alt={`${randomPokemon.name}-${randomPokemon.id}`}
          />
        </div>
      )}
    </div>
  );
}
