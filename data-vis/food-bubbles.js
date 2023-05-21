function foodBubbles () {
  this.name = 'UK  Citizen Food Preferences Over Time' // Name for the visualisation to appear in the menu bar.
  this.id = 'food-bubbles' // Each visualisation must have a unique ID with no special characters.

  let data = []
  let bubbles = []
  let maxAmt
  let years = []
  let yearButtons = []

  this.preload = function () {
    data = loadTable('data/food/foodData.csv', 'csv', 'header') //data preload
  }

  this.setup = function () {
    let r = data.getRows()
    let numColumns = data.getColumnCount()


    for (let i = 5; i < numColumns;i++ ) { //iterate through each column to get years skipping over type columns
      let y = data.columns[i]
      years.push(y)
      b = createButton(y); //use DOM method to create buttons
      (i>((numColumns)/2)) ? b.position(400,-480+i*21):b.position(350,-60+i*21) //creates two columns for buttons
      b.mousePressed(function () {
        changeYear(this.elt.innerHTML)
      })
      yearButtons.push(b)

    }
    maxAmt = 0

    for (var i = 0;i < r.length;i++) {//iterate through each row to populate the Bubble data and skips blank rows
      if (r[i].get(0) != '') {
        var b = new this.Bubble(r[i].get(0)) //constructor function for each new bubble
        for (var j = 5;j < numColumns;j++) {//iterate over year columns starting at first year column
          if (r[i].get(j) != '') {
            //handler for blank columns
            var n = r[i].getNum(j) //assign value in table to n
            if (n > maxAmt) {
              // push forward the highest amount until a higher amount is found
              maxAmt = n //keep a tally of the highest value
            }
            b.data.push(n)
          } else {
            b.data.push(0)
          }
        }
        bubbles.push(b)
      }
    }

    for (var i = 0; i < bubbles.length; i++) { //for each bubble map its maxAmt to params in setdata function
      bubbles[i].setData(0)
    }
  }

  function changeYear (year) {
    var y = years.indexOf(year)
    for (var i = 0; i < bubbles.length; i++) {
      bubbles[i].setData(y)
    }
  }

  this.destroy = function () {
    //destroy for gallery to call to eliminate object instance when visual is not selected
    bubbles = [] //clears bubbles data so no additional bubbles are created when reloaded
    for (let i = 0; i < yearButtons.length; i++) {
      //iterate through year buttons an remove from DOM
      yearButtons[i].remove()
    }
  }

  this.draw = function () {
    push();
    drawTitle(this.name)
    translate(width / 2, height / 2) // move to center of the screen
    for (let i = 0; i < bubbles.length; i++) {
      bubbles[i].update(bubbles)
      bubbles[i].draw()
    }
    pop();
  }

  this.Bubble = function (_name) {
    this.size = 20 //set bubble, use createVector method to determine position
    this.target_size = 300
    this.pos = createVector(0, 0)
    this.dir = createVector(0, 0) //create directional variables
    this.name = _name
    this.color = color(random(0, 255), random(0, 255), random(0, 255))
    this.data = []
    this.draw = function () {
      push()
      textAlign(CENTER)
      noStroke()
      fill(this.color)
      ellipse(this.pos.x, this.pos.y, this.size)
      fill(0)
      let pad = 50
      formatTextWrap(this.name, this.size)
      textSize(10)
      text(this.name, this.pos.x - pad / 2, this.pos.y - pad / 5, pad)
      pop()
    }
    this.update = function (_bubbles) {//create method to update direction will take an arguement, which will be the array of bubbles
      this.dir.set(0, 0) //set to 0
      for (let i = 0;i < _bubbles.length;i++) {//iterate through all the bubbles
        if (_bubbles[i].name != this.name) {
          //if not current calculate distance between the two bubbles using vectors
          let v = p5.Vector.sub(this.pos, _bubbles[i].pos) //use the mag method to calc the distance between two vectors
          let d = v.mag() //check overlap
          if (d < this.size / 2 + _bubbles[i].size / 2) {
            d > 0 ? this.dir.add(v) : this.dir.add(p5.Vector.random2D()) //take distance and for each overlap at mag to move the bubble
          }
        }
      }

      this.dir.normalize() //call normalize in place to ensure a large number isn't compounded on v
      this.dir.mult(1) //multiply the directional by 5 to speed up push out of bubbles
      this.pos.add(this.dir)
      //slowly increases bubble size until the bubble reaches the mapped size using tenary operation
      this.size =
        this.size <= this.target_size ? (this.size += 1) : (this.size -= 1)
    }
    this.setData = function (i) {//set data function maps the maxAmt value to a max size of 250 pixels
      this.target_size = map(this.data[i], 0, maxAmt, 75, 250)
    }
  }
}
