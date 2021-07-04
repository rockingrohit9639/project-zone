const express = require('express');
const authRouter = express.Router();
const { signIn, signUp, profile } = require('./../controllers/auth');
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
module.exports = authRouter;
