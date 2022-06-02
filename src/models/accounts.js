const mongoose = require('mongoose');

 mongoose.connect('mongodb://localhost/Backend'),{
     useNewUrlParser:true,
     useUnifiedTopology:true
 }

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const account = new Schema({
  username: String,
  password: String,
},{
    collection:'Account'
});

const AccountModel = mongoose.model('account',account);
module.exports = AccountModel
