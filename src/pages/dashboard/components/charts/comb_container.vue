<template>
  <div class="console-content">
    <div class="row q-col-gutter-md servers-container">
      <div class="col-12 col-sm-6 col-md-3" v-for="server in props.servers" :key="server.id">
        <span :class="$q.dark.isActive ? 'hex-dark' : 'hex-light'">
          <div class="hex-card" :class="$q.dark.isActive ? 'hex-dark' : 'hex-light'">

            <div class="hex-content">

              <div class="status-pill" :style="$q.screen.lt.md ? 'width: 220px ;' : 'width: 170px ;'"
                :class="server.status === 'online' ? 'green' : 'yellow'">
                {{ server.name }}
                <q-tooltip class="bg-dark text-white" :offset="[0, 5]">
                  {{ server.name }}
                </q-tooltip>
              </div>

              <div class="alert-icon">
                <q-btn round flat dense icon="power_settings_new"
                  :class="server.powerOn ? 'power-btn-on' : 'power-btn-off'" size="sm" @click="openPowerDialog(server)">
                  <q-tooltip class="bg-dark text-white">
                    {{ server.powerOn ? 'Turn Off' : 'Turn On' }}
                  </q-tooltip>
                </q-btn>
              </div>

              <div class="server-details">
                <div class="ip-text" :style="{ color: $q.dark.isActive ? '#e5e7eb' : '#4b5563' }">
                  IP: {{ server.ip }}
                </div>

                <div class="memory-row">
                  <span :style="{ color: $q.dark.isActive ? '#9ca3af' : '#6b7280' }">Memory Usage</span>
                  <span :style="{ color: $q.dark.isActive ? '#9ca3af' : '#6b7280' }">{{ server.powerOn ?
                    server.memoryUsage : 0 }}%</span>
                </div>

                <div class="custom-progress"
                  :class="$q.dark.isActive ? 'custom-progress-bg-dark' : 'custom-progress-bg-light'">
                  <div class="fill" :class="server.status === 'online' ? 'fill-green' : 'fill-yellow'"
                    :style="{ width: (server.powerOn ? server.memoryUsage : 0) + '%' }"></div>
                </div>
              </div>

            </div>
          </div>
        </span>
      </div>
    </div>
  </div>
  <q-dialog v-model="confirmDialog">
    <q-card class="" style="min-width: 350px; box-shadow: none;">
      <q-bar class="bg-transparent">
        <div :class="$q.dark.isActive ? 'dialog-header-dark' : 'dialog-header-light'" style="">{{ targetServer?.name }}
        </div>
      </q-bar>

      <q-separator style="margin: 0px;" />

      <q-card-section class="q-pt-md " :class="$q.dark.isActive ? 'dialog-subtitle-dark' : 'dialog-subtitle-light'">
        This will {{ targetServer?.powerOn ? 'shutdown' : 'boot up' }} the server instance at {{ targetServer?.ip }}.
      </q-card-section>

      <q-card-actions align="right" class="bg-transparent" style="padding: 2px;">
        <div>
          <q-btn label="Cancel" :class="$q.dark.isActive ? 'dialog-field-label-dark' : 'dialog-field-label-light'"
            style="padding: 2.5px 4px !important; font-size:10.5px !important; border-radius: 0px; border-width: 2px !important;"
            outline v-close-popup />
          <button @click="executeToggle" class="custom-create-btn"
            style="padding: 4px 5px !important; font-size: 11px !important;  margin-left: 9px; margin-top: -1px !important; margin-right: 9px;"
            type="submit">
            Save
          </button>
        </div>
      </q-card-actions>
    </q-card>
  </q-dialog>

  <q-dialog v-model="alertDialog">
    <q-card style="box-shadow: none; width: 400px;">
      <div class="" style="padding: 10px !important; padding-bottom: 0px !important; font-size: 16px !important; ">{{
        targetServer?.name }}</div>

      <q-card-section class="row items-center" style="padding: 5px 10px 0px 10px !important;">
        <span class="q-ml-sx">
          Are you sure you want to {{ targetServer?.powerOn ? 'STOP' : 'START' }} {{ targetServer?.name }}? This is a
          critical infrastructure node.
        </span>
      </q-card-section>

      <q-card-actions align="right" style="padding-top: -10px;  padding-bottom: 3px;padding-right: 2px;">
        <q-btn flat label="Cancel" dense color="primary" v-close-popup
          style="padding: 3px 0px !important; font-size:10px !important; border-radius: 2px; border-width: 2px !important;" />
        <q-btn @click="executeToggle" dense flat :label="targetServer?.powerOn ? 'Stop' : 'Start'"
          :color="targetServer?.powerOn ? 'red' : 'green'" v-close-popup
          style="padding: 3px 0px !important; font-size:10px !important; border-radius: 2px; border-width: 2px !important;" />
      </q-card-actions>
    </q-card>
  </q-dialog>

