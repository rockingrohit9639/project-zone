const express = require('express');
const authRouter = express.Router();
const { signIn, signUp, profile } = require('./../controllers/auth');
const { authenticate } = require('./../middlewares/auth');

authRouter.post('/signin', signIn);
authRouter.post('/signup', signUp);
module.exports = authRouter;
