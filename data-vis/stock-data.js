function stockSearch (heightLine, width) {
  //ES6 variable declarion - some variables allowed to be 'swapped later'
  //'let' or defined as constructor varables, const variables for global fixed variables
  this.name = 'S&P Index Last 250 Days' // Name for the visualisation to appear in the menu bar.
  this.title = 'SPY Index Fund Growth Last 250 Days'
  this.width = width + 200
  this.id = 'stonks' //unique id
  this.data = [] // store stock table
  let count = 0 // this.steps counter
  let yMap //yAxis mapping larger scope of variable set
  let drawTicker = [] // store stock table larger scope of variable set
  let ticker = '' //stock ticker symbol for searching

  this.preload = function () {
    let self = this
    this.data = loadTable(
      './data/stocks/SPY.csv',
      'csv',
      'header',
      // Callback function to set the value
      // this.loaded to true.
      function (table) {
        self.loaded = true
      }
    )
  }

  this.setup = function () {
    if (!this.loaded) {
      console.log('Data not yet loaded')
      return
    }

    //assign stock values to an array and use inline map function to round
    this.closingValue = this.data.getColumn('Close')
    this.closingValue = this.closingValue.map(function (eachItem) {
      return Number(parseFloat(eachItem).toFixed(2))
    })

    //get the max and min values of stock array to map axis, inline map function to round
    this.maxTicker = max(
      this.closingValue.map(function (eachItem) {
        return Number(parseFloat(eachItem).toFixed(2))
      })
    )
    this.minTicker = min(
      this.closingValue.map(function (eachItem) {
        return Number(parseFloat(eachItem).toFixed(2))
      })
    )

    //get the number of periods in the data
    this.time = this.closingValue.length / 1 // number of x tick values
    this.step = this.width / this.time // length of each tick

    //ES6 inplace function for map x positions to graph
    xPos = Float32Array.from({ length: this.time }, (x, i) =>
      map(i, 0, this.time, 0, this.width)
    )

    //ES6 inplace function to map inputted y values plot height minus max ticker value
    yMap = item => map(item, 1.5, 0, 10, heightLine - this.maxTicker)
  }

  this.draw = function () {
    push()
    drawTitle(this.title, heightLine, width + 30)
    pop()

    //stock and tickerValue data, using let as per ES6 to allow swapping
    let tickerValue = map(
      this.closingValue[count],
      this.minTicker,
      this.maxTicker,
      0,
      1
    )

    // store that number at each this.step (the x-axis tick values)
    if (frameCount & this.step & (count < this.closingValue.length)) {
      drawTicker.push(tickerValue)
      count += 1
    }

    //iterate over data list to redraw line, never go to the last value of the array to allow for point to be drawn
    //ES6 forEach used instead of standard for loop, arrays values not needed to replaced with _, i returns the index for use
    drawTicker.forEach(function (_, i) {
      push()
      let yCur = yMap(drawTicker[i])
      let yNext = yMap(drawTicker[i + 1])
      let xCur = xPos[i]
      let xNext = xPos[i + 1]

      //calculate the current moving average
      this.tickerAvg = mean(drawTicker.slice(0, i))
      this.tickerAvgPrev = mean(drawTicker.slice(0, i - 1))

      //draw moving average
      line(xCur, yMap(this.tickerAvgPrev), xNext, yMap(this.tickerAvg))
      //draw the line segment
      strokeWeight(2)
      stroke(100)
      //stock value line
      line(xCur, yCur, xNext, yNext)
      line(0, yMap(this.minTicker), this.width, yMap(this.minTicker))

      // vertical lines (x-values)
      strokeWeight(0.5)
      //draw line colours depending on period average
      if (this.tickerAvg > drawTicker[i]) {
        stroke(220, 20, 60)
      } else {
        stroke(32, 178, 170)
      }
      line(xCur, yCur, xCur, yMap(this.tickerAvg))
      pop()
    })

    // draw ellispe at last data point
    if (count > 1) {
      push()
      ellipse(
        xPos[drawTicker.length - 1],
        yMap(drawTicker[drawTicker.length - 1]),
        4,
        4
      )
      fill(255)
      rect(0, 0, 200, 120)
      strokeWeight(2)
      fill(0)
      noStroke()
      text('Closing Value  : ' + this.closingValue[count - 1], 20, 20)
      //min/max of the drawn values so far
      text('Low  : ' + min(this.closingValue.slice(0, count)), 20, 40)
      text('High  : ' + max(this.closingValue.slice(0, count)), 20, 60)
      text('Moving Average  : ' + mean(this.closingValue.slice(0, count)),20,80)
      text('% From High to Low  : ' +round((max(this.closingValue.slice(0, count))/min(this.closingValue.slice(0, count)) -1) * 100) +'%',20,100)
      pop()
    }
  }
}
