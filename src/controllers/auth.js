const authService = require("../services/auth");
const CustomError = require("../errors/CustomError");
const codes = require("../errors/code");

const register = async (req, res) => {
  const { email, name, password } = req.body;
  const user = await authService.register({ email, name, password });
  return res.send({ status: 1, result: user });
}

const login = async (req, res) => {
  const { email, password } = req.body;
  const { accessToken, user,role } = await authService.login(email, password);
  return res.send({ status: 1, result: { accessToken, user, role } });
}

const verifyAccessToken = async (req, res) => {
  const { authorization } = req.headers;
  if (!authorization) throw new CustomError(codes.UNAUTHORIZED);
  const [tokenType, accessToken] = authorization.split(" ");
  if (tokenType !== "Bearer") throw new Error(codes.UNAUTHORIZED);
  const { user, role } = await authService.verifyAccessToken(
    accessToken,true
  );
  res.send({ status: 1, result: { user,role } })
}

module.exports = { register, login, verifyAccessToken };
