var video;
var slider;
var button;
var buttonCartoon;
var activeEffectFunction = null; // Variable to store the function to be called
var height, width

function setup() {
    createCanvas(640, 480);
    pixelDensity(1);
    video = createCapture(VIDEO);
    video.hide();
    noStroke();
    angleMode(DEGREES);

    slider = createSlider(8, 30, 8);
    slider.position(10, 10);

    // Create buttons
    buttonPieBrightness = createButton('Pie Brightness');
    buttonPieBrightness.position(150, 10);
    buttonPieBrightness.mousePressed(() => activeEffectFunction = drawPieBrightness);

    buttonGreyScale = createButton('Grey Scale');
    buttonGreyScale.position(260, 10);
    buttonGreyScale.mousePressed(() => activeEffectFunction = drawGreyScale);

    buttonCartoon = createButton('Cartoony');
    buttonCartoon.position(350, 10);
    buttonCartoon.mousePressed(() => activeEffectFunction = drawCartoony);
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

    for (var x = 0; x < video.width; x++) {
      for (var y = 0; y < video.height; y++) {
        var index = (x + y * video.width) * 4;
        var r = video.pixels[index+0];
        var g = video.pixels[index+1];
        var b = video.pixels[index+2];

        // Quantize the color values
        r = floor(r / 255 * quantizeLevels) * (255 / (quantizeLevels - 1));
        g = floor(g / 255 * quantizeLevels) * (255 / (quantizeLevels - 1));
        b = floor(b / 255 * quantizeLevels) * (255 / (quantizeLevels - 1));

        fill(r, g, b);
        rect(x, y, 1, 1); // Full resolution
      }
    }
  }





