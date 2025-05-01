const mirrorRoom = (p) => {
    let video;
  
    p.setup = function () {
      const container = document.querySelector('.mirror-exhibit .canvas-container');
      const canvas = p.createCanvas(400, 400);
      canvas.parent(container);
  
      video = p.createCapture(p.VIDEO);
      video.size(200, 200);
      video.hide();
    };
  
    p.draw = function () {
      p.background(0);
      p.image(video, 0, 0, p.width, p.height);
    };
  };
  
  new p5(mirrorRoom);
  