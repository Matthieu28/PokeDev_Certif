const AbstractManager = require("./AbstractManager");

class AvatarManager extends AbstractManager {
  constructor() {
    super({ table: "avatar" });
  }

  insert(avatar) {
    return this.connection.query(`insert into ${this.table} SET ?`, [avatar]);
  }

  update(avatar) {
    return this.connection.query(`update ${this.table} set ? where id = ?`, [
      avatar,
      avatar.id,
    ]);
  }
}

module.exports = AvatarManager;
