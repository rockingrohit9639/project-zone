const express = require('express');
const ProtectedRouter = express.Router();
const { authenticate } = require('./../middlewares/auth');
const {profile} = require('./../controllers/auth')

ProtectedRouter.get('/profile', authenticate, profile);

module.exports = ProtectedRouter;
