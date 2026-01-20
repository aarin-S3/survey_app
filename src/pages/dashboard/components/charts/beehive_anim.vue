<template>
     <div :class="$q.dark.isActive ? 'bg-transparent' : 'bg-white text-grey-9'"> 
    <q-toolbar style="min-height: 30px; padding: 0px !important; margin-bottom: 5px;"> 
      <h3 :style="$q.dark.isActive ? 'color:#9e9e9e;' : ''" style="font-size: 1rem; display: inline-block; font-weight: 400; padding-left: 8px; color: rgb(158, 158, 158);"> 
        Honey Comb Design
      </h3> 
    </q-toolbar> 
  </div> 
  <div class="hex-grid-dots-container">
    <canvas ref="canvasRef"></canvas>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

// 1. Setup Reactive Reference for the Canvas
const canvasRef = ref(null);

// 2. Configuration for the animation (Can be made props if needed)
const cfg = {
  bgFillColor: 'rgba(50,50,50,.01)',
  dirsCount: 6,
  stepsToTurn: 20,
  dotSize: 4,
  dotCount: 300,
  dotVelocity: 4,
  distance: 70,
};

// 3. Variables to be used in the animation loop
let cw, ch, cx, cy;
let ctx;
let dotList = [];
let dirstList = [];
let animationFrameId = null;

// --- Utility Functions ---

/**
 * Creates the list of direction vectors based on cfg.dirsCount.
 * For 6 directions, this creates vectors for 0, 60, 120, 180, 240, 300 degrees.
 */
function createDirs() {
  dirstList = []; // Clear existing
  for (let i = 0; i < 360; i += 360 / cfg.dirsCount) {
    let x = Math.cos(i * Math.PI / 180);
    let y = Math.sin(i * Math.PI / 180);
    dirstList.push({ x: x, y: y });
  }
}

/**
 * Custom drawRect function for the canvas.
 */
function drawRect(color, x, y, w, h, shadowColor, shadowBlur, gco) {
  if (!ctx) return;
  ctx.globalCompositeOperation = gco;
  ctx.shadowColor = shadowColor || 'black';
  ctx.shadowBlur = shadowBlur;
  ctx.fillStyle = color;
  ctx.fillRect(x, y, w, h);
}

// --- Dot Class ---

/**
 * Represents a single moving dot in the animation.
 */
class Dot {
  constructor() {
    this.pos = { x: cx, y: cy };
    // Start direction (0, 2, or 4 for initial movement along the hex axes)
    this.dir = (Math.random() * 3 | 0) * 2;
    this.step = 0;
  }

  redrawDot() {
    let color = '#f9c74f';
    let size = cfg.dotSize;
    let blur = 0;
    let x = this.pos.x - size / 2;
    let y = this.pos.y - size / 2;

    drawRect(color, x, y, size, size, color, blur);
  }

  moveDot() {
    this.step++;
    // Use the pre-calculated direction vector
    this.pos.x += dirstList[this.dir].x * cfg.dotVelocity;
    this.pos.y += dirstList[this.dir].y * cfg.dotVelocity;
  }

  changeDir() {
    if (this.step % cfg.stepsToTurn === 0) {
      // Randomly change direction to left or right turn
      this.dir = Math.random() > 0.5
        ? (this.dir + 1) % cfg.dirsCount // Turn right
        : (this.dir + cfg.dirsCount - 1) % cfg.dirsCount; // Turn left
    }
  }

  killDot(id) {
    // Kill probability increases exponentially with step count
    let percent = Math.exp(this.step / cfg.distance) * Math.random();

    if (percent > 100) {
      dotList.splice(id, 1);
    }
  }
}

// --- Animation Core Functions ---

/**
 * Initializes canvas dimensions and context.
 */
function init() {
  const cnv = canvasRef.value;
  if (!cnv) return;

  // Use a higher resolution canvas for sharper drawing
  cw = cnv.width = window.innerWidth * 2;
  ch = cnv.height = window.innerHeight * 2;
  // Center coordinates
  cx = cw / 2;
  cy = ch / 2;

  // Set the canvas style to display at normal size, but drawn at * 2 resolution
  cnv.style.width = window.innerWidth + 'px';
  cnv.style.height = window.innerHeight + 'px';

  ctx = cnv.getContext('2d');
  createDirs(); // Re-create directions on resize if needed
}

/**
 * Adds a new dot to the list based on probability.
 */
function addDot() {
  if (dotList.length < cfg.dotCount && Math.random() > 0.8) {
    dotList.push(new Dot());
  }
}

/**
 * Moves, redraws, changes direction, and kills all dots.
 */
function refreshDots() {
  // Loop backward for safe removal during iteration (killDot uses splice)
  for (let id = dotList.length - 1; id >= 0; id--) {
    const dot = dotList[id];
    dot.moveDot();
    dot.redrawDot();
    dot.changeDir();
    dot.killDot(id);
  }
}

/**
 * Main animation loop.
 */
function loop() {
  // Draw transparent background rectangle to create the fading trail effect
  drawRect(cfg.bgFillColor, 0, 0, cw, ch, 0, 0);

  addDot();
  refreshDots();

  // Request next frame and store the ID
  animationFrameId = requestAnimationFrame(loop);
}

// --- Vue Lifecycle Hooks ---

/**
 * Runs after the component is mounted (canvasRef.value is available).
 */
onMounted(() => {
  if (canvasRef.value) {
    // 1. Initial setup
    init();

    // 2. Start the animation loop
    loop();

    // 3. Attach resize listener
    window.addEventListener('resize', init);
  }
});

/**
 * Runs before the component is unmounted (cleanup).
 */
onUnmounted(() => {
  // 1. Stop the animation loop
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId);
  }

  // 2. Remove resize listener to prevent memory leaks
  window.removeEventListener('resize', init);

  // 3. Clear the dot list
  dotList = [];
});
</script>

<style scoped>
.hex-grid-dots-container {
  /* Mimic the body styles from the original CSS */
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 91vh;
  margin: 0;
  padding: 0;
  overflow: hidden;
  background: rgba(50, 50, 50, 1);
  /* Ensure the container is above or behind other content as desired */
  z-index: 1; 
}

canvas {
  /* The canvas is drawn at a higher resolution, but its display size is set here */
  display: block; /* Removes any default bottom margin/spacing */
  background: rgba(50, 50, 50, 0.05);
  width: 100%;
  height: 100%;
}
</style>