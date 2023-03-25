let zoomFactor = 1;
let offsetX = 0;
let offsetY = 0;
let randomOffsetX, randomOffsetY;

function setup() {
  createCanvas(800, 600);
  pixelDensity(1);
  randomOffsetX = random(-2, 2);
  randomOffsetY = random(-2, 2);
}

function draw() {
  drawMandelbrot();
}

function drawMandelbrot() {
  loadPixels();
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      let a = map(x, 0, width, -2 / zoomFactor + offsetX + randomOffsetX, 2 / zoomFactor + offsetX + randomOffsetX);
      let b = map(y, 0, height, -2 / zoomFactor + offsetY + randomOffsetY, 2 / zoomFactor + offsetY + randomOffsetY);

      let ca = a;
      let cb = b;
      let n = 0;

      while (n < 100) {
        let aa = a * a - b * b;
        let bb = 2 * a * b;
        a = aa + ca;
        b = bb + cb;
        if (abs(a + b) > 16) {
          break;
        }
        n++;
      }

      let brightness = map(n, 0, 100, 0, 255);
      if (n === 100) {
        brightness = 0;
      }

      let pix = (x + y * width) * 4;
      pixels[pix + 0] = brightness;
      pixels[pix + 1] = brightness;
      pixels[pix + 2] = brightness;
      pixels[pix + 3] = 255;
    }
  }
  updatePixels();
}

function mouseClicked() {
  randomOffsetX = random(-2, 2);
  randomOffsetY = random(-2, 2);
}