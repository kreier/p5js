# Mandelbrot set

Some modifications of the template on p5js led to this realtime color Mandelbrot set.

![mandelbrot](mandelbrot.png)

This is the code:

``` js
const canvas_width = 600;
const canvas_height = 400;
const w = 3;
const h = (w * canvas_height) / canvas_width;
const xmin = -w/1.3;
const ymin = -h/2;
const maxiterations = 100;
const xmax = xmin + w;
const ymax = ymin + h;
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
      if (dist(aa, bb, 0, 0) > 16) {
        break;  // Bail
      }
      n++;
    }
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
```
