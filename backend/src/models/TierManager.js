const AbstractManager = require("./AbstractManager");

class TierManager extends AbstractManager {
  constructor() {
    super({ table: "tier" });
  }

  insert(tier) {
    return this.connection.query(`insert into ${this.table} SET ?`, [tier]);
  }

  update(tier) {
    return this.connection.query(`update ${this.table} set ? where id = ?`, [
      tier,
      tier.id,
    ]);
  }
}

module.exports = TierManager;
