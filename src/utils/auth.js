const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const generateRandomString = require("./random");
const { JWT_SECRET_KEY, JWT_EXPIRES_TIME } = require("../configs/index");

const generatePassword = async (password) => {
  const saltRounds = 10;
  const salt = await bcrypt.genSaltSync(saltRounds);
  password = password || generateRandomString;
  password = await bcrypt.hashSync(password, salt);
  return password;
};

comparePassword = async (passwordCompare, password) => {
  return await bcrypt.compareSync(passwordCompare, password);
};

generateAccessToken = async ({userId,permissions}) => {
  const accessToken = await jwt.sign({ userId, permissions }, JWT_SECRET_KEY, {
    expiresIn: JWT_EXPIRES_TIME,
  });
  return accessToken;
};
compareAccessToken = async (accessToken)=>{
  const data = await jwt.verify(accessToken,JWT_SECRET_KEY)
    return data
}

module.exports = {compareAccessToken, generatePassword, comparePassword, generateAccessToken };
