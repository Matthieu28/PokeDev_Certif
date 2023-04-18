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
      `select pokemon.*, tier.* from ${this.table} as pokemon left join tier on pokemon.tierId = tier.id order by pokemon.pokedexid`
    );
  }
}

module.exports = PokemonManager;
