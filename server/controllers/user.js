const UserModel = require("./../db/schema/User");
const bcrypt = require("bcrypt");
const moment = require("moment");
const jwt = require("jsonwebtoken");
const { sendEmail } = require("../utills/sendMail");

const maxage = 3 * 24 * 60 * 60;
const createwebToken = (id) => {
  return jwt.sign({ id }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: maxage,
  });
};

exports.profile = async (req, res) => {
  const { userid } = req;
  try {
    const user = await UserModel.findById(userid);
    res.status(200).json(user);
  } catch (err) {
    // console.log(err);
    res.status(500).json({ error: "500 Internal Error" });
  }
};

exports.UserDashboard = async (req, res) => {
  const { userid } = req;
  try {
    const user = await UserModel.findById(userid);
    res.status(200).json(user.profile);
  } catch (err) {
    // console.log(err);
    res.status(500).json({ error: "500 Internal Error" });
  }
};

exports.UpdateUserDashbaord = async (req, res) => {
  const { userid } = req;
  const { data } = req.body;
  try {
    UserModel.findByIdAndUpdate(
      userid,
      data,
      { new: true },
      function (err, doc) {
        if (err) {
          console.log(err);
          res.status(500).json({ error: "NO user with such id" });
        } else {
          console.log(doc);
          res.status(200).json(doc.profile);
        }
      }
    );
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "500 Internal Error" });
  }
};

exports.sendemail = async (req, res) => {
  const { email } = req.body;
  const content = `<h1>Checking mailing service</h1>`;
  try {
    await sendEmail(email, "first mail", content);
    res.status(200).json({ msg: "success" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "500 internal error" });
};
