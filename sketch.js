/*
 * @name Video Pixels
 * @frame 320,240
 * @description <p>Load a video, manipulate its pixels and draw to canvas.
 * <p><em><span class="small"> To run this example locally, you will need the
 * <a href="http://p5js.org/reference/#/libraries/p5.dom">p5.dom library</a>
 * at least one video file, and a running <a href="https://github.com/processing/p5.js/wiki/Local-server">local server</a>.</span></em></p>
 */
var video;
var canvas;
var stepSize;
var counter;
var sampler;

var slider

var vscale = 64;
var rects = [];

var noX = canvas.width / vscale;
var noY = canvas.height / vscale;

function Rectangle(_x, _y, _width, _height, _sample) {
  this.x = _x;
  this.y = _y;
  this.width = _width;
  this.height = _height;
  this.sample = _sample;
  this.display = function() {
    noFill();
    stroke(255, 0, 0);
    rect(this.x, this.y, this.width, this.height);

  };
  this.displayTrigger = function() {
    fill(255, 0, 0, 200);
    stroke(255, 0, 0);
    rect(this.x + vscale / 2, this.y + vscale / 2, this.width, this.height);

  };

}

function preload() {
  sampler = new Tone.Sampler({
    A: {
      1: "./audio/piano/piano1.wav",
      2: "./audio/piano/piano2.wav",
      3: "./audio/piano/piano3.wav",
      4: "./audio/piano/piano4.wav",
      5: "./audio/piano/piano5.wav",
      6: "./audio/piano/piano6.wav",



    },
    B: {
      1: "./audio/piano/piano1.wav",
      2: "./audio/piano/piano2.wav",
      3: "./audio/piano/piano3.wav",
      4: "./audio/piano/piano4.wav",
      5: "./audio/piano/piano5.wav",
      6: "./audio/piano/piano6.wav",



    }
  }).toMaster();

}

function setup() {
  canvas = createCanvas(640, 360);



  // specify multiple formats for different browsers
  video = createVideo(['assets/cloudchambercontrast2.mov',
    'assets/fingers.webm'
  ]);
  video.loop();
  video.size(width / vscale, height / vscale)
  video.hide();
  pixelDensity(1);
  noStroke();
  fill(0);
  frameRate(4);

  for (var y = 0; y < video.height; y++) {
    for (var x = 0; x < video.width; x++) {
      var index = (x + (y * video.width));
      rects[index] = new Rectangle(x * vscale, y * vscale, vscale, vscale, x);
      rects[index].display();
    }
  }
}

function draw() {
  background(255);
  video.loadPixels();
  //loadPixels();
  for (var y = 0; y < video.height; y++) {
    for (var x = 0; x < video.width; x++) {
      var index = (x + (y * video.width)) * 4;
      var r = video.pixels[index + 0];
      var g = video.pixels[index + 1];
      var b = video.pixels[index + 2];

      var bright = (r + g + b) / 3;

      if (bright > 220) {

        rects[index / 4].displayTrigger();
        var sampleNo = String(rects[index / 4].sample % 6 + 1);
        var note = "A." + sampleNo;
        sampler.triggerAttack(note);
        print("x,y = " + x + " " + y);
      }

      var w = vscale;

      fill(bright);
      rectMode(CENTER);
      //rect(x * vscale, y * vscale, w, w);
    }
  }



}