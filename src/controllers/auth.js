const authService =require('../sevices/auth')

const register = async (req, res) => {
    const { email, name, password } = req.body;
    const user = await authService.register( {email, name, password });
    return res.send({ status: 1, result: user });
  };



  module.exports = {register}