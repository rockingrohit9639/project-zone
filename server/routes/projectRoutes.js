const express = require("express");
const projectsRouter = express.Router();
const Project = require("../db/schema/projectSchema");
const { sendemail, ResetPassword } = require("./../controllers/user");
const { HomePageProjects, GetProjectByID } = require("./../controllers/public");

// Routes
/**
 * @swagger
 * /getprojects:
 *  get:
 *    description: Get a list of 5 each projects according to different categories
 *    responses:
 *      '200':
 *        description: Response Successful
 *      '500':
 *        description: Internal server error
 */
projectsRouter.get("/projects-home", HomePageProjects);

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
projectsRouter.get("/getprojects", async (req, res) =>
{
  var query = req.query.q;
  query = query.toLowerCase();

  try
  {
    const result = await Project.find({
      skills: { $regex: query, $options: "i" },
    });

    if (result)
    {
      return res.status(200).json(result);
    } else
    {
      return res.status(404).json({ message: "Projects Not found" });
    }
  } catch (err)
  {
    return res.staus(500).json({ message: "Internal server error" });
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

// Routes
/**
 * @swagger
 * /project-by-id:
 *  post:
 *    description: Get a single project using project id
 *    responses:
 *      '200':
 *        description: Response Successful
 *      '404':
 *        description: No project found with this id
 *      '500':
 *        description: Internal server error
 */
projectsRouter.post("/project-by-id", GetProjectByID);

module.exports = projectsRouter;
