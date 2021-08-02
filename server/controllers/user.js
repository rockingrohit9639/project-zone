const UserModel = require("./../db/schema/User");
const Project = require("../db/schema/projectSchema");
const bcrypt = require("bcrypt");
const moment = require("moment");
const jwt = require("jsonwebtoken");
const { sendEmail } = require("../utills/sendMail");

const maxage = 3 * 24 * 60 * 60;
const createwebToken = (id) =>
{
  return jwt.sign({ id }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: maxage,
  });
};

exports.profile = async (req, res) =>
{
  const { userid } = req;
  try
  {
    const user = await UserModel.findById(userid);
    return res.status(200).json(user);
  } catch (err)
  {
    res.status(500).json({ error: "500 Internal Error" });
  }
};

exports.UserDashboard = async (req, res) =>
{
  const { userid } = req;
  try
  {
    const user = await UserModel.findById(userid);
    return res.status(200).json(user.profile);
  } catch (err)
  {
    return res.status(500).json({ error: "500 Internal Error" });
  }
};

exports.UpdateUserDashbaord = async (req, res) =>
{
  const { userid } = req;
  const { data } = req.body;
  try
  {
    UserModel.findByIdAndUpdate(
      userid,
      data,
      { new: true },
      function (err, doc)
      {
        if (err)
        {
          return res.status(500).json({ error: "NO user with such id" });
        } else
        {
          return res.status(200).json(doc.profile);
        }
      }
    );
  } catch (err)
  {
    return res.status(500).json({ error: "500 Internal Error" });
  }
};

