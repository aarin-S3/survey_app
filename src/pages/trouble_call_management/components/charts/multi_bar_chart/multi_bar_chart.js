/**
 * Copyright(c) 2025. Synergy Systems & Solutions. @link : http://s3india.com 
 * 
 * @file        multi_bar_chart.js  
 * @summary     Multi Bar Chart component Script
 * 
 * @author      Avinash Sahoo
 * Created on : 17-12-2025
 */
import Chart from 'chart.js/auto';

export default {

  name: 'MultiBarChart',
  /**
   * @method   props
   * @param    
   * @returns  
   * @summary  Defines the required input properties
   *
   * @author   Avinash Sahoo
   * @created  17-12-2025
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
    animationDuration: {
      type: Number,
      default: 1000,
    },
    animationEasing: {
      type: String,
      default: 'easeOutQuart',
    },
    legendLabelsColorDark: {
      type: String,
      default: '#E0E0E0',
    },
    legendLabelsColorLight: {
      type: String,
      default: '#9e9e9e',
    },
    legendLabelFontSize: {
      type: Number,
      default: 9,
    },
    dataLabelsDisplay: {
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
    scaleXgridColorDark: {
      type: String,
      default: 'rgba(255,255,255,0.1)',
    },
    scaleXgridColorLight: {
      type: String,
      default: 'rgba(0,0,0,0.1)',
    },
    scaleYbeginAtZero: {
      type: Boolean,
      default: true,
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
      default: 8,
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
   * @method   created
   * @summary  Lifecycle hook that initializes the component state by setting the chart instance placeholder to null.
   * @param    
   * @returns
   * @author   Avinash Sahoo
   * @created  17-12-2025
   */
  created() {
    let self = this;
    try {

      self.chartInstance = null;

    } catch (error) {
      console.log('Error in multi bar chart created:', error);
    }
  },

  /**
   * @method   mounted
   * @summary  Lifecycle hook triggered after DOM mounting invokes the chart initialization method once the view is ready.
   * @param    
   * @returns
   * @author   Avinash Sahoo
   * @created  17-12-2025
   */
  mounted() {
    let self = this;
    try {

      self.$nextTick(() => {
        self.initBarCharts();
      })

    } catch (error) {
      console.log('Error in multi bar chart mounted:', error);
    }

  },

  /**
   * @method   beforeUnmount
   * @summary  Cleanup hook that destroys the Chart.js instance to prevent memory leaks before the component is removed.
   * @param    
   * @returns
   * @author   Avinash Sahoo
   * @created  17-12-2025
   */
  beforeUnmount() {
    let self = this;
    try {
      if (self.chartInstance) {
        self.chartInstance.destroy();
      }

    } catch (error) {
      console.log('Error in multi bar chart beforeUnmount:', error);
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
            chartOptions.animation.duration = self.animationDuration;
            chartOptions.animation.easing = self.animationEasing;
          }

          let chartPlugins = self.chartInstance.options.plugins;
          if (chartPlugins) {
            chartPlugins.legend.labels.font.size = self.legendLabelFontSize;
            chartPlugins.datalabels.display = self.dataLabelsDisplay;
            chartPlugins.legend.labels.color = self.legendLabelsColorDark;
            chartPlugins.legend.labels.color = self.legendLabelsColorLight;

          }

          let chartScalesX = self.chartInstance.options.scales.x;
          if(chartScalesX){
              chartScalesX.ticks.font.size = self.scaleXticksFontSize;
              chartScalesX.ticks.color = self.scaleXticksColorDark;
              chartScalesX.ticks.color = self.scaleXticksColorLight;
              chartScalesX.grid.color = self.scaleXgridColorDark;
              chartScalesX.grid.color = self.scaleXgridColorLight;
          }

          let chartScalesY = self.chartInstance.options.scales.y;
          if(chartScalesY){
             chartScalesY.beginAtZero = self.scaleYbeginAtZero;
             chartScalesY.ticks.font.size = self.scaleYticksFontSize;
             chartScalesY.ticks.color = self.scaleYticksColorDark;
             chartScalesY.ticks.color = self.scaleYticksColorLight;
             chartScalesY.grid.color = self.scaleYgridColorDark;
             chartScalesY.grid.color = self.scaleYgridColorLight;
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

        self.initBarCharts();

      } catch (error) {
        console.log('Error in multi bar chart dark toggle watch:', error);
      }
    }
  },

  methods: {
    /**
     * @method   initBarChart
     * @param    
     * @returns  
     * @summary  Configures and renders the Chart.js instance on the canvas with theme-specific styling and animation settings.
     *
     * @author   Avinash Sahoo
     * @created  17-12-2025
     */
    initBarCharts() {
      let self = this;
      try {

        const bIsDark = self.$q.dark.isActive;
        const strLegendLabelColor = bIsDark ? self.legendLabelsColorDark : self.legendLabelsColorLight;
        const strScaleXticksColor = bIsDark ? self.scaleXticksColorDark : self.scaleXticksColorLight;
        const strScaleYticksColor = bIsDark ? self.scaleYticksColorDark : self.scaleYticksColorLight;
        const strScaleXgridColor = bIsDark ? self.scaleXgridColorDark : self.scaleXgridColorLight;
        const strScaleYgridColor = bIsDark ? self.scaleYgridColorDark : self.scaleYgridColorLight;
        const chartRef = self.$refs.multiBarChart;

        if (chartRef) {
          if (self.chartInstance) self.chartInstance.destroy();

          self.chartInstance = new Chart(chartRef, {
            type: 'bar',
            data: {
              labels: self.labels,
              datasets: JSON.parse(JSON.stringify(self.data))
            },
            options: {
              responsive: true,
              maintainAspectRatio: false,
              animation: {
                duration: self.animationDuration,
                easing: self.animationEasing
              },
              plugins: {
                legend: { labels: { color: strLegendLabelColor, font: { size: self.legendLabelFontSize } } },
                datalabels: { display: self.dataLabelsDisplay }
              },
              scales: {
                x: {
                  ticks: { color: strScaleXticksColor, font: { size: self.scaleXticksFontSize } },
                  grid: { color: strScaleXgridColor }
                },
                y: {
                  beginAtZero: self.scaleYbeginAtZero,
                  ticks: { color: strScaleYticksColor, font: { size: self.scaleYticksFontSize } },
                  grid: { color: strScaleYgridColor }
                }
              }
            }
          })
        }

      } catch (error) {
        console.log('Error in multi bar chart initBarChart:', error);
      }

    }
  }
}