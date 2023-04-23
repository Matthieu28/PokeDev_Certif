const router = require("express").Router();

const pokemonControllers = require("../controllers/pokemonControllers");

router.get("/", pokemonControllers.browse);
router.get("/:id", pokemonControllers.read);
router.put("/:id", pokemonControllers.edit);
router.post("/", pokemonControllers.add);
router.delete("/:id", pokemonControllers.destroy);

module.exports = router;
