const router = require('express').Router();
const asyncMiddleware = require('../middlewares/async');
const { auth } = require('../middlewares/auth');
const { role } = require('../middlewares/role');
const groupQuestionController = require('../controllers/groupQuestion');

router.get(
  '/groupQuestions',
  auth,
  role,
  asyncMiddleware(groupQuestionController.getAllGroupQuestionByUser),
);
router.get(
  '/groupQuestions/:id',
  auth,
  role,
  asyncMiddleware(groupQuestionController.getGroupQuestion),
);
router.post(
  '/groupQuestions',
  auth,
  role,
  asyncMiddleware(groupQuestionController.createGroupQuestion),
);
router.put(
  '/groupQuestions/:id',
  auth,
  asyncMiddleware(groupQuestionController.updateGroupQuestion),
);
router.delete(
  '/groupQuestions/:id',
  auth,
  role,
  asyncMiddleware(groupQuestionController.deleteGroupQuestion),
);

module.exports = router;
