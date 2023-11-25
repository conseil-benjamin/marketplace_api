const mongoose = require("mongoose");
require("dotenv").config();

async function connectDB() {
  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect(process.env.MONGO_URL);
    console.log("DB connectée ");
  } catch (err) {
    console.error(err);
    process.exit();
  }
}

module.exports = connectDB;
