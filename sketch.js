var bg, bgImg;
var girlImg, girl;
var invisibleGround;
var stone, stoneGrp;
var troll, trollGrp;
var sword, swordImg;
var gameState = "play";

function preload(){
	bgImg = loadImage("bg.jpg");
	girlImg = loadAnimation("girl-removebg-preview.png", "girl2-removebg-preview.png", "girl3-removebg-preview.png", "girl4-removebg-preview.png",);
	stoneImg = loadImage("stone.png");
	trollImg = loadImage("troll.png");
	swordImg = loadImage("sword.png");

}

function setup() {
createCanvas(2000, 800);

bg = createSprite(1000, 400, 2000, 800);
bg.scale = 7;
bg.addImage(bgImg);

sword = createSprite(350, 400);
sword.addImage(swordImg);
sword.scale = 0.5;

girl = createSprite(300, 600);
girl.addAnimation("running", girlImg); 

stoneGrp = new Group();
trollGrp = new Group();

invisibleGround = createSprite(0, 750, 4000, 10);
invisibleGround.velocityX = -3;
invisibleGround.visible = false;


}


function draw() {
  rectMode(CENTER);
  background(0);
  bg.velocityX = -3;

  if(gameState === "play"){
	  
	if(bg.x<900){
	  bg.x = bg.width/2;
  }

  if(keyWentDown(DOWN_ARROW)){
	  sword.x = 500;
	  sword.y = 500;
  }

  if(keyWentUp(DOWN_ARROW)){
	  sword.x = 350;
	  sword.y = 400;
  }

  if(invisibleGround.x<900){
	  invisibleGround.x = invisibleGround.width/2;
  }

  girl.collide(invisibleGround);
  spawnObstacles();
  spawnTrolls();

  if(sword.isTouching(trollGrp)){
	  trollGrp.destroyEach();
  }

  if(girl.isTouching(trollGrp)){
	  trollGrp.destroyEach();
	  girl.destroy();
	  sword.destroy();
	  stoneGrp.destroyEach();
  }


  if(keyDown(UP_ARROW)&& girl.y>=400){
	  girl.velocityY = -5;
  }

  if(girl.collide(stoneGrp)){
	stoneGrp.destroyEach();
	girl.destroy();
	gameState = "end";
  }
  

  girl.velocityY += 0.5;
  drawSprites();

}

if(gameState === "end"){
	textSize(30);
	text("GAME OVER", 1000, 400);
}



}


function spawnObstacles() {
	if(frameCount % 300 === 0) {
	  stone = createSprite(2000,700,5,5);
	  stone.addImage(stoneImg);
	  stone.scale = 0.1;
	  stone.velocityX = -4;
	  stoneGrp.add(stone);
  
 
}

  }

  function spawnTrolls(){
	  if(frameCount%500 === 0){
		  troll = createSprite(2000, 500, 5, 5);
		  troll.addImage(trollImg);
		  troll.scale = 2.0;
		  troll.velocityX = -4;
		  trollGrp.add(troll);
	  }
  }