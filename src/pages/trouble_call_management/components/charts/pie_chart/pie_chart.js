/**
 * Copyright(c) 2025. Synergy Systems & Solutions. @link : http://s3india.com 
 * 
 * @file        pie_chart.js  
 * @summary     Pie Chart component Script
 * 
 * @author      Avinash Sahoo
 * Created on : 17-12-2025
 */
import Chart from 'chart.js/auto';

export default {

  name: 'pieChart',

  /**
  * @method   props
  * @param    
  * @returns  
  * @summary  Defines the input properties required to populate the chart segments.
  *
  * @author   Avinash Sahoo
  * @created  17-12-2025
  */
  props: {
    title: {
      type: String,
      default: '',
      required: true
    },
    labels: {
      type: Array,
      default: () => [],
      required: true
    },
    data: {
      type: Array,
      default: () => [],
      required: true
    },
    cutout: {
      type: String,
      default: '0%'
    },
    animationDuration: {
      type: Number,
      default: 800
    },
    animationEasing: {
      type: String,
      default: 'easeInOutQuart'
    },
    legendPosition: {
      type: String,
      default: 'bottom'
    },
    legendFontColorDark: {
      type: String,
      default: '#9e9e9e'
    },
    legendFontColorLight: {
      type: String,
      default: '#E0E0E0'
    },
    legendFontSize: {
      type: Number,
      default: 9
    }
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

      self.pieChart = null;

    } catch (error) {
      console.log('Error in pie chart created:', error);
    }
  },

  /**
   * @method   mounted
   * @summary  Lifecycle hook triggered after DOM mounting; invokes the chart initialization method once the view is ready.
   * @param    
   * @returns
   * @author   Avinash Sahoo
   * @created  17-12-2025
   */
  mounted() {
    let self = this;
    try {
      self.$nextTick(() => {
        self.initPieChart();
      });
    } catch (error) {
      console.log('Error in pie chart mounted:', error);
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

      if (self.pieChart) {
        self.pieChart.destroy();
      }

    } catch (error) {
      console.log('Error in pie chart beforeUnmount:', error);
    }
  },

  /**
   * @method   watch
   * @summary  Reactive watchers that monitor 'data' for real-time dataset updates and 'dark mode' to re-apply theme styling.
   * @param    
   * @returns
   * @author   Avinash Sahoo
   * @created  17-12-2025
   */
  watch: {
    data: {
      deep: true,
      handler(arrNewDatasets) {
        let self = this;
        try {

          if (self.pieChart) {
            arrNewDatasets.forEach((objDataset, nIndex) => {
              if (self.pieChart.data.datasets[nIndex]) {
                self.pieChart.data.datasets[nIndex].data = objDataset.data;
                self.pieChart.data.datasets[nIndex].backgroundColor = objDataset.backgroundColor;
              }
            });
            self.pieChart.data.labels = self.labels;
            self.pieChart.options.cutout = self.cutout;
            self.pieChart.options.animation.duration = self.animationDuration;
            self.pieChart.options.animation.easing = self.animationEasing;
            self.pieChart.options.plugins.legend.position = self.legendPosition;
            self.pieChart.options.plugins.legend.labels.color = self.legendFontColorDark;
            self.pieChart.options.plugins.legend.labels.color = self.legendFontColorLight;

            self.pieChart.options.plugins.legend.labels.font.size = self.legendFontSize;
            self.pieChart.update();
          }

        } catch (error) {
          console.log('Error in pie chart watch data:', error);
        }

      }
    },
    '$q.dark.isActive'() {
      let self = this;
      try {
        self.initPieChart();
      } catch (error) {
        console.log('Error in pie chart dark toggle watch:', error);
      }

    },
  },

  methods: {
    /**
     * @method   initPieChart
     * @param    
     * @returns  
     * @summary  Configures and renders the Pie chart on the canvas with theme-specific styling and animation.
     *
     * @author   Avinash Sahoo
     * @created  17-12-2025
     */
    initPieChart() {
      let self = this;
      try {

        if (self.pieChart) {
          self.pieChart.destroy();
        }
        let bIsDark = self.$q.dark.isActive;
        let strLegendFontColor = bIsDark ? self.legendFontColorDark : self.legendFontColorLight;
        let chartRef = self.$refs.pieChart;

        if (chartRef) {
          self.pieChart = new Chart(chartRef, {
            type: 'doughnut',
            data: {
              labels: self.labels,
              datasets: JSON.parse(JSON.stringify(self.data))
            },
            options: {
              cutout: self.cutout,
              responsive: true,
              maintainAspectRatio: true,
              animation: {
                duration: self.animationDuration,
                easing: self.animationEasing,
              },
              plugins: {
                legend: {
                  position: self.legendPosition,
                  labels: {
                    color: strLegendFontColor,
                    font: { size: self.legendFontSize }
                  }
                }
              }
            }
          })
        }

      } catch (error) {
        console.log('Error in pie chart initPieChart:', error);
      }
    }
  }
}