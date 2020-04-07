let s;
let scl = 20;

let food;

let score;
let maxScore = 0;

let PLAYING = 0;
let GAME_OVER = 1;
let gameMode;

let w;
let h;

let lastKey = null;

function setup(){
  createCanvas(600, 600);
  w = floor(width/scl);
  h = floor(height/scl);
  s = new Snake();
  score = 0;
  frameRate(10);
  pickLocation();

  gameMode = PLAYING;
}

function pickLocation(){
  let x = floor(random(w));
  let y = floor(random(h));
  food = createVector(x, y);
}

function draw() {
  scale(scl);
  background(51);

  if(gameMode == PLAYING){
    if(s.eat(food)){
      score += 10;
      pickLocation();
    }
    s.move();
    s.render();

    if(s.death()){
      if(score > maxScore){
        maxScore = score;
      }
      gameMode = GAME_OVER;

    }


    fill(255);
    textSize(1);
    text("Score: " + score + " - Max: " + maxScore, 1, 1);

    noStroke();
    fill(255, 0, 100);
    rect(food.x, food.y, 1, 1);

  }else{
    fill(255);
    text("GAME OVER", 1, 20);
    text("Space to restart", 1, 21);
  }


}


function moveUp(){
  if(lastKey != "down"){
    s.setDir(0, -1);
    lastKey = "up";
  }else{
    lastKey = "down";
  }
}

function moveDown(){
  if(lastKey != "up"){
    s.setDir(0, 1);
    lastKey = "down";
  }else{
    lastKey = "up";
  }
}

function moveLeft(){
  if(lastKey != "right"){
    s.setDir(-1, 0);
    lastKey = "left";
  }else{
    lastKey = "right";
  }
}

function moveRight(){
  if(lastKey != "left"){
    s.setDir(1, 0);
    lastKey = "right";
  }else{
    lastKey = "left";
  }
}


function keyPressed(){
  if(keyCode === UP_ARROW){
    moveUp();
  }

  if(keyCode === DOWN_ARROW){
    moveDown();
  }

  if(keyCode === LEFT_ARROW){
    moveLeft();
  }

  if(keyCode === RIGHT_ARROW){
    moveRight();
  }

  if(key === ' ' && gameMode == GAME_OVER){
    setup();
  }
}

function mousePressed(){

  let xPos = floor(mouseX/scl);
  let yPos = floor(mouseY/scl);

  let wQuar = floor(w/4);
  let w3Quar = 3 * wQuar;

  let hQuar = floor(h/4);
  let h3Quar = 3 * hQuar;

  console.log("POS", xPos, yPos);
  console.log(wQuar, hQuar, h3Quar);

  if(gameMode == GAME_OVER){
    setup();
  }

  if(xPos < wQuar && yPos > hQuar && yPos < h3Quar){
    moveLeft();
  }

  if(xPos > w3Quar && yPos > hQuar && yPos < h3Quar){
    moveRight();
  }

  if(yPos < hQuar && xPos > wQuar && xPos < w3Quar){
    moveUp();
  }

  if(yPos > h3Quar && xPos > wQuar && xPos < w3Quar){
    moveDown();
  }
}
