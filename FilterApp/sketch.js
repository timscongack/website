var video;
var slider;
var button;
var buttonCartoon;
var activeEffectFunction = null; // Variable to store the function to be called
var height, width;
var frontCamera = false;

function createEffectButton(label, positionY, effectFunction) {
  let button = createButton(label);
  button.position(10, positionY);
  button.mousePressed(() => activeEffectFunction = effectFunction);
  return button;
}

var controlDiv;

function setup() {
  let cnv = createCanvas(640, 480);
  cnv.parent('FilterImageContainer');
  pixelDensity(1);
  video = createCapture(VIDEO);
  video.hide();
  noStroke();
  angleMode(DEGREES);

  controlDiv = createDiv(''); // create a div for the controls
  controlDiv.id('controls'); // give the div an id for styling
  controlDiv.style('height', height + 'px'); // set the control div to the same height as the canvas
  controlDiv.position(cnv.position().x + 20, cnv.position().y); // set position of controlDiv to the top right of the canvas

  slider = createSlider(8, 30, 8);
  slider.parent(controlDiv);

  // Create buttons with the new function
  buttonPieBrightness = createEffectButton('Pie Brightness', drawPieBrightness);
  buttonGreyScale = createEffectButton('Grey Scale', drawGreyScale);
  buttonCartoon = createEffectButton('Cartoony', drawCartoony);
  buttonNightVision = createEffectButton('Night Vision', drawNightVision);
  buttonInvertFilter = createEffectButton('Invert Filter', drawInvertFilter);
  buttonThresholdFilter = createEffectButton('Threshold Filter', drawThresholdFilter);
}


var buttonHeight = 20; // The height of each button
var buttonSpacing = 5; // The space between each button

function createEffectButton(label, effectFunction) {
  let button = createButton(label);
  button.parent(controlDiv); // make the buttons children of the control div
  button.mousePressed(() => activeEffectFunction = effectFunction);
  return button;
}


function draw() {
  background(0);
  video.loadPixels();

    if (activeEffectFunction) {
        activeEffectFunction();
    }
}

function flipCamera() {
    frontCamera = !frontCamera; // flip the frontCamera variable

    let constraints;

    if (frontCamera) {
        constraints = {
            video: {
                facingMode: "user"
            },
            audio: false
        };
    } else {
        constraints = {
            video: {
                facingMode: {
                    exact: "environment"
                }
            },
            audio: false
        };
    }

    video = createCapture(constraints, () => {
        video.size(width, height);
    });
}

function draw() {
  background(0);
  video.loadPixels();

    if (activeEffectFunction) {
        activeEffectFunction();
    }
    }

function drawPieBrightness() {
  var arcSize = slider.value();

  for (var x = 0; x < video.width; x += arcSize) {
    for (var y = 0; y < video.height; y += arcSize) {
      var index = (x + y * video.width) * 4;
      var r = video.pixels[index+0];
      var g = video.pixels[index+1];
      var b = video.pixels[index+2];

      var clr = color(r, g, b);
      var pixelBrightness = brightness(clr);

      push();
      translate(x, y);
      var theta = map(pixelBrightness, 0, 255, 0, 360);
      rotate((180 - theta) / 2);
      fill(r,g,b);
      arc(0, 0, arcSize, arcSize, 0, theta);
      pop();
    }
  }
}

function drawGreyScale() {
    var arcSize = slider.value();

    for (var x = 0; x < video.width; x += arcSize) {
      for (var y = 0; y < video.height; y += arcSize) {

        var brightnessSum = 0;
        var count = 0;

        for (var dx = 0; dx < arcSize; dx++) {
          for (var dy = 0; dy < arcSize; dy++) {
            var index = (x + dx + (y + dy) * video.width) * 4;
            var r = video.pixels[index+0];
            var g = video.pixels[index+1];
            var b = video.pixels[index+2];
            //var gray = r * 0.299 + g * 0.587 + b * 0.114; better way to calc greyscale
            brightnessSum += (r + g + b) / 3; // Calculate brightness value as average of RGB values
            count++;
          }
        }

        var avgBrightness = brightnessSum / count;

        fill(avgBrightness, avgBrightness, avgBrightness);
        rect(x, y, arcSize, arcSize);
      }
    }
  }

  function drawCartoony() {
    var quantizeLevels = slider.value(); // Slider controls the quantize levels

    for (var x = 0; x < video.width; x+=2) {
      for (var y = 0; y < video.height; y+=2) {
        var index = (x + y * video.width) * 4;
        var r = video.pixels[index+0];
        var g = video.pixels[index+1];
        var b = video.pixels[index+2];

        // Quantize the color values
        r = floor(r / 255 * quantizeLevels) * (255 / (quantizeLevels - 1));
        g = floor(g / 255 * quantizeLevels) * (255 / (quantizeLevels - 1));
        b = floor(b / 255 * quantizeLevels) * (255 / (quantizeLevels - 1));

        fill(r, g, b);
        rect(x, y, 2, 2); // half resolution
      }
    }
  }

function drawNightVision() {
  var scaleBrightness = map(slider.value(), slider.elt.min, slider.elt.max, 1, 8);

  for (var x = 0; x < video.width; x += 2) {
    for (var y = 0; y < video.width; y += 2) {
      var index = (x + y * video.width) * 4;
      var r = video.pixels[index+0];
      var g = video.pixels[index+1];
      var b = video.pixels[index+2];

      var brightness = (r + g + b) / 3 * scaleBrightness; // Scale the brightness by the slider value

      fill(brightness, brightness * 1.85, brightness * 1.4); // Simulate night vision by making the image mostly green
      rect(x, y, 2, 2); // half resolution
    }
  }
}

function drawInvertFilter(){
  for (var x = 0; x < video.width; x++) {
    for (var y = 0; y < video.height; y++) {

      var index = (x + y * video.width) * 4;
      //invert the channel values
      var r = 255 - video.pixels[index + 0];
      var g = 255 - video.pixels[index + 1];
      var b = 255 - video.pixels[index + 2];

      // Update the canvas pixels, not the video pixels
      fill(r, g, b);
      rect(x, y, 2, 2);
    }
  }
}

function drawThresholdFilter() {
  for (var x = 0; x < video.width; x++) {
    for (var y = 0; y < video.height; y++) {

        var index = (x + y * video.width) * 4;
        var r = video.pixels[index + 0];
        var g = video.pixels[index + 1];
        var b = video.pixels[index + 2];
        var bright = 0.3 * r + 0.59 * g + 0.11 * b; // LUMA ratios

        var threshold = map(slider.value(), slider.elt.min, slider.elt.max, 0, 255);

        if (bright > threshold) {
            r = 255;
            g = 255;
            b = 255;
        } else {
            r = 0;
            g = 0;
            b = 0;
        }

        // Update the canvas pixels, not the video pixels
        fill(r, g, b);
        rect(x, y, 2, 2);  // Set the pixel on the canvas
    }
  }
}
