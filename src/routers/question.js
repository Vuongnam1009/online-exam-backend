const router = require('express').Router();
const asyncMiddleware = require('../middlewares/async');
const { auth } = require('../middlewares/auth');
const omitReq = require('../middlewares/omitReq');
const questionController = require('../controllers/question');

router.post(
  '/questionsInGroup',
  auth,
  asyncMiddleware(questionController.getAllQuestionByGroupQuestion),
);
router.get(
  '/:id',
  auth,
  asyncMiddleware(questionController.getQuestion),
);
router.post(
  '/',
  auth,
  asyncMiddleware(questionController.createQuestion),
);
router.put(
  '/:id',
  auth,
  omitReq,
  asyncMiddleware(questionController.updateQuestion),
);
router.delete(
  '/:id',
  auth,
  asyncMiddleware(questionController.deleteQuestion),
);

module.exports = router;
