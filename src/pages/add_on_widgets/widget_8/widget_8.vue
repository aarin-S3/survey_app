<template>
  <q-page class="scada-console" :class="$q.dark.isActive ? 'theme-dark' : 'theme-light'">
    <div class="bg-transparent">
      <q-toolbar style="min-height: 30px; padding: 0px !important; margin-bottom: 5px;">
        <h3 :style="$q.dark.isActive ? 'color:#9e9e9e;' : ''"
          style="font-size: 1rem; display: inline-block; font-weight: 400; padding-left: 8px;">
          Honey Comb Design v1
        </h3>
      </q-toolbar>
    </div>

    <div class="container" align="center">
      <div class="hex-layer-6">
        <div class="hex" :style="{ height: $q.screen.lt.sm ? '60px' : '80px', width: $q.screen.lt.sm ? '60px' : '80px' }" v-for="n in 6" :key="'l6-'+n"></div>
      </div>
      <div class="hex-layer-5">
        <div class="hex" :style="{ height: $q.screen.lt.sm ? '60px' : '80px', width: $q.screen.lt.sm ? '60px' : '80px' }" v-for="n in 5" :key="'l5-'+n"></div>
      </div>
      <div class="hex-layer-4">
        <div class="hex" :style="{ height: $q.screen.lt.sm ? '60px' : '80px', width: $q.screen.lt.sm ? '60px' : '80px' }" v-for="n in 4" :key="'l4-'+n"></div>
      </div>
      <div class="hex-layer-3">
        <div class="hex" :style="{ height: $q.screen.lt.sm ? '60px' : '80px', width: $q.screen.lt.sm ? '60px' : '80px' }" v-for="n in 3" :key="'l3-'+n"></div>
      </div>
      <div class="hex-layer-2">
        <div class="hex" :style="{ height: $q.screen.lt.sm ? '60px' : '80px', width: $q.screen.lt.sm ? '60px' : '80px' }" v-for="n in 2" :key="'l2-'+n"></div>
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
// $hex-size: 80px; 
$row-margin: -11px; 

// --- Layout Logic (Shared across both modes) ---
.scada-console {
  min-height: 100vh;
  font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.container {
  max-width: 1200px;
  margin: 120px auto 20px auto;
}

// Hexagon Shape & Grid System
.hex {
  // height: $hex-size;
  // width: $hex-size;
  align-self: center;
  // Clip path creates the shape, color is handled in Theme section below
  clip-path: polygon(50% 0%, 95% 25%, 95% 75%, 50% 100%, 5% 75%, 5% 25%);
  transition: all 0.3s ease; 
  cursor: pointer; 
}

.hex:hover {
  transform: scale(1.1); 
  z-index: 10; 
}

// Grid Layers
.hex-layer-6, .hex-layer-5, .hex-layer-4, .hex-layer-3, .hex-layer-2 {
  display: grid;
  justify-content: center;
  align-content: center;
  margin: $row-margin 0px; 
}

.hex-layer-6 { grid-template-columns: repeat(6, 0fr); }
.hex-layer-5 { grid-template-columns: repeat(5, 0fr); }
.hex-layer-4 { grid-template-columns: repeat(4, 0fr); }
.hex-layer-3 { grid-template-columns: repeat(3, 0fr); }
.hex-layer-2 { grid-template-columns: repeat(2, 0fr); }


.theme-dark {
  background-color: #121212;
  color: #ecf0f1;

  .hex {
    background: #ffd100;
  }

  .hex:hover {
    background: #ffff00;
    box-shadow: 0 0 15px rgba(255, 209, 0, 0.5);
  }
}


.theme-light {
  background-color: #ffffff;
  color: #424242;

  .hex {
    background: #FF9800; 
  }

  .hex:hover {
    background: #FFC107;
    filter: drop-shadow(0px 4px 6px rgba(0,0,0,0.2)); 
  }
}
</style>