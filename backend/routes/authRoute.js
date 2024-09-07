const express = require("express");
const router = express.Router();
const authController = require("../controllers/AuthController");

router.get("/login", authController.loginGet.bind(authController));
router.post("/login", authController.loginPost.bind(authController));
router.get("/register", authController.registerGet.bind(authController));
router.post("/register", authController.registerPost.bind(authController));
router.post("/logout", authController.logoutPost.bind(authController));

module.exports = router;
