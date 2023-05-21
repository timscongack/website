function UKFoodAttitudes () {
  // This code is identical Tech Diversity with remapping of specific data for input into the
  this.name = 'UK Food Attitudes 2018' // Name for the visualisation to appear in the menu bar.
  this.id = 'uk-food-attitudes' // Each visualisation must have a unique ID with no special characters.
  this.loaded = false // Property to represent whether data has been loaded.

  this.preload = function () {
    // Preload the data. This function is called automatically by the gallery when a visualisation is added.
    let self = this
    this.data = loadTable(
      './data/food/ukFoodAttitudes.csv',
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

    let questions = this.data.columns
    for (let i = 1; i < questions.length; i++) {
      this.select.option(questions[i]) // First entry is empty.
    }
  }

  this.pie = new PieChart(width / 2, height / 2, width * 0.4) // Create a new pie chart object.

  this.draw = function () {
    push()
    if (!this.loaded) {
      console.log('Data not yet loaded')
      return
    }
    drawPie(this.select.value(), this.data, this.pie, 'UK Food: ') //draw standard pie
    pop()
  }
}
