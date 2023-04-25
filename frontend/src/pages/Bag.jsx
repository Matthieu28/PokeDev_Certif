import { useEffect, useState } from "react";
import axios from "axios";
import "./Bag.css";
import { useCurrentUserContext } from "../contexts/CurrentUserContext";
import DeleteButton from "./sous_pages/DeleteButton";
import LikeButton from "./sous_pages/LikeButton";

export default function Bag() {
  const { currentUser } = useCurrentUserContext();
  const [pokemonInventory, setPokemonInventory] = useState([]);
  const [searchPokemon, setSearchPokemon] = useState("");
  const [tierNames, setTierNames] = useState([]);
  const [selectedTier, setSelectedTier] = useState("");
  const [scrollBottomtop, setScrollBottomTop] = useState(false);
  const [showFilter, setShowFiler] = useState(false);

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

  const handleFilterRelease = () => {
    setShowFiler(!showFilter);
  };

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

  const deleteAllDuplicatePokemon = async () => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/bagpokemons/delete_duplicate/${
          currentUser.id
        }`
      );
      getPokemonInventory();
    } catch (err) {
      console.error(err);
    }
  };

  const deleteAllDuplicatePokemonByTierID = async (selectedValue) => {
    try {
      const tierIDMapping = {
        Commun: 1,
        Rare: 2,
        "Super Rare": 3,
        Legendary: 4,
        Shiny: 5,
      };
      const tierID = tierIDMapping[selectedValue];
      await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/bagpokemons/delete_duplicate/${
          currentUser.id
        }/${tierID}`
      );
      getPokemonInventory();
    } catch (err) {
      console.error(err);
    }
  };

  const handleReleaseChange = (event) => {
    const selectedValue = event.target.value;

    if (selectedValue === "all_duplicates") {
      // eslint-disable-next-line no-alert
      const result = window.confirm("Are you sure to release all duplicates ?");
      if (result) {
        deleteAllDuplicatePokemon();
      }
    }
    if (selectedValue === "Commun") {
      // eslint-disable-next-line no-alert
      const result = window.confirm(
        "Are you sure to release commun duplicates ?"
      );
      if (result) {
        deleteAllDuplicatePokemonByTierID(selectedValue);
      }
    }
    if (selectedValue === "Rare") {
      // eslint-disable-next-line no-alert
      const result = window.confirm(
        "Are you sure to release rare duplicates ?"
      );
      if (result) {
        deleteAllDuplicatePokemonByTierID(selectedValue);
      }
    }
    if (selectedValue === "Super Rare") {
      // eslint-disable-next-line no-alert
      const result = window.confirm(
        "Are you sure to release super rare duplicates ?"
      );
      if (result) {
        deleteAllDuplicatePokemonByTierID(selectedValue);
      }
    }
    if (selectedValue === "Legendary") {
      // eslint-disable-next-line no-alert
      const result = window.confirm(
        "Are you sure to release legendary duplicates ?"
      );
      if (result) {
        deleteAllDuplicatePokemonByTierID(selectedValue);
      }
    }
    if (selectedValue === "shiny") {
      // eslint-disable-next-line no-alert
      const result = window.confirm(
        "Are you sure to release shiny duplicates ?"
      );
      if (result) {
        deleteAllDuplicatePokemonByTierID(selectedValue);
      }
    }
  };

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth",
    });
    setScrollBottomTop(!scrollBottomtop);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    setScrollBottomTop(!scrollBottomtop);
  };

  const scrollToTopOrBottom = () => {
    const isAtTop = window.scrollY === 0;
    if (isAtTop) {
      scrollToBottom();
    } else {
      scrollToTop();
    }
  };

  return (
    <div className="container_pokedex2">
      <div className="div_title_pokedex2">
        <h1>Your inventory</h1>
      </div>
      <div className="div_filtre_pokedex2_button">
        <button type="button" onClick={handleFilterRelease}>
          {!showFilter ? <span>+</span> : <span>-</span>}
        </button>
      </div>
      <div
        className={
          !showFilter ? "div_filtre_pokedex2_hidden" : "div_filtre_pokedex2"
        }
      >
        <div className="div_filter_pokemon">
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
        <div className="div_release_pokemon">
          <span>Release by </span>
          <select name="release" id="release" onChange={handleReleaseChange}>
            <option value="">----</option>
            <option value="all_duplicates">All duplicates</option>
            {tierNames.map((tierName) => (
              <option key={tierName} value={tierName}>
                {tierName} duplicates
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="div_all_pokemon2">
        {filterPokedexList.map((poke) => (
          <div
            key={poke.id}
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
              <LikeButton
                bagPoke={pokemonInventory}
                isFavorite={poke.isFavorite}
                id={poke.id}
                setRefresh={getPokemonInventory}
              />
            </div>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={scrollToTopOrBottom}
        className="button_to_scroll"
      >
        {scrollBottomtop ? <span>&#8593;</span> : <span>&#8595;</span>}
      </button>
    </div>
  );
}
