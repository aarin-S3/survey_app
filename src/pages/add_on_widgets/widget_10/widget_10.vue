<template>
  <q-page class="scada-console" :class="$q.dark.isActive ? 'theme-dark' : 'theme-light'">
    <div :class="$q.dark.isActive ? 'bg-transparent' : 'bg-white text-grey-9'">
      <q-toolbar style="min-height: 30px; padding: 0px !important; margin-bottom: 5px;">
        <h3 :style="$q.dark.isActive ? 'color:#9e9e9e;' : ''"
          style="font-size: 1rem; display: inline-block; font-weight: 400; padding-left: 8px;">
          Honey Comb Design v2 
        </h3>
      </q-toolbar>
    </div>

    <div class="container" align="center">
      <div class="hex-layer-5">
        <div class="hex" v-for="n in 17" :key="'l1-'+n"></div>
      </div>
      <div class="hex-layer-6">
        <div class="hex" v-for="n in 16" :key="'l2-'+n"></div>
      </div>
      <div class="hex-layer-5">
        <div class="hex" v-for="n in 17" :key="'l3-'+n"></div>
      </div>
      <div class="hex-layer-6">
        <div class="hex" v-for="n in 16" :key="'l4-'+n"></div>
      </div>
      <div class="hex-layer-5">
        <div class="hex" v-for="n in 17" :key="'l5-'+n"></div>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { useQuasar } from 'quasar';
const $q = useQuasar();
</script>

<style lang="scss" scoped>
// --- Configuration Variables ---
$hex-size: 70px; 
$row-margin: -11px; 

// --- Layout Logic (Shared across both modes) ---
.scada-console {
  min-height: 100vh;
  font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  // Smooth transition between dark and light backgrounds
  transition: background-color 0.3s ease, color 0.3s ease;
}

.container {
  max-width: 1200px;
  margin: 50px auto 20px auto;
}

// Grid Layers (Compact Layout)
.hex-layer-6 {
  display: grid;
  grid-template-columns: repeat(16, 0fr);
  margin: $row-margin 0px; 
  justify-content: center;
  align-content: center;
}

.hex-layer-5 {
  display: grid;
  justify-content: center;
  margin: $row-margin 0px; 
  align-content: center;
  grid-template-columns: repeat(17, 0fr);
}

// Hexagon Shape
.hex {
  height: $hex-size;
  width: $hex-size; 
  align-self: center;
  clip-path: polygon(50% 0%, 95% 25%, 95% 75%, 50% 100%, 5% 75%, 5% 25%);
  transition: all 0.3s ease; 
  cursor: pointer; 
}

.hex:hover {
  transform: scale(1.1); 
  z-index: 10; 
}

// --- Theme Logic (Colors & Effects) ---

// 1. Dark Mode Styles
.theme-dark {
  background-color: #121212;
  color: #ecf0f1;

  .hex {
    background: #ffd100; // Bright Yellow
  }

  .hex:hover {
    background: #ffff00;
    box-shadow: 0 0 15px rgba(255, 209, 0, 0.5); // Glow effect
  }
}

// 2. Light Mode Styles
.theme-light {
  background-color: #ffffff;
  color: #424242;

  .hex {
    // Orange/Amber for visibility on white
    background: #FF9800; 
  }

  .hex:hover {
    background: #FFC107; // Lighter Amber
    // Drop shadow (Filter used because clip-path cuts off standard box-shadow)
    filter: drop-shadow(0px 4px 6px rgba(0,0,0,0.2)); 
  }
}
</style>