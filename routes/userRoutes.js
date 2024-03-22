const express = require("express");
const bcrypt = require("bcrypt");
const userModel = require("../models/userModel");
const router = express.Router();

router.post("/sign-up", async (req, res) => {
  try {
    const existingUser = await userModel.findOne({
      email: req.body.email,
    });
    console.log(existingUser);
    if (existingUser) {
      return res.send({
        status: false,
        message: "User already exists.",
      });
    }

    let hashedPasword = bcrypt.hashSync(req.body.password, 10);
    req.body.password = hashedPasword;
    let newUser = new userModel(req.body);
    await newUser.save();

    return res.send({
      status: true,
      message: "Signup successful",
    });
  } catch (e) {
    return res.send({
      status: false,
      message: e.message,
    });
  }
});

module.exports = router;
