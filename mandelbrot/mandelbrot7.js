// Test on 2022-10-08 mandelbrot7
// https://editor.p5js.org/kreier/sketches/LwK3EW-Os

const canvas_width = 600;
const canvas_height = 400;

// Establish a range of values on the complex plane
// A different range will allow us to "zoom" in or out on the fractal

// Start overview values:
// const w = 3;
// const h = (w * canvas_height) / canvas_width;
// const xmin = -w/1.3;
// const ymin = -h/2;


// zoom 1
const w = 1;
const h = (w * canvas_height) / canvas_width;
const xmin = -1.7;
const ymin = -0.5;

// zoom 2
// const w = 0.5;
// const h = (w * canvas_height) / canvas_width;
// const xmin = -1.45;
// const ymin = -0.5;

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

let hue_offset = 241;
// hue_offset = Math.round(Math.random() * 360);

function HSLToRGB(h,s,l) {
  s /= 100;
  l /= 100;

  let c = (1 - Math.abs(2 * l - 1)) * s,
      x = c * (1 - Math.abs((h / 60) % 2 - 1)),
      m = l - c/2,
      r = 0,
      g = 0,
      b = 0;
  if (0 <= h && h < 60) {
    r = c; g = x; b = 0;  
  } else if (60 <= h && h < 120) {
    r = x; g = c; b = 0;
  } else if (120 <= h && h < 180) {
    r = 0; g = c; b = x;
  } else if (180 <= h && h < 240) {
    r = 0; g = x; b = c;
  } else if (240 <= h && h < 300) {
    r = x; g = 0; b = c;
  } else if (300 <= h && h < 360) {
    r = c; g = 0; b = x;
  }
  r = Math.round((r + m) * 255);
  g = Math.round((g + m) * 255);
  b = Math.round((b + m) * 255);

  return color(r, g, b);
}

function setup() {
  createCanvas(canvas_width, canvas_height);
  pixelDensity(1);
}

function draw() {
  background(0);

  let x = xmin;
  for (let i = 0; i < width; i++) {
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
    let hue = map(norm, 0, 1, 0, 360);
    // let hue = map(sqrt(norm), 0, 1, 0, 360);
    hue = hue + hue_offset;
    if (hue > 359) {
      hue -= 360;
    }
    if (n == maxiterations) {
      hue = 0;
    } else {
      let c = HSLToRGB(hue, 100, 50);
      // let c = color(bright, (85 + bright) % 256, (170 + bright) % 256);
      set(i, j, c);
    }
    x += dx;
  }
  y += dy;
  j++;
  if (j > height) {
    j = 0;
    y = ymin;
    hue_offset = int(random(359));
    print(hue_offset);
  }
  updatePixels();
}
