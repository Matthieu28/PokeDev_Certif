const models = require("../models");

const browse = (req, res) => {
  const { userId } = req.params;
  models.bagpokemon
    .findAll(userId)
    .then(([rows]) => {
      res.send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const read = (req, res) => {
  models.bagpokemon
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
  const bagpokemon = req.body;

  // TODO validations (length, format...)

  bagpokemon.id = parseInt(req.params.id, 10);

  models.bagpokemon
    .update(bagpokemon)
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
  const bagpokemon = req.body;

  // TODO validations (length, format...)

  models.bagpokemon
    .insert(bagpokemon)
    .then(([result]) => {
      res.location(`/bagpokemons/${result.insertId}`).sendStatus(201);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const destroy = (req, res) => {
  models.bagpokemon
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

const deleteDuplicatePokemon = (req, res) => {
  models.bagpokemon
    .deleteDuplicatePokemon()
    .then(() => {
      res.sendStatus(204);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const deleteDuplicatePokemonByTierID = (req, res) => {
  const { tierID } = req.params;
  models.bagpokemon
    .deleteDuplicatePokemonByTierId(tierID)
    .then(() => {
      res.sendStatus(204);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

module.exports = {
  browse,
  read,
  edit,
  add,
  destroy,
  deleteDuplicatePokemon,
  deleteDuplicatePokemonByTierID,
};
