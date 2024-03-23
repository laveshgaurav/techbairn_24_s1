const express = require("express");
const bcrypt = require("bcrypt");
const userModel = require("../models/userModel");
const AsyncWrapper = require("../middlewares/errorWrapper");
const router = express.Router();

router.post(
  "/sign-up",
  AsyncWrapper(async (req, res) => {
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
  })
);

router.post(
  "/sign-in",
  AsyncWrapper(async (req, res) => {
    const existingUser = await userModel.findOne({
      email: req.body.email,
    });
    existingUser.map(() => {});
    console.log(existingUser);
    if (!existingUser) {
      return res.send({
        status: false,
        message: "User doesn't exist.",
      });
    }

    const isValidPwd = bcrypt.compareSync(
      req.body.password,
      existingUser.password
    );

    if (!isValidPwd) {
      return res.send({
        status: false,
        message: "Wrong Password",
      });
    } else {
      return res.send({
        status: true,
        message: "Signin successful",
      });
    }
  })
);

module.exports = router;
