const router = require("express").Router();

const makeControllers = require("../controllers/makeControllers");
const uploadControllers = require("../controllers/uploadControllers");
const { verifyToken } = require("../helpers/jwtHelpers");

router.get("/", verifyToken, makeControllers.browse);
router.get("/:id", makeControllers.read);
router.put("/:id", makeControllers.edit);
router.post("/", uploadControllers.uploadMakeLogo, makeControllers.add);
router.delete("/:id", makeControllers.destroy);

module.exports = router;
