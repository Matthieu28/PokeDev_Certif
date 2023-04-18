const router = require("express").Router();

const roleControllers = require("../controllers/roleControllers");

router.get("/", roleControllers.browse);
router.get("/:id", roleControllers.read);
router.put("/:id", roleControllers.edit);
router.post("/", roleControllers.add);
router.delete("/:id", roleControllers.destroy);

module.exports = router;
