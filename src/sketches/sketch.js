import sketchVars from '../sketchVars.json';
export default function sketch (p) {
    let x = 10;
    let y = 10;
    let xspeed = sketchVars.wind_mph;
    let yspeed = 2;
    let img, gif;
    let r = 10;

    p.preload= function (){
        img = p.loadImage(require("../images/PfJS.gif"));
        //gif = p.createImg(require("../images/PfJS.gif"));
      };
      
    p.setup = function () {
      p.createCanvas(226, 204);
      p.background(0);
    
    };
  
    p.draw = function () {
        p.image(img, 0, 0);
        //gif.position(50, 350);
    //   p.background(0);
    //   p.ellipse(x, y, r*2, r*2);
    //   x += xspeed;
    //   y += yspeed;
    //   if (x > p.width - r || x < r) {
    //     xspeed = -xspeed;
    //   }
    //   if (y > p.height - r || y < r) {
    //     yspeed = -yspeed;
    //   }
    };
  };