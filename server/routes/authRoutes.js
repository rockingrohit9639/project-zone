const express = require('express');
const authRouter = express.Router();
const { logIn, signIn, signUp } = require('./../controllers/auth');

authRouter.post('/signin', signIn);
authRouter.post('/signup', signUp);
module.exports = authRouter;
