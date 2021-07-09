const UserModel = require("./../db/schema/User");
const Project = require("../db/schema/projectSchema");
const bcrypt = require("bcrypt");
const moment = require("moment");
const jwt = require("jsonwebtoken");
const { sendEmail } = require("../utills/sendMail");
const { TrendingUpRounded } = require("@material-ui/icons");

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
    return res.status(200).json(user);
  } catch (err) {
    // console.log(err);
    res.status(500).json({ error: "500 Internal Error" });
  }
};

exports.UserDashboard = async (req, res) => {
  const { userid } = req;
  try {
    const user = await UserModel.findById(userid);
    return res.status(200).json(user.profile);
  } catch (err) {
    // console.log(err);
    return res.status(500).json({ error: "500 Internal Error" });
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
          // console.log(err);
          return res.status(500).json({ error: "NO user with such id" });
        } else {
          // console.log(doc);
          return res.status(200).json(doc.profile);
        }
      }
    );
  } catch (err) {
    // console.log(err);
    return res.status(500).json({ error: "500 Internal Error" });
  }
};

exports.sendemail = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await UserModel.findOne({ email: email });
    if (user) {
      const id = user._id;
      const token = jwt.sign(
        { id },
        process.env.ACCESS_TOKEN_SECRET_FOREGTPASS,
        { expiresIn: "10m" }
      );
      // const link = `https://60e5a4164df29368b0329a4b--project-zone.netlify.app/project-zone/forget-password/${token}`;

      /* Above link will be used when client-side is fully deployed, if we are running client-side on local host 
      then link below will be sent as email */

      const link = `${req.protocol}://${req.hostname}:3000/project-zone/forget-password/${token}`;

      const content = `<h2 style={{textAlign ="center"}}>Project-zone account Forget password link</h2>
      
      Dear ${user.firstname}, please click on following link to reset your password

      <p style={{textAlign ="center"}}><a href=${link}>${link}</a></p>
      
      Thank you`;

      await sendEmail(
        email,
        "Projetzone account forget passsword link",
        content
      );

      UserModel.findByIdAndUpdate(
        id,
        { password_reset_token: token },
        { new: true },
        function (err, doc) {
          if (err) {
            // console.log(err);
            return res.status(500).json({ error: "NO user with such id" });
          }
        }
      );

      return res.status(200).send({ msg: "Email sent successfully" });
    } else {
      return res.status(401).json({ error: "Email not registered" });
    }
  } catch (err) {
    // console.log(err);
    return res.status(500).json({ error: "500 internal error" });
  }
};

exports.ResetPassword = async (req, res) => {
  const { token, password } = req.body;
  try {
    jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET_FOREGTPASS,
      async (err, user) => {
        if (err) {
          return res.status(401).json({ error: "TOKEN EXPIERED" });
        }
        const { id } = user;
        const salt = await bcrypt.genSalt();
        const password_ = await bcrypt.hash(password, salt);
        UserModel.findByIdAndUpdate(
          id,
          { password_reset_token: "", password: password_ },
          { new: true },
          function (err, doc) {
            if (err) {
              // console.log(err);
              return res.status(500).json({ error: "NO user with such id" });
            } else {
              return res
                .status(200)
                .json({ msg: "Password reset successfull" });
            }
          }
        );
      }
    );
  } catch (err) {
    // console.log(err);
    return res.status(500).json({ error: "500 internal error" });
  }
};

