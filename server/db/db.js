const sequelize = require("sequelize");

const db = new sequelize("postgres://julissa:root@localhost:5432/potionsrus", {logging: false});

module.exports = db;