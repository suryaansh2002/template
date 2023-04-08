const mongoose = require("mongoose");
const dotenv = require("dotenv");
const {MONGO_URI} = require("../constants");
dotenv.config();

const InitiateMongoServer = async () => {
  try {
    const conn = await mongoose.connect(
      MONGO_URI,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (e) {
    console.log(e);
    throw e;
  }
};

module.exports = InitiateMongoServer;