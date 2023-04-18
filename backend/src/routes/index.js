const router = require("express").Router();

const userRoutes = require("./user.routes");
const roleRoutes = require("./role.routes");
const avatarRoutes = require("./avatar.routes");
const tierRoutes = require("./tier.routes");
const pokemonRoutes = require("./pokemon.routes");
const bagpokemonRoutes = require("./bagpokemon.routes");

router.use("/users", userRoutes);
router.use("/roles", roleRoutes);
router.use("/avatars", avatarRoutes);
router.use("/tiers", tierRoutes);
router.use("/pokemons", pokemonRoutes);
router.use("/bagpokemons", bagpokemonRoutes);

module.exports = router;
