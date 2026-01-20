<template>
  <q-page class="scada-console" :class="$q.dark.isActive ? 'theme-dark' : 'theme-light'">

    <div :class="$q.dark.isActive ? 'bg-transparent' : 'bg-white text-grey-9'">
      <q-toolbar style="min-height: 30px; padding: 0px !important; margin-bottom: 5px;">
        <h3 :style="$q.dark.isActive ? 'color:#9e9e9e;' : ''"
          style="font-size: 1rem; display: inline-block; font-weight: 400; padding-left: 8px;">
          Honey Comb Superstructure v3
        </h3>
      </q-toolbar>
    </div>

    <div class="hex-center-point">
      <div v-for="hex in hexGridCoords" :key="hex.id" class="mini-hex" :style="hex.style"></div>
    </div>

  </q-page>
</template>

<script setup>
import { computed } from 'vue';
import { useQuasar } from 'quasar';

const $q = useQuasar();

// --- Configuration ---
const HEX_SIZE = $q.screen.lt.sm ? 50 : 70; // Diameter of a single mini-hex in pixels
const RINGS = 3;     // Layers out from center
const GAP_FACTOR = 1.05; // Spacing

// --- Hexagon Math (Axial Coordinates) ---
function generateHexRings(radius) {
  const results = [];
  for (let q = -radius; q <= radius; q++) {
    const r1 = Math.max(-radius, -q - radius);
    const r2 = Math.min(radius, -q + radius);
    for (let r = r1; r <= r2; r++) {
      results.push({ q, r });
    }
  }
  return results;
}

const hexGridCoords = computed(() => {
  const coords = generateHexRings(RINGS);
  const spacing = HEX_SIZE * GAP_FACTOR;

  // Math for Pointy-Topped Hexagons
  const xStep = spacing;
  const yStep = spacing * Math.sqrt(3) / 2;

  return coords.map(c => {
    // Calculate pixel positions relative to center (0,0)
    const xPos = (c.q * xStep) + (c.r * xStep / 2);
    const yPos = (c.r * yStep);

    return {
      id: `${c.q}_${c.r}`,
      style: {
        width: `${HEX_SIZE}px`,
        height: `${HEX_SIZE}px`,
        left: `${xPos}px`,
        top: `${yPos}px`,
        // Center the element on its coordinate
        transform: 'translate(-50%, -50%)'
      }
    };
  });
});
</script>

<style lang="scss" scoped>
// --- Core Layout (Shared across modes) ---
.scada-console {
  min-height: 100vh;
  font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  position: relative;
  overflow: hidden;
  // Smooth transition for background color change
  transition: background-color 0.3s ease, color 0.3s ease;
}

.hex-center-point {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  overflow: visible;
}

.mini-hex {
  // Position is handled by inline styles in script
  position: absolute;
  clip-path: polygon(50% 0%, 95% 25%, 95% 75%, 50% 100%, 5% 75%, 5% 25%);
  transition: all 0.3s ease;
  cursor: pointer;
  z-index: 1;

  // We define the transform logic here, but colors are handled below in Themes
  &:hover {
    // IMPORTANT: We must include translate(-50%,-50%) so the scale doesn't shift the position
    transform: translate(-50%, -50%) scale(1.15) !important;
    z-index: 10;
  }
}

// --- Theme Logic ---

// 1. Dark Mode Styles
.theme-dark {
  background-color: #121212;
  color: #ecf0f1;

  .mini-hex {
    background: #ffd100; // Bright Yellow
  }

  .mini-hex:hover {
    background: #ffff00;
    box-shadow: 0 0 15px rgba(255, 255, 0, 0.5); // Glow
  }
}

// 2. Light Mode Styles
.theme-light {
  background-color: #ffffff;
  color: #424242;

  .mini-hex {
    background: #FF9800; // Orange/Amber
  }

  .mini-hex:hover {
    background: #FFC107; // Lighter Amber
    // Use filter for drop-shadow because regular box-shadow gets clipped by clip-path
    filter: drop-shadow(0px 4px 6px rgba(0, 0, 0, 0.2));
  }
}
</style>