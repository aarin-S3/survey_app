import { defineStore } from "pinia";

export const useThemeStore = defineStore("theme", {
  state: () => ({
    dashboardColorScheme: "Default",
    darkMode: true,
    menuMini: false,
    menuAutoExpand: true,
  }),

  getters: {
    currentColors: (state) => {
      const colorSchemes = {
        Default: {
          light: ["#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd"],
          dark: ["#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd"],
          // dark: ['#8dd3c7', '#ffffb3', '#bebada', '#fb8072', '#80b1d3']
        },
        Grafana: {
          light: ["#7eb26d", "#eab839", "#6ed0e0", "#ef843c", "#e24d42"],
          dark: ["#7eb26d", "#eab839", "#6ed0e0", "#ef843c", "#e24d42"],
        },
        Tableau: {
          light: ["#4e79a7", "#f28e2c", "#e15759", "#76b7b2", "#59a14f"],
          dark: ["#4e79a7", "#f28e2c", "#e15759", "#76b7b2", "#59a14f"],
        },
        Cool: {
          light: ["#3182bd", "#6baed6", "#9ecae1", "#c6dbef", "#e6f3ff"],
          dark: ["#08519c", "#3182bd", "#6baed6", "#9ecae1", "#c6dbef"],
        },
        Warm: {
          light: ["#d94801", "#fd8d3c", "#fdae6b", "#fdd0a2", "#feedde"],
          dark: ["#7f2704", "#d94801", "#fd8d3c", "#fdae6b", "#fdd0a2"],
        },
      };

      const scheme =
        colorSchemes[state.dashboardColorScheme] || colorSchemes["Default"];
      return {
        light: scheme.light.slice(0, 5),
        dark: scheme.dark.slice(0, 5),
      };
    },
  },

  actions: {
    setDashboardColorScheme(scheme) {
      this.dashboardColorScheme = scheme;
    },

    setDarkMode(value) {
      this.darkMode = value;
    },

    setMenuMini(value) {
      this.menuMini = value;
    },

    setMenuAutoExpand(value) {
      this.menuAutoExpand = value;
    },
  },
});
