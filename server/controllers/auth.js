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

exports.signIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email: email });
    if (user) {
      const validPassword = await bcrypt.compare(password, user.password);
      if (validPassword) {
        const token = createwebToken(user._id);
        return res.status(200).json({ accesstoken: token });
      } else {
        return res.status(400).json({ error: "Invalid Credentials" });
      }
    } else {
      return res.status(401).json({ error: "No user found with this email" });
    }
  } catch (err) {
    return res.status(500).json({ error: "500 Internal Server Error" });
  }
};

exports.signUp = async (req, res) => {
  let { firstname, lastname, email, password } = req.body;
  try {
    const salt = await bcrypt.genSalt();
    password = await bcrypt.hash(password, salt);
    const created_at = moment().format("MMMM Do YYYY, h:mm:ss a");
    const google_signin = false;

    const user = await UserModel.create({
      firstname,
      lastname,
      email,
      password,
      google_signin,
      created_at,
    });

    const token = createwebToken(user._id);
    
    return res.status(200).json({ accesstoken: token });
  } 
  catch (err) {
    if (err.code === 11000) {
      return res.status(500).json({ error: "Email already registered" });
    }
    return res.status(500).json({ error: "500 Internal Error" });
  }
};

exports.googleSignIn = async (req, res) => {
  let data = req.body;

  try {
    const user = await UserModel.findOne({ email: data.email });
    if (user) {

      if(user.google_signin) {
        const token = createwebToken(user._id);
        return res.status(200).json({ accesstoken: token });
      }
      else {
        return res.status(500).json({ error: "Email already registered" });
      }

    } else {
        const salt = await bcrypt.genSalt();
        let password =`${data.profile.profile_pic}${process.env.ACCESS_TOKEN_SECRET}${data.email}` ;
        password = await bcrypt.hash(password, salt);
        const google_signin = true;

        const created_at = moment().format("MMMM Do YYYY, h:mm:ss a");
        data = {...data, password, google_signin,created_at};

        const user = await UserModel.create(data);
        const token = createwebToken(user._id);
        return res.status(200).json({ accesstoken: token });
      }
  } catch (err) {
    if (err.code === 11000) {
      return res.status(500).json({ error: "Email already registered" });
    }
    return res.status(500).json({ error: "500 Internal Error" });
  }
};


