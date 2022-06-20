const userDao = require("../daos/user");
const roleDao = require("../daos/role");
const code = require("../errors/code");
const { toObject } = require("../utils/object");
const CustomError = require("../errors/CustomError");
const {
  generatePassword,
  comparePassword,
  generateAccessToken,
  compareAccessToken,
} = require("../utils/auth");

const register = async ({ email, name, password }) => {
  const userExist = await userDao.findUser({ email });
  if (userExist) {
    throw new CustomError(code.EMAIL_EXIST);
  }
  password = await generatePassword(password);
  const user = await userDao.createUser({ email, name, password });
  return user;
};

const login = async (email, password) => {
  const user = await userDao.findUser({ email });
  if (!user) {
    throw new CustomError(code.USER_NOT_FOUND);
  }
  const isCorrectPassword = await comparePassword(password, user.password);
  if (!isCorrectPassword) {
    throw new CustomError(code.WRONG_PASSWORD);
  }
  const roleId = user.role;
  const role = await roleDao.findRole({ _id: roleId }, ["name"], {
    path: "permissions",
    select: "name uri method _id",
  });
  if (!role) {
    throw new CustomError(code.NOT_ROLE);
  }
  const permissions = await toObject(role.permissions);
  const userId = user._id;
  const accessToken = await generateAccessToken({ userId, permissions });
  return { accessToken, user, permissions };
};
const verifyAccessToken = async (accessToken) => {
  const data = await compareAccessToken(accessToken);
  const user = await userDao.findUser(data.userId);
  const permissions = data.permissions;
  return { user, permissions };
};
const checkPermission = (comparePermission, permissions) => {
  const { method, path } = comparePermission;
  let isPermission = false;
  if (!permissions[method]) return false;
  isPermission = permissions[method][path];
  return isPermission;
};
module.exports = { register, login, verifyAccessToken, checkPermission };
