const gardenGame = (p) => {
  let flowers = [];
  let animals = [];
  let time = 0; // For day-night cycle

  function bloomFlower(x, y) {
    let flowerType = p.floor(p.random(3)); // 0, 1, or 2
    let flower = {
      x: x,
      y: y,
      size: 20,
      maxSize: p.random(40, 70),
      color: p.color(p.random(255), p.random(255), p.random(255)),
      centerColor: p.color(p.random(50, 50, 0)),
      type: flowerType,
      angle: p.random(p.TWO_PI),
      speed: p.random(0.2, 0.5)
    };
    flowers.push(flower);
  }

  function drawFlower(flower) {
    p.push();
    p.translate(flower.x, flower.y);

    if (flower.type === 0) {
      // 🌻 Sunflower
      p.fill(flower.color);
      let petalCount = 20;
      for (let i = 0; i < petalCount; i++) {
        p.push();
        p.rotate(p.TWO_PI / petalCount * i);
        p.ellipse(0, -flower.size / 1.5, flower.size / 4, flower.size / 2);
        p.pop();
      }
      p.fill(flower.centerColor);
      p.ellipse(0, 0, flower.size / 2);
    } else if (flower.type === 1) {
      // 🌷 Tulip
      p.fill(flower.color);
      p.beginShape();
      p.vertex(0, 0);
      p.bezierVertex(-flower.size / 2, -flower.size, -flower.size / 2, -flower.size * 1.5, 0, -flower.size);
      p.bezierVertex(flower.size / 2, -flower.size * 1.5, flower.size / 2, -flower.size, 0, 0);
      p.endShape(p.CLOSE);
    } else if (flower.type === 2) {
      // 🌼 Daisy
      p.fill(255);
      let petalCount = 12;
      for (let i = 0; i < petalCount; i++) {
        p.push();
        p.rotate(p.TWO_PI / petalCount * i);
        p.ellipse(0, -flower.size / 2, flower.size / 6, flower.size / 2);
        p.pop();
      }
      p.fill(255, 204, 0);
      p.ellipse(0, 0, flower.size / 3);
    }

    p.pop();
  }

  function createAnimal() {
    let animal = {
      x: p.random(p.width),
      y: p.height - 40,
      size: p.random(20, 30),
      speed: p.random(1, 2) * (p.random() < 0.5 ? 1 : -1) // Random left or right
    };
    animals.push(animal);
  }

  function drawAnimal(animal) {
    p.push();
    p.translate(animal.x, animal.y);
    p.fill(255, 230, 0); // Yellow color for chicks
    p.ellipse(0, 0, animal.size, animal.size * 0.8); // Body
    p.ellipse(0, -animal.size / 2, animal.size / 1.5, animal.size / 1.5); // Head
    p.fill(0);
    p.ellipse(-animal.size / 5, -animal.size / 2.2, 3, 3); // Left Eye
    p.ellipse(animal.size / 5, -animal.size / 2.2, 3, 3); // Right Eye
    p.fill(255, 102, 0); // Orange for beak
    p.triangle(0, -animal.size / 2, -3, -animal.size / 2 + 5, 3, -animal.size / 2 + 5);
    p.pop();
  }
  
  p.setup = function () {
    const container = document.querySelector('.canvas-container');
    const canvas = p.createCanvas(container.offsetWidth, container.offsetHeight);
    canvas.parent(container);
    p.noStroke();

    // Create a few animals
    for (let i = 0; i < 20; i++) {
      createAnimal();
    }
  };

  p.draw = function () {
    // Day-night background
    time += 0.005;
    let skyColor;
    if (p.sin(time) > 0) {
      // Daytime
      let c = p.map(p.sin(time), 0, 1, 100, 200);
      skyColor = p.color(c, c + 50, 235); // Light blue
    } else {
      // Nighttime
      let c = p.map(p.sin(time), -1, 0, 20, 70);
      skyColor = p.color(c, c, c + 80); // Dark blue
    }
    p.background(skyColor);

    // Stars at night
    if (p.sin(time) < 0) {
      for (let i = 0; i < 100; i++) {
        p.fill(255);
        p.noStroke();
        p.ellipse(p.random(p.width), p.random(p.height / 2), 1, 1);
      }
    }

    // Ground
    p.fill(34, 139, 34);
    p.rect(0, p.height - 50, p.width, 50);

    // Flowers
    flowers.forEach(flower => {
      drawFlower(flower);
      if (flower.size < flower.maxSize) {
        flower.size += 0.2;
      }
      flower.x += Math.cos(flower.angle) * flower.speed;
      flower.y += Math.sin(flower.angle) * flower.speed;
    });

    // Animals
    animals.forEach(animal => {
      animal.x += animal.speed;
      if (animal.x < 0 || animal.x > p.width) {
        animal.speed *= -1; // Bounce back
      }
      drawAnimal(animal);
    });
  };

  p.mousePressed = function () {
    bloomFlower(p.mouseX, p.mouseY);
  };
};

new p5(gardenGame);
