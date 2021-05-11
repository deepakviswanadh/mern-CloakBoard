const mongoose = require("mongoose");
const keys = require("../config/keys");

const database = async () => {
  try {
    await mongoose.connect(keys.mongo_uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    console.log("database running");
  } catch (err) {
    console.log(err.message);
    process.exit(1);
  }
};

module.exports = database;
