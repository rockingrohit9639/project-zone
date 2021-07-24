const express = require("express");
const ProtectedRouter = express.Router();
const { authenticate } = require("./../middlewares/auth");
const {
  profile,
  UserDashboard,
  UpdateUserDashbaord,
  AddNewProject,
  SendContactEmail,
  VerifyEmailSend,
  VerifyEmail,
  AddComment,
  AddLike,
  AddNewRating,
  UpvoteComment,
  AddBadge,
  AddFollower
} = require("./../controllers/user");

// Routes
/**
 * @swagger
 * /profile:
 *  get:
 *    description: Get user profile data
 *    responses:
 *      '200':
 *        description: Response Successful
 *      '401':
 *        description: Not a valid Token / No Auth Header.
 *      '500':
 *        description: Internal server error
 */
ProtectedRouter.get("/profile", authenticate, profile);

// Routes
/**
 * @swagger
 * /user-dashboard:
 *  get:
 *    description: Get user dashboard data
 *    responses:
 *      '200':
 *        description: Response Successful
 *      '401':
 *        description: Not a valid Token / No Auth Header.
 *      '500':
 *        description: Internal server error
 */
ProtectedRouter.get("/user-dashboard", authenticate, UserDashboard);

// Routes
/**
 * @swagger
 * /update-user-dashboard:
 *  patch:
 *    description: Update user dashboard data
 *    responses:
 *      '200':
 *        description: Response Successful
 *      '401':
 *        description: Not a valid Token / No Auth Header.
 *      '500':
 *        description: Internal server error/ No user with such id
 */
ProtectedRouter.patch(
  "/update-user-dashboard",
  authenticate,
  UpdateUserDashbaord
);

// Routes
/**
 * @swagger
 * /addproject:
 *  post:
 *    description: Add a project to database
 *    responses:
 *      '200':
 *        description: Response Successful
 *      '400':
 *        description: Could not add your project.
 *      '404': 
 *        description: No user with this id  
 */
ProtectedRouter.post("/addproject", authenticate, AddNewProject);

// Routes
/**
 * @swagger
 * /send-contact-email:
 *  post:
 *    description: Send a contact email
 *    responses:
 *      '200':
 *        description: Response Successful
 *      '401':
 *        description: Email not registered
 *      '500':
 *        description: Internal server error/ No user with such id
 */
ProtectedRouter.post("/send-contact-email", authenticate, SendContactEmail);

// Routes
/**
 * @swagger
 * /send-verify-email:
 *  get:
 *    description: send email with verification link
 *    responses:
 *      '200':
 *        description: Response Successful
 *      '401':
 *        description: Not a valid Token / No Auth Header.
 *      '500':
 *        description: Internal server error/ No user with such id
 *      '400':
 *        description: No user with this id
 */
ProtectedRouter.get("/send-verify-email", authenticate, VerifyEmailSend);

// Routes
/**
 * @swagger
 * /verify-email:
 *  post:
 *    description: Verifies email with help of access token
 *    responses:
 *      '200':
 *        description: Response Successful
 *      '500':
 *        description: Internal server error/ No user with such id
 *      '401':
 *        description: Not a valid token
 */
ProtectedRouter.post("/verify-email", VerifyEmail);

// Routes
/**
 * @swagger
 * /add-comment:
 *  patch:
 *    description: Add user comments on a particular project.
 *    responses:
 *      '200':
 *        description: Response Successful
 *      '500':
 *        description: Internal server error/ Not a successfull response
 *      '401':
 *        description: Not a valid token
 */
ProtectedRouter.patch("/add-comment", authenticate, AddComment);

// Routes
/**
 * @swagger
 * /add-like:
 *  patch:
 *    description: Increment like on a particular project and add project to projects_liked for that user.
 *    responses:
 *      '200':
 *        description: Response Successful
 *      '500':
 *        description: Internal server error/ Not a successfull response
 *      '401':
 *        description: Not a valid token
 */
ProtectedRouter.patch("/add-like", authenticate, AddLike);

// Routes
/**
 * @swagger
 * /add-new-rating:
 *  patch:
 *    description: Add new rating to allratings and Update rating and add project to projects_rated for that user
 *    responses:
 *      '200':
 *        description: Response Successful
 *      '500':
 *        description: Internal server error/ Not a successfull response
 *      '401':
 *        description: Not a valid token
 */
ProtectedRouter.patch("/add-new-rating", authenticate, AddNewRating);

// Routes
/**
 * @swagger
 * /upvote-comment: 
 *  patch:
 *    description: Add upvote to comment and add comment to upvoted_comments for that user
 *    responses:
 *      '200':
 *        description: Response Successful
 *      '500':
 *        description: Internal server error/ Not a successfull response
 *      '401':
 *        description: Not a valid token
 */
 ProtectedRouter.patch("/upvote-comment", authenticate, UpvoteComment);


// Routes
/**
 * @swagger
 * /add-badge:
 *  patch:
 *    description: Add new badge on user profile
 *    responses:
 *      '200':
 *        description: Response Successful
 *      '500':
 *        description: Internal server error/ Not a successfull response
 *      '401':
 *        description: Not a valid token
 */
ProtectedRouter.patch("/add-badge", authenticate, AddBadge);

// Routes
/**
 * @swagger
 * /addfollower:
 *  post:
 *    description: Add follower to profile user and add him as following  
 *    responses:
 *      '200':
 *        description: Response Successful
 *      '400':
 *        description: Could not add follower.
 *      '404': 
 *        description: No user with this id  
 */
 ProtectedRouter.patch("/addfollower", authenticate, AddFollower);

module.exports = ProtectedRouter;
