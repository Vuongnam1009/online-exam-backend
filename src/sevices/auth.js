const userDao = require("../daos/user");
const code = require("../errors/code");
const CustomError = require("../errors/CustomError");

const register = async ({email, name, password}) => {
  const userExist = await userDao.findUser({email});
  if (userExist) {
    throw new CustomError(code.EMAIL_EXIST);
  }
  const user = await userDao.createUser({email, name, password});
  return user;
};
module.exports = { register };
