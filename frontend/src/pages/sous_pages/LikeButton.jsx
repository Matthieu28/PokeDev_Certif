import axios from "axios";

import "./LikeButton.css";

export default function LikeButton({ bagPoke, isFavorite, id, setRefresh }) {
  const findLiked = bagPoke.find((poke) => poke.isFavorite);

  const handleLike = async () => {
    try {
      // Si le pokémon en cours de clic est déjà favori, le mettre à jour à false
      if (isFavorite) {
        await axios.put(
          `${import.meta.env.VITE_BACKEND_URL}/api/bagpokemons/${id}`,
          { isFavorite: false }
        );
      } else {
        // Si un pokémon est déjà favori, le mettre à jour à false
        if (findLiked) {
          await axios.put(
            `${import.meta.env.VITE_BACKEND_URL}/api/bagpokemons/${
              findLiked.id
            }`,
            { isFavorite: false }
          );
        }
        // Mettre à jour le nouveau pokémon à favori
        await axios.put(
          `${import.meta.env.VITE_BACKEND_URL}/api/bagpokemons/${id}`,
          { isFavorite: true }
        );
      }
      setRefresh();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <button
      type="button"
      className="container_love_button"
      onClick={handleLike}
    >
      {isFavorite ? <span className="i_like">❤️</span> : <span>🤍</span>}
    </button>
  );
}
