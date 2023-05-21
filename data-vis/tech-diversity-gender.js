function TechDiversityGender() {

  this.name = 'Gender Diversity in the Technology Sector';   // Name for the visualisation to appear in the menu bar.
  this.id = 'tech-diversity-gender';    // Each visualisation must have a unique ID with no special characters.
  this.layout = {  // Layout object to store all common plot layout parameters and methods.
    // Locations of margin positions. Left and bottom have double margin size due to axis and tick labels.
    leftMargin: 130,
    rightMargin: width,
    topMargin: 100,
    bottomMargin: height,
    pad: 5,

    plotWidth: function() {
      return this.rightMargin - this.leftMargin;
    },

    grid: true,     // Boolean to enable/disable background grid.
    numXTickLabels: 10,     // Number of axis tick labels to draw so that they are not drawn on top of one another.
    numYTickLabels: 8,
  };

  this.midX = (this.layout.plotWidth() / 2) + this.layout.leftMargin;   // Middle of the plot: for 50% line.
  this.femaleColour = colourArray(2)[1]   // Default visualisation colours.
  this.maleColour = colourArray(8)[7]
  this.loaded = false;   // Property to represent whether data has been loaded.
  let rects = []; // Rect Data Object store arrays

  this.preload = function() {   // Preload the data. This function is called automatically by the gallery when a visualisation is added.
    var self = this;
    this.data = loadTable(
      './data/tech-diversity/gender-2018.csv', 'csv', 'header',
      function(table) {       // Callback function to set the value this.loaded to true.
        self.loaded = true;
      });

  };

  this.setup = function() {};

  this.draw = function() {
    push();
    if (!this.loaded) {
      console.log('Data not yet loaded');
      return;
    }

    this.drawCategoryLabels();     // Draw Female/Male labels at the top of the plot.

    let lineHeight = (height - this.layout.topMargin) /
        this.data.getRowCount();

    for (let i = 0; i < this.data.getRowCount(); i++) {


      let lineY = (lineHeight * i) + this.layout.topMargin;       // Calculate the y position for each company.
      let company = {       // Create an object that stores data from the current row.
        'name': this.data.getString(i, 'company'),
        'female': this.data.getNum(i, 'female'),
        'male': this.data.getNum(i, 'male'),
      };
      // Draw the company name in the left margin.
      fill(0);
      noStroke();
      textAlign('right', 'top');
      text(company.name,
           this.layout.leftMargin - this.layout.pad,
           lineY);

      // Draw female employees rectangle.
      fill(this.femaleColour);
      rect(this.layout.leftMargin,
           lineY,
           this.mapPercentToWidth(company.female),
           lineHeight - this.layout.pad);

      boxWidth = this.mapPercentToWidth(company.female) - this.layout.leftMargin
      boxHeight = (lineY - (lineHeight - this.layout.pad) )

      // Draw male employees rectangle.
      fill(this.maleColour);
      rect(this.layout.leftMargin + this.mapPercentToWidth(company.female),
           lineY,
           this.mapPercentToWidth(company.male),
           lineHeight - this.layout.pad);
    }

    // Draw 50% line
    stroke(100);
    strokeWeight(1);
    line(this.midX,
         this.layout.topMargin-2,
         this.midX,
         this.layout.bottomMargin-4);
    //Draw Title
    drawTitle(this.name,width,height);
    pop();
  };

  this.drawCategoryLabels = function() {
    push();
    fill(0);
    noStroke();
    textAlign('left', 'top');
    text('Female',
         this.layout.leftMargin,
         this.layout.pad+70);
    textAlign('center', 'top');
    text('50%',
         this.midX,
         this.layout.pad+70);
    textAlign('right', 'top');
    text('Male',
         this.layout.rightMargin,
         this.layout.pad+70);
    pop();
  };

  this.mapPercentToWidth = function(percent) {
    return map(percent,
               0,
               100,
               0,
               this.layout.plotWidth());
  };
}
