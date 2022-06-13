const asyncMiddleware = require("./async");
const CustomError = require("../errors/CustomError");
const codes = require("../errors/code");
const authService = require("../services/auth");

const auth = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) throw new CustomError(codes.UNAUTHORIZED);
  const [tokenType, accessToken] = authorization.split(" ");
  if (tokenType !== "Bearer") throw new Error(codes.UNAUTHORIZED);
  const { user, permissions } = await authService.verifyAccessToken(
    accessToken
  );
  const reqType = {
    path: req.route.path,
    method: req.method,
  };
  req.reqType =reqType
  req.permissions= permissions
  req.user = user;
  if (["/logout", "/verify"].includes(req.path)) {
    req.accessToken = accessToken;
  }
  return next();
};

module.exports = {
  auth: asyncMiddleware(auth),
};
