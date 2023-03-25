const CANVAS_SIZE = 600;
const MAX_ITERATIONS = 100;

let mandelbrot = true;
let c;

function setup() {
  createCanvas(CANVAS_SIZE, CANVAS_SIZE);
  pixelDensity(1);
  c = createVector(random(-1, 1), random(-1, 1));
  drawFractal();
}

function draw() {
  // No need to update the canvas continuously
  noLoop();
}

function mouseClicked() {
  mandelbrot = !mandelbrot;
  c = createVector(random(-1, 1), random(-1, 1));
  drawFractal();
}

function drawFractal() {
  loadPixels();

  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      let a = map(x, 0, width, -2, 2);
      let b = map(y, 0, height, -2, 2);

      let ca = a;
      let cb = b;

      if (!mandelbrot) {
        ca = c.x;
        cb = c.y;
      }

      let n = 0;

      while (n < MAX_ITERATIONS) {
        let aa = a * a - b * b;
        let bb = 2 * a * b;

        a = aa + ca;
        b = bb + cb;

        if (abs(a + b) > 16) {
          break;
        }

        n++;
      }

      let brightness = map(n, 0, MAX_ITERATIONS, 0, 1);
      brightness = map(sqrt(brightness), 0, 1, 0, 255);

      let pixelIndex = (x + y * width) * 4;
      pixels[pixelIndex + 0] = brightness;
      pixels[pixelIndex + 1] = brightness;
      pixels[pixelIndex + 2] = brightness;
      pixels[pixelIndex + 3] = 255;
    }
  }

  updatePixels();
}