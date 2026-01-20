/**
 * Copyright(c) 2025. Synergy Systems & Solutions. @link : http://s3india.com 
 * 
 * @file        trend_chart.js  
 * @summary     Trend Chart component Script 
 * 
 * @author      Avinash Sahoo
 * Created on : 18-12-2025
 */
import Chart from 'chart.js/auto';

export default {

  name: 'TrendChart',

  /**
   * @method   props
   * @param    
   * @returns  
   * @summary  Defines all the props here
   *
   * @author   Avinash Sahoo
   * @created  18-12-2025
   */
  props: {
    title: {
      type: String,
      default: '',
      required: true,
    },
    labels: {
      type: Array,
      default: () => [],
      required: true,
    },
    data: {
      type: Array,
      default: () => [],
      required: true,
    },
    animation: {
      type: Boolean,
      default: false,
    },
    legendLabelColorDark: {
      type: String,
      default: '#E0E0E0',
    },
    legendLabelColorLight: {
      type: String,
      default: '#9e9e9e',
    },
    legendLabelFontSize: {
      type: Number,
      default: 10,
    },
    dataLabels: {
      type: Boolean,
      default: false,
    },
    scaleXticksColorDark: {
      type: String,
      default: '#E0E0E0',
    },
    scaleXticksColorLight: {
      type: String,
      default: '#9e9e9e',
    },
    scaleXticksFontSize: {
      type: Number,
      default: 8,
    },
    scaleXticksMaxRotation: {
      type: Number,
      default: 45,
    },
    scaleXticksMinRotation: {
      type: Number,
      default: 45,
    },
    scaleXticksAutoSkip: {
      type: Boolean,
      default: true,
    },
    scaleXMaxTicksLimit: {
      type: Number,
      default: 10,
    },
    scaleXgridColorDark: {
      type: String,
      default: 'rgba(255,255,255,0.1)',
    },
    scaleXgridColorLight: {
      type: String,
      default: 'rgba(0,0,0,0.1)',
    },
    scaleYmin: {
      type: Number,
      default: 100,
    },
    scaleYmax: {
      type: Number,
      default: 250,
    },
    scaleYticksColorDark: {
      type: String,
      default: '#E0E0E0',
    },
    scaleYticksColorLight: {
      type: String,
      default: '#9e9e9e',
    },
    scaleYticksFontSize: {
      type: Number,
      default: 9,
    },
    scaleYgridColorDark: {
      type: String,
      default: 'rgba(255,255,255,0.1)',
    },
    scaleYgridColorLight: {
      type: String,
      default: 'rgba(0,0,0,0.1)',
    },
  },

  /**
   * @method   emits
   * @param    
   * @returns  
   * @summary  Declares the custom 'chart-ready' event used to expose the raw Chart.js instance to the parent for real-time updates.
   *
   * @author   Avinash Sahoo
   * @created  18-12-2025
   */
  emits: ['chart-ready'],

  /**
   * @method   created
   * @param    
   * @returns  
   * @summary  Initializes the non-reactive chartInstance variable to null.
   *
   * @author   Avinash Sahoo
   * @created  18-12-2025
   */
  created() {
    let self = this;
    try {
      self.chartInstance = null;
    } catch (error) {
      console.log('Error in trend chart created:', error);
    }
  },

  /**
   * @method   mounted
   * @param    
   * @returns  
   * @summary  Waits for the DOM to update via $nextTick, then triggers the chart initialization.
   *
   * @author   Avinash Sahoo
   * @created  18-12-2025
   */
  mounted() {
    let self = this;
    try {
      self.$nextTick(() => {
        self.initCharts();
      })
    } catch (error) {
      console.log('Error in trend chart mounted:', error);
    }
  },

  /**
   * @method   beforeUnmount
   * @param    
   * @returns  
   * @summary  Destroys the active Chart.js instance to prevent memory leaks when the component is removed.
   *
   * @author   Avinash Sahoo
   * @created  18-12-2025
   */
  beforeUnmount() {
    let self = this;
    try {
      if (self.chartInstance) {
        self.chartInstance.destroy();
      }
    } catch (error) {
      console.log('Error in trend chart beforeUnmount:', error);
    }
  },

  /**
   * @method   watch
   * @summary  Reactive watchers that monitor 'data' for real-time chart updates and 'dark mode' to re-apply theme styling.
   * @param    
   * @returns
   * @author   Avinash Sahoo
   * @created  17-12-2025
   */
  watch: {
    data: {
      deep: true,
      handler(arrNewData) {
        let self = this
        try {

          let chartData = self.chartInstance.data;

          if (chartData) {
            chartData.datasets = JSON.parse(JSON.stringify(arrNewData));
            chartData.labels = self.labels;
          }

          let chartOptions = self.chartInstance.options;

          if (chartOptions) {
            chartOptions.animation = self.animation;
          }

          let chartScalesX = self.chartInstance.options.scales.x;

          if (chartScalesX) {
            chartScalesX.ticks.font.size = self.scaleXticksFontSize;
            chartScalesX.ticks.maxRotation = self.scaleXticksMaxRotation;
            chartScalesX.ticks.minRotation = self.scaleXticksMinRotation;
            chartScalesX.ticks.autoSkip = self.scaleXticksAutoSkip;
            chartScalesX.ticks.maxTicksLimit = self.scaleXMaxTicksLimit;
            chartScalesX.ticks.color = self.scaleXticksColorDark;
            chartScalesX.ticks.color = self.scaleXticksColorLight;
            chartScalesX.grid.color = self.scaleXgridColorDark;
            chartScalesX.grid.color = self.scaleXgridColorLight;
          }

          let chartScalesY = self.chartInstance.options.scales.y;

          if (chartScalesY) {
            chartScalesY.min = self.scaleYmin;
            chartScalesY.max = self.scaleYmax;
            chartScalesY.ticks.font.size = self.scaleYticksFontSize;
            chartScalesY.grid.color = self.scaleYgridColorDark;
            chartScalesY.grid.color = self.scaleYgridColorLight;
            chartScalesY.ticks.color = self.scaleYticksColorDark;
            chartScalesY.ticks.color = self.scaleYticksColorLight;
          }

          let chartPlugins = self.chartInstance.options.plugins;

          if (chartPlugins) {
            chartPlugins.legend.labels.color = self.legendLabelColorDark;
            chartPlugins.legend.labels.color = self.legendLabelColorLight;
            chartPlugins.legend.labels.font.size = self.legendLabelFontSize;
            chartPlugins.datalabels.display = self.dataLabels

          }
          self.chartInstance.update();
        } catch (error) {
          console.log('Error in multi bar chart watch data:', error);
        }
      }
    },
    '$q.dark.isActive'() {
      let self = this;
      try {

        self.initCharts();

      } catch (error) {
        console.log('Error in multi bar chart dark toggle watch:', error);
      }
    }
  },

  methods: {
    /**
     * @method   initCharts
     * @param    
     * @returns  
     * @summary  Initialize the Trend Chart.
     *
     * @author   Avinash Sahoo
     * @created  18-12-2025
     */
    initCharts() {
      let self = this;
      try {
        let bIsDark = self.$q.dark.isActive;
        let strLegendLabelColor = bIsDark ? self.legendLabelColorDark : self.legendLabelColorLight;
        let strScaleXticksColor = bIsDark ? self.scaleXticksColorDark : self.scaleXticksColorLight;
        let strScaleXgridColor = bIsDark ? self.scaleXgridColorDark : self.scaleXgridColorLight;
        let strScaleYticksColor = bIsDark ? self.scaleYticksColorDark : self.scaleYticksColorLight;
        let strScaleYgridColor = bIsDark ? self.scaleYgridColorDark : self.scaleYgridColorLight;
        let chartRef = self.$refs.chartRef;

        if (chartRef) {
          self.chartInstance = new Chart(chartRef, {
            type: 'line',
            data: {
              labels: [...self.labels],
              datasets: [...self.data],
            },
            options: {
              responsive: true,
              maintainAspectRatio: false,
              animation: self.animation,
              plugins: {
                legend: {
                  labels: {
                    color: strLegendLabelColor,
                    font: {
                      size: self.legendLabelFontSize
                    }
                  },
                },
                datalabels: {
                  display: self.dataLabels,
                }
              },
              scales: {
                x: {
                  ticks: {
                    color: strScaleXticksColor,
                    font: {
                      size: self.scaleXticksFontSize
                    },
                    maxRotation: self.scaleXticksMaxRotation,
                    minRotation: self.scaleXticksMinRotation,
                    autoSkip: self.scaleXticksAutoSkip,
                    maxTicksLimit: self.scaleXMaxTicksLimit,
                  },
                  grid: { color: strScaleXgridColor },
                },
                y: {
                  min: self.scaleYmin,
                  max: self.scaleYmax,
                  ticks: { color: strScaleYticksColor, font: { size: self.scaleYticksFontSize } },
                  grid: { color: strScaleYgridColor },
                }
              }
            }
          })

          try {
            self.$emit('chart-ready', self.chartInstance);
          } catch (error) {
            console.log('Error in trend chart initChart emit:', error);
          }
        }
      } catch (error) {
        console.log('Error in trend chart initCharts:', error);
      }
    },
  },
}