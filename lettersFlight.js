const lettersFlight = (p) => {
    let letters = [];
    let alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZABCDEFGHIJKLMNOPQRSTUVWXYZ";
  
    p.setup = function () {
      const container = document.querySelector('.flight-exhibit .canvas-container');
      const canvas = p.createCanvas(400, 400);
      canvas.parent(container);
      canvas.elt.style.borderRadius = "12px";
  
      for (let i = 0; i < alphabet.length; i++) {
        letters.push({
          char: alphabet[i],
          x: p.random(p.width),
          y: p.random(p.height),
          vx: p.random(-1, 1),
          vy: p.random(-1, 1)
        });
      }
  
      p.textFont('monospace');
      p.textSize(32);
      p.noStroke();
    };
  
    p.draw = function () {
      p.background('#E3DAFF');
  
      for (let l of letters) {
        p.fill('#283044');
        p.text(l.char, l.x, l.y);
  
        l.x += l.vx;
        l.y += l.vy;
  
        // Bounce on edges
        if (l.x < 0 || l.x > p.width - 20) l.vx *= -1;
        if (l.y < 30 || l.y > p.height) l.vy *= -1;
      }
    };
  };
  
  new p5(lettersFlight);
  