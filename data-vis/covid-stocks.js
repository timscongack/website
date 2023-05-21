function covidstocks () {
  this.name = 'Top US Stocks and Indices for the First 270 Days of 2020'
  this.id = 'covidstocks'
  this.height = height
  this.width = width
  this.chart = []
  this.length = []

  this.preload = function () {
    this.data = loadTable('./data/stocks/covidStocks.csv','csv','header')
  }

  this.setup = function () {
    axisX = []
    dataY = []
    lineLabels = []
    this.length = Number(     //Dynamically get line labels, xAxis, and plot y Values
      (this.length = this.data.getColumn(this.data.columns[0]).length)
    )
    axisData(this.data)
    axisDataTicks(this.data, axisX)
  }

  this.draw = function () {
    push()
    let axisXmin = min(axisX[0])
    let axisXmax = max(axisX[0])
    drawTitle(this.name, height, width)
    //Create instance of line chart and draw note the 'data' is a returned vectored array from axisDataTicks
    this.colours = colourArray(this.data.getColumnCount())
    this.chart = new LineChart(data,this.colours,lineLabels,this.width - 200,this.height,axisXmin,axisXmax,0,350,this.length,this.data)
    this.chart.drawLineChart()
    pop()
  }
}
