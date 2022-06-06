const userModel = require('../models/user')
const {
    Types: { ObjectId },
  } = require('mongoose');

const findUser = async (condition)=> {
    if(ObjectId.isValid(condition)){
        const user = await userModel.findById(condition)
        return user
    }
    if(typeof condition === 'object' && condition !== null){
        const user = await userModel.findOne(condition)
        return user
    }
    return null;
}

const createUser = async ({email,name, password}) => {
    const user = await userModel.create({ email, name, password })
return user
}


module.exports ={findUser, createUser}