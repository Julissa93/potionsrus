const express = require("express");
const router = express.Router();
const products = require("./products");
const auth = require("./auth")

router.use("/products", products);
router.use("/auth", auth);

module.exports = router;