// Test on 2022-10-07

const canvas_width = 600;
const canvas_height = 400;

// Establish a range of values on the complex plane
// A different range will allow us to "zoom" in or out on the fractal

// It all starts with the width, try higher or lower values
const w = 3;
const h = (w * canvas_height) / canvas_width;

// Start at negative half the width and height
const xmin = -w/1.3;
const ymin = -h/2;

// Maximum number of iterations for each point on the complex plane
const maxiterations = 100;

// x goes from xmin to xmax
const xmax = xmin + w;
// y goes from ymin to ymax
const ymax = ymin + h;

// Calculate amount we increment x,y for each pixel
const dx = (xmax - xmin) / (canvas_width);
const dy = (ymax - ymin) / (canvas_height);

let y = ymin;
let j = 0;


function setup() {
  createCanvas(canvas_width, canvas_height);
  pixelDensity(1);
}

function draw() {
  background(0);

  // Start x
  let x = xmin;
  for (let i = 0; i < width; i++) {
    // Now we test, as we iterate z = z^2 + cm 
    // does z tend towards infinity?
    let a = x;
    let b = y;
    let n = 0;
    while (n < maxiterations) {
      const aa = a * a;
      const bb = b * b;
      const twoab = 2.0 * a * b;
      a = aa - bb + x;
      b = twoab + y;
      // Infinty in our finite world is simple, let's 
      // just consider it 16
      if (dist(aa, bb, 0, 0) > 16) {
        break;  // Bail
      }
      n++;
    }

    // We color each pixel based on how long it takes to get to infinity
    // If we never got there, let's pick the color black
    const norm = map(n, 0, maxiterations, 0, 1);
    let bright = map(sqrt(norm), 0, 1, 0, 255);
    if (n == maxiterations) {
      bright = 0;
    } else {
      let c = color(bright, (85 + bright) % 256, (170 + bright) % 256);
      set(i, j, c);
    }
    x += dx;
  }
  y += dy;
  j++;
  if (j > height) {
    j = 0;
    y = ymin;
  }
  updatePixels();
}
