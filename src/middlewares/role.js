const asyncMiddleware = require('./async')
const CustomError = require("../errors/CustomError");
const codes = require("../errors/code");

const role =async (req, res, next) => {
    const permissions = req.permissions
    const reqType = req.reqType
    let isRole = false
    if(!permissions[reqType.method]) throw new CustomError(codes.NOT_ROLE)
     isRole = permissions[reqType.method][reqType.path];
    if (!isRole) throw new CustomError(codes.NOT_ROLE);
    return next()
}
module.exports={
    role: asyncMiddleware(role)
}