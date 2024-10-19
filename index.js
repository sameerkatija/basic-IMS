require("dotenv").config();
const express = require("express");
const router = require("./routes");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const app = express();
app.set("view engine", "ejs");
app.set("views", "./views");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser("this is cookie password"));
// connecting to db

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Db Connected");
  })
  .catch(() => {
    console.error("SOMETHING WENT WRONG");
  });

app.use("/", router);

app.listen(process.env.PORT, () => {
  console.log(
    `Server is listening on port http://localhost:${process.env.PORT}`
  );
});
