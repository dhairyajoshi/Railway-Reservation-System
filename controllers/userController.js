const mongoose = require('mongoose')
const User = require('../models/userModel')
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports.signUp = async (req, res, next) => {
  const check = await User.findOne({ username: req.body.username });
  if (check != null)
    return res.status(400).json({ msg: "username already exists" });

  const hashed = await bcrypt.hash(req.body.password, 10);

  const user = new User({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    email: req.body.email,
    username: req.body.username,
    password: hashed,
  });

  await user.save();

  const token = jwt.sign( 
    {
      username: user.username,
      userId: user._id,
    },
    process.env.jwt_key,
    { expiresIn: "60 days" }
  );

  res.status(201).json({
    msg: "user created successfully",
    token: token,
    user: user,
  });
};

module.exports.logIn = async (req, res, next) => {
  const user = await User.findOne({ username: req.body.username });

  if (user==null) { 
    return res.status(400).json({ msg: "Authentication failed" });
  }
  const chk = await bcrypt.compare(req.body.password, user.password);

  if (!chk) { 
    return res.status(400).json({ msg: "Authentication failed" });
  }

  const token = jwt.sign(
    {
      username: user.username,
      userId: user._id,
    },
    process.env.jwt_key,
    { expiresIn: "60 days" }
  );

  res.status(200).json({
    msg: "logged in successfully",
    token: token,
    user: user,
  });
};
