const router = require('express').Router();
const asyncMiddleware = require('../middlewares/async');
const { auth } = require('../middlewares/auth');
const userController = require('../controllers/user');

router.put('/', auth, asyncMiddleware(userController.updateUser));
router.put(
  '/changePassword',
  auth,
  asyncMiddleware(userController.changePassword),
);

module.exports = router;
