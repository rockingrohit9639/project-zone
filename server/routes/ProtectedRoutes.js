const express = require('express');
const ProtectedRouter = express.Router();
const { authenticate } = require('./../middlewares/auth');
const {profile , UserDashboard , UpdateUserDashbaord, AddNewProject} = require('./../controllers/user')

ProtectedRouter.get('/profile', authenticate, profile);
ProtectedRouter.get('/user-dashboard', authenticate, UserDashboard);
ProtectedRouter.patch('/update-user-dashboard', authenticate , UpdateUserDashbaord);
ProtectedRouter.post('/addproject',authenticate, AddNewProject)

module.exports = ProtectedRouter;
