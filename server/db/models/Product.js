const sequelize = require("sequelize");
const db = require("../db");

const Product = db.define("product", {
    name: sequelize.STRING,
    price: {
        type: sequelize.DECIMAL(10, 2)
    },
    desciption: sequelize.STRING,
    imageUrl: {
        type: sequelize.STRING,
        defaultValue: "https://icons.iconarchive.com/icons/chanut/role-playing/1024/Potion-icon.png"
    }
});

module.exports = Product;