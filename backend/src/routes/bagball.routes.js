const router = require("express").Router();

const bagballControllers = require("../controllers/bagballControllers");

router.get("/", bagballControllers.browse);
router.get("/all/:userId", bagballControllers.browse);
router.get("/all/:userId/:pokeballId", bagballControllers.findAllByBall);
router.get("/:id", bagballControllers.read);
router.put("/:id", bagballControllers.edit);
router.put(
  "/edit/:userId/:pokeballId",
  bagballControllers.editByUserIdAndPokeballId
);
router.post("/", bagballControllers.add);
router.delete("/:id", bagballControllers.destroy);

module.exports = router;
