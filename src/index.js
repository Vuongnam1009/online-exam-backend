const express = require('express')
const path = require('path')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors');
var cookieParser = require('cookie-parser')

const snakeCaseRes = require('./middlewares/snakeCaseRes');
const errorHandler = require('./middlewares/errorHandler');

require('dotenv').config();
require('./models/index');
const app = express()

app.use(cookieParser())
app.use(cors());
app.use(morgan('combined'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(snakeCaseRes());
app.use('/public',express.static(path.join(__dirname, 'public')))

require('./routers/index')(app)
app.use(errorHandler);


app.get('/', (req, res) => {
  var linkToFile =path.join(__dirname, 'public/index.html')
  res.sendFile(linkToFile)
})
const PORT = process.env.PORT ||3000

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})