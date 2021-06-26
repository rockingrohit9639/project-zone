const express = require('express');
const ProtectedRouter = express.Router();
const { authenticate } = require('./../middlewares/auth');
const {profile , UserDashboard , UpdateUserDashbaord} = require('./../controllers/user')

ProtectedRouter.get('/profile', authenticate, profile);
ProtectedRouter.get('/user-dashboard', authenticate, UserDashboard);
ProtectedRouter.put('/update-user-dashboard', authenticate , UpdateUserDashbaord)

module.exports = ProtectedRouter;
