import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useDialogStore = defineStore('dialog', () => {
  // Stores objects like: { id: 'uniqueId', title: 'Dialog Name', restore: Function }
  const minimizedDialogs = ref([]);

  const minimize = (id, title, restoreCallback) => {
    // Check if already minimized to avoid duplicates
    const exists = minimizedDialogs.value.find(d => d.id === id);
    if (!exists) {
      minimizedDialogs.value.push({
        id,
        title,
        restore: restoreCallback
      });
    }
  };

  const restore = (id) => {
    const dialog = minimizedDialogs.value.find(d => d.id === id);
    if (dialog) {
      dialog.restore(); // Call the function to re-open the dialog
      // Remove from list
      minimizedDialogs.value = minimizedDialogs.value.filter(d => d.id !== id);
    }
  };

  return { minimizedDialogs, minimize, restore };
});