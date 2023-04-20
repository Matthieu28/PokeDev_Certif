const AbstractManager = require("./AbstractManager");

class UserManager extends AbstractManager {
  constructor() {
    super({ table: "user" });
  }

  insert(user) {
    return this.connection.query(`insert into ${this.table} SET ?`, [user]);
  }

  update(user) {
    return this.connection.query(`update ${this.table} set ? where id = ?`, [
      user,
      user.id,
    ]);
  }

  findByEmail(email) {
    return this.connection.query(`SELECT * FROM ${this.table} WHERE email=?`, [
      email,
    ]);
  }

  findAll() {
    return this.connection.query(`
    SELECT user.*, role.* 
    FROM ${this.table} AS user
    JOIN role ON user.roleId = role.id
    `);
  }
}

module.exports = UserManager;
