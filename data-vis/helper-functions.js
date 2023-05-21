// --------------------------------------------------------------------
// Data processing helper functions.
// --------------------------------------------------------------------
function sum (data) {
  //sums data after checking type
  let total = 0
  data = stringsToNumbers(data) // Ensure that data contains numbers and not strings.
  data.forEach(function (_, i) {
    total = total + data[i]
  })
  return total
}

function mean (data) {   //sums the data
  data = stringsToNumbers(data) // Ensure that data contains numbers and not strings.
  return (sum(data) / data.length).toFixed(6)
}

function sliceRowNumbers (row, start = 0, end) {
  let rowData = []
  if (!end) {
    end = row.arr.length // Parse all values until the end of the row.
  }
  for (i = start; i < end; i++) {
    rowData.push(row.getNum(i))
  }
  return rowData
}

function stringsToNumbers (array) {//Dynamically get line labels, xAxis, and plot y Values
  return array.map(Number)
}

function axisData (data) { //generate all axis data and reurn key datapoints
  axisX = []
  dataY = []
  lineLabels = []
  data.columns.forEach(function (_, i) {
    if (i < 1) return
    lineLabels.push(data.columns[i])
    axisX.push(data.getColumn(data.columns[0])) //First Column as xAxis
    //Map all other columns to dataY as arrays, map the data in the process for scaling, using first data column as standard scale
    maxCurrentColValues = max(data.getColumn(data.columns[i]))
    maxFirstColValues = max(data.getColumn(data.columns[1]))

    currentColValues = data.getColumn(data.columns[i]).map(function (item) {
      return map(item, 0.5, maxCurrentColValues, 0.5, maxFirstColValues)
    })
    firstColValues = data.getColumn(data.columns[1])
    dataY.push(currentColValues)
  })
  return lineLabels, axisX, dataY, firstColValues
}

function onlyUnique (value, index, self) {
  //returns is distinct values only
  return self.indexOf(value) === index //strict comparison of type and value to ensure distinct strings vs. numbers
}

function axisDataTicks (input, axisX) {
  //generates p5.js vectors arrays for ticks
  data = []
  axisX.forEach(function (_, i) {
    data.push([])
    axisX[i].forEach(function (_, j) {
      data[i].push(createVector(axisX[i][j], dataY[i][j]))
    })
  })
}

const formatTextWrap = (text, maxLineLength) => {
  //text wrap function (see references)
  const words = text.replace(/[\r\n]+/g, ' ').split(' ')
  let lineLength = 0

  // use functional reduce, instead of for loop
  return words.reduce((result, word) => {
    if (lineLength + word.length >= maxLineLength) {
      lineLength = word.length
      return result + `\n${word}` // don't add spaces upfront
    } else {
      lineLength += word.length + (result ? 1 : 0)
      return result ? result + ` ${word}` : `${word}` // add space only when needed
    }
  }, '')
}

// --------------------------------------------------------------------
// Plotting helper functions
// --------------------------------------------------------------------

function xAxis (x,chartX,xLine,chartW,xLine,xAxisLabelCount,xRangeMin,xRangeMax,padding,data,labels) {
  //function to draw x axis labels and axis
  push()
  for (let i = 0; i < xAxisLabelCount; i++) {
    fill(0)
    stroke(0)
    strokeWeight(1)
    line(chartX, xLine, chartW, xLine)
    let label = map(i, 0, xAxisLabelCount - 1, xRangeMin, xRangeMax)
    strokeWeight(0)
    textAlign(CENTER)
    textSize(10)
    fill(0)
    let x = map(label, xRangeMin, xRangeMax, chartX, chartX + chartW - padding)
    text(round(label) + '', x, xLine + padding / 2)
    strokeWeight(1)
    line(x, xLine + 3, x, xLine - 3)
    let incrementRange = xRangeMax / xAxisLabelCount / 4 //reduce increment range to modify hover box for yearly line graph
    if (mouseX > x - incrementRange && mouseX < x + incrementRange) {
      //if hover over x point draw a line and show the labels for the data
      strokeWeight(1)
      line(x, xLine, x, 50)
      fill(255)
      rect(40, 0, 200, (data.getColumnCount() + 1) * 10)
      strokeWeight(0)
      fill(255)
      stroke(1)
      for (let j = 0; j < data.getColumnCount(); j++) {
        textString = data.columns[j] + ': ' + data.get(i, j) //textstring from AxisData helper function and data
        fill(0)
        text(textString, 135, 10 + j * 10)
      }
    }
  }
  pop()
}

