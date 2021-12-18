// Created by Adam Smith (amsmith@ucsc.edu)
// Department of Computational Media, UC Santa Cruz

class Engine {
  
  constructor() {
    this.statsEnabled = false;
    this.reset();
  }

  reset() {
    this.background = "white";
    this.objects = [];
    this.cam = { x: 0, y: 0, z: 0 };
  }

  setBackground(background) {
    console.assert(typeof background === "string");
    this.background = background;
  }

  placePanel(c, x, y, z, w, h) {
    this.objects.push({
      type: "panel",
      c: c || "black",
      x: x || 0,
      y: y || 0,
      z: z || 0,
      w: w || 0,
      h: h || 0
    });
  }

  placeText(t, c, x, y, z, s) {
    this.objects.push({
      type: "text",
      t: t || "???",
      c: c || "black",
      x: x || 0,
      y: y || 0,
      z: z || 0,
      s: s || 0
    });
  }

  setCamera(x, y, z) {
    this.cam = { x, y, z };
  }

  draw() {
    background(this.background);
    rectMode(CENTER);

    // z-sort all visible objects
    this.objects.sort((a, b) => b.z - a.z);

    // render them with their respective parameters
    for (let obj of this.objects) {
      const z = (-this.cam.z + obj.z) / width;
      stroke(obj.c);
      fill(obj.c);
      if (obj.type == "text") {
        textSize(obj.s / z);
        text(
          obj.t,
          (obj.x + this.cam.x - width / 2) / z + width / 2,
          (obj.y + this.cam.y - height / 2) / z + height / 2
        );
      }
      if (obj.type == "panel") {
        rect(
          (obj.x + this.cam.x - width / 2) / z + width / 2,
          (obj.y + this.cam.y - height / 2) / z + height / 2,
          obj.w / z,
          obj.h / z
        );
      }
    }

    if (this.statsEnabled) {
      textSize(20);
      stroke(0);
      fill(255);
      let msg = `${this.objects.length} items, ${Math.round(10 * frameRate()) / 10 +
        " fps"}`;
      text(msg, 0, 20);
    }
  }
}

/* global buildScene, renderScene */

let sceneData = buildScene();
let engine = new Engine();

/* exported setup */
function setup() {
  createCanvas(400, 200);
}

/* exported keyPressed */
function keyPressed() {
  if (keyCode == 83) {
    engine.statsEnabled = !engine.statsEnabled;
    // 's'
  }
}

/* exported draw */
function draw() {
  engine.reset();
  renderScene(sceneData);
  engine.draw();
}
