const models = require("../models");

const browse = (req, res) => {
  const { userId } = req.params;
  models.bagball
    .findAll(userId)
    .then(([rows]) => {
      res.send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const findAllByBall = (req, res) => {
  const { userId, pokeballId } = req.params;
  models.bagball
    .findAllByBall(userId, pokeballId)
    .then(([rows]) => {
      if (rows[0] == null) {
        res.sendStatus(404);
      } else {
        res.send(rows[0]);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const read = (req, res) => {
  models.bagball
    .find(req.params.id)
    .then(([rows]) => {
      if (rows[0] == null) {
        res.sendStatus(404);
      } else {
        res.send(rows[0]);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const edit = (req, res) => {
  const bagball = req.body;

  // TODO validations (length, format...)

  bagball.id = parseInt(req.params.id, 10);

  models.bagball
    .update(bagball)
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.sendStatus(404);
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const editByUserIdAndPokeballId = (req, res) => {
  const { userId, pokeballId } = req.params;
  const bagball = req.body;

  models.bagball
    .updateByUserIdAndPokeballId(bagball, userId, pokeballId)
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.sendStatus(404);
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const add = (req, res) => {
  const bagball = req.body;

  // TODO validations (length, format...)

  models.bagball
    .insert(bagball)
    .then(([result]) => {
      res.location(`/bagballs/${result.insertId}`).sendStatus(201);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const destroy = (req, res) => {
  models.bagball
    .delete(req.params.id)
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.sendStatus(404);
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

module.exports = {
  browse,
  findAllByBall,
  read,
  edit,
  editByUserIdAndPokeballId,
  add,
  destroy,
};
