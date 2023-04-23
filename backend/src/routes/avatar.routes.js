const router = require("express").Router();

const avatarControllers = require("../controllers/avatarControllers");

router.get("/", avatarControllers.browse);
router.get("/:id", avatarControllers.read);
router.put("/:id", avatarControllers.edit);
router.post("/", avatarControllers.add);
router.delete("/:id", avatarControllers.destroy);

module.exports = router;