exports.AddNewProject = async (req, res) => {
  const { userid } = req;
  const { name, description, level, skills, github } = req.body;

  let username = "";

  try {
    const newProject = Project({
      name,
      description,
      level,
      skills,
      github,
    });

    const resp = await newProject.save();
    if (!resp) {
      res.status(500).json({ error: "Could not add your project." });
    }

    const email_list = await UserModel.find({
      "email_acctivation.email_activated": true,
    }).select("email");

    const emails = email_list.map((item) => item.email);

    UserModel.findByIdAndUpdate(
      userid,
      { $push: { "profile.projects_added": name } },
      { new: true, upsert: true },
      async function (err, doc) {
        if (err) {
          console.log(err);
          res.status(404).json({ error: "NO user with such id" });
        } else {
          username = doc.firstname;
          // const link = `https://60e5a4164df29368b0329a4b--project-zone.netlify.app/projectdetails/${resp._id}`;

          /* Above link will be used when client-side is fully deployed, if we are running client-side on local host
      then link below will be sent as email */

          const link = `${req.protocol}://${req.hostname}:3000/projectdetails/${resp._id}`;

          const content = `

      <h2> New Project Added </h2>
      <p> Hello user, we are happy to announce that a new project has been added recently by ${username} with following details : </p>

      <h4> Title : ${name} </h4>
      <h4> Description : ${description}</h4>
      <h4> Level : ${level}</h4>
      <h4> Skills : ${skills.join(", ")}</h4>
      <h4> Github link : <a href=${github}> Github Link</a></h4>
      <h4 style="text-align:center"><a href=${link}>Check new project here..</a></h4>

      Thanks You. ! Have a great day!`;

          await sendEmail(emails, "New Project on Project-zone", content);
        }
      }
    );

    return res.status(200).json({ message: "Successully added your project." });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Could not add your project." });
  }
};
exports.SendContactEmail = async (req, res) => {
  const { fullname, email, message } = req.body;

  try {
    const user = await UserModel.findOne({ email: email });
    if (user) {
      const id = user._id;

      // const link = "https://60e5a4164df29368b0329a4b--project-zone.netlify.app";

      /* Above link will be used when client-side is fully deployed, if we are running client-side on local host 
      then link below will be sent as email */

      const link = `${req.protocol}://${req.hostname}:3000/`;

      const usercontent = `<h3 style="text-align:center">Thanks for contacting us !</h3>
      
      <p>Dear ${user.firstname}, We have received your message/feedback successfully.</p> 
      <p>We appreciate you contacting us. </p>
      <p>Feel free to send us your suggestions anytime. We will definitely consider it. Have any query related to Project Zone, Do contact us. </p>
      <p> Found any bug in Project Zone. Please, notify us about it. </p>
      <hr/>
      <h3 style="text-align:center"><a href=${link}>Visit project-zone again !</a></h3>
      <hr/>
      
      Thanks You. ! Have a great day!`;

      await sendEmail(
        email,
        "Thanks for getting in touch with project-zone ",
        usercontent
      );

      const admincontent = `<h3 style="text-align:center"> Hey Rohit ! You have got a contact message from project-zone !</h3>
      
      <p>${user.firstname} has contacted on project-zone. We have sent him a thank you mail. </p>
      <p>These are the ${user.firstname}'s contact details.</p>
      <hr/>
      <h3>Full Name: ${fullname}</h3>
      <hr/>
      <h3>Email: ${email}</h3>
      <hr/>
      <h3>Message : ${message}</h3>
      <hr/>
      `;

      await sendEmail(
        process.env.SENDGRID_VERIFIED_MAIL,
        "Got Contact from project-zone",
        admincontent
      );

      UserModel.findByIdAndUpdate(
        id,
        { $push: { messages_sent: message } },
        { new: true, upsert: true },
        function (err, doc) {
          if (err) {
            console.log(err);
            res.status(500).json({ error: "NO user with such id" });
          }
        }
      );

      res.status(200).send({ success: "Message saved, Email sent" });
    } else {
      return res.status(401).json({ error: "Email not registered" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "500 Internal Error" });
  }
};

exports.VerifyEmailSend = async (req, res) => {
  const { userid } = req;
  try {
    const user = await UserModel.findById(userid);
    if (user) {
      const email = user.email;
      const token = jwt.sign(
        { userid },
        process.env.ACCESS_TOKEN_VERIFY_EMAIL,
        {
          expiresIn: "10m",
        }
      );

      // const link = `https://60e5a4164df29368b0329a4b--project-zone.netlify.app/project-zone/verify-email/${token}`;

      /* Above link will be used when client-side is fully deployed, if we are running client-side on local host 
      then link below will be sent as email */

      const link = `${req.protocol}://${req.hostname}:3000/project-zone/verify-email/${token}`;

      const content = `<h2 style={{textAlign ="center"}}>Project-zone account verification link</h2>
      
      Dear ${user.firstname}, please click on following link to verify your account.

      <p style={{textAlign ="center"}}><a href=${link}>${link}</a></p>
      
      Thank you`;

      await sendEmail(email, "Projetzone account verification link", content);

      UserModel.findByIdAndUpdate(
        userid,
        {
          email_acctivation: {
            email_acctivation_token: token,
            email_activated: false,
          },
        },
        { new: true },
        function (err, doc) {
          if (err) {
            console.log(err);
            res.status(500).json({ error: "NO user with such id" });
          }
        }
      );
      res.status(200).send({ msg: "Verification Email sent successfully" });
    } else {
      res.status(400).json({ error: "No User Found" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "500 Internal Error" });
  }
};

exports.VerifyEmail = async (req, res) => {
  const { emailtoken } = req.body;
  try {
    jwt.verify(
      emailtoken,
      process.env.ACCESS_TOKEN_VERIFY_EMAIL,
      async (err, user) => {
        if (err) {
          return res.status(401).json({ error: "TOKEN EXPIERED" });
        }
        const { userid } = user;
        UserModel.findByIdAndUpdate(
          userid,
          {
            email_acctivation: {
              email_acctivation_token: "",
              email_activated: true,
            },
          },
          { new: true },
          function (err, doc) {
            if (err) {
              console.log(err);
              res.status(500).json({ error: "NO user with such id" });
            } else {
              res.status(200).json({ msg: "Email Verified successfully" });
            }
          }
        );
      }
    );
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "500 internal Error" });
  }
};

