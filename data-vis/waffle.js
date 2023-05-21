function Waffle (x,y,width,height,circle_across,circle_down,table,columnHeading,possibleValues,i) {
  let column = table.getColumn(columnHeading)
  let colours = colourArray(possibleValues.length) //call colour theme of app
  let categories = [] //categories array
  let circle = [] //circle array

  function categoryLocation (categoryName) {
    //get the categories
    for (let i = 0; i < possibleValues.length; i++) {
      if (categoryName == categories[i].name) {
        return i
      }
    }
    return -1
  }
  function addCategories () {
    for (let i = 0; i < possibleValues.length; i++) {
      // iterate over the possible values
      categories.push({
        name: possibleValues[i], // number of answers
        count: 0,
        colour: colours[i % colours.length] // modulo to not run to end of array
      })
    }
    for (let i = 0; i < column.length; i++) {
      let catLocation = categoryLocation(column[i])
      if (catLocation != -1) {
        categories[catLocation].count++
      }
    }
    for (let i = 0; i < categories.length; i++) {
      categories[i].circle = round(
        (categories[i].count / column.length) * (circle_down * circle_across)
      )
    }
  }
  function addcircle () {
    //generates the circles for each 'box'
    let currentCategory = 0
    let currentCategoryBox = 0
    let boxWidth = width / circle_across
    let boxHeight = height / circle_down

    for (let i = 0; i < circle_down; i++) {
      circle.push([])
      for (let j = 0; j < circle_across; j++) {
        if (currentCategoryBox == categories[currentCategory].circle) {
          currentCategoryBox = 0
          currentCategory++
        }
        //push data to create each new circle
        circle[i].push(new Circle(x + j * boxWidth,y + i * boxHeight,boxWidth,boxHeight,categories[currentCategory])
        )
        currentCategoryBox++
      }
    }
  }
  addCategories()
  addcircle()
  checkMouse(mouseX, mouseY, circle)
  this.draw = function () {     // draw waffle diagram
    for (let i = 0; i < circle.length; i++) {
      for (let j = 0; j < circle[i].length; j++) {
        if (circle[i][j].category != undefined) {
          circle[i][j].draw()
        }
      }
    }
    textSize(12)
    textAlign('left')
    text(columnHeading, x + 100, y)
  }
}
