var scal = 2;

var colors = [
    //["grey", 125, 135, 148],
    ["baseblue", 89, 147, 171],
    ["purple", 103, 96, 127], 
];

var purpleColor = [103, 96, 127];
var cyanColor = [89,147,171];

// for actual size
var actualSize = 384;
var width = actualSize*scal;
var height = actualSize*scal;

// for sine curve
let xspacing = 8*scal; // Distance between each horizontal location
let w; // Width of entire wave
let theta = 0.0; // Start angle at 0
let amplitude = 18.0; // Height of wave
let period = 180.0; // How many pixels before the wave repeats
let dx; // Value for incrementing x
let yvalues; // Using an array to store height values for the wave

var nz = 1;
var nz_x = 1;
var nz_y = 2;

function preload() {
    // Font
    //font = loadFont("../assets/misaki_gothic.ttf");

    // Images
    imgkid = loadImage("kid.png");
    imgkid_front = loadImage("kid_front.png");
    imgkid_front_noLight = loadImage("kid_front_noLight.png");
    imgsun = loadImage("sunflower.png");
    imgcross = loadImage("crossroad.png");
    img109 = loadImage("109.png");
    imgomatsuri =loadImage("omatsuri.png");
    imgbluelight = loadImage("bluelight.png");

    imgbillthick = loadImage("bill20x43.png");
    imgbill109 = loadImage("bill12x53.png");
    imgbuilding = loadImage("bill14x39.png");

    imgmenL = loadImage("men_l.png");
    imgmenS = loadImage("men_s.png");
    imgmenL_2 = loadImage("men_l_stand.png");
    imgmenS_2 = loadImage("men_s_stand.png");

    imgbuild_l = loadImage("building_l.png");
    imgbuild_s = loadImage("building_s.png");
    imgtaxi = loadImage("taxi.png");

    imgneonb = loadImage("neonblue.png");
    imgneonp = loadImage("neonpink.png");
    imgneonp2 = loadImage("neonpink2.png");
    imgneonp3 = loadImage("neonpink3.png");
    imgneonp4 =loadImage("neonpink4.png");
    imgneony = loadImage("neonyellow.png");
    imgfishred = loadImage("fishred.png");
    imgfishbk = loadImage("fishbk.png");

    imgsneakerrt = loadImage("sneaker_rt.png");
    imgsneakerlt = loadImage("sneaker_lt.png");

    imgra = loadImage("ra.png");
    imgsi = loadImage("si.png");
}

function setup () {
    createCanvas(actualSize*scal, actualSize*scal);
    background(255);
    frameRate(27);
    image(imgbluelight, 0, 0, width, height);
    image(imgsun, 0, 0, width, height);
    image(imgkid, 0, 0, width, height);

    // for sine curve
    w =  width + xspacing;
    dx = (TWO_PI / period) * xspacing;
    yvalues = new Array(floor(w / xspacing));
}

