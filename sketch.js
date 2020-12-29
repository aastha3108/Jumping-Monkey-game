var survivalTime = 0, score = 0
var PLAY = 1;
var END = 0;
var gameState = PLAY;

var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup


function preload(){
  
      monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")

    bananaImage = loadImage("banana.png");
    obstacleImage = loadImage("obstacle.png");

  }

function setup() {
  //creating monkey
  monkey = createSprite(80,315,20,20);
  monkey.addAnimation("move", monkey_running);
  monkey.scale = 0.1;
  
  FoodGroup = createGroup();
  obstacleGroup = createGroup();
  
  
  //creating ground
  ground = createSprite(400,350,900,10);
  ground.velocityX = -4;
  ground.x = ground.width/2;
  console.log(ground.x);

}

function draw() {
  background(225);
 
   if(ground.x<0) {
     ground.x=ground.width/2
 }
  
  if(keyDown("space")) {
    monkey.velocityY = -12;
 }
  
  //velocity ground
  monkey.velocityY = monkey.velocityY + 0.8;
  
  //spawn the clouds
    spawnBananas();
  
    //spawn obstacles on the ground
    spawnObstacles();
  
  if(obstacleGroup.isTouching(monkey)){
        gameState = END;
    }
  
  if(FoodGroup.isTouching(monkey)){
    FoodGroup.destroyEach();
    score=score+2;
   }
      
  //monkey touch ground  
  monkey.collide(ground);
  
  drawSprites();
  
  

textSize(20)
fill("white")
text("Score: "+ score, 40,80);
  
stroke("black")
textSize(20)
fill("black")
survivalTime = Math.ceil(frameCount/frameRate())
text("Survival Time:"+ survivalTime, 100,50);

}

function spawnObstacles(){
 if (frameCount % 300 === 0){
   var obstacle = createSprite(400,150,10,40);
   obstacle.addImage(obstacleImage);
   obstacle.velocityX = -7;
 


//generate random obstacles
    /*var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstacleImage);
              break;
      case 2: obstacle.addImage("obstacle.png");
              break;
      case 3: obstacle.addImage("obstacle.png");
              break;
      case 4: obstacle.addImage("obstacle.png");
              break;
      case 5: obstacle.addImage("obstacle.png");
              break;
      case 6: obstacle.addImage("obstacle.png");
              break;
      default: break;
    }
*/
//scale and lifetime of obstacle    
    obstacle.scale = 0.01;
    obstacle.lifetime = 300;

//adding obstacle to the group
   obstacleGroup.add(obstacle);
 }
}

function spawnBananas() {
  //write code here to spawn the bananas
   if (frameCount % 80 === 0) {
     banana = createSprite(600,100,40,10);
    banana.y = Math.round(random(120,200));
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -3;
    
     //assign lifetime to the variable
   banana.lifetime = 300  ;
    
    //adjust the depth
   banana.depth = monkey.depth;
     
    //adding banana to the group
   FoodGroup.add(banana);
    }
}

