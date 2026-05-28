const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const { isGuest, isLoggedIn } = require("../middlewares/auth");

router.get("/", authController.landingPage);
router.get("/register", isGuest, authController.registerPage);
router.post("/register", isGuest, authController.register);
router.get("/login", isGuest, authController.loginPage);
router.post("/login", isGuest, authController.login);
router.get("/logout", isLoggedIn, authController.logout);

module.exports = router;
