const userDao = require("../daos/user");
const code = require("../errors/code");
const CustomError = require("../errors/CustomError");
const{generatePassword,comparePassword,generateAccessToken,compareAccessToken} = require("../utils/auth")

const register = async ({email, name, password}) => {
  const userExist = await userDao.findUser({email});
  if (userExist) {
    throw new CustomError(code.EMAIL_EXIST);
  }
  password= await generatePassword(password)
  const user = await userDao.createUser({email, name, password});
  return user;
};

const login = async (email,password) => {
    const user = await userDao.findUser({email})
    if(!user) {
        throw new CustomError(code.USER_NOT_FOUND)
    }
    const isCorrectPassword = await comparePassword(password,user.password)
    if(!isCorrectPassword) {
        throw new CustomError(code.WRONG_PASSWORD)
    }
    const userId = user._id
    const accessToken= await generateAccessToken(userId)
    return {accessToken,user}
}

const verifyAccessToken = async (accessToken)=> {
    const{userId} = await compareAccessToken(accessToken)
    const user = await userDao.findUser(userId)
    return user
}
module.exports = { register ,login,verifyAccessToken};
