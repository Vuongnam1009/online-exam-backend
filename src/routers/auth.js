const express = require("express");
const router = express.Router();
const { registerValidate, loginValidate } = require("../validations/auth");
const asyncMiddleware = require("../middlewares/async");
const authController = require("../controllers/auth");
const {auth} = require("../middlewares/auth")
const AccountModel = require("../models/user");
router.get("/auth/", (req, res) => {
  const PAGE_SIZE = 2;
  var page = req.query.page;
  if (page) {
    page = parseInt(page);
    var skip = (page - 1) * PAGE_SIZE;
    AccountModel.find({})
      .skip(skip)
      .limit(PAGE_SIZE)
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        res.status(500).json("Lỗi sever");
      });
  } else {
    AccountModel.find({})
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        res.status(500).json("Lỗi sever");
      });
  }
});

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
router.get("/auth/verify",
auth,
asyncMiddleware(authController.verifyAccessToken)
);

module.exports = router;
