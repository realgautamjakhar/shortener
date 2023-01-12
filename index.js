const express = require("express");
const app = express();
const PORT = 1338;
const createDB = require("./config/db");

// Creating and connecting to the database
createDB
  .sync()
  .then(() => {
    console.log("database is connected");
  })
  .catch((error) => {
    console.log(error);
  });

//Middle Wares cors
app.use(express.json()); // parse json

//routes
app.use("/url", require("./routes/url"));
app.use("/", require("./routes/home"));
app.listen(PORT, () => {
  console.log("Server is Running", PORT);
});
