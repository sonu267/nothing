var canvas, backgroundImage;

var gameState = 0;
var playerCount;
var allPlayers;
var distance = 0;
var database;
var form, player, game;
var cars, car1, car2, car3, car4;
var track, car1_img, car2_img, car3_img, car4_img;
var obs, f1
var yvel
var finish
var finishedPlayers
function preload(){
  track = loadImage("../images/track.jpg");
  car1_img = loadImage("../images/car1.png");
  car2_img = loadImage("../images/car2.png");
  car3_img = loadImage("../images/car3.png");
  car4_img = loadImage("../images/car4.png");
  ground = loadImage("../images/ground.png");
  f1 = loadImage("images/f1.png");
  gold = loadImage("images/gold.png");
  sil = loadImage("images/silver.png");
  bro = loadImage("images/bronze.png");
  sound = loadSound("sounds/sliding.mp3")
}

function setup(){
  canvas = createCanvas(displayWidth , displayHeight);
  database = firebase.database();
  game = new Game();
  game.getState();
  game.start();
  yvel = 0
  xvel = 0
  obstG = createGroup()
  for (let index = 0; index < 5; index++) {
    wa = random(200,displayWidth-200)
    hi = random(-height*4,height-300)
    obsta = createSprite(wa,hi)
    obsta.addImage(f1)
    obsta.debug = true
    obstG.add(obsta)
  }
}


function draw(){
  if(playerCount === 4){
    game.update(1);
  }
  if(gameState === 1){
    clear();
    game.play();
  }
  
  if(finishedPlayers===4){
    game.update(2)
    
  }
  if(gameState===2 && finishedPlayers===4){
    game.displayranks()

  }
}
