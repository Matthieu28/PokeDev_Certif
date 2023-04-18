const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../../public/assets/images"));
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage }).single("file");

const uploadMakeLogo = (req, res, next) => {
  upload(req, res, (err) => {
    if (err) {
      res.status(500).send(err);
    } else {
      req.body = {
        name: JSON.parse(req.body.data).makeName,
        logo: `http://localhost:8000/public/assets/images/${req.file.filename}`,
      };
      next();
    }
  });
};

module.exports = {
  uploadMakeLogo,
};
