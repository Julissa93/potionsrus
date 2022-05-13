const express = require("express");
const router = express.Router();
const Product = require("./db/models/Product");

router.get("/", async (req, res, next) => {
    try {
        const products = await Product.findAll(); 
        res.send(products);
    } catch(err) {
        next(err);
    }
});

module.exports = router;