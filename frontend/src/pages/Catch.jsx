import { useEffect, useState } from "react";
import axios from "axios";
import "./Catch.css";
import { useCurrentUserContext } from "../contexts/CurrentUserContext";
import pokemonGrass from "../assets/pokemonGrass.png";

export default function Catch() {
  const { currentUser } = useCurrentUserContext();
  const [spawnPokemon, setSpawnPokemon] = useState([]);
  const [randomPokemon, setRandomPokemon] = useState(null);
  const [pokeball, setPokeball] = useState([]);
  const [isCaptured, setIsCaptured] = useState("");
  const [rateCatchPokemon, setRateCatchPokemon] = useState(0.5);

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
    setIsCaptured("");
    const randomNum = Math.random();
    let selectedPokemon = null;
    let tierChanceSum = 0;
    const shuffledSpawnPokemon = shuffleArray(spawnPokemon);
    for (let i = 0; i < shuffledSpawnPokemon.length; i += 1) {
      const pokemon = shuffledSpawnPokemon[i];
      let tierChance = 0;
      switch (pokemon.id) {
        case 2:
          tierChance = 0.35;
          break;
        case 3:
          tierChance = 0.05;
          break;
        case 4:
          tierChance = 0.01;
          break;
        case 5:
          tierChance = 0.001;
          break;
        default:
          tierChance = 0.589;
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

  const rateMath = () => {
    if (randomPokemon) {
      switch (randomPokemon.nameTier) {
        case "Rare":
          setRateCatchPokemon(0.4);
          break;
        case "Super Rare":
          setRateCatchPokemon(0.3);
          break;
        case "Legendary":
          setRateCatchPokemon(0.05);
          break;
        case "Shiny":
          setRateCatchPokemon(1);
          break;
        default:
          setRateCatchPokemon(0.5);
      }
    }
  };

  useEffect(() => {
    rateMath();
  }, [randomPokemon]);

  const handleCatchClick = async (ballId) => {
    const selectedBall = pokeball.find((ball) => ball.bagballId === ballId);
    if (selectedBall.quantity > 0) {
      const selectedBallRate = rateCatchPokemon * selectedBall.pokeballRate;

      const rateCatch = Math.random() < selectedBallRate; // chance de capture
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
    // eslint-disable-next-line no-restricted-syntax
    console.log(`${rateCatchPokemon}x${selectedBall.pokeballRate}`);
  };

  // eslint-disable-next-line no-restricted-syntax
  console.log(pokeball);
  // eslint-disable-next-line no-restricted-syntax
  console.log(randomPokemon);
  // eslint-disable-next-line no-restricted-syntax

  return (
    <div className="div_all_container_catch">
      <div className="div_spawn_sprite_pokemon">
        {!randomPokemon ? (
          <button type="button" onClick={getRandomPokemon}>
            <img src={pokemonGrass} alt={pokemonGrass} />
          </button>
        ) : null}
        {randomPokemon && (
          <div className="div_sprite_pokemon_container">
            <div className="div_container_name_pokemon">
              <div className="div_container_name_pokemon2">
                <div className="div_container_name_pokemon3">
                  <div className="div_container_name_pokemon4">
                    <p>{randomPokemon.name}</p>
                    <p>lvl 1</p>
                  </div>
                  <div className="div_xp_bar_container">
                    <div className="xp_bar">
                      <p>HP</p>
                      <div className="xp_bar_horizontal" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <img
              src={randomPokemon.url}
              alt={`${randomPokemon.name}-${randomPokemon.id}`}
            />
          </div>
        )}
      </div>
      <div className="div_ball_container">
        <div className="div_dialogue_container">
          <div className="div_dialogue_container2">
            <div className="caught_or_not">
              {!randomPokemon ? <p>{isCaptured}</p> : null}
            </div>
            <div className="container_table_ball">
              {randomPokemon &&
                pokeball.map((ball, index) => (
                  <div
                    className={`div_pokeball_bag ${
                      index === pokeball.length - 1 ? "last_item" : ""
                    }`}
                    key={ball.bagballId}
                    style={
                      ball.quantity ? { display: "flex" } : { display: "none" }
                    }
                  >
                    <button
                      type="button"
                      onClick={() => handleCatchClick(ball.bagballId)}
                    >
                      <img src={ball.pokeballUrl} alt={ball.nameBall} />
                      <div className="pokeball_name_card_in">
                        <p>{ball.pokeballName}</p>
                      </div>
                      <div className="pokeball_rate_card_in">
                        <p>x{ball.pokeballRate}</p>
                      </div>
                      <div className="pokeball_quantity_card_in">
                        <p>Qty : {ball.quantity}</p>
                      </div>
                    </button>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
