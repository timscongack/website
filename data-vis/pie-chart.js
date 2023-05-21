function PieChart (x, y, diameter) {
  this.x = x
  this.y = y
  this.diameter = diameter
  this.draw = function (data, labels, colours, title) {
    let angles = []
    let labelSize = 15
    let lastAngle = 0
    let rlabel = 1.3

    for (let i = 0; i < data.length; i++) {
      angles.push(map(data[i], 0, 100, 0, 360)) //map data values to angles
      noStroke()
      fill(colours[i])
      arc(this.x,this.y,this.diameter,this.diameter,lastAngle,lastAngle + radians(angles[i])) //draw pie component
      fill(255)
      ellipse(x, y, diameter / 1.65) //draw circle for doughnut
      fill(0)
      textSize(labelSize)
      let wText = textWidth(String(angles[i]))
      let hText = textAscent() - textDescent() //dynamically determines character width using the p5.js methods

      text(round(data[i], 1) + '% ' + labels[i], // draw data labels
        //for x/y determine the x/y coodinate of the middle of the angle using cos/som (unit circle),
        //add current angle to previous angle then find the middle times the diameter
        width / 2 +
          cos(lastAngle + radians(angles[i] / 3)) * diameter * (rlabel / 2) - wText / 2 + 20, height / 2 +
          sin(lastAngle + radians(angles[i] / 2)) * diameter * (rlabel / 2) + hText / 2
      )
      lastAngle += radians(angles[i])

      makeLegendItem(labels[i], i, colours[i]) // draw legend
    }

    noStroke() //Draw Title
    textAlign('center', 'center')
    textSize(24)
    text(title, this.x, this.y - 55 - this.diameter * 0.6)
  }
}
