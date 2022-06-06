const express = require("express");
const router = express.Router();
const {registerValidate} = require("../validations/auth")
const asyncMiddleware = require("../middlewares/async")
const authController = require('../controllers/auth')
const AccountModel = require("../models/user");
var jwt = require("jsonwebtoken");
const { JWT_SECRET_KEY, JWT_EXPIRES_TIME } = require("../configs/index");
router.get("/", (req, res) => {
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
router.post("/register",
registerValidate,
asyncMiddleware(authController.register)
);
router.post("/login", (req, res) => {
  const{email, password} = req.body;
  AccountModel.findOne({
    email: email,
    password: password,
  })
    .then((data) => {
      if (data) {
        var token = jwt.sign(
          {
            _id: data._id,
          },
          JWT_SECRET_KEY,
          {
            expiresIn: JWT_EXPIRES_TIME
          }
        );
        return res.json({
          status: 1,
          message: "Đăng nhập thành công",
          token: token,
        });
      } else {
        res.json("Tài khoản hoặc mật khẩu không đúng");
      }
    })
    .catch((err) => {
      res.status(500).json("Lỗi", err);
    });
});
router.get("/verify", (req, res) => {
  const { token } = req.headers;
  const id = jwt.verify(token, JWT_SECRET_KEY);
  AccountModel.findOne({ _id: id })
    .then((data) => {
        return res.json({
          status:1,
          data: data
        });

    })
    .catch((err) => {
      res.status(500).json("Lỗi", err);
    });
});
router.put("/:id", (req, res) => {
  var id = req.params.id;
  var newPassword = req.body.newPassword;
  AccountModel.findByIdAndUpdate(id, {
    password: newPassword,
  })
    .then((data) => {
      res.json("Cập nhật thành công");
    })
    .catch((err) => {
      res.status(500).json("Lỗi", err);
    });
});
router.delete("/:id", (req, res) => {
  var id = req.params.id;
  AccountModel.deleteOne({ _id: id })
    .then(res.json("Xóa Thành công"))
    .catch((err) => {
      res.status(500).json("Lỗi", err);
    });
});

module.exports = router;
