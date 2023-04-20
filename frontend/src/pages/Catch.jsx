import { useEffect, useState } from "react";
import axios from "axios";
import "./Catch.css";
import { useCurrentUserContext } from "../contexts/CurrentUserContext";

export default function Catch() {
  const { currentUser } = useCurrentUserContext();
  const [spawnPokemon, setSpawnPokemon] = useState([]);
  const [randomPokemon, setRandomPokemon] = useState(null);
  const [pokeball, setPokeball] = useState([]);
  const [isCaptured, setIsCaptured] = useState("");

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
      if (pokemon.id === 1) {
        tierChance = 0.59; // 59% chance
      } else if (pokemon.id === 2) {
        tierChance = 0.33; // 33% chance
      } else if (pokemon.id === 3) {
        tierChance = 0.074; // 7.4% chance
      } else if (pokemon.id === 4) {
        tierChance = 0.005; // 0.5% chance
      } else if (pokemon.id === 5) {
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

  const getPokeball = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/bagballs/all/${currentUser.id}`
      );
      setPokeball(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getPokeball();
  }, [currentUser.id]);

  const updatePokeballQuantity = async (ballId) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/bagballs/${ballId}`
      );
      const currentQuantity = response.data.quantity;
      const newQuantity = currentQuantity - 1;
      await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/bagballs/${ballId}`,
        { quantity: newQuantity }
      );
      setPokeball((prevPokeball) =>
        prevPokeball.map((ball) =>
          ball.bagballId === ballId ? { ...ball, quantity: newQuantity } : ball
        )
      );
    } catch (err) {
      console.error(err);
    }
  };

  const getCaughtPokemon = async (userId, pokemonId) => {
    try {
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/bagpokemons`, {
        userId,
        pokemonId,
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleCatchClick = async (ballId) => {
    const selectedBall = pokeball.find((ball) => ball.bagballId === ballId);
    if (selectedBall.quantity > 0) {
      const rateCatch = Math.random() < 0.5; // 1/2, 50%
      await updatePokeballQuantity(ballId);
      if (rateCatch) {
        setIsCaptured("Caught");
        if (randomPokemon) {
          await getCaughtPokemon(currentUser.id, randomPokemon.pokemonId);
        }
        setRandomPokemon(null);
      } else {
        setIsCaptured("He escaped");
        setRandomPokemon(null);
      }
    } else {
      // eslint-disable-next-line no-alert
      alert("No more ball !");
    }
  };

  // eslint-disable-next-line no-restricted-syntax
  console.log(pokeball);
  // eslint-disable-next-line no-restricted-syntax
  console.log(randomPokemon);
  // eslint-disable-next-line no-restricted-syntax

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
      <p>{isCaptured}</p>
      {randomPokemon &&
        pokeball.map((ball) => (
          <div
            className="div_pokeball_bag"
            key={ball.bagballId}
            style={ball.quantity ? { display: "block" } : { display: "none" }}
          >
            <img src={ball.pokeballUrl} alt={ball.nameBall} />
            <p>{ball.pokeballName}</p>
            <p>{ball.quantity}</p>
            <button
              type="button"
              onClick={() => handleCatchClick(ball.bagballId)}
            >
              Catch
            </button>
          </div>
        ))}
    </div>
  );
}
