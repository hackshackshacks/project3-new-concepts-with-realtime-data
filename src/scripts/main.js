const animData = {
  one: {
    container: document.querySelector('#animation-1'),
    renderer: 'svg',
    loop: true,
    autoplay: true,
    path: '../animations/test.json'
  }
}
const animation1 = lottie.loadAnimation(animData.one)

let options = {
  root: null, // refers to window. Use document.querySelector to refer to a container
  rootMargin: '0px', // margin around root. Values are similar to css property. Unitless values not allowed
  threshold: 0.0001 // visible amount of item shown in relation to root
}

animData.one.container.addEventListener('click', () => {
  animation1.playSegments([10, 20], false)
})

function change(entries, observer) {
  console.log(entries)
  entries.forEach(entry => {
    console.log(entry.target, entry.intersectionRatio)
    if (entry.intersectionRatio >= options.threshold) {
      entry.target.classList.add('inView')
    } else {
      entry.target.classList.remove('inView')
    }
  })
}
let observer = new IntersectionObserver(change, options) // set callback and options

document.querySelectorAll('.intersection').forEach(intersection => {
  observer.observe(intersection) // observe object and pass object as 'entries' array
})
