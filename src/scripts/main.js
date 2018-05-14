const animData = {
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
  }
}
const animations = [
  lottie.loadAnimation(animData.fish),
  lottie.loadAnimation(animData.water),
  lottie.loadAnimation(animData.bacteria)
]

let options = {
  root: null, // refers to window. Use document.querySelector to refer to a container
  rootMargin: '0px', // margin around root. Values are similar to css property. Unitless values not allowed
  threshold: 0.4 // visible amount of item shown in relation to root
}

function startAnim(index) {
  animations[index].play()
}
function stopAnim(index) {
  animations[index].goToAndStop(0, true)
}
function change(entries, observer) {
  console.log(entries)
  entries.forEach(entry => {
    console.log(entry.target, entry.intersectionRatio)
    if (entry.intersectionRatio >= options.threshold) {
      console.log(entry.target.dataset.anim)
      startAnim(entry.target.dataset.anim)
    } else {
      console.log(entry.target.dataset.anim)
      stopAnim(entry.target.dataset.anim)
    }
  })
}
let observer = new IntersectionObserver(change, options) // set callback and options

document.querySelectorAll('.intersection').forEach(intersection => {
  observer.observe(intersection) // observe object and pass object as 'entries' array
})
