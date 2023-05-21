function microNutrientTimeseries () {
  this.name = 'UK Micro Nutrient Consumption 2001 - 2019'
  this.id = 'microNutrientTimeseries'
  this.height = height
  this.width = width
  this.chart = []
  this.length = []

  this.preload = function () {
    let self = this
    this.data = loadTable(
      './data/food/microNutrientIntake.csv',
      'csv',
      'header',
      // Callback function to set the value this.loaded to true.
      function (table) {
        self.loaded = true
      }
    )
  }

  this.setup = function () {
    axisX = []
    dataY = []
    lineLabels = []
    //Dynamically get line labels, xAxis, and plot y Values
    this.length = Number(
      (this.length = this.data.getColumn(this.data.columns[0]).length)
    )
    axisData(this.data)
    axisDataTicks(this.data, axisX)
  }

  this.draw = function () {
    push()
    let axisXmin = min(axisX[0])
    let axisXmax = max(axisX[0])
    //colours within function scope, colour for each col note the 'data' is a returned vectored array from axisDataTicks
    this.colours = colourArray(this.data.getColumnCount())
    drawTitle(this.name, width, height)
    //Create instance of line chart and draw
    this.chart = new LineChart(data,this.colours,lineLabels,this.width - 200,this.height,axisXmin,axisXmax,85,130,this.length,this.data    )
    this.chart.drawLineChart()
    pop()
  }
}
