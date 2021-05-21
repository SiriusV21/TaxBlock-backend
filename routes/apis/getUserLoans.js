const express = require("express");
const router = express.Router();
const Loan = require("../../models/loans");
const auth = require("../../middleware/auth");
const User = require("../../models/users");

router.get("/", [auth], async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user.id }, { _id: 0, password: 0, __v: 0 });
    let loans;
    if (user.admin) {
      loans = await Loan.find({});
    } else {
      loans = await Loan.find({ email: user.email });
    }
    res.json(loans);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: "Server Error" });
  }
});

module.exports = router;
