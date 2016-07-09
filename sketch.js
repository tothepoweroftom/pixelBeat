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

var vscale = 64;

function preload() {
  sampler = new Tone.Sampler({
    A: {
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
  video.size(width/vscale, height/vscale)
  //video.hide();
  pixelDensity(1);
  noStroke();
  fill(0);
  frameRate(4);
}

function draw() {
  background(0);
  video.loadPixels();
  loadPixels();
  for(var y=0;y<video.height;y++){
    for(var x=0;x<video.width;x++){
      var index = (x + (y*video.width))*4;
      var r = video.pixels[index+0];
      var g = video.pixels[index+1];
      var b = video.pixels[index+2];
      
      var bright = (r+g+b)/3;
      
      var w = vscale;
      
      fill(bright);
      rectMode(CENTER);
      rect(x*vscale, y*vscale, w,w);
    }
  }

}
