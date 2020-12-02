const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')

// 載入 jwt 函式庫協助處理建立/驗證 token
const jwt = require('jsonwebtoken')
// 載入設定

// 載入資料模型

app.set('secret', 'isbdbsdb')

// 套用 middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cookieParser('123456789'))
app.use(morgan('dev'))
// test server url on going
app.get('/echo/:what', (req, res) => {
  res.json(req.params)
})

app.post('/authenticate', (req, res) => {
  let token = ''
  if (req.body.email === '123@gmail.com' && req.body.password === '123') {
    token = jwt.sign({ email: '123@gmail.com', expiresTime: '7' }, app.get('secret'), {
      expiresIn: 60 * 60 * 24
    })
  } else {
    res.json({ success: false, message: 'Authenticate failed. Wrong password or E-mail' })
    return
  }
  res.json({
    success: true,
    message: 'Enjoy your token',
    token
  })
})

app.use(function (req, res, next) {
  const token = req.body.token || req.query.token || req.headers['x-access-token'] || req.cookies['user-token']
  if (token) {
    jwt.verify(token, app.get('secret'), function (err, decoded) {
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' })
      } else {
        req.decoded = decoded
        next()
      }
    })
  } else {
    return res.status(403).send({
      success: false,
      message: 'No token provided.'
    })
  }
})
app.get('/account', function (req, res) {
  res.json({ account: '123@gmail.com', avatar: 'https://source.unsplash.com/random', description: 'this is 123@gmail.com description' })
})

module.exports = {
  path: '/api',
  handler: app
}
