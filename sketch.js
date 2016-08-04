/*
 * pixelBeat - Web Etude No. 2
 * The aim of this etude is to pixellize the video. From this we use the pixel array to look at the brightness
 * of individual arrays
 *
 *
 *
 */

//Video File Pointers & Canvas
var video;
var vidDisplay;
var canvas;
var vscale = 40;
var rects = [];

//SAMPLER///
var sampler;
var sampler2;
var sampler3;

//UI ---------------------

//CircularSlider
var slider;
var buttonVid;
var isPlaying = false;

//
var sliderDiv;
var sliderDiv2;

var sliderRad = 220;
var margin = 30



var notes = ["A.1", "A.2", "A.3", "A.4", "A.5", "A.6",
  "B.1", "B.2", "B.3", "B.4", "B.5", "B.6",
  "C.1", "C.2", "C.3", "C.4", "C.5", "C.6",
  "D.1", "D.2", "D.3", "D.4", "D.5", "D.6"
];


var synthNotes = ["Bb2", "Db3", "Eb3", "Gb3", "Ab3", "Bb3", "Db4", "Eb4", "Gb4", "Ab4", "Bb4", "Db5", "Eb5", "Gb5", "Ab5", "Bb5"];

function Rectangle(_x, _y, _width, _height, _sample, _note) {
  this.x = _x;
  this.y = _y;
  this.theta = (atan2((_y - 4*_height),(_x - 6*_width))*(180/PI))+180;
  this.isOn = true;
  this.width = _width;
  this.height = _height;
  this.sample = _sample;
  this.note = _note;
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



//TONE.JS EFFECTS
var pingPong = new Tone.PingPongDelay("2n", 0.3).toMaster();
var filter1 = new Tone.Filter(200, "highpass").connect(pingPong);
pingPong.wet.value = 0.2;


//PRELOAD - SAMPLERS
function preload() {

  //ACOUSTIC SAMPLER
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
  }).chain(filter1, pingPong );

  //ELECTRONIC SAMPLER
  sampler2 = new Tone.Sampler({
      A: {
        1: "./audio/beatz/beat_1.wav",
        2: "./audio/beatz/beat_2.wav",
        3: "./audio/beatz/beat_3.wav",
        4: "./audio/beatz/beat_4.wav",
        5: "./audio/beatz/beat_5.wav",
        6: "./audio/beatz/beat_6.wav",



      },
      B: {
        1: "./audio/synth/synth_1.wav",
        2: "./audio/synth/synth_2.wav",
        3: "./audio/synth/synth_3.wav",
        4: "./audio/synth/synth_4.wav",
        5: "./audio/synth/synth_5.wav",
        6: "./audio/synth/synth_6.wav",



      },
      // D: {
      //   1: "./audio/synthBass/bass_1.wav",
      //   2: "./audio/synthBass/bass_2.wav",
      //   3: "./audio/synthBass/bass_3.wav",
      //   4: "./audio/synthBass/bass_4.wav",
      //   5: "./audio/synthBass/bass_5.wav",
      //   6: "./audio/synthBass/bass_6.wav",




     C: {
        1: "./audio/space/space1.wav",
        2: "./audio/space/space2.wav",
        3: "./audio/space/space3.wav",
        4: "./audio/space/space4.wav",
        5: "./audio/space/space5.wav",
        6: "./audio/space/space6.wav",



    },
    D: {
      1: "./audio/choirElec/choir_1.wav",
      2: "./audio/choirElec/choir_2.wav",
      3: "./audio/choirElec/choir_3.wav",
      4: "./audio/choirElec/choir_4.wav",
      5: "./audio/choirElec/choir_5.wav",
      6: "./audio/choirElec/choir_6.wav",



    }
  }).chain(filter1, pingPong);


// sampler.reverse = true;
sampler2.reverse = true;

// GUITAR SAMPLER
sampler3 = new Tone.Sampler({
  // A: {
  //   1: "./audio/drum/drum1.wav",
  //   2: "./audio/drum/drum2.wav",
  //   3: "./audio/drum/drum3.wav",
  //   4: "./audio/drum/drum4.wav",
  //   5: "./audio/drum/drum5.wav",
  //   6: "./audio/drum/drum6.wav",



  // },
  A: {
    1: "./audio/guitar1/guitar1.wav",
    2: "./audio/guitar1/guitar2.wav",
    3: "./audio/guitar1/guitar3.wav",
    4: "./audio/guitar1/guitar4.wav",
    5: "./audio/guitar1/guitar5.wav",
    6: "./audio/guitar1/guitar6.wav",



  },
  B: {
    1: "./audio/guitar2/guitar1.wav",
    2: "./audio/guitar2/guitar2.wav",
    3: "./audio/guitar2/guitar3.wav",
    4: "./audio/guitar2/guitar4.wav",
    5: "./audio/guitar2/guitar5.wav",
    6: "./audio/guitar2/guitar6.wav",



  },
  C: {
    1: "./audio/guitar1/guitar1.wav",
    2: "./audio/guitar1/guitar2.wav",
    3: "./audio/guitar1/guitar3.wav",
    4: "./audio/guitar1/guitar4.wav",
    5: "./audio/guitar1/guitar5.wav",
    6: "./audio/guitar1/guitar6.wav",



  },
  D: {
    1: "./audio/guitar2/guitar1.wav",
    2: "./audio/guitar2/guitar2.wav",
    3: "./audio/guitar2/guitar3.wav",
    4: "./audio/guitar2/guitar4.wav",
    5: "./audio/guitar2/guitar5.wav",
    6: "./audio/guitar2/guitar6.wav",



  }
  // C: {
  //   1: "./audio/space/space1.wav",
  //   2: "./audio/space/space2.wav",
  //   3: "./audio/space/space3.wav",
  //   4: "./audio/space/space4.wav",
  //   5: "./audio/space/space5.wav",
  //   6: "./audio/space/space6.wav",



  // }
}).chain(filter1, pingPong );

