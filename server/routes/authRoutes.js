const express = require('express');
const authRouter = express.Router();
const { signIn, signUp, profile } = require('./../controllers/auth');
const { authenticate } = require('./../middlewares/auth');

// Routes
/**
 * @swagger
 * /signin:
 *  post:
 *    description: User can login by providing email & password
 *    responses:
 *      '200':
 *        description: Login successful
 *      '400':
 *        description: Invalid Credentials
 *      '401':
 *        description: No user found with this email
 *      '500':
 *        description: Internal Error
 */
authRouter.post('/signin', signIn);

// Routes
/**
 * @swagger
 * /signup:
 *  post:
 *    description: User can register with help of firstname, lastname, email, password
 *    responses:
 *      '200':
 *        description: Registration successful
 *      '500':
 *        description: Internal Error/ Email already registered
 */
authRouter.post('/signup', signUp);
module.exports = authRouter;
