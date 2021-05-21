const express = require("express");
const router = express.Router();
const Loan = require("../../models/loans");
const tokenValidation = require("../../middleware/tokenValidation");
const User = require("../../models/users");

router.get("/", [tokenValidation], async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.body.id });
    if (user.admin) {
      let Status;
      if (req.query.type === "Approve") {
        Status = "Approved";
      } else {
        Status = "Rejected";
      }
      await Loan.findOneAndUpdate({ _id: req.query._id }, { status: Status });
      const loan = await Loan.findOne({ _id: req.query._id });

      return res.status(200).json(loan);
    } else {
      return res.status(400).json({ msg: "You don't have enough permissions to permfrom this action" });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: "Server Error" });
  }
});

module.exports = router;
