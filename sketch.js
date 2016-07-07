/*
 * @name Video Pixels
 * @frame 320,240
 * @description <p>Load a video, manipulate its pixels and draw to canvas.
 * <p><em><span class="small"> To run this example locally, you will need the
 * <a href="http://p5js.org/reference/#/libraries/p5.dom">p5.dom library</a>
 * at least one video file, and a running <a href="https://github.com/processing/p5.js/wiki/Local-server">local server</a>.</span></em></p>
 */
var fingers;
var canvas;
var stepSize;
var counter;


//AUDIO
var synth = new Tone.FMSynth({
  "harmonicity": 2.21,
  "modulationIndex": 20,

  "carrier": {
    "volume": 0,
    "portamento": 6,
    "oscillator": {
      type: "sine",
    },

    "envelope": {
      "attack": 0.1,
      "decay": 1,
      "sustain": 0.2,
      "release": 0.5,
    },

    "filterEnvelope": {
      "attack": 0.01,
      "decay": 0.0,
      "sustain": 1,
      "release": 0.5,
      "baseFrequency": 20000,
      "octaves": 8,
    },
  },

  "modulator": {
    "volume": -15,
    "portamento": 0,
    "oscillator": {
      "type": "sine",
    },
    "envelope": {
      "attack": 0.01,
      "decay": 0.01,
      "sustain": 1,
      "release": 1,
    },
    "filterEnvelope": {
      "attack": 0.1,
      "decay": 0,
      "sustain": 1,
      "release": 0,
      "baseFrequency": 16000,
      "octaves": 8,
    },
  },
}).toMaster();

// var synth = new Tone.SimpleSynth({
//   "oscillator": {
//     "type": "triangle",
//     "volume": -20,
//   },
//   "envelope": {
//     "attack": 0.1,
//     "decay": 0.2,
//     "sustain": 0.2,
//     "release": 0.5,
//   }
// }).toMaster();

function setup() {
  canvas = createCanvas(640, 360);
  stepSize = (width) / 16;
  counter = 0;

  // specify multiple formats for different browsers
  fingers = createVideo(['assets/cloudchambercontrast2.mov',
    'assets/fingers.webm'
  ]);
  fingers.loop();
  fingers.hide();
  noStroke();
  fill(0);
  frameRate(24);
}

function draw() {
  background(255);
  fingers.loadPixels();


  for (var y = 0; y < height; y += stepSize) {
    for (var x = 0; x < width; x += stepSize) {
      var id = y * width + x;
      var darkness = (255 - fingers.pixels[id * 4]) / 255;
      var radius = width/16;
      if (darkness == 1) {
        print("x= " + x + " y= " + y);
        switch (x) {
          case 0:
            break;
          case 40:
            break;
          case 80:
            break;
          case 120:
            synth.triggerAttackRelease("A3", "8n");
            break;
          case 160:
            synth.triggerAttackRelease("C3", "8n");

            break;
          case 200:
            synth.triggerAttackRelease("D3", "8n");

            break;
          case 240:
            synth.triggerAttackRelease("E3", "8n");

            break;
          case 280:
            synth.triggerAttackRelease("G3", "8n");

            break;
          case 320:
            synth.triggerAttackRelease("A4", "8n");

            break;
          case 360:
            synth.triggerAttackRelease("C4", "8n");

            break;
          case 400:
            synth.triggerAttackRelease("D4", "8n");

            break;
          case 440:
            synth.triggerAttackRelease("E4", "8n");

            break;
          case 480:
            synth.triggerAttackRelease("G4", "8n");

            break;


        }
      }
      rect(x, y, radius, radius);
    }
  }

}