import { useEffect, useState } from "react";
import axios from "axios";
import "./Catch.css";
import { useCurrentUserContext } from "../contexts/CurrentUserContext";

export default function Catch() {
  const { currentUser } = useCurrentUserContext();
  const [spawnPokemon, setSpawnPokemon] = useState([]);
  const [randomPokemon, setRandomPokemon] = useState(null);
  const [pokeball, setPokeball] = useState([]);

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

  const getPokeball = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/bagballs/${currentUser.id}`
      );
      setPokeball(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getPokeball();
  }, [currentUser.id]);

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
        tierChance = 0.59; // 59% chance
      } else if (pokemon.tierID === 2) {
        tierChance = 0.33; // 33% chance
      } else if (pokemon.tierID === 3) {
        tierChance = 0.074; // 7.4% chance
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

  const catchPokemon = async (ballId) => {
    if (pokeball.find((ball) => ball.bagballId === ballId).quantity === 0) {
      // eslint-disable-next-line no-alert
      alert("You have no pokeballs left.");
      return;
    }
    if (randomPokemon) {
      try {
        await axios.put(
          `${import.meta.env.VITE_BACKEND_URL}/api/bagballs/${ballId}`,
          { quantity: -1 }
        );
        setPokeball((prevPokeball) =>
          prevPokeball.map((ball) => {
            if (ball.bagballId === ballId) {
              return { ...ball, quantity: ball.quantity - 1 };
            }
            return ball;
          })
        );
      } catch (err) {
        console.error(err);
      }
    } else {
      // eslint-disable-next-line no-alert
      alert("You must click to spawn a pokemon");
    }
  };

  console.error(pokeball);

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
      {pokeball.map((ball) => (
        <div className="div_pokeball_bag" key={ball.bagballId}>
          <img src={ball.pokeballUrl} alt={ball.nameBall} />
          <p>{ball.pokeballName}</p>
          <p>{ball.quantity}</p>
          <button type="button" onClick={() => catchPokemon(ball.bagballId)}>
            Catch
          </button>
        </div>
      ))}
    </div>
  );
}
