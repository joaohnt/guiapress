const Sequelize = require("sequelize");

const conn = new Sequelize("guiapress", "root", "12345", {
  host: "localhost",
  dialect: "mysql", 
});

module.exports = conn;