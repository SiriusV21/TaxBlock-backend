const express = require("express");
const User = require("../../models/users");
const auth = require("../../middleware/auth");

const router = express.Router();

router.get("/", [auth], async (req, res) => {
  const user = await User.findOne({ _id: req.user.id }, { _id: 0, password: 0, __v: 0 });
  res.json(user);
});

module.exports = router;
