const app = {
  init: function() {
    api.init()
    intersectionObserver.init()
    animation.init()
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
    console.log(typeof index, index)
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
    threshold: 0.9 // visible amount of item shown in relation to root
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
      } else {
        animation.stop(entry.target.dataset.anim)
      }
    })
  }
}
const api = {
  init: function() {}
}
app.init()
