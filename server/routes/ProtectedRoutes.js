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
} = require("./../controllers/user");

ProtectedRouter.get("/profile", authenticate, profile);
ProtectedRouter.get("/user-dashboard", authenticate, UserDashboard);
ProtectedRouter.patch(
  "/update-user-dashboard",
  authenticate,
  UpdateUserDashbaord
);
ProtectedRouter.post("/addproject", authenticate, AddNewProject);
ProtectedRouter.post("/send-contact-email", authenticate, SendContactEmail);
ProtectedRouter.get("/send-verify-email", authenticate, VerifyEmailSend);
ProtectedRouter.post("/verify-email", VerifyEmail);

module.exports = ProtectedRouter;
