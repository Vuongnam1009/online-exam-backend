const router = require('express').Router();
const asyncMiddleware = require('../middlewares/async');
const { auth } = require('../middlewares/auth');
const omitReq = require('../middlewares/omitReq');
const contestController = require('../controllers/contest');
const { checkPassword } = require('../middlewares/contest');

router.get('/', asyncMiddleware(contestController.getAllContest));
router.get(
  '/:contestId/role/:userId',
  asyncMiddleware(contestController.checkAccountRole),
);
router.get(
  '/joined',
  auth,
  asyncMiddleware(contestController.getAllContestJoined),
);
router.get(
  '/createByUser',
  auth,
  asyncMiddleware(contestController.getAllContestByUser),
);
router.get(
  '/:id',
  auth,
  asyncMiddleware(contestController.getContest),
);
router.post(
  '/',
  auth,
  asyncMiddleware(contestController.createContest),
);
router.put(
  '/:id',
  auth,
  omitReq,
  asyncMiddleware(contestController.updateContest),
);
router.delete(
  '/:id',
  auth,
  asyncMiddleware(contestController.deleteContest),
);
router.post(
  '/:id/verifyPassword',
  auth,
  asyncMiddleware(contestController.verifyPassword),
);
router.get(
  '/:id/getAllQuestion',
  auth,
  checkPassword,
  asyncMiddleware(contestController.getAllQuestion),
);
router.post(
  '/:id/mark',
  auth,
  asyncMiddleware(contestController.mark),
);
router.get(
  '/:id/results',
  auth,
  asyncMiddleware(contestController.getAllResultByContest),
);
router.get(
  '/:id/results/user',
  auth,
  asyncMiddleware(contestController.getAllResultByUserInContest),
);

module.exports = router;