exports.sendemail = async (req, res) =>
{
  const { email } = req.body;
  try
  {
    const user = await UserModel.findOne({ email: email });
    if (user)
    {
      const id = user._id;
      const token = jwt.sign(
        { id },
        process.env.ACCESS_TOKEN_SECRET_FOREGTPASS,
        { expiresIn: "10m" }
      );
      const link = `project-zone.tech/project-zone/forget-password/${token}`;

      /* Above link will be used when client-side is fully deployed, if we are running client-side on local host 
      then link below will be sent as email */

      // const link = `${ req.protocol }://${ req.hostname }:3000/project-zone/forget-password/${ token }`;

      const content = `<h2 style={{textAlign ="center"}}>Project-zone account Forget password link</h2>
      
      Dear ${ user.firstname }, please click on following link to reset your password

      <p style={{textAlign ="center"}}><a href=${ link }>${ link }</a></p>
      
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
        function (err, doc)
        {
          if (err)
          {
            return res.status(500).json({ error: "NO user with such id" });
          }
        }
      );

      return res.status(200).send({ msg: "Email sent successfully" });
    } else
    {
      return res.status(401).json({ error: "Email not registered" });
    }
  } catch (err)
  {
    return res.status(500).json({ error: "500 internal error" });
  }
};

exports.ResetPassword = async (req, res) =>
{
  const { token, password } = req.body;
  try
  {
    jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET_FOREGTPASS,
      async (err, user) =>
      {
        if (err)
        {
          return res.status(401).json({ error: "TOKEN EXPIERED" });
        }
        const { id } = user;
        const salt = await bcrypt.genSalt();
        const password_ = await bcrypt.hash(password, salt);
        UserModel.findByIdAndUpdate(
          id,
          { password_reset_token: "", password: password_ },
          { new: true },
          function (err, doc)
          {
            if (err)
            {
              return res.status(500).json({ error: "NO user with such id" });
            } else
            {
              return res
                .status(200)
                .json({ msg: "Password reset successfull" });
            }
          }
        );
      }
    );
  } catch (err)
  {
    return res.status(500).json({ error: "500 internal error" });
  }
};

exports.AddNewProject = async (req, res) =>
{
  const { userid } = req;
  const { name, description, level, skills, github, adder_id, adder_fname } = req.body;

  let username = "";

  try
  {
    const newProject = Project({
      name,
      description,
      level,
      skills,
      github,
      adder_id,
      adder_fname
    });

    const projectres = await newProject.save();
    if (!projectres)
    {
      res.status(500).json({ error: "Could not add your project." });
    }

    const email_list = await UserModel.find({
      "email_acctivation.email_activated": true,
    }).select("email");

    const emails = email_list.map((item) => item.email);

    UserModel.findByIdAndUpdate(
      userid,
      {
        $push: { "profile.projects_added": { project_id: projectres._id, name: name  } },
        $inc: { "profile.projectones": 10 },
      },
      { new: true },
      async function (err, doc)
      {
        if (err)
        {
          res.status(404).json({ error: "NO user with such id" });
        } else
        {
          username = doc.firstname;
          const link = `project-zone.tech/projectdetails/${ projectres._id }`;

          /* Above link will be used when client-side is fully deployed, if we are running client-side on local host
          then link below will be sent as email */

          // const link = `${req.protocol}://${req.hostname}:3000/projectdetails/${resp._id}`;

          const content = `
      <h2> New Project Added </h2>
      <p> Hello user, A new project has been added on Project Zone by ${ username }. The details of the projects are - </p>

      <h3> Title : ${ name } </h3>
      <h4> Description : </h4>
      ${ description }
      <h4> Level : ${ level }</h4>
      <h4> Skills : ${ skills.join(", ") }</h4>
      <h4> Github link : <a href=${ github }> Github Link</a></h4>
      <h4 style="text-align:center"><a href=${ link }> Visit Project </a></h4>

      Thanks You. Have a great day!!`;

          await sendEmail(emails, "New Project on Project zone", content);
        }
      }
    );

    return res.status(200).json({ message: "Successully added your project." });
  } catch (err)
  {
    res.status(500).json({ error: "Could not add your project." });
  }
};
exports.SendContactEmail = async (req, res) =>
{
  const { fullname, email, message } = req.body;

  try
  {
    const user = await UserModel.findOne({ email: email });
    if (user)
    {
      const id = user._id;

      const link = "project-zone.tech";

      /* Above link will be used when client-side is fully deployed, if we are running client-side on local host 
      then link below will be sent as email */

      // const link = `${ req.protocol }://${ req.hostname }:3000/`;

      const usercontent = `<h3 style="text-align:center">Thanks for contacting us !</h3>
      
      <p>Dear ${ user.firstname }, We have received your message/feedback successfully.</p> 
      <p>We appreciate you contacting us. </p>
      <p>Feel free to send us your suggestions anytime. We will definitely consider it. Have any query related to Project Zone, Do contact us. </p>
      <p> Found any bug in Project Zone. Please, notify us about it. </p>
      <hr/>
      <h3 style="text-align:center"><a href=${ link }>Visit Project Zone again !</a></h3>
      <hr/>
      
      Thanks You. ! Have a great day!`;

      await sendEmail(
        email,
        "Thanks for getting in touch with project-zone ",
        usercontent
      );

      const admincontent = `<h3 style="text-align:center"> Hey Rohit ! You have got a contact message from Project Zone !</h3>
      
      <p>${ user.firstname } has contacted on project-zone. We have sent him a thank you mail. </p>
      <p>These are the ${ user.firstname }'s contact details.</p>
      <hr/>
      <h3>Full Name: ${ fullname }</h3>
      <hr/>
      <h3>Email: ${ email }</h3>
      <hr/>
      <h3>Message : ${ message }</h3>
      <hr/>
      `;

      const adminEmail = "admin@project-zone.tech";

      await sendEmail(
        adminEmail,
        "Got Contact from Project Zone",
        admincontent
      );

      UserModel.findByIdAndUpdate(
        id,
        { $push: { messages_sent: message } },
        { new: true },
        function (err, doc)
        {
          if (err)
          {
            res.status(500).json({ error: "NO user with such id" });
          }
        }
      );

      res.status(200).send({ success: "Message saved, Email sent" });
    } else
    {
      return res.status(401).json({ error: "Email not registered" });
    }
  } catch (err)
  {
    res.status(500).json({ error: "500 Internal Error" });
  }
};

