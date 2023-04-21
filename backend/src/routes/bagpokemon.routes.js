const router = require("express").Router();

const bagpokemonControllers = require("../controllers/bagpokemonControllers");

router.get("/", bagpokemonControllers.browse);
router.get("/all/:userId", bagpokemonControllers.browse);
router.get("/:id", bagpokemonControllers.read);
router.put("/:id", bagpokemonControllers.edit);
router.post("/", bagpokemonControllers.add);
router.delete("/:id", bagpokemonControllers.destroy);

module.exports = router;
