import * as echarts from 'echarts';
import { toRaw, nextTick } from 'vue';

export default {
  name: 'TieredOutageChart',

  props: {
    innerData: { type: Array, required: true },
    outerData: { type: Array, required: true }
  },

  data() {
    return {
      myChart: null,
      resizeObserver: null,
      isUpdatePending: false // Flag to prevent double-updates
    };
  },

  watch: {
    innerData: {
      deep: true,
      handler() { this.scheduleUpdate(); }
    },
    outerData: {
      deep: true,
      handler() { this.scheduleUpdate(); }
    },
    '$q.dark.isActive': function () {
      if (this.myChart) this.myChart.setOption(this.getOption());
    }
  },

  mounted() {
    this.initChart();
  },

  beforeUnmount() {
    if (this.resizeObserver) this.resizeObserver.disconnect();
    if (this.myChart) this.myChart.dispose();
  },

  methods: {
    initChart() {
      const chartDom = this.$refs.chartRef;
      if (!chartDom) return;

      this.myChart = echarts.init(chartDom);
      this.myChart.setOption(this.getOption());

      this.resizeObserver = new ResizeObserver(() => {
        if (this.myChart) {
          this.myChart.resize();
          this.myChart.setOption(this.getOption());
        }
      });
      this.resizeObserver.observe(chartDom);
    },

    // ---------------------------------------------------------
    // FIX: Debounce logic to prevent double-rendering
    // ---------------------------------------------------------
    scheduleUpdate() {
      // If an update is already queued for this tick, skip
      if (this.isUpdatePending) return;

      this.isUpdatePending = true;

      // Wait for Vue to finish all data updates, then update chart ONCE
      nextTick(() => {
        this.updateChartData();
        this.isUpdatePending = false;
      });
    },

    updateChartData() {
      if (!this.myChart) return;

      // use toRaw to avoid Proxy overhead
      const rawInner = toRaw(this.innerData);
      const rawOuter = toRaw(this.outerData);

      this.myChart.setOption({
        series: [
          { data: rawInner },
          { data: rawOuter }
        ]
      });
    },

    getResponsiveSettings() {
      const width = this.$refs.chartRef ? this.$refs.chartRef.clientWidth : window.innerWidth;
      const isMobile = width < 550;
      const isTiny = width < 360;

      return {
        isMobile,
        isTiny,
        innerRadius: isMobile ? [0, '20%'] : [0, '30%'],
        outerRadius: isMobile ? ['35%', '50%'] : ['45%', '60%'],
        lineLength: isMobile ? 10 : 40,
        fontSize: isMobile ? 11 : 13
      };
    },

    getOption() {
      const rawInner = toRaw(this.innerData);
      const rawOuter = toRaw(this.outerData);
      
      const isDark = this.$q.dark.isActive;
      const layout = this.getResponsiveSettings();

      // Colors
      const bgColor = isDark ? '#121212' : '#ffffff';
      const labelBoxBg = isDark ? '#313131' : '#f3f3f3';
      const labelBoxBorder = isDark ? '#9E9E9E' : '#cccccc';
      const titleColor = isDark ? '#9e9e9e' : '#333333';
      const subTitleColor = isDark ? '#90a4ae' : '#555555';
      const percentBg = isDark ? '#4C5058' : '#e0e0e0';
      const percentText = isDark ? '#fff' : '#333';
      const hrColor = isDark ? '#ffff' : '#8888';

      const richConfig = layout.isMobile ? {} : {
        a: { color: titleColor, lineHeight: 22, align: 'center' },
        abg: { backgroundColor: labelBoxBg, width: '100%', align: 'right', height: 22, borderRadius: [4, 4, 0, 0] },
        hr: { borderColor: hrColor, width: '100%', borderWidth: 0.5, height: 0 },
        b: { color: subTitleColor, fontSize: 12, lineHeight: 33 },
        per: { color: percentText, backgroundColor: percentBg, padding: [2, 4], borderRadius: 2 }
      };

      return {
        backgroundColor: bgColor,
        // Using standard animation settings for original smooth feel
        animation: true,
        animationDuration: 1000,
        
        tooltip: {
          trigger: 'item',
          confine: true,
          backgroundColor: isDark ? 'rgba(50,50,50,0.9)' : 'rgba(255,255,255,0.9)',
          borderColor: isDark ? '#333' : '#ccc',
          textStyle: { color: isDark ? '#fff' : '#333' },
          formatter: '{b}: {c} ({d}%)'
        },
        series: [
          {
            name: 'Outage Type',
            type: 'pie',
            selectedMode: 'single',
            radius: layout.innerRadius,
            center: ['50%', '50%'],
            label: {
              position: 'inner',
              fontSize: layout.isTiny ? 10 : 12,
              color: '#ffffff',
              formatter: layout.isTiny ? '{b}' : '{b}\n{d}%'
            },
            labelLine: { show: false },
            data: rawInner
          },
          {
            name: 'Specific Cause',
            type: 'pie',
            radius: layout.outerRadius,
            center: ['50%', '50%'],
            avoidLabelOverlap: true,
            labelLine: {
              length: layout.lineLength,
              length2: layout.isMobile ? 10 : 30,
              lineStyle: { color: isDark ? '#9e9e9e' : '#888' }
            },
            label: {
              backgroundColor: layout.isMobile ? 'transparent' : labelBoxBg,
              borderColor: layout.isMobile ? 'transparent' : labelBoxBorder,
              borderWidth: layout.isMobile ? 0 : 1,
              borderRadius: 4,
              padding: layout.isMobile ? 0 : [0, 7],
              rich: richConfig,
              formatter: layout.isMobile 
                ? '{b}: {d}%' 
                : '{a|{a}}{abg|}\n{hr|}\n  {b|{b}：}{c}  {per|{d}%}  '
            },
            data: rawOuter
          }
        ]
      };
    }
  }
};