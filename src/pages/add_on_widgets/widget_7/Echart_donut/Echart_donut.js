import * as echarts from 'echarts';
import { toRaw, nextTick } from 'vue';

export default {
  name: 'TroubleTicketChart',

  // Accept data array from Parent
  props: {
    chartData: {
      type: Array,
      required: true,
      default: () => []
    }
  },

  data() {
    return {
      myChart: null,
      resizeObserver: null,
      resizeTimer: null,
      isUpdatePending: false, // Flag for debounce

      // Static Constants
      PIE_COLORS: [
        '#FF6B6B',  // Red - High Priority
        '#FFC400',  // Amber - Work in Progress
        '#58A6FF',  // Blue - Assigned
        '#03DAC6',  // Teal - Pending
        '#91CC75'   // Green - Closed
      ]
    };
  },

  watch: {
    // Watch data deep to detect value changes inside the array
    chartData: {
      deep: true,
      handler() {
        this.scheduleUpdate();
      }
    },
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

      // Use toRaw to unwrap Vue Proxy for performance
      const rawData = toRaw(this.chartData);

      this.myChart.setOption({
        series: [
          { data: rawData }
        ]
      });
    },

    getOption() {
      const isDark = this.$q.dark.isActive;
      const isMobile = this.$q.screen.lt.md;

      // Colors & Styling
      const backgroundColor = isDark ? '#121212' : '#ffffff';
      const textColor = isDark ? '#E8E8E8' : '#9e9e9e';
      const borderColor = isDark ? '#121212' : '#ffffff';

      return {
        backgroundColor: backgroundColor,
        color: this.PIE_COLORS,

        // --- Animation Config ---
        animation: true,
        // Initial load animation
        animationDuration: 1000,
        animationEasing: 'cubicInOut',
        
        // Update animation (CRITICAL for smooth morphing)
        animationDurationUpdate: 1500,
        animationEasingUpdate: 'quinticInOut',

        tooltip: {
          trigger: 'item',
          formatter: '{b} <br/>Tickets: {c} ({d}%)',
          backgroundColor: isDark ? 'rgba(30, 30, 30, 0.9)' : 'rgba(255, 255, 255, 0.9)',
          textStyle: { 
            color: isDark ? '#E8E8E8' : '#333' 
          },
          borderColor: isDark ? '#333' : '#ccc',
          borderWidth: 1
        },

        legend: {
          top: '1%',
          left: 'center',
          textStyle: { color: textColor }
        },

        series: [
          {
            name: 'Trouble Ticket Status',
            type: 'pie',
            radius: ['40%', '70%'], // Donut style
            center: isMobile ? ['50%', '43%'] : ['50%', '50%'],
            avoidLabelOverlap: false,

            itemStyle: {
              borderRadius: 10,
              borderColor: borderColor,
              borderWidth: 3
            },

            // Center Label (Hidden by default, shown on hover)
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: 20,
                fontWeight: 'bold',
                color: textColor
              }
            },
            labelLine: {
              show: false
            },
            
            // Initial Data
            data: toRaw(this.chartData)
          }
        ]
      };
    }
  }
};