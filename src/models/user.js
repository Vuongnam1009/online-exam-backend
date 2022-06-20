const mongoose = require('mongoose');

const {ObjectId}= mongoose.Types;

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: String,
  name: String,
  password: String,
  role: {
    type: ObjectId,
    ref: 'Role',
  },
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
