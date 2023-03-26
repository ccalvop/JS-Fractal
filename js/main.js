// Constants
const CANVAS_SIZE = 600;
const MAX_ITERATIONS = 100;

// EN: Variable to switch between Mandelbrot and Julia sets
// ES: Variable para cambiar entre conjuntos de Mandelbrot y Julia
let mandelbrot = true;

// EN: Complex constant for Julia set
// ES: Constante compleja para el conjunto de Julia
let c;

// EN: Setup function, initializes the canvas and the complex constant
// ES: Función de configuración, inicializa el lienzo y la constante compleja
function setup() {
  createCanvas(CANVAS_SIZE, CANVAS_SIZE);
  pixelDensity(1);
  c = createVector(random(-1, 1), random(-1, 1));
  drawFractal();
}

// EN: Draw function, no need to update the canvas continuously
// ES: Función de dibujo, no es necesario actualizar el lienzo continuamente
function draw() {
  noLoop();
}

// EN: Function that triggers when the mouse is clicked, changes the fractal type and redraws
// ES: Función que se activa cuando se hace clic con el ratón, cambia el tipo de fractal y vuelve a dibujar
function mouseClicked() {
  mandelbrot = !mandelbrot;
  c = createVector(random(-1, 1), random(-1, 1));
  drawFractal();
}

// EN: Function to draw the fractal on the canvas
// ES: Función para dibujar el fractal en el lienzo
function drawFractal() {
  loadPixels();

  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      let a = map(x, 0, width, -2, 2);
      let b = map(y, 0, height, -2, 2);

      let ca = a;
      let cb = b;

      // EN: If Julia set, use the complex constant c
      // ES: Si es conjunto de Julia, usar la constante compleja c
      if (!mandelbrot) {
        ca = c.x;
        cb = c.y;
      }

      let n = 0;

      // EN: Iterate and calculate the escape time algorithm
      // ES: Iterar y calcular el algoritmo de tiempo de escape
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

      // EN: Set brightness based on the number of iterations
      // ES: Establecer brillo basado en el número de iteraciones
      let brightness = map(n, 0, MAX_ITERATIONS, 0, 1);
      brightness = map(sqrt(brightness), 0, 1, 0, 255);

      // EN: Set the pixel color on the canvas
      // ES: Establecer el color del píxel en el lienzo
      let pixelIndex = (x + y * width) * 4;
      pixels[pixelIndex + 0] = brightness;
      pixels[pixelIndex + 1] = brightness;
      pixels[pixelIndex + 2] = brightness;
      pixels[pixelIndex + 3] = 255;
    }
  }

  // EN: Update the canvas with the new pixel data
  // ES: Actualizar el lienzo con los nuevos datos de píxeles
  updatePixels();
}