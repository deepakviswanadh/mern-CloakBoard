const express = require("express"),
  database = require("./components/database/db"),
  cors = require("cors");

const app = express();
app.use(express.json({ extended: false }));

app.use(cors());
database();

app.use("/", require("./components/routes/home"));

app.listen(process.env.PORT || 5000, process.env.IP, () => {
  console.log("5000 up");
});
