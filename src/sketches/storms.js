import sun from "./images/sun.PNG";
import cloud from "./images/cloud.PNG";
import lightning from "./images/lightning.png";
import sun2 from "./images/sun2.png";
import background from "./images/background.jpg";


export default function storms (p) {
    let fname = [sun,cloud,lightning,sun2,background];
    let imgS = []; 
    let alt = 0, weatherID= 5, month = 1, day = 1, temp= 32;
    
    p.setup = function () {
        p.createCanvas(204, 230);
        for(let i = 0; i< fname.length; i++){
            imgS[i] = p.loadImage(fname[i]);
        }
        for(let i = 0; i<fname.length-1;i++){
            imgS[i].resize(100,100);
        }
    };

    p.draw = function () {
        p.background(127, 156, 178);
        sAnim(2,2,weatherID,month,day,temp,alt);
        
        if(alt === 1) alt = 0;
        else alt = 1;
        p.frameRate((Math.random() * 3.5) + 2);
    };

    //wID: 1 = sunny, 2 = cloudy, 3 = rain, 4 = partly cloudy, 5 = storms
    //t is just a 0 or 1 that alternates the animation states
    let sAnim = function (x, y, wID, m , d , t , a) {
        // x coord, ycoord, weather ID, month, day, temp, alt variable. 
        //tbox for date
        p.image(imgS[4],0,y);
        //p.textFont(s);
        //p.stroke(255,255,153);
        //let txt = m + "/" + d ;
        //p.text(txt, x + 20, y + 30);
        
        //alternating lines for rain if rainy weather
        if (wID === 3 || wID === 5){
            for (let i = 0; i<6;i++){
            p.stroke(Math.floor(Math.random() * 255) + 120);
            p.strokeWeight(2);
            p.line(x+80+i*10,y+140,x+70+i*10,y+190);
            }    
        }
        //sets image for weather. 2 img for partly cloudy, stormy
        if(wID===5){
            if(a===1)p.image(imgS[2],x+20+Math.floor(Math.random() * 50) + 0,y+100);
        }
        if(wID===1) if(a===0){p.image(imgS[0],x+50,y+60);}else{p.image(imgS[3],x+50,y+60);}
        if(wID===2) p.image(imgS[1],x+50,y+60+a*5);
        if(wID===3|| wID===5) p.image(imgS[1],x+40,y+30+a*5);
        if(wID===4){
            p.image(imgS[0],x+35,y+45);
            p.image(imgS[1],x+60,y+60+a*5);
        }
        
        //tbox for temp
        p.stroke(255,255,153);
        //txt = t +"°";
        //p.text(txt,x+140,y+180);
    } 
};
