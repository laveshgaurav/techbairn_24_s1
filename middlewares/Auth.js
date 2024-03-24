const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

function Auth(req, res, next) {
  console.log("Type Of Req", typeof req);
  let authorization = req.headers.authorization;
  if (!authorization) {
    return res.send({
      status: false,
      message: "Not Authorized",
    });
  }
  const token = authorization.split(" ")[1];

  jwt.verify(token, "Hello_World", async (err, payload) => {
    if (err) {
      return res.send({
        status: false,
        message: "Invalid Token",
      });
    }
    const user = await userModel.findById(payload.id);
    if (!user) {
      return res.send({
        status: false,
        message: "User not found",
      });
    }
    console.log("User 1", user._id);
    req.userId = user._id;
    next();
  });
}

module.exports = Auth;
