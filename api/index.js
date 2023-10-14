const express = require("express");
const mongoose = require("mongoose");
const dotenv = require('dotenv');

dotenv.config();
mongoose.connect(process.env.MONGO).then(() => {
  console.log("Connected to mongodb")
}).catch((err) => {
  console.log(err)
});
const app = express();
app.listen(3000, () => {
  console.log("server listening at port 3000")
})