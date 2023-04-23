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
    SELECT user.*, role.* FROM ${this.table} AS user JOIN role ON user.roleId = role.id
    `);
  }

  findAllByID(userId) {
    return this.connection.query(
      `SELECT user.id, user.email, user.username, user.gold, user.totalXp, user.xpLimit, user.levelAccount, role.name as nameRole, avatar.name as nameAvatar, avatar.url as urlAvatar FROM ${this.table} AS user JOIN role ON user.roleId = role.id JOIN avatar ON user.avatarId = avatar.id WHERE user.id = ?`,
      [userId]
    );
  }
}

module.exports = UserManager;
