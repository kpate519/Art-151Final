const flickerSketch = (p) => {
    let canvas;
    let flickerIntensity = 150;
    let flickerSpeed = 0.3;
    let time = 0;
  
    p.setup = function () {
      const container = document.querySelector('.flicker-exhibit .canvas-container');
      canvas = p.createCanvas(400, 400);
      canvas.parent(container);
      p.noStroke();
      p.frameRate(60);
    };
  
    p.draw = function () {
      time += flickerSpeed;
      flickerIntensity = p.map(p.sin(time), -1, 1, 80, 255);
      p.background(flickerIntensity);
  
      // Optional mystery pulse (remove if you want just flicker)
      p.fill(255 - flickerIntensity);
      p.ellipse(p.width / 2, p.height / 2, 60, 60);
    };
  };
  
  new p5(flickerSketch);
  