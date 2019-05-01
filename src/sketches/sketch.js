export default function sketch (p) {
    let x = 10;
    let y = 10;
    let xspeed = 7;
    let yspeed = 2;
    let r = 10;
      
    p.setup = function () {
      p.createCanvas(226, 204);
      p.background(0);    
    };
  
    p.draw = function () {
      p.background(0);
      p.ellipse(x, y, r*2, r*2);
      x += xspeed;
      y += yspeed;
      if (x > p.width - r || x < r) {
        xspeed = -xspeed;
      }
      if (y > p.height - r || y < r) {
        yspeed = -yspeed;
      }
    };
  };