const sequelize = require("sequelize");
const db = require("../db");

const OrderItem = db.define("order-item", {
  quantity: {
    type: sequelize.INTEGER,
    defaultValue: 0,
  },
  price: {
    type: sequelize.DECIMAL(10, 2),
  },
});

module.exports = OrderItem;
