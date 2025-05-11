const mongoose = require("mongoose");

// Replace this with your MongoDB Compass connection string
const DB = "mongodb://localhost:27017/DawatDaftar"; // Replace with your actual connection string

mongoose.connect(DB, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("Successful Connection");
  })
  .catch((e) => {
    console.log("No connection", e);
  });
