const AbstractManager = require("./AbstractManager");

class BagpokemonManager extends AbstractManager {
  constructor() {
    super({ table: "bagpokemon" });
  }

  insert(bagpokemon) {
    return this.connection.query(`insert into ${this.table} SET ?`, [
      bagpokemon,
    ]);
  }

  update(bagpokemon) {
    return this.connection.query(`update ${this.table} set ? where id = ?`, [
      bagpokemon,
      bagpokemon.id,
    ]);
  }

  findAll() {
    return this.connection.query(
      `select p.*, bp.id as bagId from  ${this.table} as bp JOIN pokemon as p ON p.id = bp.pokemonId WHERE bp.userId = 1`
    );
  }
}

module.exports = BagpokemonManager;
