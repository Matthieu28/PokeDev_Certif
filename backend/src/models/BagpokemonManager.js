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

  findAll(userId = null) {
    if (userId) {
      return this.connection.query(
        `select bagpokemon.*, pokemon.name, pokemon.url, pokemon.pokedexid, tier.color, tier.nameTier from ${this.table} AS bagpokemon JOIN pokemon ON bagpokemon.pokemonId = pokemon.id JOIN tier ON pokemon.tierID = tier.id WHERE userId = ? ORDER BY pokedexid, CASE WHEN pokemon.pokedexid = pokemon.pokedexid THEN tierID END ASC, CASE WHEN pokemon.tierID = pokemon.tierID THEN name END ASC`,
        [userId]
      );
    }
    return this.connection.query(`SELECT * FROM ${this.table}`);
  }

  deleteDuplicatePokemon() {
    return this.connection.query(`
      DELETE bag1 FROM ${this.table} bag1 JOIN ${this.table} bag2 ON bag1.pokemonId = bag2.pokemonId AND bag1.id > bag2.id
    `);
  }

  deleteDuplicatePokemonByTierId(tierID) {
    return this.connection.query(
      `DELETE bag1 FROM ${this.table} AS bag1 JOIN ${this.table} AS bag2 ON bag1.pokemonId = bag2.pokemonId AND bag1.id > bag2.id WHERE bag1.pokemonId IN (
        SELECT id FROM pokemon WHERE tierID = ?
      )`,
      [tierID]
    );
  }
}

module.exports = BagpokemonManager;
