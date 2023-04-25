const AbstractManager = require("./AbstractManager");

class BagballManager extends AbstractManager {
  constructor() {
    super({ table: "bagball" });
  }

  insert(bagball) {
    return this.connection.query(`insert into ${this.table} SET ?`, [bagball]);
  }

  update(bagball) {
    return this.connection.query(`update ${this.table} set ? where id = ?`, [
      bagball,
      bagball.id,
    ]);
  }

  updateByUserIdAndPokeballId(bagball, userId, pokeballId) {
    return this.connection.query(
      `update ${this.table} set ? where userId = ? and pokeballId = ?`,
      [bagball, userId, pokeballId]
    );
  }

  findAll(userId = null) {
    if (userId) {
      return this.connection.query(
        `SELECT bagball.*, user.username, pokeball.nameBall, pokeball.url, pokeball.rate FROM ${this.table} AS bagball JOIN user ON bagball.userId = user.id JOIN pokeball ON bagball.pokeballId = pokeball.id WHERE bagball.userId = ?`,
        [userId]
      );
    }
    return this.connection.query(`SELECT * FROM ${this.table}`);
  }

  findAllByBall(userId, pokeballId) {
    return this.connection.query(
      `SELECT bagball.*, user.username, pokeball.nameBall, pokeball.url, pokeball.rate FROM ${this.table} AS bagball JOIN user ON bagball.userId = user.id JOIN pokeball ON bagball.pokeballId = pokeball.id WHERE bagball.userId = ? AND bagball.pokeballId = ?`,
      [userId, pokeballId]
    );
  }
}

module.exports = BagballManager;
