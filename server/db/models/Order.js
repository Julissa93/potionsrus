const sequelize = require("sequelize");
const db = require("../db");

const Order = db.define("order", {
  date: {
    type: sequelize.DATE,
    defaultValue: sequelize.NOW,
    allowNull: false,
  },
  status: {
    type: sequelize.ENUM("CREATED", "PROCESSING", "CANCELLED", "COMPLETED"),
    defaultValue: "CREATED",
    allowNull: false,
  },
});

module.exports = Order;
