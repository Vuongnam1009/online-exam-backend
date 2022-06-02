var jwt = require('jsonwebtoken');

var token = jwt.sign({ username: 'Bá Nam' }, '100119');

console.log(token);