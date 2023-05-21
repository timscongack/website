function LineChart(data, colours, lineLabels, width, height, xRangeMin,xRangeMax, yRangeMin,yRangeMax, arrayLength,rawdata) {
  this.padding = 30 //padding
  this.chartWidth = width - this.padding //width of chart accounting for padding
  this.chartHeight = height - this.padding  //height of chart accounting for padding
  const xLine = map(yRangeMin, yRangeMin, yRangeMax, this.chartHeight, this.padding) //where x sits on the xAxis in terms of the plot, mapping to plot
  const yLine = map(xRangeMin, xRangeMin, xRangeMax, this.padding, this.chartWidth) //where y sits on the yAxis in terms of the plot, mapping to plot

  this.drawLineChart = function() {
    push();
for (let i = 0; i < data.length; i++) {   //iterate through the data, and plot the data. Used nested standard loops
      let xPrev,yPrev = [NaN,NaN]
      for (let j = 0; j < data[i].length; j++) {
        xCurr = map(data[i][j].x, xRangeMin, xRangeMax, this.padding, this.chartWidth) //maps x value from data vector
        yCurr = height - map(data[i][j].y, yRangeMin, yRangeMax, this.padding, this.chartHeight)  //maps y value from data vector

        if (xPrev,yPrev == [NaN]) { //if first then assign current else draw
          [xPrev,yPrev] = [xCurr, yCurr]
        } else {
        lineDotDraw(colours[i],xPrev,xCurr,yPrev,yCurr) //draw each line and ellipse using previous values and current line values
         xPrev = xCurr
         yPrev = yCurr
        }
      }
   }

    yAxis(yCurr,this.padding,yLine,this.chartHeight,yLine,arrayLength,yRangeMin,yRangeMax,this.padding) //draw y axis
    xAxis(xCurr,this.padding,xLine,this.chartWidth,xLine,arrayLength,xRangeMin,xRangeMax,this.padding,rawdata,lineLabels) //draw x axis with data labels/lines
    lineLabels.forEach(function (_,i) {makeLegendItem(lineLabels[i],i,colours[i])})//Draw Legend
    pop();
  }
}