//TURN DOWN THE VOLUME
sampler.volume.value = -10;
sampler2.volume.value = -10;
sampler3.volume.value = -10;
}

//NEXUS UI CONTROLS
nx.onload = function() {

  //Color
  position1.colors.accent = "#990000";
  position2.colors.accent = "#009900";

  nx.colorize("fill", "#000000");

  //XY Fader 1 - INSTRUMENTATION
  position1.on('*', function(data) {
      sampler.volume.value = map(data.x, 1, 0, -10, -35);
      sampler2.volume.value = map(data.x, 0, 1, -10, -35);
      sampler3.volume.value = map(data.y, 0, 1, -10, -35);





    })

    //XY Fader 2 - FX
  position2.on('*', function(data) {
    filter1.frequency.value = map(data.x, 0, 1, 50,3000);
    pingPong.wet.value = map(data.y, 0, 1, 0, 1);
  //  print(pingPong.wet.value);



  })
}

function setup() {

  canvas = createCanvas(480, 320);
  canvas.position(windowWidth / 2 - canvas.width / 2, windowHeight / 2);
  buttonVid = createButton("Play");


  //SLIDER DIV
  sliderDiv = createDiv("");
  sliderDiv.id("slider");
  sliderDiv.class("rslider");
  sliderDiv.position(windowWidth / 2 - sliderRad, windowHeight / 2 - sliderRad);

  slider = $('#slider').roundSlider({
    radius: sliderRad,
    width: 6,
    handleSize: "+20",
    sliderType: "range",
    max: "362",
    value: "0,360",
    showTooltip: "false",
    change: "onValueChange"
  });


  // specify multiple formats for different browsers
  video = createVideo(['assets/cloud25forweb.mp4']);
  vidDisplay = createVideo(['assets/cloud25.mp4']);
  vidDisplay.id("vidDisplay");
  video.loop();
  vidDisplay.loop();
  video.size(480 / vscale, 320 / vscale);
  vidDisplay.size(640, 320);
  vidDisplay.position(windowWidth / 2-vidDisplay.width/2, windowHeight / 2 - vidDisplay.height / 2);


  //video.position(0,0);
  video.hide();
  pixelDensity(1);
  noStroke();
  fill(0);
  frameRate(3);

  for (var y = 0; y < video.height; y++) {
    for (var x = 0; x < video.width; x++) {
      var index = (x + (y * video.width));
      //console.log(index);
      rects[index] = new Rectangle(x * vscale, y * vscale, vscale, vscale, notes[index % 25], synthNotes[index % 16]);
      //rects[index].display();
      print("Theta = " + rects[index].theta);
    }
  }
}

function windowResized() {
  //resizeCanvas(windowWidth/4, windowHeight/4);
  // canvas.position(windowWidth / 2 - vidDisplay.width/2, windowHeight / 4);
  //vidDisplay.position(windowWidth / 4+vidDisplay.width/2, windowHeight / 4);


}

function draw() {
  //background(255);
  video.loadPixels();
  //loadPixels();
  for (var y = 0; y < video.height; y++) {
    for (var x = 0; x < video.width; x++) {
      var index = (x + (y * video.width)) * 4;
      var r = video.pixels[index + 0];
      var g = video.pixels[index + 1];
      var b = video.pixels[index + 2];

      var bright = (r + g + b) / 3;

      if (bright > 220 && rects[index/4].isOn === true) {

        sampler.triggerAttack(rects[index / 4].sample);
        sampler2.triggerAttack(rects[index / 4].sample);
        sampler3.triggerAttack(rects[index / 4].sample);


        //print("x,y = " + x + " " + y);
      }

      var w = vscale;

      fill(bright);
      rectMode(CENTER);
      //rect(x * vscale, y * vscale, w, w);
    }
  }


}

function videoPlay() {
  if (!isPlaying) {
    video.loop();
    isPlaying = true;
    buttonVid.label = "Stop";

  } else {
    video.pause();
    isPlaying = false;
    buttonVid.label = "Play";

  }


}

function onValueChange(e){


  var array = e.value.split(',');
  var max = parseInt(array[1]);
  var min = parseInt(array[0]);

//  console.log("max = " + max + " min = " + min);

  for (var y = 0; y < 8; y++) {
    for (var x = 0; x < 12; x++) {
      var index = (x + (y * 12));
      if(rects[index].theta <= max && rects[index].theta >= min){
        rects[index].isOn = true;
      } else {
        rects[index].isOn = false;
      }
    }
  }


}
