const express = require('express')
const app = express()
const nunjucks = require('nunjucks')
const request = require('request')
const compression = require('compression')

app.use(compression())
app.use(express.static(`${__dirname}/assets`))

nunjucks.configure('views', {
  autoescape: true,
  express: app
})

app.get('/', (req, res) => {
  res.render('index.html', {})
})

app.listen(8001, () => {
  console.log('Listening.. port 8001')
})
