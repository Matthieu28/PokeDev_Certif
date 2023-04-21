import { useEffect, useState } from "react";
import axios from "axios";
import "./Bag.css";
import { useCurrentUserContext } from "../contexts/CurrentUserContext";
import DeleteButton from "./sous_pages/DeleteButton";

export default function Bag() {
  const { currentUser } = useCurrentUserContext();
  const [pokemonInventory, setPokemonInventory] = useState([]);
  const [searchPokemon, setSearchPokemon] = useState("");
  const [tierNames, setTierNames] = useState([]);
  const [selectedTier, setSelectedTier] = useState("");

  const getPokemonInventory = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/bagpokemons/all/${
          currentUser.id
        }`
      );
      const allTierNames = data.map((poke) => poke.nameTier);
      const uniqueTierNames = [...new Set(allTierNames)];
      setTierNames(uniqueTierNames);
      setPokemonInventory(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getPokemonInventory();
  }, []);

  const handleSearchPokemon = (e) => {
    setSearchPokemon(e.target.value);
  };

  const handleSelectTier = (e) => {
    setSelectedTier(e.target.value);
  };

  const filterPokedexList = pokemonInventory.filter(
    (poke) =>
      poke.name.toLowerCase().includes(searchPokemon.toLowerCase()) &&
      (selectedTier === "" || poke.nameTier === selectedTier)
  );

  return (
    <div className="container_pokedex2">
      <div className="div_title_pokedex2">
        <h1>Your inventory</h1>
      </div>
      <div className="div_filtre_pokedex2">
        <h1>By name</h1>
        <input
          type="text"
          placeholder="Search by name"
          value={searchPokemon}
          onChange={handleSearchPokemon}
        />
        <h1>By rarity</h1>
        <select
          name="tier"
          id="tier"
          value={selectedTier}
          onChange={handleSelectTier}
        >
          <option value="">All</option>
          {tierNames.map((tierName) => (
            <option key={tierName} value={tierName}>
              {tierName}
            </option>
          ))}
        </select>
      </div>
      <div className="div_all_pokemon2">
        {filterPokedexList.map((poke) => (
          <div
            key={`${poke.id}+${Math.random}`}
            className="card_pokemon2"
            style={{
              background: `linear-gradient(180deg, rgba(236,236,236,1) 0%, rgba(236,236,236,1) 85%, ${poke.color})`,
            }}
          >
            <div className="card_pokemon_title2">
              <p>{poke.name}</p>
            </div>
            <div className="card_pokemon_picture2">
              <img src={poke.url} alt={`${poke.name}-${poke.pokedexid}`} />
            </div>
            <div className="div_delete_button">
              <DeleteButton id={poke.id} setRefresh={getPokemonInventory} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
