const express = require('express')
const app = express()
const nunjucks = require('nunjucks')
const request = require('request')
const compression = require('compression')
const sockJs = require('sockjs-client-node')
const Stomp = require('stompjs')
const http = require('http').Server(app)
const io = require('socket.io')(http)

const api = {
  url: new sockJs('https://app.jouliette.net/stomp/'),
  client: null,
  data: {},
  init: function() {
    this.client = Stomp.over(this.url)
    this.client.heartbeat.outgoing = 1000
    this.client.heartbeat.incoming = 0
    this.connect()
  },
  connect: function() {
    this.client.connect(
      'web',
      'mnwdTGgQu5zPmSrz',
      this.onConnect,
      this.handleError
    )
  },
  onConnect: function() {
    api.client.subscribe('/exchange/aquaponics/deceuvel', api.handleData)
    console.log('sub')
  },
  handleError: function(err) {
    console.log('err:', err)
    api.connect()
  },
  handleData: function(d) {
    let parsed = JSON.parse(d.body)
    console.log('parsed:', parsed)
    if (d.body) {
      api.data = {
        ph: api.getStatus('ph', helper.round(parsed.ph, 2)),
        conductivity: api.getStatus(
          'conductivity',
          helper.round(parsed.mscm2, 2)
        ),
        waterTemp: api.getStatus(
          'waterTemp',
          helper.round(parsed.water_temp, 0)
        ),
        humidity: api.getStatus('humidity', helper.round(parsed.humidity, 0)),
        roomTemp: api.getStatus('roomTemp', helper.round(parsed.room_temp, 0)),
        date: parsed.date,
        time: parsed.ph
      }
      io.emit('data', api.data)
    }
  },
  getStatus: function(stat, value, time) {
    // if (time) {
    //   let date = new Date(time)
    // }
    let obj = {
      value: value
    }
    switch (stat) {
      case 'ph':
        if (value > 7.5) {
          obj.status = 'te hoog'
        } else if (value < 6) {
          obj.status = 'te laag'
        } else {
          obj.status = 'goed'
        }
        return obj
        break
      case 'conductivity':
        if (value > 4) {
          obj.status = 'te hoog'
        } else if (value < 1) {
          obj.status = 'te laag'
        } else {
          obj.status = 'goed'
        }
        return obj
        break
      case 'waterTemp':
        if (value > 32) {
          obj.status = 'te hoog'
        } else if (value < 18) {
          obj.status = 'te laag'
        } else {
          obj.status = 'goed'
        }
        return obj
        break
      case 'humidity':
        if (value > 80) {
          obj.status = 'te hoog'
        } else if (value < 60) {
          obj.status = 'te laag'
        } else {
          obj.status = 'goed'
        }
        return obj
        break
      case 'roomTemp':
        if (value > 34) {
          obj.status = 'te hoog'
        } else if (value < 24) {
          obj.status = 'te laag'
        } else {
          obj.status = 'goed'
        }
        return obj
        break
    }
  }
}

helper = {
  round: function(num, decimals) {
    let multiplier = Math.pow(10, decimals)
    return Math.round(num * multiplier) / multiplier
  }
}
io.on('connection', function(socket) {
  io.emit('data', api.data)
})

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

http.listen(8001, () => {
  console.log('Listening.. port 8001')
})
