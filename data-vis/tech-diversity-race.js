function TechDiversityRace () {
  //variable declaration all within constructor or let as per ES6 variable encloser/best practice
  this.name = 'Tech Diversity: Race'
  this.id = 'tech-diversity-race'
  this.loaded = false
  let categories = []

  this.preload = function () {
    // Preload the data. This function is called automatically by the gallery when a visualisation is added.
    let self = this
    textFont(fontRegular)
    this.data = loadTable(
      './data/tech-diversity/race-2018.csv',
      'csv',
      'header',
      function (table) {
        self.loaded = true
      }
    )
  }

  this.destroy = function () {
      //remove dropdown from the DOM
      this.select.remove()
  }

  this.setup = function () {
    if (!this.loaded) {
      console.log('Data not yet loaded')
      return
    }
    this.select = createSelect() // Create a select DOM element.
    this.select.position(400, 20)
    let categories = this.data.columns // Fill the options with all company names.

    for (let i = 1; i < categories.length; i++) {
      // First entry is empty.
      this.select.option(categories[i])
    }
  }

  this.pie = new PieChart(width / 2, height / 2, width * 0.4) // Create a new pie chart object.

  this.draw = function () {
    push()
    if (!this.loaded) {
      console.log('Data not yet loaded')
      return
    }
    drawPie(this.select.value(), this.data, this.pie, 'Tech Diversity at: ') //draw standard pie
    pop()
  }
}
