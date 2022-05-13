const User = require("./User");
const Product = require("./Product");
const Order = require("./Order");
const OrderItem = require("./OrderItem");

Product.belongsToMany(Order, { through: OrderItem });
Order.belongsToMany(Product, { through: OrderItem });

OrderItem.belongsTo(Order);
OrderItem.belongsTo(Product);

Order.belongsTo(User);
User.hasMany(Order);

module.exports = {
  User,
  Product,
  Order,
  OrderItem,
};
