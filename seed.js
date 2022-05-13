const db = require("./server/db/db");
const Product = require("./server/db/models/Product");
const User = require("./server/db/models/User");
const Order = require("./server/db/models/Order");
const OrderItem = require("./server/db/models/OrderItem");

const seed = async () => {
  await Product.create({ name: "Health Potion" });
  await Product.create({ name: "Mana Potion" });
  await Product.create({ name: "Stamina Potion" });
  await Product.create({ name: "Love Potion" });
  await Product.create({ name: "Stealth Potion" });
};

seed();