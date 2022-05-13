const sequelize = require("sequelize");
const db = require("../db");

const User = db.define("user", {
    firstName: {
        type: sequelize.STRING,
        allowNull: false
    },
    lastName: {
        type: sequelize.STRING,
        allowNull: false
    },
    email: {
        type: sequelize.STRING,
        validate: {
            isEmail: true
        }
    },
    password: {
        type: sequelize.STRING,
        allowNull: false
    }
});

module.exports = User;