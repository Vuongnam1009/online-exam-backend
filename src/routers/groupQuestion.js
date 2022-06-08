const router = require('express').Router();
const asyncMiddleware = require('../middlewares/async');
const { auth } = require('../middlewares/auth');
const groupQuestionController = require('../controllers/groupQuestion');

router.get(
  '/',
  auth,
  asyncMiddleware(groupQuestionController.getAllGroupQuestionByUser),
);
router.get(
  '/:id',
  auth,
  asyncMiddleware(groupQuestionController.getGroupQuestion),
);
router.post(
  '/',
  auth,
  asyncMiddleware(groupQuestionController.createGroupQuestion),
);
router.put(
  '/:id',
  auth,
  asyncMiddleware(groupQuestionController.updateGroupQuestion),
);
router.delete(
  '/:id',
  auth,
  asyncMiddleware(groupQuestionController.deleteGroupQuestion),
);

module.exports = router;
