const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

//// test GET
router.get("/register", async (req, res) => {
  const user = await new User({
    username: "jon",
    email: "john@gmail.com",
    password: "123456",
  });
  await user.save();
  res.send("ok");
});

//// test POST
// POST => send data to server to update database
router.post("/registeragain", async (req, res) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  });
  try {
    const user = await newUser.save();
    res.status(200).json(user);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
