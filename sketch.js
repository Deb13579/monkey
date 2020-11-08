var PLAY = 1;
var END = 0;
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score
var ground, invisibleGround
var gameState = PLAY
function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
createCanvas(600, 400);

 
  monkey = createSprite(50,243,20,50);
  monkey.addAnimation("running", monkey_running);
 
 
  monkey.scale = 0.1;
  
  ground = createSprite(200,280,2000,20);
  
  
 

  
  invisibleGround = createSprite(200,280,400,10);
  invisibleGround.visible = false;
  
  //create Obstacle and Cloud Groups
  obstaclesGroup = createGroup();
  bananaGroup = createGroup();

  
  monkey.setCollider("rectangle",0,0,monkey.width,monkey.height);
  monkey.debug = false

  
  score = 0;
  bananacount = 0
  
}  

  



function draw() {
background("white")
  text("You survived for: " + score + " frames", 50,50)
  text("You hit this many bananas: " + bananacount, 50,70)
  if (ground.x<0){
     ground.x = ground.width/2;
  }
 
  
  ground.velocityX = -4//-(4 + 3* score/100)
  monkey.collide(invisibleGround);
  if (gameState === PLAY){
     spawnObstacles();
    banana();
    score = score + Math.round(getFrameRate()/60);
    if(keyDown("space")&& monkey.y >= 120) {
        monkey.velocityY = -12;
        
    }
    monkey.velocityY = monkey.velocityY + 0.8
    if (bananaGroup.isTouching(monkey)){
      bananaGroup.destroyEach();
      bananacount = bananacount+1
      
    }
    if (obstaclesGroup.isTouching(monkey)){
    gameState = END   
    
  }
    
  }
  
 
  else if (gameState === END){
    text("GAME OVER",200,100)
   obstaclesGroup.setVelocityXEach(0)
    bananaGroup.setVelocityXEach(0)
    obstaclesGroup.setLifetimeEach(-1)
    bananaGroup.setLifetimeEach(-1)
  }
   drawSprites();
}

function spawnObstacles(){
 if (frameCount % 60 === 0){
   var obstacle = createSprite(600,260,10,40);
   obstacle.velocityX = -(6 + score/100);
   obstacle.addImage("obstacle",obstacleImage)
   obstacle.scale = 0.1
   obstaclesGroup.add(obstacle)
   obstaclesGroup.setLifetimeEach(300)
 }
    }


function banana(){
  if (frameCount % 200 === 0){
    var banana = createSprite(600,Math.round(random(120,140)),20,20);
    banana.velocityX = -(6 + score/100)
    banana.addImage("banana",bananaImage)
    banana.scale = 0.1
    bananaGroup.add(banana);
    bananaGroup.setLifetimeEach(300)
  }
}



