const bloomingFlower = (p) => {
  let totalPetals = 12;
  let angleOffset;
  let bloomProgress = 0;
  let bloomSpeed = 0.005;

  p.setup = function () {
    const container = document.querySelector('.codegarden .canvas-container');
    const canvas = p.createCanvas(400, 400);
    canvas.parent(container);
    p.angleMode(p.DEGREES);
    p.noStroke();
    angleOffset = 360 / totalPetals;

    canvas.elt.style.borderRadius = "12px";
  };

  p.draw = function () {
    p.background('#D5F4E6');
    p.translate(p.width / 2, p.height / 2);

    bloomProgress += bloomSpeed;

    if (bloomProgress > 1.2) {
      bloomProgress = 0; // Reset after fully bloomed (with a little delay)
    }

    for (let i = 0; i < totalPetals; i++) {
      p.push();
      p.rotate(i * angleOffset);
      drawPetal(p, Math.min(bloomProgress, 1));
      p.pop();
    }

    drawCenter(p);
  };

  function drawPetal(p, progress) {
    let petalLength = 50 * progress;
    let petalWidth = 20 * progress;

    p.fill(p.lerpColor(p.color('#FF6F91'), p.color('#FFC1C1'), progress));
    p.ellipse(0, -petalLength / 2, petalWidth, petalLength);
  }

  function drawCenter(p) {
    p.fill('#FFF3B0');
    p.ellipse(0, 0, 20, 20);
  }
};

new p5(bloomingFlower);
