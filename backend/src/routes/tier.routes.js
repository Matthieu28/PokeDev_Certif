const router = require("express").Router();

const tierControllers = require("../controllers/tierControllers");

router.get("/", tierControllers.browse);
router.get("/:id", tierControllers.read);
router.put("/:id", tierControllers.edit);
router.post("/", tierControllers.add);
router.delete("/:id", tierControllers.destroy);

module.exports = router;
