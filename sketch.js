let baseUrlPictures = 'https://oscaraccorsi.github.io/pictures/';
let baseUrlSound = 'https://oscaraccorsi.github.io/mp3_files/';
const vol = new Tone.Volume(0).toDestination();
const pingPong = new Tone.PingPongDelay("2n", 0.2).connect(vol);

let time = 0,
  height = window.innerHeight,
  width = window.innerWidth;
let value;
let img; 
let palette = [];
let palettes = [];
let c;
let index;

let spaceX;
let spaceY; 
let spaceYArray = [3, 5, 8, 13, 21];
let x;
let wid, hei;
let shift = 5;
let lungh;

//----------------------------------------------------
function preload() {
  multiPlayer = new Tone.Players({ 
    wind: baseUrlSound + "wind.mp3"
  }).chain(pingPong, vol);
  palettes[0] = loadImage(baseUrlPictures + 'schneider.jpg');
  palettes[1] = loadImage(baseUrlPictures + 'schneider01.jpg');
  palettes[2] = loadImage(baseUrlPictures + 'schneider01.png');
  palettes[3] = loadImage(baseUrlPictures + 'schneider02.jpg');
  palettes[4] = loadImage(baseUrlPictures + 'schneider03.jpg');
  palettes[5] = loadImage(baseUrlPictures + 'schneider04.jpg');
  palettes[6] = loadImage(baseUrlPictures + 'schneider05.jpg');
  palettes[7] = loadImage(baseUrlPictures + 'schneider06.jpg'); 
  palettes[8] = loadImage(baseUrlPictures + 'schneider07.jpg'); 
  palettes[9] = loadImage(baseUrlPictures + 'schneider08.jpg'); 
  palettes[10] = loadImage(baseUrlPictures + 'schneider09.png'); 
  palettes[11] = loadImage(baseUrlPictures + 'schneider10.png');
  palettes[12] = loadImage(baseUrlPictures + 'schneider11.png');
}

//----------------------------------------------------
function setup() {
  createCanvas(windowWidth, windowHeight); 
  noiseSeed(1);
  ellipseMode(CENTER);
  frameRate(15);
  setInterval(interval1, 1000*60);
  setInterval(interval2, 1000*1);
  
  wind = multiPlayer.player("wind");
  wind.autostart = true;
  wind.loop = true;
  
  
  img = random(palettes);
  img.resize(windowWidth, windowHeight);
  img.loadPixels();
  
  spaceX = round(random(10, 200));
  spaceY = random(spaceYArray);
  lungh = round(random(10, 200));
  if (lungh >= spaceX) {
    lungh = spaceX - 8;
  }
  
  //-----------------------------------------------getting colors  
  
  rectMode(CENTER);

  hei = round(random(windowWidth/10, windowWidth-windowWidth/10));
  wid = round(random(windowHeight/10, windowHeight-windowHeight/10));
  x = round(random(windowHeight-100));
  
}

//----------------------------------------------------
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

//----------------------------------------------------
function draw() {
  
  background(0);
  noStroke();
 
  
  boxOfDots((windowWidth/2)-(windowWidth/2-150),   (windowWidth/2)+(windowWidth/2-150), windowHeight/2-windowHeight/2+150, windowHeight/2+windowHeight/2-150);
  time += 0.02;
  fill(0);
  
  
 
}
function boxOfDots(x_start, x_width, y_start, y_width) {
   for (let i=x_start; i < x_width; i += spaceX ) {
     for (let j=y_start; j < y_width; j += spaceY) {
    
        let imgX = map(i, 0, width, wid, img.width-wid);
        let imgY = map(j, 0, height, hei, img.height-hei);

        
        let c = img.get(imgX, imgY);

        fill(c);
        rect(i, j, map(noise(i, j, time), 0, 1, 1, lungh), 2);
     }
   }
}
function interval1() {
  // background(0);
  
  
  spaceX = round(random(10, 200));
  spaceY = random(spaceYArray);
  lungh = round(random(10, 200));
  if (lungh >= spaceX) {
    lungh = spaceX - 8;
  }
  x = round(random(windowHeight-100));
  if (spaceY >= 19) {
    change();
  }
}

function change() {
  hei = round(random(windowWidth/10, windowWidth-windowWidth/10));
  wid = round(random(windowHeight/10, windowHeight-windowHeight/10));
  img = random(palettes);
  img.loadPixels();
}

function interval2() {
  hei+=random(-shift, +shift);
  wid+=random(-shift, +shift);
}

function keyPressed() {
  if (keyCode === ESCAPE ) {
    background(0);
    img = random(palettes);
    img.resize(windowWidth, windowHeight);
    img.loadPixels();
  }
  if (keyCode === 32 ) {
     spaceX = round(random(10, 200));
  spaceY = random(spaceYArray);
  lungh = round(random(10, 200));
  }
  if (lungh >= spaceX) {
    lungh = spaceX - 8;
  }
  x = round(random(windowHeight-100));
  if (spaceY >= 19) {
    change();
  }
}
//-----------------------------------mouseClick
function mouseClicked() {
  if (value === 0) {
    vol.mute = true;
    value = 1;
  } 
  else {
    vol.mute = false;
    value = 0;
  }  
}
