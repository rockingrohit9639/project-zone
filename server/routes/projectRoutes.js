const express = require("express");
const projectsRouter = express.Router();
const Project = require("../db/schema/projectSchema");
const { sendemail, ResetPassword } = require("./../controllers/user");

// Routes
/**
 * @swagger
 * /getprojects:
 *  get:
 *    description: Get a list of projects on the basis of query
 *    responses:
 *      '200':
 *        description: Response Successful
 *      '404':
 *        description: Not found.
 *      '500':
 *        description: Internal server error
 */
projectsRouter.get("/getprojects", async (req, res) => {
  const query = req.query.q;

  try {
    const result = await Project.find({
      skills: { $regex: query, $options: "i" },
    });
    // console.log(result);

    if (result) {
      return res.status(200).json(result);
    } else {
      return res.status(404).json({ message: "Projects Not found" });
    }
  } catch (err) {
    // console.log(err);
    return res.staus(500).json({ message: "Internal server error" });
  }

});

projectsRouter.post("/addproject", async (req, res) => {
  const { name, description, level, skills } = req.body;

  try {
    const newProject = Project({
      name,
      description,
      level,
      skills,
    });

    const resp = await newProject.save();

    if (resp) {
      return res
        .status(200)
        .json({ message: "Successully added your project." });
    } else {
      return res.status(400).json({ error: "Could not add your project." });
    }
  } catch (err) {
    return res.status(400).json({ error: "Could not add your project." });
  }
});

// Routes
/**
 * @swagger
 * /send-forgetpassword-email:
 *  post:
 *    description: Send a email containing reset password link
 *    responses:
 *      '200':
 *        description: Response Successful
 *      '401':
 *        description: Email not registered.
 *      '500':
 *        description: Internal server error/ No user with such email
 */
projectsRouter.post("/send-forgetpassword-email", sendemail);

// Routes
/**
 * @swagger
 * /reset-password:
 *  post:
 *    description: Resets and save password in db
 *    responses:
 *      '200':
 *        description: Response Successful
 *      '401':
 *        description: Token Expired.
 *      '500':
 *        description: Internal server error/ No user with such id
 */
projectsRouter.post("/reset-password", ResetPassword);

module.exports = projectsRouter;
