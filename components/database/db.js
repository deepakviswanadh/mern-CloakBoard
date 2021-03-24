const mongoose = require("mongoose");

const database = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/blog", {
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
