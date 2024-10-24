const USER = require("../models/user");

const UserSignUp = async (req, res) => {
  const { firstName, lastName, username, password } = req.body;

  console.log(
    "Creating a new user with Name",
    firstName,
    lastName,
    "\n and username :",
    username
  );
  try {
    let existingUser = await USER.findOne({ username });

    if (existingUser) {
      console.log(`The username ${username} is already taken`);
      return res.status(409).json({ message: "Username is already taken" });
    }
    await USER.create({
      firstName,
      lastName,
      username,
      password,
    });
    console.log(
      "Created a new user with Name",
      firstName,
      lastName,
      "\n and username :",
      username
    );
    res.status(201).json({ message: "User registered successfully" });
    console.log("User registered successfully with username:", username);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
    console.error(error);
  }
};

const UserSignIn = async (req, res) => {
  const { username, password } = req.body;

  try {
    console.log(`Searching for a user with username : ${username}`);

    const findUsername = await USER.findOne({ username });
    if (!findUsername) {
      console.log("No user found with this username", username);
      return res
        .status(404)
        .json({ message: "No user found with this username" });
    }

    const user = await USER.findOne({ username, password });

    if (!user) {
      console.log("Incorrect Password, unable to login");
      return res.status(401).json({ message: "Incorrect password" });
    }

    if (user.isBlocked) {
      console.log("This user is blocked");
      return res.status(401).json({ message: "Sorry this user is blocked" });
    }

    if (user) {
      console.log("User logged in successfully");
      res.status(200).json({ message: "User logged in successfully" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { UserSignUp, UserSignIn };
