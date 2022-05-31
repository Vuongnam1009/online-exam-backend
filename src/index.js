const port = 'https://online-exam-apiv1.herokuapp.com/'|| 3000
const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const app = express()
const AccountModel= require('./models/accounts')
const accountRouter = require('./routers/account')



app.use(morgan('combined'))
app.use(bodyParser.urlencoded({ extended: false }))


app.use(bodyParser.json())
app.use('/api/account/',accountRouter)

app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.post('/register', (req, res) => {
var username = req.body.username
var password = req.body.password
AccountModel.findOne({ username: username})
.then(data => {
  if(data){
 res.send('Tài khoàn đã tồn tại')}else{
   return AccountModel.create({
    username:username,
    password: password,
  })
 }
})
.then(data => {
  res.send('Tạo tài khoản thành công')
})
.catch((err) => {
  console.log('err',err);
})
})
app.post('/login', (req, res) => {
  var username = req.body.username
  var password = req.body.password
  AccountModel.findOne({ username: username,password: password})
  .then(data => {
    if(!data){
   res.send('Tài khoàn hoặc mật khẩu không chính xác')}else{
     return true
   }
  })
  .then(data => {
    res.send('Đăng nhập thành công')
  })
  .catch((err) => {
    console.log('err',err);
  })
  })


app.listen((process.env.PORT || 3000), () => {
  console.log(`Example app listening on port ${port}`)
})