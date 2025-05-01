const unsolvablePuzzle = (p) => {
  let pieces = [];
  let imgs = [];
  let grabbedPiece = null;
  let offsetX = 0;
  let offsetY = 0;

  const cols = 4;
  const rows = 4;
  let pieceSize;

  p.preload = function () {
    for (let i = 0; i < 14; i++) {
      imgs[i] = p.loadImage(`flower1/f${i + 1}.png`);
    }
  };

  p.setup = function () {
    const container = document.querySelector('.puzzle-exhibit .canvas-container');
    const canvas = p.createCanvas(400, 400);
    canvas.parent(container);
    canvas.elt.style.borderRadius = "12px";

    pieceSize = p.width / cols;

    for (let i = 0; i < imgs.length; i++) {
      const x = (i % cols) * pieceSize + p.random(-10, 10);
      const y = Math.floor(i / cols) * pieceSize + p.random(-10, 10);

      pieces.push({
        x,
        y,
        size: pieceSize,
        offset: p.random(100),
        rot: p.random(-10, 10),
        img: imgs[i]
      });
    }
  };

  p.draw = function () {
    p.background('#FEEFC3'); // Warm pastel yellow background

    for (let piece of pieces) {
      const floatOffset = p.sin(p.frameCount * 0.05 + piece.offset) * 5;

      p.push();
      p.translate(piece.x + piece.size / 2, piece.y + piece.size / 2 + floatOffset);
      p.rotate(p.radians(piece.rot));

      if (piece.img) {
        p.imageMode(p.CENTER);
        p.image(piece.img, 0, 0, piece.size - 6, piece.size - 6);
      } else {
        p.fill('#283044');
        p.stroke(255);
        p.strokeWeight(2);
        p.rectMode(p.CENTER);
        p.rect(0, 0, piece.size - 6, piece.size - 6, 6);
      }
      p.pop();
    }
  };

  p.mousePressed = function () {
    for (let i = pieces.length - 1; i >= 0; i--) {
      const piece = pieces[i];
      if (
        p.mouseX > piece.x &&
        p.mouseX < piece.x + piece.size &&
        p.mouseY > piece.y &&
        p.mouseY < piece.y + piece.size
      ) {
        grabbedPiece = piece;
        offsetX = p.mouseX - piece.x;
        offsetY = p.mouseY - piece.y;

        pieces.splice(i, 1);
        pieces.push(grabbedPiece);
        break;
      }
    }
  };

  p.mouseDragged = function () {
    if (grabbedPiece) {
      grabbedPiece.x = p.mouseX - offsetX;
      grabbedPiece.y = p.mouseY - offsetY;
    }
  };

  p.mouseReleased = function () {
    grabbedPiece = null;
  };
};

new p5(unsolvablePuzzle);
