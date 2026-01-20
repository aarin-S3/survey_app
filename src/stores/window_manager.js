import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useWindowManager = defineStore('windowManager', () => {
  const minimizedWindows = ref([])

  // Add a window to the footer dock
  const minimize = (id, title, restoreCallback) => {
    const exists = minimizedWindows.value.find(w => w.id === id)
    if (!exists) {
      minimizedWindows.value.push({
        id,
        title,
        restore: restoreCallback
      })
    }
  }

  // Restore window and remove from dock
  const restore = (id) => {
    const window = minimizedWindows.value.find(w => w.id === id)
    if (window) {
      window.restore()
      minimizedWindows.value = minimizedWindows.value.filter(w => w.id !== id)
    }
  }

  // Clear all windows (Call this when leaving the page)
  const clear = () => {
    minimizedWindows.value = []
  }

  return { minimizedWindows, minimize, restore, clear }
})