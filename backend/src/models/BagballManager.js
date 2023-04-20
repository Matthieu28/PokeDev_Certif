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

  findAll(userId = null) {
    if (userId) {
      return this.connection.query(
        `SELECT bb.id as bagballId, u.username as userName, p.nameBall as pokeballName, p.url as pokeballUrl, bb.quantity, bb.userId FROM ${this.table} as bb JOIN user as u ON u.id = bb.userId JOIN pokeball as p ON p.id = bb.pokeballId WHERE bb.userId = ?`,
        [userId]
      );
    }
    return this.connection.query(`SELECT * FROM ${this.table}`);
  }
}

module.exports = BagballManager;