</template>

<script setup>
import { ref } from 'vue'
import { useQuasar } from 'quasar'

// Define Props
const props = defineProps({
  servers: {
    type: Array,
    default: () => []
  }
})

const $q = useQuasar()

// Dialog States
const confirmDialog = ref(false)
const alertDialog = ref(false)
const targetServer = ref(null)

// Open Dialog Logic
const openPowerDialog = (server) => {
  targetServer.value = server

  // CHECK IF IT IS THE SPECIAL SERVER (SRV2)
  if (server.name === 'WIN-SRV2') {
    alertDialog.value = true
  } else {
    // STANDARD DIALOG FOR OTHERS
    confirmDialog.value = true
  }
}

// Execute Action Logic
const executeToggle = () => {
  if (targetServer.value) {
    // Toggle Power State
    targetServer.value.powerOn = !targetServer.value.powerOn

    // Update status logic
    if (!targetServer.value.powerOn) {
      targetServer.value.status = 'offline'
    } else {
      targetServer.value.status = 'online'
    }

    // Notification
    $q.notify({
      color: targetServer.value.powerOn ? 'green-5' : 'red-5',
      textColor: 'white',
      icon: targetServer.value.powerOn ? 'check_circle' : 'power_off',
      message: `${targetServer.value.name} is now ${targetServer.value.powerOn ? 'Online' : 'Offline'}`
    })
  }

  confirmDialog.value = false
  alertDialog.value = false
}
</script>

<style lang="scss" scoped>
.console-content {
  padding-top: 10px;
  width: 100%;
  margin-bottom: 20px;
}

.custom-create-btn {
  background-color: transparent;
  color: #385562;
  border: 2px solid #385562;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  text-transform: uppercase;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s ease;
}

.custom-create-btn:hover {
  background-color: #1d2c33;
  border: 2px solid #385562;
  color: grey;
  font-weight: 500;
}

// --- The Sci-Fi Hexagon Container ---
.hex-card {
  width: 100%;
  height: 100px;
  // This creates the shape
  clip-path: polygon(10% 0, 90% 0, 100% 50%, 90% 100%, 10% 100%, 0% 50%);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  transition: transform 0.3s ease, filter 0.3s ease;

  &:hover {
    transform: scale(1.02);
  }
}

// --- DARK MODE HEX ---
.hex-dark {
  background: linear-gradient(180deg, #374151 0%, #1f2937 100%);
  filter: drop-shadow(0 2px 3px rgba(53, 63, 79, 0.5));

  &:hover {
    filter: drop-shadow(0 3px 5px rgba(53, 63, 79, 0.6));
  }
}

// --- LIGHT MODE HEX ---
.hex-light {
  background: #fff;
  filter: drop-shadow(0 2px 3px rgba(0, 0, 0, 0.3));

  &:hover {
    filter: drop-shadow(0 3px 5px rgba(0, 0, 0, 0.45));
  }
}

.hex-content {
  width: 100%;
  height: 100%;
  padding: 15px 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
}

// --- Status Pill (CRITICAL UPDATES) ---
.status-pill {
  border-radius: 12px;
  padding: 0 20px; // Use side padding only
  text-align: center;
  font-size: 0.80rem;
  margin-bottom: 8px;
  align-self: flex-start;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);

  // --- TRUNCATION & HEIGHT FIXES ---
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  // 1. Stop the flex container from crushing the height
  flex-shrink: 0;

  // 2. Force a minimum height so text is visible
  min-height: 22px;

  // 3. Center the text vertically within that height
  line-height: 22px;

  // 4. Ensure block display for ellipsis to work correctly
  display: block;
  // --------------------------------

  &.green {
    background-color: #2e7d32;
    color: white;
  }

  &.yellow {
    background-color: #e48900;
    color: white;
  }
}

// --- Details Section ---
.ip-text {
  font-family: monospace;
  font-size: 0.8rem;
  margin-bottom: 4px;
}

.memory-row {
  display: flex;
  justify-content: space-between;
  font-size: 0.7rem;
  margin-bottom: 2px;
}

// --- Custom Progress Bar ---
.custom-progress {
  width: 100%;
  height: 5px;
  border-radius: 3px;
  margin-bottom: 5px;
  overflow: hidden;

  .fill {
    height: 100%;
    border-radius: 3px;
    transition: width 0.5s ease;
  }

  .fill-green {
    background-color: #22c55e;
  }

  .fill-yellow {
    background-color: #fbbf24;
  }
}

// --- Icon & Action ---
.alert-icon {
  position: absolute;
  top: 7px;
  right: 35px;
  font-size: 1.2rem;
}

.power-btn-on {
  color: #4ade80;
  text-shadow: 0 0 5px rgba(74, 222, 128, 0.5);
}

.power-btn-off {
  color: #f87171;
}
</style>