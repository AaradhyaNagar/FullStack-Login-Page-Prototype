const express = require("express");
const { UserSignUp, UserSignIn } = require("../controllers/user");

const registerRoute = express.Router();
const logInRoute = express.Router();

registerRoute.post("/", UserSignUp);
logInRoute.post("/", UserSignIn);

module.exports = { registerRoute, logInRoute };
