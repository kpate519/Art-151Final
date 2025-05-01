const unsolvablePuzzle = (p) => {
    let cols, rows;
    let tileSize = 40;
  
    p.setup = function () {
      const container = document.querySelector('.puzzle-exhibit .canvas-container');
      const canvas = p.createCanvas(400, 400);
      canvas.parent(container);
      cols = p.width / tileSize;
      rows = p.height / tileSize;
    };
  
    p.draw = function () {
      p.background(20, 40, 20); // dark green
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          p.push();
          p.translate(x * tileSize + tileSize / 2, y * tileSize + tileSize / 2);
          let angle = p.frameCount * 0.01 * p.noise(x, y);
          p.rotate(angle);
          p.stroke(50, 255, 100);
          p.noFill();
          p.rectMode(p.CENTER);
          p.rect(0, 0, tileSize * 0.9, tileSize * 0.9);
          p.pop();
        }
      }
    };
  };
  new p5(unsolvablePuzzle);
  
  