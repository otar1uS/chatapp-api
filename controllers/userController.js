const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const createToken = (_id) => {
  const jwtkey = process.env.JWT_SECRET_KEY;
  return jwt.sign({ _id }, jwtkey, { expiresIn: "3d" });
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: "Couldn't fetch the users" });
  }
};
const createUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const newUser = await new User({
      username,
      email,
      password,
    });

    await newUser.save();

    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    res.status(500).json({ error: "User with following email already exist" });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({
        error: "User with following email address does not exist",
      });

    if (user.password !== password && user.email !== email)
      return res.status(400).json({
        error: "Your password is incorrect",
      });

    const token = createToken(user._id);
    res.status(200).json({ _id: user._id, name: user.name, email, token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const findUser = async (req, res) => {
  const userId = req.params.userId;

  try {
    const user = await userModel.findById(userId);

    res.status(200).json(user);
  } catch (err) {
    console.log(err.message);
    res.status(500).json(err.message);
  }
};

module.exports = { findUser, createUser, getUsers, loginUser };
