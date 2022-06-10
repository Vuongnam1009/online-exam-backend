const asyncMiddleware = require('./async')
const CustomError = require('../errors/CustomError')
const codes = require('../errors/code')
const authService = require('../services/auth')

const checkRole =  (permissions,reqType)=>{
   const isRole = permissions.some((per) =>{
    return per.method === reqType.method && per.uri === reqType.path
  })
  return isRole
}

const auth = async (req, res, next) => {
  const { authorization } = req.headers
  if (!authorization) throw new CustomError(codes.UNAUTHORIZED)

  const [tokenType, accessToken] = authorization.split(' ')

  if (tokenType !== 'Bearer') throw new Error(codes.UNAUTHORIZED)
  const {user,permissions} = await authService.verifyAccessToken(accessToken)
  const reqType ={
    path:req.path,
    method:req.method
  }
  const isRole = await checkRole(permissions,reqType)
if(!isRole) throw new CustomError(codes.NOT_ROLE)
  req.user = user
  if (['/logout', '/verify'].includes(req.path)) {
    req.accessToken = accessToken
  }
  return next()
}

module.exports = {
  auth: asyncMiddleware(auth),
}
