const mongoose = require("mongoose");
const uri = process.env.MONGO_URL;
require("dotenv").config();

async function connectDB() {
  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("DB connectée ");
  } catch (err) {
    console.error(err);
    process.exit();
  }
}

module.exports = connectDB;
