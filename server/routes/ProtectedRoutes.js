const express = require('express');
const ProtectedRouter = express.Router();
const { authenticate } = require('./../middlewares/auth');
const {profile , UserDashboard , UpdateUserDashbaord, AddNewProject, SendContactEmail} = require('./../controllers/user')

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
ProtectedRouter.get('/profile', authenticate, profile);

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
ProtectedRouter.get('/user-dashboard', authenticate, UserDashboard);

// Routes
/**
 * @swagger
 * /update-user-dashboard:
 *  post:
 *    description: Update user dashboard data
 *    responses:
 *      '200':
 *        description: Response Successful
 *      '401':
 *        description: Not a valid Token / No Auth Header.
 *      '500':
 *        description: Internal server error/ No user with such id
 */
ProtectedRouter.patch('/update-user-dashboard', authenticate , UpdateUserDashbaord);

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
 */
ProtectedRouter.post('/addproject',authenticate, AddNewProject);

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
ProtectedRouter.post('/send-contact-email',authenticate, SendContactEmail);

module.exports = ProtectedRouter;
