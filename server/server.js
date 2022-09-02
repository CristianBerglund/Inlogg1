const mongoose = require("mongoose");
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

dotenv.config({ path: "./config.env" });

app.get("/", (req, res) => {
  res.status(200).json({ message: "Hello, this is backend server👋🏻" });
});

const auth = require("./routes/auth");
app.use("/auth", auth);

mongoose
  .connect(
    "mongodb+srv://Crille:Hej12345678@cluster0.uzvqq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
  )
  .then((con) => {
    console.log("Connected to DB");
  });

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log("Hello from server! We are listening on port 3001");
});
