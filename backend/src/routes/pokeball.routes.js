const router = require("express").Router();

const pokeballControllers = require("../controllers/pokeballControllers");

router.get("/", pokeballControllers.browse);
router.get("/:id", pokeballControllers.read);
router.put("/:id", pokeballControllers.edit);
router.post("/", pokeballControllers.add);
router.delete("/:id", pokeballControllers.destroy);

module.exports = router;
