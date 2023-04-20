const AbstractManager = require("./AbstractManager");

class PokemonManager extends AbstractManager {
  constructor() {
    super({ table: "pokemon" });
  }

  insert(pokemon) {
    return this.connection.query(`insert into ${this.table} SET ?`, [pokemon]);
  }

  update(pokemon) {
    return this.connection.query(`update ${this.table} set ? where id = ?`, [
      pokemon,
      pokemon.id,
    ]);
  }

  findAll() {
    return this.connection.query(
      `SELECT pokemon.id AS pokemonId, pokemon.pokedexid, pokemon.url, pokemon.name, tier.*
      FROM pokemon
      INNER JOIN tier ON pokemon.tierId = tier.id
      ORDER BY pokemon.pokedexid`
    );
  }
}

module.exports = PokemonManager;