function yAxis (y,chartY,yLine,chartH,yLine,yAxisLabelCount,yRangeMin,yRangeMax,padding) {
  //function to draw y axis labels and axis
  push()
  fill(0)
  stroke(0)
  strokeWeight(1)
  line(yLine, chartY, yLine, chartH)
  for (let i = 0; i < yAxisLabelCount; i++) {
    let label = map(i, 0, yAxisLabelCount - 1, yRangeMin, yRangeMax)
    strokeWeight(0)
    textAlign(RIGHT, CENTER)
    textSize(10)
    fill(0)
    let y =
      chartY +
      chartH -
      map(label, yRangeMin, yRangeMax, chartY, chartY + chartH - padding)
    text(round(label) + '', yLine - padding / 4, y)
    strokeWeight(1)
    line(yLine + 3, y, yLine - 3, y)
  }
  pop()
}
function lineDotDraw (colour, x1, x2, y1, y2) { //draws lines and dots
  stroke(colour)
  line(x1, y1, x2, y2) //draw line
  fill(0)
  stroke(0)
  ellipse(x1, y1, 5, 5) //draw dot
  ellipse(x2, y2, 5, 5) //final dot
}

// --------------------------------------------------------------------
// Box Drawing/Category helper functions
// --------------------------------------------------------------------

function Circle (x, y, width, height, category) {
  //generates/draws boxes objects for waffle and supports mouseOver functioni
  this.category = category
  this.mouseOver = function (mouseX, mouseY) {
    // pass in mouseX and mouseY to make the code more readable
    if (mouseX > x && mouseX < x + width && mouseY > y && mouseY < y + height) {
      // check if mouse is over a box
      return this.category.name //if mouse over return category name
    }
    return false
  }
  this.draw = function () {
    //draw each circle
    push()
    fill(category.colour)
    ellipse(x, y, width - 1, height - 1)
    fill(200)
    pop()
  }
}

// --------------------------------------------------------------------
// colour helper functions
// --------------------------------------------------------------------

function colourArray (length) {
  //this function inputs a length integer then exports an array of hex colour values based on the required length and defined colours
  const colours = [
    '#0099cc',
    '#33ccff',
    '#ccccff',
    '#ff9966',
    '#581845',
    '#5F9EA0',
    '#FFD700',
    '#90EE90',
    '#C71585',
    '#800000'
  ]
  let newColours = []
  let n = 0

  do {     //Using the ES6 do-while loop
    newColours.push(colours[n % colours.length]) //mod the index to assign the colour value out of existing choices
    n++
  } while (n < length)
  return newColours
}

// --------------------------------------------------------------------
// Basic Helpers Functions
// --------------------------------------------------------------------

function drawTitle (title) { //draw title
  fill(0)
  noStroke()
  textAlign('center', 'center')
  textSize(24)
  text(title, 600, 25)
}

function makeLegendItem (label, i, colours) {//Make Legend
  push()
  const labelSpace = 30
  let x = width - 200 //adjusted x position to display on left of draft
  let y = labelSpace * i //each label below each other evenly spaces
  let boxWidth = labelSpace / 2 //box dimensions
  let boxHeight = labelSpace / 2

  fill(colours)
  ellipse(x + 10, y + 10, boxWidth, boxHeight)
  fill('black')
  noStroke()
  textAlign('left', 'center')
  textSize(12)
  text(label, x + boxWidth + 10, y + boxWidth / 2)
  pop()
}

function checkMouse (_, _, item) {
  //checkmouse function iterates over rows and columns of generated items and creates the display box
  for (let i = 0; i < item.length; i++) {
    for (let j = 0; j < item[i].length; j++) {
      if (item[i][j].category != undefined) {
        let mouseOver = item[i][j].mouseOver(mouseX, mouseY)

        if (mouseOver != false) {
          push()
          fill(0)
          textSize(20)
          let tWidth = textWidth(mouseOver)
          textAlign(LEFT, TOP)
          rect(mouseX, mouseY, tWidth + 20, 40)
          fill(255)
          text(mouseOver, mouseX + 10, mouseY + 10)
          pop()
          break
        }
      }
    }
  }
}

function drawPie (value, data, pie, name) {
  //function that supports every pie chart drawing
  let colMapped = []
  let category = value // Get the value of the company we're interested in from the
  let col = data.getColumn(category) // Get the column of raw data for companyName.
  //loop to push percentage values to percentage integer values for pie chart
  for (let i = 0; i < col.length; i++) {
    colMapped.push(map(col[i], 0, 1, 0, 100))
  }
  let labels = data.getColumn(0) // Copy the row labels from the table (the first item of each row).
  col = stringsToNumbers(col) // Convert all data strings to numbers.
  let colours = colourArray(6) // Colour to use for each category.
  let title = name + value // Make a title.
  pie.draw(col, labels, colours, title) //Draws pie
}
