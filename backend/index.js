const express = require("express");
const app = express();
const connectMongoDB = require("./connection");
const cors = require("cors");
const bodyParser = require("body-parser");
const PORT = 8001;

const { registerRoute, logInRoute } = require("./routes/user");
 
app.use(cors());
app.use(bodyParser.json());

connectMongoDB("mongodb://localhost:27017/fullStackLoginPage").then(() => {
  console.log("MongoDB connected burr");
});

app.use("/register", registerRoute);
app.use("/", logInRoute);

app.listen(PORT, () => {
  console.log("Hemlo from PORT :", PORT);
});
