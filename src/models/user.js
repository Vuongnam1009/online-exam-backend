const mongoose = require('mongoose');



const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const userSchema = new Schema({
  username: String,
  password: String,
  email: String,
  roles: String,
  name: String,
  avatar: String,
  dob: Date,
  phoneNumber: String,
  urlFacebook: String,
  urlYoutube: String,
  urlWebsite: String,
},{
    collection:'user'
});

const AccountModel = mongoose.model('user',userSchema);
module.exports = AccountModel
