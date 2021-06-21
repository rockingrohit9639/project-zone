const UserModel = require('./../db/schema/User');
const bcrypt = require('bcrypt');
const moment = require('moment');
const jwt = require('jsonwebtoken');

const maxage = 3 * 24 * 60 * 60;
const createwebToken = (id) =>
{
  return jwt.sign({ id }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: maxage,
  });
};

exports.signIn = async (req, res) =>
{
  const { email, password } = req.body;
  try
  {
    const user = await UserModel.findOne({ email: email });
    if (user)
    {
      const validPassword = await bcrypt.compare(password, user.password);
      if (validPassword)
      {
        const token = createwebToken(user._id);
        return res.status(200).json({ accesstoken: token });
      } else
      {
        return res.status(400).json({ error: 'Invalid Credentials' });
      }
    } else
    {
      return res.status(401).send('NO USER FOUND');
    }
  } catch (err)
  {
    console.log(err);
    return res.status(500).send('Internal Server Error');
  }
};

exports.signUp = async (req, res) =>
{
  let { firstname, lastname, email, password } = req.body;
  try
  {
    const salt = await bcrypt.genSalt();
    password = await bcrypt.hash(password, salt);
    const created_at = moment().format('MMMM Do YYYY, h:mm:ss a');
    
    const user = await UserModel.create({
      firstname,
      lastname,
      email,
      password,
      created_at,
    });

    const token = createwebToken(user._id);

    return res.status(200).json({ accesstoken: token });
  } catch (err)
  {
    console.log(err);
    return res.status(500).send('Internal Server Error');
  }
};

exports.profile = (req, res) =>
{
  /* ATTACHED USERID FROM AUTH MIDDLEWARE IS RETRIEVED HERE */
  const { userid } = req;
  /*
      DATA OF USER PROFILE CAN BE RETRIEVED & CAN BE SEND AS RESPONSE
  */
  res.status(200).json({ userid: userid });
};
