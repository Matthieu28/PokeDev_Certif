const AbstractManager = require("./AbstractManager");

class PokeballManager extends AbstractManager {
  constructor() {
    super({ table: "pokeball" });
  }

  insert(pokeball) {
    return this.connection.query(`insert into ${this.table} SET ?`, [pokeball]);
  }

  update(pokeball) {
    return this.connection.query(`update ${this.table} set ? where id = ?`, [
      pokeball,
      pokeball.id,
    ]);
  }
}

module.exports = PokeballManager;
