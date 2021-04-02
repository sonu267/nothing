class Game {
  constructor(){

  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    car1 = createSprite(100,200);
    car1.addImage("car1",car1_img);
    car1.debug=true
    car2 = createSprite(300,200);
    car2.addImage("car2",car2_img);
    car2.debug=true
    car3 = createSprite(500,200);
    car3.addImage("car3",car3_img);
    car3.debug=true
    car4 = createSprite(700,200);
    car4.addImage("car4",car4_img);
    car4.debug=true
    cars = [car1, car2, car3, car4];
    finish = false
  }

  play(){
    form.hide();

    Player.getPlayerInfo();
    
    if(allPlayers !== undefined){
      //var display_position = 100;
      image(track, 0,-displayHeight*4,displayWidth, displayHeight*5);

      //index of the array
      var index =0;

      //x and y position of the cars
      var x =200;
      var y;

      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;

        //position the cars a little away from each other in x direction
        x = 200+(index*200)+allPlayers[plr].xpos;
        //use data form the database to display the cars in y direction
        y = displayHeight - allPlayers[plr].distance;
        cars[index-1].x = x;
        cars[index-1].y = y;
        textSize(20);
        textAlign(CENTER);
        text(allPlayers[plr].name,cars[index-1].x,cars[index-1].y+70)
        if (index === player.index){
          cars[index - 1].shapeColor = "red";
          camera.position.x = displayWidth/2;
          camera.position.y = cars[index-1].y
          if(obstG.isTouching(cars[index-1])){
          yvel-=0.9
          sound.play()
          }
        }
       
        //textSize(15);
        //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
      }

    }
    if(player.distance<4150){
    if(keyIsDown(UP_ARROW) && player.index !== null){
      console.log(yvel)
      yvel+=0.98
      if(keyIsDown(LEFT_ARROW)){
         xvel-=0.1
      }
      if(keyIsDown(RIGHT_ARROW)){
        xvel+=0.1
     }
    }
    }else if(finish===false){
     yvel*=0.7
     xvel*=0.7
     Player.updatefinishedPlayers()
       player.rank= finishedPlayers
       player.update()
       finish = true
    }
    if(keyIsDown(DOWN_ARROW)){
      yvel-=0.98
    }
    player.distance+=yvel
    yvel*=0.98
    player.xpos+= xvel
    xvel*=0.9
    player.update()

    if(player.distance > 5360){
      gameState = 2;
    }
   
    drawSprites();
  }
displayranks(){
  camera.position.x=0
  camera.position.y=0
  imageMode(CENTER)
  Player.getPlayerInfo()
  image(bro,displayWidth/4,100)
  image(sil,displayWidth/2,100)
  image(gold,displayWidth/3,100)
  for(var plr in allPlayers){
    if(allPlayers[plr].rank===1){
      text("first rank: " + allPlayers[plr].name,0,85)

    }
    else if(allPlayers[plr].rank===2){
      text("second rank: " + allPlayers[plr].name,displayWidth/4,displayHeight/4)
    }
    else if(allPlayers[plr].rank===2){
      text("Three rank: " + allPlayers[plr].name,displayWidth/2,displayHeight/4)
    }

  }
}
}
