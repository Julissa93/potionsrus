require('dotenv').config();
const express = require("express");
const db = require("./server/db/db");
const Product = require("./server/db/models/Product");
const User = require("./server/db/models/User");
const Order = require("./server/db/models/Order");
const OrderItem = require("./server/db/models/OrderItem");

const app = express();

// body parsing middleware
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use("/api", require("./server/index"));

app.use((err, req, res, next) => {
  console.error(err);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || 'Internal Server Error.')
})

const port = process.env.PORT || 3030;
const startListening = () => {
  app.listen(port, () => {
    console.log("App is listening on port " + port);
  });
};
/*const dbSyncAndSeed = async () => {
  //db.sync();
  seed();
};*/

const bootApp = () => {
  //dbSyncAndSeed();
  startListening();
};

bootApp();
