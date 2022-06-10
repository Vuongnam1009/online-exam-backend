const Role = require('../models/role')
const { findAll, findByCondition } = require('../utils/db');

const {
    Types: { ObjectId },
  } = require('mongoose')

const findRoles = async (condition)=> {
    console.log(condition);
    if(ObjectId.isValid(condition)){
        const role = await Role.findById(condition)
        return role
    }
    if(typeof condition === 'object' && condition !== null){
        const role = await Role.findOne(condition)
        return role
    }
    return null
}
const findRole = async (condition, fields, populate) => {
    const role = await findByCondition(Role, condition, fields, populate);
    return role;
  };

module.exports ={findRole,}