const express = require("express");
const router = express.Router();

const {Register,Login, Logout, authStatus} = require("../controller/Login_Register");
const { Students } = require("../controller/Data_controller");
const { checkAuthStatus } = require("../middlewares/authMiddleware");
 router.post("/register",Register);
router.post("/login",Login);
router.post("/logout",Logout);
router.get("/auth-status",authStatus);
router.get("/students-data",checkAuthStatus,Students);
module.exports = router;
