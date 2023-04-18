const router = require("express").Router();

const bagballControllers = require("../controllers/bagballControllers");

router.get("/:userId", bagballControllers.browse);
router.get("/:id", bagballControllers.read);
router.put("/:id", bagballControllers.edit);
router.post("/", bagballControllers.add);
router.delete("/:id", bagballControllers.destroy);

module.exports = router;
