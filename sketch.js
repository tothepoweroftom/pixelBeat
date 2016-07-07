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
  "harmonicity": 3.01,
  "modulationIndex": 10,

  "carrier": {
    "volume": 0,
    "portamento": 6,
    "oscillator": {
      type: "sine",
    },

    "envelope": {
      "attack": 0.1,
      "decay": 1,
      "sustain": 0.25,
      "release": 0.5,
    },

    "filterEnvelope": {
      "attack": 0.1,
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
var sampler

function preload() {
  sampler = new Tone.Sampler({
    A: {
      1: "./audio/anomaly_1.wav",
      2: "./audio/anomaly_2.wav",
      3: "./audio/anomaly_3.wav",
      4: "./audio/anomaly_4.wav",
      5: "./audio/anomaly_5.wav",
      6: "./audio/anomaly_6.wav",
      7: "./audio/anomaly_7.wav",
      8: "./audio/anomaly_8.wav",
      9: "./audio/anomaly_9.wav",
      10: "./audio/anomaly_10.wav",
      11: "./audio/anomaly_12.wav",
      12: "./audio/anomaly_12.wav",
      13: "./audio/anomaly_13.wav",
      14: "./audio/anomaly_14.wav",
      15: "./audio/anomaly_15.wav",
      16: "./audio/anomaly_16.wav",
      17: "./audio/anomaly_17.wav",
      18: "./audio/anomaly_18.wav",
      19: "./audio/anomaly_19.wav",
      20: "./audio/anomaly_20.wav",
      21: "./audio/anomaly_21.wav",
      22: "./audio/anomaly_22.wav",
      23: "./audio/anomaly_23.wav",
      24: "./audio/anomaly_24.wav",


    }
  }).toMaster();

}

function setup() {
  canvas = createCanvas(640, 360);
  stepSize = (width) / 64;
  counter = 0;

  // specify multiple formats for different browsers
  fingers = createVideo(['assets/cloudchambercontrast2.mov',
    'assets/fingers.webm'
  ]);
  fingers.loop();
  //fingers.hide();
  noStroke();
  fill(0);
  frameRate(14);
}

function draw() {
  //background(255);
  fingers.loadPixels();


  for (var y = 0; y < height; y += stepSize) {
    for (var x = 0; x < width; x += stepSize) {
      var id = y * width + x;
      var darkness = (255 - fingers.pixels[id * 4]) / 255;
      var radius = width / 16;
      if (darkness == 1) {
        //print("x= " + x + " y= " + y);
        switch (x) {
          case 0:
            sample.triggerAttackRelease("A.1", "4n");

            break;
          case radius * 1:
            synth.triggerAttackRelease("C5", "4n");
            sampler.triggerAttackRelease("A.2", "4n");

            break;
          case radius * 2:
            synth.triggerAttackRelease("E5", "4n");
            sampler.triggerAttackRelease("A.3", "4n");

            break;
          case radius * 3:
            synth.triggerAttackRelease("A3", "4n");
                        sampler.triggerAttackRelease("A.4", "4n");

            break;
          case radius * 4:
            synth.triggerAttackRelease("B3", "4n");
            sampler.triggerAttackRelease("A.4", "4n");


            break;
          case radius * 5:
            synth.triggerAttackRelease("C3", "4n");
            sampler.triggerAttackRelease("A.5", "4n");


            break;
          case radius * 6:
            synth.triggerAttackRelease("D3", "4n");
            sampler.triggerAttackRelease("A.6", "4n");


            break;
          case radius * 7:
            synth.triggerAttackRelease("G3", "4n");
                        sampler.triggerAttackRelease("A.7", "4n");


            break;
          case radius * 8:
            synth.triggerAttackRelease("A4", "4n");
            sampler.triggerAttackRelease("A.8", "4n");


            break;
          case radius * 9:
            synth.triggerAttackRelease("C4", "4n");
            sampler.triggerAttackRelease("A.9", "4n");

            break;
          case radius * 10:
            synth.triggerAttackRelease("D4", "4n");
            sampler.triggerAttackRelease("A.10", "4n");

            break;
          case radius * 11:
            synth.triggerAttackRelease("E4", "4n");
            sampler.triggerAttackRelease("A.11", "4n");

            break;
          case radius * 12:
            synth.triggerAttackRelease("G4", "4n");
            sampler.triggerAttackRelease("A.12", "4n");

            break;


        }
      }
      rect(x, y, radius, radius);
    }
  }

}