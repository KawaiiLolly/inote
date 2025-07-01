const mongoose = require("mongoose");
const mongoURI = "mongodb://localhost:27017/inote";

const connectToMongo = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log("Connected to database successfully!");
  } catch (error) {
    console.error("Database not connected!", error);
  }
};

module.exports = connectToMongo;
