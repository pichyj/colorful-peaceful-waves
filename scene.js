/* exported buildScene */
function buildScene() {
  // TODO: Procedurally generate aspects of your scene here.
  // add seashell emojis

  let scene = {
    background: "tan",
    panels: [],
    // text and emojis here
    texts: [
      { text: "home is where the", color: "black", size: 20 },
      { text: "waves crash", color: "black", z: 20, y: 10 },
      { text: "🐚", size: 10, z: -150, x: -120, y: 20 },
      { text: "🐚", size: 10, z: -150, x: -150, y: -12 },
      { text: "🦀", size: 10, z: -150, x: -300, y: 7 },
      { text: "🦞", size: 10, z: -150, x: -250, y: -30 },
      { text: "🦀", size: 10, z: -150, x: -254, y: 40 },
      { text: "🦪", size: 10, z: -150, x: -196, y: 18 },
      { text: "🦪", size: 10, z: -150, x: -320, y: -40 }
    ]
  };

  // anything that changes in loop defined here
  let steps = [
    { color: "#FFFFFF", shift: -30 },
    { color: "#17C9AE", shift: 0 },
    { color: "#11A58E", shift: 20 },
    { color: "#0E9580", shift: 50 },
    { color: "#0C8C78", shift: 90 },
    { color: "#0C816F", shift: 120 },
    { color: "#0B7666", shift: 150 },
    { color: "#08564A", shift: 180 },
    { color: "#09473E", shift: 210 },
    { color: "#093F37", shift: 240 },
    { color: "#083730", shift: 270 },
    { color: "#07312B", shift: 300 },
    { color: "#072823", shift: 330 },
    { color: "#06211D", shift: 360 },
    { color: "#041613", shift: 390 },
    { color: "#010807", shift: 420 },
    { color: "#000000", shift: 450 }
  ];

  // one for loop to loop over steps to not have multiple loops
  // can change i, x,y, etc
  for (let i = 0; i < 20; i++) {
    for (let { color, shift } of steps) {
      scene.panels.push({
        i: i,
        x: shift + i * 7,
        y: -170 + i * 20,
        width: 60,
        height: 20,
        color: color,
        z: +90 + i
      });
    }
  }

  return scene;
}

/* global engine */
/* exported renderScene */
function renderScene(scene) {
  engine.setBackground(scene.background);

  // edit loop for faster and different movement
  for (let { i, color, x, y, z, width, height } of scene.panels) {
    let dx = 70 * sin(i / 5 + millis() / 1000.0);
    engine.placePanel(color, dx + x, y, z, width, height);
  }

  for (let { text, color, x, y, z, size } of scene.texts) {
    engine.placeText(text, color, x, y, z, size);
  }

  let camZ = 20 * noise(millis() / 13000.0) - width;
  let camX = constrain(mouseX, 0, width) + 20 * noise(millis() / 2000.0);
  let camY = height / 2 + 20 * noise(millis() / 15000.0);

  if (mouseIsPressed) {
    for (let { i, color, x, y, z, width, height } of scene.panels) {
      let dx = 100 * sin(i / 8 + millis() / 2000.0);
      engine.placePanel(color, dx + x, y, z, width, height);
    }

    for (let { text, color, x, y, z, size } of scene.texts) {
      engine.placeText(text, color, x, y, z, size);
    }

    camZ = 20 * noise(millis() / 13000.0) - width;
    camX = constrain(mouseX, 0, width) + 20 * noise(millis() / 2000.0);
    camY = height / 2 + 20 * noise(millis() / 15000.0);
  }

  engine.setCamera(camX, camY, camZ);
}
