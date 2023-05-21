function employeeExit (width, height) {
  this.name = 'Employee Exit Sentiment' //name of visual in menu
  this.title = 'Employee Exit Sentiment of TAFE Employees' //title on the page of the visual
  this.id = 'employee-exit' // unique visual id
  let data //data variable used let declartion vs. constructor to allow for ES6 looping
  let waffles = [] //waffles array
  let questions = [] //questions array
  let values = [] //possible values array

  this.preload = function () {
    //preload the data
    data = loadTable('data/employee/exitdata.csv', 'csv', 'header')
  }

  this.setup = function () {
    this.length = Number((this.length = data.getColumn(data.columns[0]).length)) //Dynamically get line labels, xAxis, and plot y Values
    axisData(data)
    //note the below 4 lines of code could be simplied but did the work of dynamically
    //pulling and array then sorting so included to show ES6 implementation of single line functions
    questions = lineLabels
    let valuesOrder = [
      'StronglyAgree',
      'Agree',
      'Neutral',
      'Disagree',
      'StronglyDisagree'
    ] //desired sort order
    values = firstColValues.filter(onlyUnique) //remove duplicates to get all unique values in dataset
    values.sort((a, b) => valuesOrder.indexOf(a) - valuesOrder.indexOf(b)) //inplace/anon function for sorting array by desired order
  }

  this.destroy = function () {
    //destroy for gallery to call to eliminate object instance when visual is not selected
    waffles = [] //clears waffles data so no additional bubbles are created when reloaded
  }

  //draw waffles and labels
  this.draw = function () {
    push()
    questions.forEach(function (_, i) {
      //push data to arrays
      let xParam = i * 100 > height / 2 ? height * 0.75 : height * 0.1875 //adjust xpos of the waffle if goes over y axis limit (off the page)
      let yParam = i * 100 > height / 2 ? height * 0.75 : 0 //adjust ypos of the waffle if goes over y axis limit (off the page)
      waffles.push(
        new Waffle(xParam,125 + i * 120 - yParam,100,100,5,5,data,questions[i],values,i)
      )
    })
    values.forEach(function (_, i) { //generate legend
      makeLegendItem(values[i], i, colourArray(values.length)[i])
    })
    questions.forEach(function (_, i) {//draw the pushed waffles
      waffles[i].draw()
    })
    pop()
    push()
    drawTitle(this.title, height, width + 30)
    pop()
  }
}
