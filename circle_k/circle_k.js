// attempt for Circle K replica
// https://editor.p5js.org/kreier/sketches/wDpWVQTzA

CANVAS_WIDTH = 500
CANVAS_HEIGHT = 250
NUM_ROWS = 15
NUM_COLUMNS = 30
TRIANGLE_HEIGHT = CANVAS_WIDTH/NUM_COLUMNS


function setup() {
  createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
  background(220);
  for(var i = 0;i<NUM_COLUMNS;i++){  
    for(var j = 0;j<NUM_ROWS;j++){
      noStroke()
      let darkValue = random(0,50)
      darkValue += j*14
      fill(darkValue, darkValue, darkValue)
      let point1X = i*TRIANGLE_HEIGHT
      let point1Y = j*TRIANGLE_HEIGHT
      let point2X =(i+1)*TRIANGLE_HEIGHT
      let point2Y = j*TRIANGLE_HEIGHT
      let point3X = i *TRIANGLE_HEIGHT
      let point3Y = (j+1)*TRIANGLE_HEIGHT
      let point4X = (i+1)*TRIANGLE_HEIGHT
      let point4Y = (j+1)*TRIANGLE_HEIGHT
      
        
      triangle(point1X, point1Y, point2X, point2Y, point3X, point3Y)
      darkValue = random(0,50)
      darkValue += j*14+10
      fill(darkValue, darkValue, darkValue)
      triangle(point3X, point3Y, point2X, point2Y, point4X, point4Y)
    }
  }
}

function draw() {

}