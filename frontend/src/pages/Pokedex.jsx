import { useEffect, useState } from "react";
import axios from "axios";
import "./Pokedex.css";

export default function Pokedex() {
  const [pokedexList, setPokedexList] = useState([]);
  const [searchPokemon, setSearchPokemon] = useState("");
  const [tierNames, setTierNames] = useState([]);
  const [selectedTier, setSelectedTier] = useState("");

  const getPokedexList = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/pokemons`
      );
      setPokedexList(data);
      const allTierNames = data.map((poke) => poke.nameTier);
      const uniqueTierNames = [...new Set(allTierNames)];
      setTierNames(uniqueTierNames);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getPokedexList();
  }, []);

  const handleSearchPokemon = (e) => {
    setSearchPokemon(e.target.value);
  };

  const handleSelectTier = (e) => {
    setSelectedTier(e.target.value);
  };

  const filterPokedexList = pokedexList.filter(
    (poke) =>
      poke.name.toLowerCase().includes(searchPokemon.toLowerCase()) &&
      (selectedTier === "" || poke.nameTier === selectedTier)
  );

  return (
    <div className="container_pokedex">
      <div className="div_title_pokedex">
        <h1>All pokemon avaible</h1>
      </div>
      <div className="div_filtre_pokedex">
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
      <div className="div_all_pokemon">
        {filterPokedexList.map((poke) => (
          <div
            key={`${poke.id}-${poke.name}-${poke.tierID}`}
            className="card_pokemon"
            style={{
              background: `linear-gradient(180deg, rgba(236,236,236,1) 0%, rgba(236,236,236,1) 85%, ${poke.color})`,
            }}
          >
            <div className="card_pokemon_title">
              <p>{poke.name}</p>
            </div>
            <div className="card_pokemon_picture">
              <img src={poke.url} alt={`${poke.name}-${poke.pokedexid}`} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