function draw() {
    //image(imgkoimain_back, 0, 0, width, height);
    image(img109, 0, 0, width, height);
    image(imgsun, 0, 0, width, height);
    image(imgcross, 0, 0, width, height);
    //image(imgomatsuri, 0, 0, width, height);
    image(imgkid_front, 0, 0, width, height);
    
    x = int(random(-15, actualSize))*scal;// x とy が魚の頂点; x はグラフの横移動を考慮した範囲
    y = int(random(-15, actualSize))*scal;

    // 全体を灰色と建物で徐々に塗る
    r = int(random(2, 15))*2-1;// 奇数で出力
    tr = random(0, 50);

    d = random(30);
    objDice = int(d);

    if(y < height*2/3){
        if(objDice===1){
            image(imgneonb, x, y, 13*scal, 36*scal, tr);
        } else if (objDice===2 || objDice === 9) {
            image(imgneonp, x, y, 10*scal, 36*scal, tr);
        } else if (objDice<30 && objDice>=25) {
            image(imgbuild_l, x, y, 9*scal, 41*scal, tr);
        } else if (objDice <20 && objDice >= 15) {
            image(imgbuild_s, x, y, 14*scal, 28*scal);
        } else if (objDice === 5) {
            image(imgneonp2, x, y, 10*scal, 36*scal, tr);
        } else if (objDice === 6) {
            image(imgneonp3, x, y, 10*scal, 36*scal, tr);
        } else if (objDice === 7) {
            //image(imgneony, x, y, 10*scal, 36*scal, tr);
        } else if (objDice === 8) {
            image(imgneonp4, x, y, 10*scal, 36*scal, tr);
        }
    } else {
        if(objDice ===1){
            //image(imgsi, x, y, 13*scal, 14*scal);
        } else if (objDice ===2){
            //image(imgra, x, y, 12*scal, 15*scal);
        } else if (objDice<30 && objDice>=25) {
            image(imgbuild_l, x, y, 9*scal, 41*scal, tr);
        } else if (objDice <20 && objDice >= 15) {
            image(imgbuild_s, x, y, 14*scal, 28*scal);
        } else if (objDice === 5) {
            image(imgtaxi, x, y, 26*scal, 13*scal);
        } else if (objDice ===6) {
            image(imgfishred, x, y, 13*scal, 17*scal);
        } else if (objDice === 7){
            image(imgfishbk, x, y, 8*scal, 14*scal);
        }
    }

    for (i = 0; i < r; i++) {
        ii = i*2+1;
        j = (r - ii)/2;
        l = r - j*2;
        noStroke();
        fill(colors[0][1], colors[0][2], colors[0][3], tr);
        for (k = 0; k<l; k++) {
            rect(x+j*scal+k*scal, y+i*scal, scal, scal);
            if(i!=r-1){
                rect(x+j*scal+k*scal, y+2*r*scal-i*scal-scal*2, scal, scal);
            }
        }
    }

    // sine curve
    calcWave();
    renderWave();

    theta += 0.001;
    let phi = theta;

    /*
    for (let i = 0; i < yvalues.length; i++){
        yvalues[i] = sin(phi) * amplitude;
        phi +=dx;
    }
    for (let x = 0; x < yvalues.length; x++) {// 109白のサインカーブ
        noStroke();
        image(imgbill109, x*xspacing, height/2 + 10*scal+yvalues[x], 12*scal, 53*scal);
    }
    for (let x = 0; x < yvalues.length; x++) {// 低い建物のサインカーブ
        noStroke();
        image(imgbuilding, x*xspacing, height/2 + 13*scal+yvalues[x], 12*scal, 53*scal);
    }
    */

    for (let x = 0; x < yvalues.length; x++) {
        noStroke();

        d = random(2);
        menDice = int(d);

        //rect(x*xspacing, height/2+10*scal+yvalues[x], scal, scal);
        if(menDice %2 !=0){
            image(imgmenL, x*xspacing, height/2 + 10*scal+yvalues[x], 13*scal, 29*scal);
        } else {
            image(imgmenL_2, x*xspacing, height/2 + 10*scal+yvalues[x], 9*scal, 28*scal);
        }
    }

    /*
    for (let x = 0; x < yvalues.length; x++) {
        noStroke();

        d = random(2);
        menDice = int(d);

        //rect(x*xspacing, height/2+10*scal+yvalues[x], scal, scal);
        if(menDice %2 !=0){
            image(imgmenS, x*xspacing, height*4/7 + 10*scal+yvalues[x], 5*scal, 13*scal);
        } else {
            image(imgmenS_2, x*xspacing, height*4/7 + 10*scal+yvalues[x], 5*scal, 13*scal);
        }
    }
    */

    // plot image
    d = random(20); 
    kidDice = int(d);
    if(kidDice ===0){
        image(imgkid_front_noLight, 0, 0, width, height);
    } else {
        image(imgkid_front, 0, 0, width, height);
    }

    // plot sine wave documents

    //noLoop();
}

// for sine curve

function calcWave() {
    // Increment theta (try different values for
    // 'angular velocity' here)
    theta += 0.04;
  
    // For every x value, calculate a y value with sine function
    let x = theta;
    for (let i = 0; i < yvalues.length; i++) {
      yvalues[i] = sin(x) * amplitude;
      x += dx;
    }
  }
  
  function renderWave() {
    // A simple way to draw the wave with an ellipse at each location
    for (let x = 0; x < yvalues.length; x++) {
      //ly.ellipse(x * xspacing, height / 2 + yvalues[x], 16, 16);
    }
  }
