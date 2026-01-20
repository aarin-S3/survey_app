import * as echarts from 'echarts';
import { toRaw, nextTick } from 'vue';

export default {
  name: 'OutageDurationChart',

  // Accept data arrays from Parent
  props: {
    equipmentData: { type: Array, required: true },
    weatherData: { type: Array, required: true },
    thirdPartyData: { type: Array, required: true }
  },

  data() {
    return {
      myChart: null,
      resizeObserver: null,
      resizeTimer: null,
      isUpdatePending: false, // Flag for debouncing updates
      
      // Static definitions
      radiusCategories: ['Feeder 31A (Worst)', 'Feeder 43B', 'Feeder 55C', 'Feeder 68D'],
      legendData: ['Equipment Failure', 'Weather', 'Third-Party Damage']
    };
  },

  watch: {
    // Watch all data props. When any change, schedule a single update.
    equipmentData: { deep: true, handler() { this.scheduleUpdate(); } },
    weatherData: { deep: true, handler() { this.scheduleUpdate(); } },
    thirdPartyData: { deep: true, handler() { this.scheduleUpdate(); } },
    
    // Watch dark mode to redraw themes
    '$q.dark.isActive': function () {
      if (this.myChart) {
        this.myChart.setOption(this.getOption());
      }
    }
  },

  mounted() {
    this.initChart();
  },

  beforeUnmount() {
    if (this.resizeObserver) this.resizeObserver.disconnect();
    if (this.myChart) {
      this.myChart.dispose();
      this.myChart = null;
    }
  },

  methods: {
    initChart() {
      const chartDom = this.$refs.chartRef;
      if (!chartDom) return;

      this.myChart = echarts.init(chartDom);
      this.myChart.setOption(this.getOption());

      // Robust Resize Observer
      this.resizeObserver = new ResizeObserver(() => {
        if (this.resizeTimer) cancelAnimationFrame(this.resizeTimer);
        this.resizeTimer = requestAnimationFrame(() => {
          if (this.myChart) this.myChart.resize();
        });
      });
      this.resizeObserver.observe(chartDom);
    },

    // --- Debounced Update Logic ---
    scheduleUpdate() {
      if (this.isUpdatePending) return;
      this.isUpdatePending = true;
      
      nextTick(() => {
        this.updateChartData();
        this.isUpdatePending = false;
      });
    },

    updateChartData() {
      if (!this.myChart) return;

      // Use toRaw to ensure ECharts gets plain arrays (performance fix)
      const rawEquip = toRaw(this.equipmentData);
      const rawWeather = toRaw(this.weatherData);
      const rawThird = toRaw(this.thirdPartyData);

      this.myChart.setOption({
        series: [
          { data: rawEquip },
          { data: rawWeather },
          { data: rawThird }
        ]
      });
    },

    getOption() {
      const isDark = this.$q.dark.isActive;
      const isMobile = this.$q.screen.lt.md;

      // Colors
      const backgroundColor = isDark ? '#121212' : '#ffffff';
      const textColor = isDark ? '#ccc' : '#333333';
      const legendColor = isDark ? '#B0B0B0' : '#555555';
      const splitLineColor = isDark ? '#333' : '#e0e0e0';

      return {
        backgroundColor: backgroundColor,

        // --- Animation Configuration ---
        animation: true,
        // Initial load animation
        animationDuration: 2000,
        animationEasing: 'elasticOut',
        animationDelay: (idx) => idx * 200,
        
        // Update animation (CRITICAL for smooth transitions)
        animationDurationUpdate: 1500,
        animationEasingUpdate: 'quinticInOut', 
        
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} minutes',
          backgroundColor: isDark ? 'rgba(50,50,50,0.7)' : 'rgba(255,255,255,0.9)',
          textStyle: { color: isDark ? '#fff' : '#333' }
        },
        legend: {
          show: true,
          data: this.legendData,
          top: 10,
          bottom: 0,
          textStyle: { color: legendColor }
        },
        polar: {
          center: isMobile ? ['50%', '43%'] : ['50%', '50%'],
          radius: ['20%', '65%']
        },
        radiusAxis: {
          type: 'category',
          data: this.radiusCategories,
          z: 100,
          axisLabel: {
            color: textColor,
            interval: 0
          },
          axisLine: { show: false },
          axisTick: { show: false }
        },
        angleAxis: {
          type: 'value',
          name: 'Total Duration (Minutes)',
          min: 0,
          nameTextStyle: { color: textColor },
          axisLabel: { color: textColor },
          splitLine: { lineStyle: { color: splitLineColor } },
          z: 1
        },
        series: [
          {
            type: 'bar',
            // Load initial data
            data: toRaw(this.equipmentData),
            coordinateSystem: 'polar',
            name: this.legendData[0],
            stack: 'total_duration',
            emphasis: { focus: 'series' }
          },
          {
            type: 'bar',
            data: toRaw(this.weatherData),
            coordinateSystem: 'polar',
            name: this.legendData[1],
            stack: 'total_duration',
            emphasis: { focus: 'series' }
          },
          {
            type: 'bar',
            data: toRaw(this.thirdPartyData),
            coordinateSystem: 'polar',
            name: this.legendData[2],
            stack: 'total_duration',
            emphasis: { focus: 'series' }
          }
        ]
      };
    }
  }
};