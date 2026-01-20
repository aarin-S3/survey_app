import * as echarts from 'echarts';
import { toRaw, nextTick } from 'vue';

export default {
  name: 'IncidentVolumeChart',

  // Accept data from Parent
  props: {
    customerCalls: { type: Array, required: true },
    scadaData: { type: Array, required: true },
    mobileData: { type: Array, required: true }
  },

  data() {
    return {
      myChart: null,
      resizeObserver: null,
      resizeTimer: null,
      isUpdatePending: false, // Flag for debounce
      
      // Static Data
      angleCategories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      legendData: ['Customer Calls', 'SCADA/ADMS Trip', 'Mobile Crew Report']
    };
  },

  watch: {
    // Watch for data changes
    customerCalls: { deep: true, handler() { this.scheduleUpdate(); } },
    scadaData: { deep: true, handler() { this.scheduleUpdate(); } },
    mobileData: { deep: true, handler() { this.scheduleUpdate(); } },
    
    // Watch dark mode
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

      // Use toRaw for performance
      const rawCalls = toRaw(this.customerCalls);
      const rawScada = toRaw(this.scadaData);
      const rawMobile = toRaw(this.mobileData);

      this.myChart.setOption({
        series: [
          { data: rawCalls },
          { data: rawScada },
          { data: rawMobile }
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
        // Initial load
        animationDuration: 1500,
        animationEasing: 'cubicOut',
        animationDelay: (idx) => idx * 100, // Rotational Ripple effect
        
        // Data update animation (CRITICAL for smooth transitions)
        animationDurationUpdate: 1200, 
        animationEasingUpdate: 'cubicInOut',

        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} incidents',
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
          center: isMobile ? ['50%', '50%'] : ['50%', '55%'],
          radius: ['0%', '65%']
        },
        // Angle Axis (Days of Week)
        angleAxis: {
          type: 'category',
          data: this.angleCategories,
          axisLabel: { color: textColor },
          z: 10
        },
        // Radial Axis (Count)
        radiusAxis: {
          axisLabel: { color: textColor },
          splitLine: { lineStyle: { color: splitLineColor } }
        },
        series: [
          {
            type: 'bar',
            data: toRaw(this.customerCalls),
            coordinateSystem: 'polar',
            name: this.legendData[0],
            stack: 'incident_stack',
            emphasis: { focus: 'series' }
          },
          {
            type: 'bar',
            data: toRaw(this.scadaData),
            coordinateSystem: 'polar',
            name: this.legendData[1],
            stack: 'incident_stack',
            emphasis: { focus: 'series' }
          },
          {
            type: 'bar',
            data: toRaw(this.mobileData),
            coordinateSystem: 'polar',
            name: this.legendData[2],
            stack: 'incident_stack',
            emphasis: { focus: 'series' }
          }
        ]
      };
    }
  }
};