const mongoose = require('mongoose');



const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const userSchema = new Schema({
  email: String,
  name: String,
  password: String,
  roles: String,
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
