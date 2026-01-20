<template>
  <div class="q-pa-xs my-font-color"
    style="height: 80px; padding: 4px 0px !important; overflow: hidden !important; "
    :style="$q.screen.lt.sm ? 'width: 200px;' : 'width: 250px;'">
    <q-bar class="bg-none" style="background: none; border-bottom: 1px solid rgb(144, 164, 173,0.2); "
      :style="$q.dark.isActive ? 'color: #9e9e9e' : 'color: #1c1c1c'">
      Settings
      <q-space />
      <q-btn dense flat round icon="close" @click="onClose"
        :style="$q.dark.isActive ? 'color: #9e9e9e' : 'color: #1c1c1c'" />
    </q-bar>
    <q-separator />
    <q-card-section style="height: 25rem; padding: 0px !important;">
      <!-- <q-scroll-area class="fit"> -->
      <q-list>
        <q-item tag="label" v-ripple style="padding: 0px 10px;">
          <q-item-section>
            <q-item-label>Dark Mode</q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-toggle v-model="dark" checked-icon="bedtime" color="teal" unchecked-icon="sunny" />
          </q-item-section>
        </q-item>

        <!-- <q-item tag="label" v-ripple style="padding: 3px 10px;">
          <q-item-section>
            <q-item-label>Minimize Menu</q-item-label>
            <q-item-label caption>Minimize menu sidebar</q-item-label>
          </q-item-section>
          <q-item-section side top>
            <q-toggle v-model="menuMini" icon="menu" />
          </q-item-section>
        </q-item> -->

        <!-- <q-item tag="label" v-ripple style="padding: 3px 10px;">
          <q-item-section>
            <q-item-label>Auto-Expand Menu</q-item-label>
            <q-item-label caption>Auto-expand menu when hovering</q-item-label>
          </q-item-section>
          <q-item-section side top>
            <q-toggle v-model="menuAutoExpand" icon="menu" />
          </q-item-section>
        </q-item>

        <q-separator spaced style="margin-top: 0px !important;" />
        <q-item-label header style="padding: 0px 10px;">Dashboard Color Scheme</q-item-label>

        <q-item>
          <q-item-section> </q-item-section>
          <q-item-section side top>
            <q-btn-dropdown size="md" align="right" v-model="schemeSelectorShown" outlined flat
              :label="dashboardColorScheme" icon="palette" menu-self="center left">
              <div style="" :style="$q.screen.lt.sm ? 'width: 180px;' : 'width: 400px;'">
                <color-scheme-selector v-model="dashboardColorScheme"></color-scheme-selector>
              </div>
            </q-btn-dropdown>
            <div>
              <q-chip square size="sm">Light:</q-chip>
              <q-chip square size="xs" :style="`background-color: ${lightColors[0]}`"></q-chip>
              <q-chip square size="xs" :style="`background-color: ${lightColors[1]}`"></q-chip>
              <q-chip square size="xs" :style="`background-color: ${lightColors[2]}`"></q-chip>
              <q-chip square size="xs" :style="`background-color: ${lightColors[3]}`"></q-chip>
              <q-chip square size="xs" :style="`background-color: ${lightColors[4]}`"></q-chip>
            </div>
            <div>
              <q-chip square size="sm">Dark:</q-chip>
              <q-chip square size="xs" :style="`background-color: ${darkColors[0]}`"></q-chip>
              <q-chip square size="xs" :style="`background-color: ${darkColors[1]}`"></q-chip>
              <q-chip square size="xs" :style="`background-color: ${darkColors[2]}`"></q-chip>
              <q-chip square size="xs" :style="`background-color: ${darkColors[3]}`"></q-chip>
              <q-chip square size="xs" :style="`background-color: ${darkColors[4]}`"></q-chip>
            </div>
          </q-item-section>
        </q-item>

        <q-separator spaced style="margin-top: 0px !important;" />
        <q-item-label header style="padding: 0px 10px;">Other settings</q-item-label> -->

        <!-- <q-item style="min-height: 30px !important; height: 30px;">
        <q-item-section side>
          <q-icon color="teal" name="volume_down" />
        </q-item-section>
        <q-item-section>
          <q-slider v-model="volume" :min="0" :max="10" label  />
        </q-item-section>
        <q-item-section side>
          <q-icon color="teal" name="volume_up" />
        </q-item-section>
      </q-item> -->

        <!-- <q-item style="min-height: 30px !important; height: 30px;">
          <q-item-section side>
            <q-icon color="deep-orange" name="brightness_medium" />
          </q-item-section>
          <q-item-section>
            <q-slider v-model="brightness" :min="0" :max="10" label color="deep-orange" />
          </q-item-section>
        </q-item> -->

        <!-- <q-item>
        <q-item-section side>
          <q-icon color="primary" name="mic" />
        </q-item-section>
        <q-item-section>
          <q-slider v-model="mic" :min="0" :max="50" label />
        </q-item-section>
      </q-item> -->
      </q-list>
      <!-- </q-scroll-area> -->
    </q-card-section>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useQuasar } from 'quasar'
import { useThemeStore } from '../../stores/theme_store'
import ColorSchemeSelector from './colorschemeselector.vue'

const $q = useQuasar()
const themeStore = useThemeStore()

const emit = defineEmits(['close'])

const schemeSelectorShown = ref(false)
const volume = ref(6)
const brightness = ref(3)
const mic = ref(8)

const dark = computed({
  get: () => themeStore.darkMode,
  set: (value) => {
    themeStore.setDarkMode(value)
    $q.dark.set(value)
  }
})

const menuMini = computed({
  get: () => themeStore.menuMini,
  set: (value) => {
    themeStore.setMenuMini(value)
  }
})

const menuAutoExpand = computed({
  get: () => themeStore.menuAutoExpand,
  set: (value) => {
    themeStore.setMenuAutoExpand(value)
  }
})

const dashboardColorScheme = computed({
  get: () => themeStore.dashboardColorScheme,
  set: (value) => {
    themeStore.setDashboardColorScheme(value)
  }
})

const lightColors = computed(() => themeStore.currentColors.light)
const darkColors = computed(() => themeStore.currentColors.dark)

const onClose = () => {
  emit('close')
}
</script>

<style lang="sass" scoped>
.my-font-color
  color: $font-grey-color

.body--dark .q-item-label
  color: $font-grey-color !important

.body--dark .q-bar
  color: $font-grey-color

.body--dark .q-item
  color: #90a4ae !important




</style>
<style>
.q-toggle__track {
  background: rgb(43 81 97) !important;
}

.q-toggle__inner--truthy .q-toggle__thumb:after {
  background-color: rgb(43 80 97) !important;
}

.q-toggle--dark .q-toggle__inner--truthy {
  color: #2b5060;
}
</style>