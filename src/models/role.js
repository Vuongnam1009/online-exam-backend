const mongoose = require('mongoose');
const {ObjectId}= mongoose.Types;
const roleSchema = new mongoose.Schema({
    name: String,
    permissions:[
            {type:ObjectId,
            ref:'Permission'}]
},{
    timestamps: true,
    versionKey: false
})

module.exports = mongoose.model('Role', roleSchema)