const AbstractManager = require("./AbstractManager");

class RoleManager extends AbstractManager {
  constructor() {
    super({ table: "role" });
  }

  insert(role) {
    return this.connection.query(`insert into ${this.table} SET ?`, [role]);
  }

  update(role) {
    return this.connection.query(`update ${this.table} set ? where id = ?`, [
      role,
      role.id,
    ]);
  }
}

module.exports = RoleManager;
