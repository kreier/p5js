// on p5js.org https://editor.p5js.org/kreier/sketches/-wWjA2D7v 
let buffer, art, start_time;
function preload() {
  art = loadImage('food.jpeg')
}

function setup() {
  let canvas = createCanvas(400, 300);
  background(100);
  image(art, 0, 0);

  fill(100, 100, 255);
  square(random(200, 300), random(0, 100), random(50, 100));
  
  buffer = createImage(width, height);
  buffer.loadPixels();
  buffer.copy(canvas, 0, 0, width, height, 0, 0, buffer.width, buffer.height);
  
  for (let i = 0; i < 20; i++) {
    fill(100, 100, 255);
    square(random(200, 300), random(0, 100), random(50, 100));
  }
  
  buffer2 = createImage(width, height);
  buffer2.loadPixels();
  buffer2.copy(canvas, 0, 0, 400, 300, 0, 0, 400, 300);

  // rotate from buffer to art
  let pixelarray = width * height * 4;
  // buffer.updatePixels();
  for (let i = 0; i < pixelarray - 4; i += 4) {
    buffer2.pixels[i]     = buffer.pixels[i];
    buffer2.pixels[i + 1] = 200;
    buffer2.pixels[i + 2] = buffer.pixels[i + 2];
    buffer2.pixels[i + 3] = 105;
    // buffer2.pixels[i + 3] = buffer.pixels[i + 3];
  }
  // print(pixelarray, art.width, art.height);


  
  buffer2.updatePixels();
  // copy(art, 0, 0, art.width, art.height, 0, 0, width, height);
  // copy(buffer, 0, 0, 400, 300, 0, 0, 400, 300);
  start_time = millis();
  showpic = true;
}

function draw() {
  if (millis() - start_time > 1000) {
    if (showpic) {
      copy(buffer2, 0, 0, art.width, art.height, 0, 0, width, height);
      showpic = false;
    }
    else {
      copy(buffer, 0, 0, 400, 300, 0, 0, 400, 300);
      showpic = true;
    }
    start_time = millis();
  }
  // copy(buffer, 0, 0, 400, 300, 0, 0, 400, 300);
}