exports.AddComment = async (req, res) => {
  const { userid } = req;
  const { project_id, fname, userimg, data } = req.body;
  const createdat = moment().format("MMMM Do YYYY, h:mm:ss a");
  try {
    Project.findOneAndUpdate(
      { _id: project_id },
      {
        $push: {
          comments: {
            fname: fname,
            userimg: userimg,
            data: data,
            createdat: createdat,
          },
        },
      },
      { new: true },
      function (error, doc) {
        if (error) {
          res.status(500).json({ error: "Not Successful" });
        } else {
          res.status(200).json({ msg: "Comment added", data: doc.comments });
        }
      }
    );
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "500 Internal Error" });
  }
};

exports.AddLike = async (req, res) => {
  const { project_id, likes } = req.body;
  try {
    Project.findOneAndUpdate(
      { _id: project_id },
      { likes: likes },
      { new: true },
      function (error) {
        if (error) {
          res.status(500).json({ error: "Not Successful" });
        } else {
          res.status(200).json({ msg: "Thanks for liking our project ❤️" });
        }
      }
    );
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "500 Internal Error" });
  }
};

exports.AddNewRating = async (req, res) => {
  const { project_id, newrating } = req.body;
  let avgrating;

  try {
    Project.findOneAndUpdate(
      { _id: project_id },
      { $push: { allratings: newrating } },
      { new: true, upsert: true },
      function (error, doc) {
        if (error) {
          res.status(500).json({ error: "Not Successful" });
        } else {
          const ratingsSum = (accumulator, currentValue) =>
            accumulator + currentValue;
          avgrating = doc.allratings.reduce(ratingsSum) / doc.allratings.length;
          avgrating = Math.round(avgrating * 2) / 2;

          Project.findOneAndUpdate(
            { _id: project_id },
            { rating: avgrating },
            { new: true },
            function (error, doc) {
              if (error) {
                res.status(500).json({ error: "Not Successful" });
              } else {
                res
                  .status(200)
                  .json({
                    msg: "Thanks for rating our project ⭐",
                    data: doc.rating,
                  });
              }
            }
          );
        }
      }
    );
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "500 Internal Error" });
  }
};
