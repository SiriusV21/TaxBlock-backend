const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../../config/config");

const router = express.Router();
const User = require("../../models/users");

router.post("/", async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!config.rxemail.test(email)) return res.status(400).json({ msg: "invalid email address!!" });

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "E-Mail not Registered" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ msg: "Wrong Password" });
    }

    const payload = {
      user: {
        id: user._id,
      },
    };
    return jwt.sign(payload, config.secretKey, { expiresIn: "1h" }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  } catch (err) {
    return res.status(500).send("Server error");
  }
});

module.exports = router;
