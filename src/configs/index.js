const {
  PORT,
  JWT_EXPIRES_TIME,
  MONGO_DATABASE,
  MONGO_USERNAME,
  MONGO_PASSWORD,
  JWT_SECRET_KEY,
  MONGO_HOST,
} = process.env;

const { A_WEEK } = require("../constants");

module.exports = {
  PORT: PORT || 3000,
  JWT_SECRET_KEY,
  JWT_EXPIRES_TIME: parseInt(JWT_EXPIRES_TIME, 10) || A_WEEK,
  MONGO_URI_CLOUD: `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOST}/${MONGO_DATABASE}?retryWrites=true&w=majority`,
};
