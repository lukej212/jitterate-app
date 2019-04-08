export default function sketch (p) {
    let x = 5;
    let y = 10;
    let xspeed = 3;
    let yspeed = 2;

    let r = 5;
  
    p.setup = function () {
      p.createCanvas(100, 100);
    };
  
    // p.myCustomRedrawAccordingToNewPropsHandler = function (props) {
    //   if (props.rotation){
    //     rotation = props.rotation * Math.PI / 180;
    //   }
    // };
  
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