exports.VerifyEmailSend = async (req, res) =>
{
  const { userid } = req;
  try
  {
    const user = await UserModel.findById(userid);
    if (user)
    {
      const email = user.email;
      const token = jwt.sign(
        { userid },
        process.env.ACCESS_TOKEN_VERIFY_EMAIL,
        {
          expiresIn: "10m",
        }
      );

      const link = `https://60e5a4164df29368b0329a4b--project-zone.netlify.app/project-zone/verify-email/${token}`;

      /* Above link will be used when client-side is fully deployed, if we are running client-side on local host 
      then link below will be sent as email */

      // const link = `${ req.protocol }://${ req.hostname }:3000/project-zone/verify-email/${ token }`;

      const content = `<h2 style={{textAlign ="center"}}>Project-zone account verification link</h2>
      
      Dear ${ user.firstname }, please click on following link to verify your account.

      <p style={{textAlign ="center"}}><a href=${ link }>${ link }</a></p>
      
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
        function (err, doc)
        {
          if (err)
          {
            res.status(500).json({ error: "No user found." });
          }
        }
      );
      res.status(200).send({ msg: "Verification Email sent successfully" });
    } else
    {
      res.status(400).json({ error: "No User Found" });
    }
  } catch (err)
  {
    res.status(500).json({ error: "500 Internal Error" });
  }
};

exports.VerifyEmail = async (req, res) =>
{
  const { emailtoken } = req.body;
  try
  {
    jwt.verify(
      emailtoken,
      process.env.ACCESS_TOKEN_VERIFY_EMAIL,
      async (err, user) =>
      {
        if (err)
        {
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
          function (err, doc)
          {
            if (err)
            {
              res.status(500).json({ error: "NO user with such id" });
            } else
            {
              res.status(200).json({ msg: "Email Verified successfully" });
            }
          }
        );
      }
    );
  } catch (err)
  {
    res.status(500).json({ error: "500 internal Error" });
  }
};

exports.AddComment = async (req, res) =>
{
  const { userid } = req;
  const { project_id, fname, data } = req.body;
  const createdat = moment().format("MMMM Do YYYY, h:mm:ss a");
  try
  {
    Project.findOneAndUpdate(
      { _id: project_id },
      {
        $push: {
          comments: {
            fname: fname,
            commenter_id: userid,
            data: data,
            createdat: createdat,
          },
        },
      },
      { new: true },
      function (error, doc)
      {
        if (error)
        {
          res.status(500).json({ error: "Not Successful" });
        } else
        {
          res.status(200).json({ msg: "Comment added", data: doc.comments });
        }
      }
    );
  } catch (err)
  {
    res.status(500).json({ error: "500 Internal Error" });
  }
};

exports.AddLike = async (req, res) =>
{
  const { userid } = req;
  const { project_id, likes } = req.body;
  try
  {
    Project.findOneAndUpdate(
      { _id: project_id },
      { likes: likes },
      { new: true },
      function (error)
      {
        if (error)
        {
          res.status(500).json({ error: "Not Successful" });
        }
      }
    );

    UserModel.findByIdAndUpdate(
      userid,
      { $push: { "profile.projects_liked": project_id } },
      { new: true },
      function (err, doc)
      {
        if (err)
        {
          return res.status(500).json({ error: "NO user with such id" });
        }
        else
        {
          res.status(200).json({ msg: "Thanks for liking our project ❤️" });
        }
      }
    );

  } catch (err)
  {
    res.status(500).json({ error: "500 Internal Error" });
  }
};

exports.AddNewRating = async (req, res) =>
{

  const { userid } = req;
  const { project_id, newrating } = req.body;
  let avgrating;

  try
  {
    Project.findOneAndUpdate(
      { _id: project_id },
      { $push: { "allratings": newrating } },
      { new: true },
      function (error, doc)
      {
        if (error)
        {
          res.status(500).json({ error: "Not Successful" });
        } else
        {
          const ratingsSum = (accumulator, currentValue) =>
            accumulator + currentValue;
          avgrating = doc.allratings.reduce(ratingsSum) / doc.allratings.length;
          avgrating = Math.round(avgrating * 2) / 2;

          Project.findOneAndUpdate(
            { _id: project_id },
            { rating: avgrating },
            { new: true },
            function (error, doc)
            {
              if (error)
              {
                res.status(500).json({ error: "Not Successful" });
              }
            }
          );
        }
      }
    );

    UserModel.findByIdAndUpdate(
      userid,
      { $push: { "profile.projects_rated": project_id } },
      { new: true },
      function (err, doc)
      {
        if (err)
        {
          return res.status(500).json({ error: "NO user with such id" });
        } else
        {
          res.status(200).json({
            msg: "Thanks for rating our project ⭐",
            data: doc.rating,
          });
        }
      }
    );
  } catch (err)
  {
    res.status(500).json({ error: "500 Internal Error" });
  }
};

exports.UpvoteComment = async (req, res) =>
{
  const { userid } = req;
  const { project_id, comment_id, upvotes } = req.body;

  try
  {
    UserModel.findByIdAndUpdate(
      userid,
      { $push: { "profile.comments_upvoted": comment_id } },
      { new: true },
      function (err, doc)
      {
        if (err)
        {
          return res.status(500).json({ error: "NO user with such id" });
        }
      }
    );

    Project.findOneAndUpdate(
      { _id : project_id , "comments._id" : comment_id },
      { "$set": { "comments.$.upvotes" : upvotes} },
      { new: true },
      function (error, doc)
      {
        if (error)
        {
          res.status(500).json({ error: "Not Successful" });
        }
        else
        {
          res.status(200).json({ msg: "Keep supporting our projects by upvoting like this 👍" , data: doc.comments });
        }
      }
    );

  } catch (err) {
    res.status(500).json({ error: "500 Internal Error" });
  }
};

exports.AddBadge = async (req, res) =>
{

  const { userid } = req;
  let badgedata = req.body;
  const earnedat = moment().format("MMMM Do YYYY, h:mm:ss a");
  badgedata = { ...badgedata, earnedat };

  try
  {
    UserModel.findByIdAndUpdate(
      userid,
      { $push: { "profile.badges": badgedata } },
      { new: true },
      function (err, doc)
      {
        if (err)
        {
          return res.status(500).json({ error: "NO user with such id" });
        } else
        {
          res.status(200).json({
            msg: "Congrats 🌟 You have earned a new badge 🌟 Check your profile 😃",
            data: doc.profile.badges
          });
        }
      }
    );

  } catch (err)
  {
    res.status(500).json({ error: "500 Internal Error" });
  }
}

exports.AddFollower = async (req, res) =>
{
  const { userid } = req;
  const { following_name, following_id, follower_name } = req.body;

  try
  {
    UserModel.findByIdAndUpdate(
      userid,
      {
        $push: { "profile.following": { person_id: following_id, fname: following_name  } },
      },
      { new: true },
      async function (err, doc)
      {
        if (err)
        {
          res.status(404).json({ error: "NO user with such id" });
        } 
      }
    );

    UserModel.findByIdAndUpdate(
      following_id,
      {
        $push: { "profile.followers": { person_id: userid, fname: follower_name  } },
      },
      { new: true },
      async function (err, doc)
      {
        if (err)
        {
          res.status(404).json({ error: "NO user with such id" });
        } else
        {
          res.status(200).json({
            msg: 'You have started following ' + following_name,
            data: doc.profile.followers 
          });
        }
      }
    );

  } catch (err)
  {
    res.status(500).json({ error: `Could not follow ${following_name}, Try again` });
  }
};



