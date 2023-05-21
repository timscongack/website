// Global variable to store the gallery object. The gallery object is a container for all the visualisations.
let gallery

let fontRegular
function preload () {
  fontRegular = loadFont('fonts/lato.ttf')
}

function setup () {
  // Create a canvas to fill the content div from index.html.
  canvasContainer = select('#app')
  let height = 800
  let width = 1250
  let c = createCanvas(width, height)
  //assign an id to the canvas
  c.id('mainCanvas')
  c.parent('app')

  // Create a new gallery object.
  gallery = new Gallery()
  // Add the visualisation objects here.
  gallery.addVisual(new TechDiversityRace(width, height))
  gallery.addVisual(new TechDiversityGender(width, height))
  gallery.addVisual(new UKFoodAttitudes(width, height))
  gallery.addVisual(new microNutrientTimeseries(width, height))
  gallery.addVisual(new employeeExit(width, height))
  gallery.addVisual(new foodBubbles(width, height))
  gallery.addVisual(new covidvix(width, height))
  gallery.addVisual(new covidstocks(width, height))
  gallery.addVisual(new stockSearch(width, height))
}

function draw () {
  background(255)
  if (gallery.selectedVisual != null) {
    gallery.selectedVisual.draw()
  }
}
