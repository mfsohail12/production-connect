const express = require("express");
const app = express();
const port = 8000;
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const auth = require("./routes/authRoutes");

// Database connection
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("database connected successfully");
  })
  .catch((error) => console.log("database not connected", error));

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", auth);

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
