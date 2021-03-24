const mongoose = require("mongoose");

const database = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://deepak:deepak@cluster0.ybigo.azure.mongodb.net/blogboard?retryWrites=true&w=majority",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
      }
    );
    console.log("database running");
  } catch (err) {
    console.log(err.message);
    process.exit(1);
  }
};

module.exports = database;
