// https://editor.p5js.org/mkreier/sketches/zxzaS6VRO
let slider;
let currentSignal = 0;
let currentValue = 0;
let history = [];

const CANVAS_SIZE = 600;
const CONTROL_INCREMENT = 3;
const SETPOINT = 3.5

let k = 20;
let sum_error = 0;
let kI = 5;

function setup() {
  createCanvas(CANVAS_SIZE, CANVAS_SIZE);
  slider = createSlider(0, 255, 0);
  slider.position(10, CANVAS_SIZE);
  slider.style('width', '80px');
}

function draw() {
  background(220);
  currentValue = readValve(currentSignal);
  currentSignal = slider.value();
  drawAndUpdateHistory()
  
  // Your automation code goes here.
  let error = SETPOINT - currentValue;
  sum_error = sum_error + error
  currentSignal = k*error + kI*sum_error;
  slider.value(currentSignal)
  
}

function readValve(signal){
  value = map(signal,0,255,0,6.1)
  value = randomGaussian(value, 0.1);
  return value;
}

function drawAndUpdateHistory(){
  history.push(currentValue)
  if(history.length > 100){
    history.shift();
  }
  stroke(200,100,100);
  strokeWeight(4);
  for(var i = 0;i<history.length;i++){
    point(map(i,0,99,0,400),map(history[i],0,6.2,0.75*CANVAS_SIZE,10));
  }
  line(0,map(SETPOINT,0,6.1,0.75*CANVAS_SIZE,10),CANVAS_SIZE,map(SETPOINT,0,6.1,0.75*CANVAS_SIZE,10))
}

function on_off_control(){
   if(currentValue < SETPOINT){
    slider.value(currentSignal + CONTROL_INCREMENT) 
  }
  else{
    slider.value(currentSignal - CONTROL_INCREMENT) 
  }
}