const express = require("express");
const router = express.Router();
const { registerValidate, loginValidate } = require("../validations/auth");
const asyncMiddleware = require("../middlewares/async");
const authController = require("../controllers/auth");
const { auth } = require("../middlewares/auth");

router.post(
  "/auth/register",
  registerValidate,
  asyncMiddleware(authController.register)
);

router.post(
  "/auth/login",
  loginValidate,
  asyncMiddleware(authController.login)
);

router.get("/auth/verify", asyncMiddleware(authController.verifyAccessToken));

module.exports = router;
