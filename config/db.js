const mongoose = require("mongoose");

const dbConnect = () => {
  try {
    mongoose.connect("mongodb://localhost:27017/bookapp");
    console.log("DB connection successful");
  } catch {
    console.error("DB connection unsuccesful");
  }
};

module.exports = dbConnect;
