const express = require("express");

const router = express.Router();
const Loan = require("../../models/loans");
const User = require("../../models/users");
const validator = require("../../helperFunctions/loanValidation");
const tokenValidation = require("../../middleware/tokenValidation");

router.post("/", [tokenValidation], async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.body.id }, { _id: 0, password: 0, __v: 0 });
    if (!user) return res.status(400).json({ msg: "No user registered with given email address" });

    req.body = { ...req.body, email: user.email };

    if (!validator(req.body)) return res.status(400).json({ msg: "loan application requirement not fullfilled" });

    const { applicantName, address, contactNumber, loanAmount, startDate, endDate, emi, email } = req.body;
    const loan = new Loan({
      applicantName,
      address,
      contactNumber,
      email,
      loanAmount,
      startDate,
      endDate,
      emi,
    });

    await loan.save();
    return res.status(202).json({ msg: "loan application submitted" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: "Server Error" });
  }
});

module.exports = router;
