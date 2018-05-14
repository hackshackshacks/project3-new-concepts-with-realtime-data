const app = {
  elements: {
    stats: {
      time: document.querySelectorAll('.time'),
      humidity: {
        wrap: document.querySelectorAll('.humidity'),
        values: document.querySelectorAll('.humidity .value'),
        statuses: document.querySelectorAll('.humidity .status')
      },
      roomTemp: {
        wrap: document.querySelectorAll('.roomTemp'),
        values: document.querySelectorAll('.roomTemp .value'),
        statuses: document.querySelectorAll('.roomTemp .status')
      },
      waterTemp: {
        wrap: document.querySelectorAll('.waterTemp'),
        values: document.querySelectorAll('.waterTemp .value'),
        statuses: document.querySelectorAll('.waterTemp .status')
      },
      ph: {
        wrap: document.querySelectorAll('.ph'),
        values: document.querySelectorAll('.ph .value'),
        statuses: document.querySelectorAll('.ph .status')
      },
      conductivity: {
        wrap: document.querySelectorAll('.conductivity'),
        values: document.querySelectorAll('.conductivity .value'),
        statuses: document.querySelectorAll('.conductivity .status')
      }
    }
  },
  timer: '',
  init: function() {
    intersectionObserver.init()
    animation.init()
    connect.init()
  },
  handleData: function(data) {
    console.log(data)
    if (data.humidity.value) {
      this.elements.stats.humidity.values.forEach(value => {
        helper.replaceHTML(value, data.humidity.value)
      })
      this.elements.stats.humidity.statuses.forEach(status => {
        helper.replaceHTML(status, data.humidity.status)
      })
      this.elements.stats.humidity.wrap.forEach(el => {
        if (data.humidity.status === 'te hoog') {
          el.classList.remove('low')
          el.classList.add('high')
        } else if (data.humidity.status === 'te laag') {
          el.classList.remove('high')
          el.classList.add('low')
        }
      })
      this.elements.stats.roomTemp.values.forEach(el => {
        helper.replaceHTML(el, data.roomTemp.value)
      })
      this.elements.stats.roomTemp.statuses.forEach(el => {
        helper.replaceHTML(el, data.roomTemp.status)
      })
      this.elements.stats.roomTemp.wrap.forEach(el => {
        if (data.roomTemp.status === 'te hoog') {
          el.classList.remove('low')
          el.classList.add('high')
        } else if (data.roomTemp.status === 'te laag') {
          el.classList.remove('high')
          el.classList.add('low')
        }
      })
      this.elements.stats.waterTemp.values.forEach(el => {
        helper.replaceHTML(el, data.waterTemp.value)
      })
      this.elements.stats.waterTemp.statuses.forEach(el => {
        helper.replaceHTML(el, data.waterTemp.status)
      })
      this.elements.stats.waterTemp.wrap.forEach(el => {
        if (data.waterTemp.status === 'te hoog') {
          el.classList.remove('low')
          el.classList.add('high')
        } else if (data.waterTemp.status === 'te laag') {
          el.classList.remove('high')
          el.classList.add('low')
        }
      })
      this.elements.stats.ph.values.forEach(el => {
        helper.replaceHTML(el, data.ph.value)
      })
      this.elements.stats.ph.statuses.forEach(el => {
        helper.replaceHTML(el, data.ph.status)
      })
      this.elements.stats.ph.wrap.forEach(el => {
        if (data.ph.status === 'te hoog') {
          el.classList.remove('low')
          el.classList.add('high')
        } else if (data.ph.status === 'te laag') {
          el.classList.remove('high')
          el.classList.add('low')
        }
      })
      this.elements.stats.conductivity.values.forEach(el => {
        helper.replaceHTML(el, data.conductivity.value)
      })
      this.elements.stats.conductivity.statuses.forEach(el => {
        helper.replaceHTML(el, data.conductivity.status)
      })
      this.elements.stats.conductivity.wrap.forEach(el => {
        if (data.conductivity.status === 'te hoog') {
          el.classList.remove('low')
          el.classList.add('high')
        } else if (data.conductivity.status === 'te laag') {
          el.classList.remove('high')
          el.classList.add('low')
        }
      })
      let timeElapsed = helper.timeElapsed(Date.now() - new Date(data.time))
      console.log(timeElapsed)
      this.elements.stats.time.forEach(el => {
        helper.replaceHTML(el, timeElapsed)
      })
    }
  }
}
const animation = {
  config: {
    fish: {
      container: document.querySelector('#animation-fish'),
      renderer: 'svg',
      loop: true,
      autoplay: false,
      path: '../animations/fish.json'
    },
    water: {
      container: document.querySelector('#animation-water'),
      renderer: 'svg',
      loop: true,
      autoplay: false,
      path: '../animations/watering-plants.json'
    },
    bacteria: {
      container: document.querySelector('#animation-bacteria'),
      renderer: 'svg',
      loop: true,
      autoplay: false,
      path: '../animations/bacteria.json'
    },
    grow: {
      container: document.querySelector('#animation-grow'),
      renderer: 'svg',
      loop: true,
      autoplay: false,
      path: '../animations/growing-plants.json'
    }
  },
  init: function() {
    this.load()
  },
  load: function() {
    this.fish = lottie.loadAnimation(this.config.fish)
    this.water = lottie.loadAnimation(this.config.water)
    this.bacteria = lottie.loadAnimation(this.config.bacteria)
    this.grow = lottie.loadAnimation(this.config.grow)
  },
  start: function(index) {
    index = index * 1
    switch (index) {
      case 0:
        this.fish.play()
        break
      case 1:
        this.water.play()
        break
      case 2:
        this.bacteria.play()
        break
      case 3:
        this.grow.play()
        break
    }
  },
  stop: function(index) {
    index = index * 1
    switch (index) {
      case 0:
        this.fish.goToAndStop(0, true)
        break
      case 1:
        this.water.goToAndStop(0, true)
        break
      case 2:
        this.bacteria.goToAndStop(0, true)
        break
      case 3:
        this.grow.goToAndStop(0, true)
        break
    }
  }
}
const intersectionObserver = {
  options: {
    root: null, // refers to window. Use document.querySelector to refer to a container
    rootMargin: '0px', // margin around root. Values are similar to css property. Unitless values not allowed
    threshold: 0.001 // visible amount of item shown in relation to root
  },
  init: function() {
    let observer = new IntersectionObserver(this.change, this.options) // set callback and options
    document.querySelectorAll('.intersection').forEach(intersection => {
      observer.observe(intersection) // observe object and pass object as 'entries' array
    })
  },
  change: function(entries, observer) {
    entries.forEach(entry => {
      if (entry.intersectionRatio >= intersectionObserver.options.threshold) {
        animation.start(entry.target.dataset.anim)
        entry.target.classList.add('inView')
      } else {
        animation.stop(entry.target.dataset.anim)
        entry.target.classList.remove('inView')
      }
    })
  }
}
const connect = {
  socket: io(),
  init: function() {
    this.handleEvents()
  },
  handleEvents: function() {
    this.socket.on('data', function(data) {
      if (data) {
        app.handleData(data)
      }
    })
  }
}
const helper = {
  emptyElement: function(element) {
    // empty an html element
    while (element.firstChild) {
      element.removeChild(element.firstChild)
    }
  },
  replaceHTML: function(element, string) {
    // empty html and insert new value
    this.emptyElement(element)
    element.insertAdjacentHTML('beforeend', string)
  },
  timeElapsed: function(time) {
    const obj = {}
    obj.seconds = (time / 1000) % 60
    obj.minutes = (time / (1000 * 60)) % 60
    obj.hours = (time / (1000 * 60 * 60)) % 24

    obj.hours = Math.round(obj.hours < 10 ? '0' + obj.hours : obj.hours)
    obj.minutes = Math.round(obj.minutes < 10 ? '0' + obj.minutes : obj.minutes)
    obj.seconds = Math.round(obj.seconds < 10 ? '0' + obj.seconds : obj.seconds)

    let timeString = 'Laatste update: '
    if (obj.hours) {
      timeString += `${obj.hours} uur,`
    }
    if (obj.minutes === 1) {
      timeString += `${obj.minutes} minuut,`
    } else if (obj.minutes > 1) {
      timeString += `${obj.minutes} minuten,`
    }
    if (obj.seconds === 1) {
      timeString += `${obj.seconds} seconde geleden`
    } else if (obj.seconds > 1) {
      timeString += `${obj.seconds} seconden geleden`
    }
    return timeString
  }
}
const smoothScroll = {
  // Scroll to function using requestanimationframe
  // Source: https://stackoverflow.com/questions/17722497/scroll-smoothly-to-specific-element-on-page
  scroll: function(elementY, duration) {
    let startingY = window.pageYOffset
    let diff = elementY - startingY
    let start

    // Bootstrap our animation - it will get called right before next frame shall be rendered.
    window.requestAnimationFrame(function step(timestamp) {
      if (!start) start = timestamp
      // Elapsed milliseconds since start of scrolling.
      let time = timestamp - start
      // Get percent of completion in range [0, 1].
      let percent = Math.min(time / duration, 1)

      window.scrollTo(0, startingY + diff * percent)

      // Proceed with animation as long as we wanted it to.
      if (time < duration) {
        window.requestAnimationFrame(step)
      }
    })
  },
  getElementY: function(element) {
    return element.offsetTop
  },
  getElementHeight: function(element) {
    return element.clientHeight
  },
  setEventListeners: function(element) {
    const _this = this

    element.addEventListener('click', function(event) {
      event.preventDefault()

      let navElement = document.querySelector('nav'),
        navHeight = _this.getElementHeight(navElement),
        targetElementId = this.getAttribute('href'),
        targetElement = document.querySelector(targetElementId),
        targetElementY = _this.getElementY(targetElement)

      _this.scroll(targetElementY - navHeight, 230)
    })
  },
  init: function() {
    const _this = this
    const links = document.querySelectorAll('a')

    links.forEach(function(link, index) {
      if (link.href.indexOf('#') >= 0) {
        _this.setEventListeners(link)
      }
    })
  }
}
app.init()

smoothScroll.init()
