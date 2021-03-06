/*
* pixelBeat - Web Etude No. 2
* The aim of this etude is to pixellize the video. From this we use the pixel array to look at the brightness
* of individual arrays
*
*
*
*/
var video;
var canvas;
var stepSize;
var counter;
var sampler;

var slider;
var buttonVid;

var vscale = 48;
var rects = [];


var notes = ["A.1", "A.2", "A.3", "A.4", "A.5", "A.6",
  "B.1", "B.2", "B.3", "B.4", "B.5", "B.6",
  "C.1", "C.2", "C.3", "C.4", "C.5", "C.6",
  "D.1", "D.2", "D.3", "D.4", "D.5", "D.6"
];

function Rectangle(_x, _y, _width, _height, _sample) {
  this.x = _x;
  this.y = _y;
  this.width = _width;
  this.height = _height;
  this.sample = _sample;
  this.counter = 10;
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
var pingPong = new Tone.PingPongDelay("4n", 0.1).toMaster();
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
      1: "./audio/cello/cello1.wav",
      2: "./audio/cello/cello2.wav",
      3: "./audio/cello/cello3.wav",
      4: "./audio/cello/cello4.wav",
      5: "./audio/cello/cello5.wav",
      6: "./audio/cello/cello6.wav",



    },
    C: {
      1: "./audio/hang/hang1.wav",
      2: "./audio/hang/hang2.wav",
      3: "./audio/hang/hang3.wav",
      4: "./audio/hang/hang4.wav",
      5: "./audio/hang/hang5.wav",
      6: "./audio/hang/hang6.wav",



    },
    D: {
      1: "./audio/violin/violin1.wav",
      2: "./audio/violin/violin2.wav",
      3: "./audio/violin/violin3.wav",
      4: "./audio/violin/violin4.wav",
      5: "./audio/violin/violin5.wav",
      6: "./audio/violin/violin6.wav",



    }
  }).connect(pingPong);


  sampler.envelope.attack = 0.2;
  sampler.envelope.release = 0.5;
  //sampler.reverse = true;
}

function setup() {
  canvas = createCanvas(windowWidth/4, windowHeight/4);
  canvas.position(windowWidth/2,windowHeight/2);
  buttonVid = createButton("Play");



  // specify multiple formats for different browsers
  video = createVideo(['assets/redoneContrast480.mov']);
  video.loop();
  video.size(480 / vscale, 320 / vscale);
  video.position(0,0);
  video.hide();
  pixelDensity(1);
  noStroke();
  fill(0);
  frameRate(4);

  for (var y = 0; y < video.height; y++) {
    for (var x = 0; x < video.width; x++) {
      var index = (x + (y * video.width));
      rects[index] = new Rectangle(x * vscale, y * vscale, vscale, vscale, notes[index%25]);
      rects[index].display();
      print(notes[index]);
    }
  }
}

function windowResized(){
  resizeCanvas(windowWidth, windowHeight);


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
        sampler.triggerAttack(rects[index / 4].sample);
        print("x,y = " + x + " " + y);
      }

      var w = vscale;

      fill(bright);
      rectMode(CENTER);
      //rect(x * vscale, y * vscale, w, w);
    }
  }


}
