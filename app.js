const express = require('express')
const app = express()
const nunjucks = require('nunjucks')
const request = require('request')
const compression = require('compression')
const sockJs = require('sockjs-client-node')
const Stomp = require('stompjs')

const api = {
  url: new sockJs('https://app.jouliette.net/stomp/'),
  client: null,
  init: function() {
    this.client = Stomp.over(this.url)
    this.client.connect(
      'web',
      'mnwdTGgQu5zPmSrz',
      this.onConnect,
      console.error,
      '/'
    )
  },
  onConnect: function() {
    api.client.subscribe('/exchange/aquaponics/deceuvel', api.handleData)
  },
  handleData: function(d) {
    console.log(JSON.parse(d.body))
  }
}

api.init()


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
