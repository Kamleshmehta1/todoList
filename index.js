const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv/config");
const path = require("path");
const userRouter = require("./routes");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());
app.use("/api/data", userRouter); //middle-ware

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => app.listen(PORT)) //listen to port 5000
  .then(() =>
    console.log(`Connected to data base listening to port number ${PORT}`)
  )
  .catch((err) => {
    console.log(err);
  });
console.log(path.join(__dirname + "/frontend/build"));

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname + "/frontend/build")));
  app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname + "/frontend/build/index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("API is running..");
  });
}
