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
  timestamps: true,
    versionKey: false,
    collection:'user'
});

const AccountModel = mongoose.model('User',userSchema);
module.exports = AccountModel
