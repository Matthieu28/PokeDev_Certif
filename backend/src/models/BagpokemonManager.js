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
        `select bagpokemon.*, pokemon.name, pokemon.url, pokemon.pokedexid, tier.color from ${this.table} AS bagpokemon JOIN pokemon ON bagpokemon.pokemonId = pokemon.id JOIN tier ON pokemon.tierID = tier.id WHERE userId = ? ORDER BY pokedexid, CASE WHEN pokemon.pokedexid = pokemon.pokedexid THEN tierID END ASC`,
        [userId]
      );
    }
    return this.connection.query(`SELECT * FROM ${this.table}`);
  }
}

module.exports = BagpokemonManager;
