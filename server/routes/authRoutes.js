const express = require('express');
const authRouter = express.Router();
const { signIn, signUp, googleSignIn, profile } = require('./../controllers/auth');
const { authenticate } = require('./../middlewares/auth');

// Routes
/**
 * @swagger
 * /signin:
 *  post:
 *    description: This route is used for login. A user can login using his/her EmailId and password.
 *    responses:
 *      '200':
 *        description: Login successful (token)
 *      '400':
 *        description: Invalid Credentials
 *      '401':
 *        description: No user found with this email
 *      '500':
 *        description: Internal Server Error
 */
authRouter.post('/signin', signIn);

// Routes
/**
 * @swagger
 * /signup:
 *  post:
 *    description: This route if for registration. A user can register on Project Zone using his/her firstname, lastname, email, password
 *    responses:
 *      '200':
 *        description: Registration successful (token)
 *      '500':
 *        description: Internal Error/ Email already registered
 */
authRouter.post('/signup', signUp);

// Routes
/**
 * @swagger
 * /google-signin:
 *  post:
 *    description: User can login / register using Google account
 *    responses:
 *      '200':
 *        description: If account exist then Logged in Else Registered
 *      '500':
 *        description: Internal Error/ Email already registered
 */
authRouter.post('/google-signin', googleSignIn);
module.exports = authRouter;
