var car, bg, wallL, wallR;
var bgImg, carImg;
var obstacle, obstacleImg, obstaclesGroup;
var crashes = 0;

function preload() {
  bgImg = loadImage("bg.jpeg");
  carImg = loadImage("carImg.png");

  obstacleImg1 = loadImage("obstacleImg1.png");
  obstacleImg2 = loadImage("obstacleImg2.png");
  obstacleImg3 = loadImage("obstacleImg3.png");
  obstacleImg4 = loadImage("obstacleImg4.png");
}

function setup() {
  createCanvas(windowWidth,windowHeight);

  bg = createSprite(windowWidth/2, 80, 0, 0);
  bg.addImage(bgImg);

  car = createSprite(windowWidth/2, 600, 0, 0);
  car.addImage(carImg);
  car.scale = 0.18;

  wallL = createSprite(car.x - 220, car.y, 10, 200);
  wallL.shapeColor = "black";
  wallR = createSprite(car.x + 220, car.y, 10, 200);
  wallR.shapeColor = "black";

  obstaclesGroup = new Group();
}

function draw() {
  if (crashes < 5) {
    background(180);

    car.collide(wallL);
    car.collide(wallR);

    bg.velocityY = 15;

    if (bg.y > 630) {
      bg.y = 180;
    }

    if (keyDown(LEFT)) {
      car.x = car.x - 10;
    }

    if (keyDown(RIGHT)) {
      car.x = car.x + 10;
    }

    if (car.isTouching(obstaclesGroup)) {
      obstaclesGroup.destroyEach();
      crashes = crashes + 1;
    }

    obstacles();

    drawSprites();

    fill(255);
    textSize(20);
    text("Crashes:" + crashes, 10, 20);
  }

  if (crashes > 4) {
    fill("red");
    textSize(30);
    text("Game Over", windowWidth/2-80, windowHeight/2);
    bg.velocityY = 0;
  }
}

function obstacles() {
  if (frameCount % 100 === 0) {
    obstacle = createSprite(650, 0, 0, 0);
    obstacle.x = Math.round(random(windowWidth/2+100,windowWidth/2-100));
    obstacle.velocity.y = 15;
    obstaclesGroup.add(obstacle);

    rand = Math.round(random(1, 4));
    if (rand == 1) {
      obstacle.addImage(obstacleImg1);
      obstacle.scale = 0.18;
    }
    if (rand == 2) {
      obstacle.addImage(obstacleImg2);
      obstacle.scale = 0.18;
    }
    if (rand == 3) {
      obstacle.addImage(obstacleImg3);
      obstacle.scale = 0.2;
    }
    if (rand == 4) {
      obstacle.addImage(obstacleImg4);
      obstacle.scale = 0.7;
    }
  }
}
