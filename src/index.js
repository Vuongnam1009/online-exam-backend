const express = require('express')
const path = require('path')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const app = express()
const AccountModel= require('./models/accounts')
const accountRouter = require('./routers/account')



app.use(morgan('combined'))
app.use(bodyParser.urlencoded({ extended: false }))

// app.engine('handlebars', xpshbs());
// app.set('view engine', 'handlebars');
// // app.set('views', path.join(__dirname, 'resources/views'));



app.use(bodyParser.json())
app.use('/api/account/',accountRouter)

app.use('/public',express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {
  var linkToFile =path.join(__dirname, 'public/index.html')
  console.log(linkToFile);
  res.sendFile(linkToFile)
})
const PORT = process.env.PORT ||3000

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})