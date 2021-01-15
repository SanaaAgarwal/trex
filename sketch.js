var trex, trex_running;
var ground, groundImage; 
var invisibleGround
var cloudImage, CloudsGroup
var obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6, ObstaclesGroup
//initiate Game STATEs
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var score = 0
var HighestScore = score
var restart,restartImage
var gameOver, gameoverImage
    
function preload(){
  trex_running=loadAnimation("trex1.png","trex3.png","trex4.png")
  trex_collided=loadAnimation("trex_collided.png")
  groundImage=loadImage("ground2.png")
  cloudImage=loadImage("cloud.png")
  obstacle1=loadImage("obstacle1.png")
  obstacle2=loadImage("obstacle2.png")
  obstacle3=loadImage("obstacle3.png")
  obstacle4=loadImage("obstacle4.png")
  obstacle5=loadImage("obstacle5.png")
  obstacle6=loadImage("obstacle6.png")
  
  restartImage=loadImage("restart.png")
  gameoverImage=loadImage("gameOver.png")
  //dieSound=loadSound("die.mp3")
  //jumpSound=loadSound("jump.mp3")
  //checkPointSound=loadSound("checkPoint.mp3")
}
function setup() {
  createCanvas(600, 200);
  
  trex=createSprite(50,150,10,10)
  trex.addAnimation("running",trex_running)
  trex.addAnimation("collided",trex_collided)
  trex.scale=0.5
  
  ground=createSprite(200,180);
  ground.addImage(groundImage);
  ground.velocityX=-4  
  
  invisibleGround=createSprite(200,190,400,20)
  invisibleGround.visible=false;
  ObstaclesGroup= new Group()
  CloudsGroup= new Group()
  
  gameOver = createSprite(300,100);
  restart = createSprite(300,140);
  gameOver.addImage(gameoverImage);
  gameOver.scale = 0.5;
  restart.addImage(restartImage);
  restart.scale = 0.5;

  gameOver.visible = false;
  restart.visible = false;
}



function draw() {
  background(180);
  
  textSize(20)
  fill("black")
  text("Score: "+score,450,50) 
  
  textSize(15)
  fill(50)
  text("Highest Score:" +HighestScore, 450,30)
  
  if(gameState === PLAY){
    //move the ground
    ground.velocityX = -(6 + 3*score/100);
    //scoring
    score = score + Math.round(World.frameRate/60);
    
    if (score>0 && score%100 === 0){
      //checkPointSound.play()
    }
    
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
     //jump when the space key is pressed
    if(keyDown("space") && trex.y >= 139){
      trex.velocityY = -12 ;
      //jumpSound.play()
    }
  
    //add gravity
    trex.velocityY = trex.velocityY + 0.8;
    
    //spawn the clouds
    spawnClouds();
  
    //spawn obstacles
    spawnObstacles();
    
    //End the game when trex is touching the obstacle
    if(ObstaclesGroup.isTouching(trex)){
      gameState = END;
      // dieSound.play()
    }
  }
  
  else if(gameState === END) {
    gameOver.visible = true;
    restart.visible = true;
    
    //set velcity of each game object to 0
    ground.velocityX = 0;
    trex.velocityY = 0;
    ObstaclesGroup.setVelocityXEach(0);
    CloudsGroup.setVelocityXEach(0);
    
    //change the trex animation
    trex.changeAnimation("collided", trex_collided);
    
    //set lifetime of the game objects so that they are never destroyed
    ObstaclesGroup.setLifetimeEach(-1);
    CloudsGroup.setLifetimeEach(-1);
    
   if(score>HighestScore) {
     HighestScore =score
   }
    
  }
  
  if(mousePressedOver(restart)) {
    reset();
  }
  
  //console.log(trex.y);
  
  //stop trex from falling down
  trex.collide(invisibleGround);
  
  drawSprites();
}

function reset(){
  gameState = PLAY;
  
  gameOver.visible = false;
  restart.visible = false;
  
  ObstaclesGroup.destroyEach();
  CloudsGroup.destroyEach();
  
  trex.changeAnimation("running",trex_running);
  
  score = 0;
  
}

function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(600,165,10,40);
    obstacle.velocityX = -6;
    
    //generate random obstacles
    var rand = Math.round(random(1,6));
    //obstacle.addAnimation("obstacle" + rand);
    switch(rand){
      case 1:obstacle.addImage(obstacle1)
        break 
      case 2:obstacle.addImage(obstacle2)
        break 
      case 3:obstacle.addImage(obstacle3)
        break
      case 4:obstacle.addImage(obstacle4)
        break 
      case 5:obstacle.addImage(obstacle5)
        break 
      case 6:obstacle.addImage(obstacle6)
        break 
    }
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 100;
        
        ObstaclesGroup.add(obstacle) 
  }
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var cloud = createSprite(600,120,40,10);
    cloud.y = random(80,120);
    cloud.addImage("clouds",cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 200;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    CloudsGroup.add(cloud)
  }
  
}
  
  
