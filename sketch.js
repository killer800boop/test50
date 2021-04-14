var balloon,bgimg,balloonimg,balloonimg2;
var database,position

function preload() {
  bgimg = loadImage("background.png")  
  balloonimg = loadImage("balloon1.png")
  balloonimg2 = loadAnimation("balloon 2.png","balloon3.png")
}

function setup() {
  createCanvas(1200,650);
  database = firebase.database()
  balloon = createSprite(200, 650,150, 150);
  balloon.addImage(balloonimg)
  balloon.scale = 0.6

  var balloonPositionRef = database.ref('balloon/height')
  balloonPositionRef.on("value",readHeight,showError)
}

function draw() {
  background(bgimg)  
  drawSprites();

  if (keyDown (LEFT_ARROW)) {
    updateHeight(-10,0) 
    balloon.addAnimation("hotAirBalloon",balloonimg2)  
  }else if (keyDown (RIGHT_ARROW)) {
    updateHeight(10,0)
    balloon.addAnimation("hotAirBalloon",balloonimg2)
  }else if (keyDown (UP_ARROW)) {
    updateHeight(0,10)
    balloon.scale = balloon.scale + 0.1
    balloon.addAnimation("hotAirBalloon",balloonimg2)
 }else  if (keyDown (DOWN_ARROW)) {
    updateHeight(0,-10)
    balloon.scale = balloon.scale - 0.1
    balloon.addAnimation("hotAirBalloon",balloonimg2)   }
}

function updateHeight(x,y) {
  database.ref('balloon/height').set({
    'x': height.x + x,
    'y': height.y + y
  })  
}

function readHeight(data) {
  height = data.val()
  balloon.x = height.x;
  balloon.y = height.y;  
}

function showError(){
  console.log("Error in writing to the database")
}
