/**
 * Copyright(c) 2025. Synergy Systems & Solutions. @link : http://s3india.com 
 * 
 * @file        bar_chart.js  
 * @summary     Bar Chart component Script 
 * 
 * @author      Avinash Sahoo
 * Created on : 18-12-2025
 */
import Chart from 'chart.js/auto'
import { markRaw } from 'vue'
import { useThemeStore } from 'src/stores/theme_store'

export default {
   name: 'BarChart',
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
      data: {
         type: Object,
         default: () => ({ title: '', labels: [], labelsData: [] })
      },
      chartClass: {
         type: String,
         default: 'graph-container'
      },
      resizeDelay: {
         type: Number,
         default: 200
      }
   },
   data() {
      return {
         objThemeStore: useThemeStore(),
      }
   },
   /**
    * @method   created
    * @summary  Initialize non-reactive variables
    * @author   Avinash Sahoo
    * @created  09-12-2025
    */
   created() {
      let self = this;
      try {
         self.chartInstance = null;
      } catch (error) {
         console.log('Error in created BarChart Component:', error);
      }
   },
   computed: {
      themeColors() {
         let self = this;
         try {
            if (!self.objThemeStore || !self.objThemeStore.currentColors) return [];
            const arrColors = self.$q.dark.isActive ? self.objThemeStore.currentColors.dark : self.objThemeStore.currentColors.light
            return arrColors.map(color => ({
               background: `${color}40`,
               border: color
            }))
         } catch (error) {
            console.log('Error in themeColors BarChart Component:', error);
            return [];
         }
      },
   },
   mounted() {
      let self = this;
      try {
         self.$nextTick(() => {
            self.createCharts();
         });
      } catch (error) {
         console.log('Error in mounted BarChart Component:', error);
      }
   },
   beforeUnmount() {
      let self = this;
      try {
         if (self.chartInstance) {
            self.chartInstance.destroy();
         }
      } catch (error) {
         console.log('Error in beforeUnmount BarChart Component:', error);
      }
   },
   watch: {
      themeColors: {
         handler() {
            let self = this;
            try {
               self.updateChartData();
            } catch (error) {
               console.log('Error in themeColors watch:', error);
            }
         },
         deep: true
      },
      data: {
         handler() {
            let self = this;
            try {
               self.updateChartData();
            } catch (error) {
               console.log('Error in data watch:', error);
            }
         },
         deep: true
      },
   },
   methods: {
      makeBarOptions(nMaxValue, strTitle) {
         try {
            return {
               responsive: true,
               maintainAspectRatio: false,
               resizeDelay: self.resizeDelay,
               plugins: {
                  title: {
                     display: true,
                     text: strTitle,
                     color: '#9e9e9e',
                     font: { size: 14, weight: '500' }
                  },
                  legend: { display: false }
               },
               scales: {
                  x: {
                     grid: { display: true, color: '#333' },
                     ticks: { color: '#9e9e9e' }
                  },
                  y: {
                     grid: { display: true, color: '#333' },
                     ticks: { color: '#9e9e9e' },
                     max: nMaxValue
                  }
               }
            }
         } catch (error) {
            console.log('Error in makeBarOptions:', error);
         }
      },

      getChartConfigs() {
         let self = this;
         try {
            const arrColors = self.themeColors;
            const bgColor = arrColors[0] ? arrColors[0].background : '#ccc';
            const borderColor = arrColors[0] ? arrColors[0].border : '#ccc';

            return {
               type: 'bar',
               data: {
                  labels: self.data.labels,
                  datasets: [{ 
                     data: self.data.labelsData, 
                     backgroundColor: bgColor, 
                     borderColor: borderColor, 
                     borderWidth: 1 
                  }]
               },
               options: self.makeBarOptions(self.data.maxValue, self.data.title)
            }
         } catch (error) {
            console.log('Error in getChartConfigs BarChart Component:', error);
         }
      },

      /**
       * @method   createCharts
       * @summary  Create chart instance using markRaw
       * @author   Avinash Sahoo
       * @created  09-12-2025
       */
      createCharts() {
         let self = this;
         try {
            const chartRef = self.$refs.myCanvas;
            if (!chartRef) return;

            if (self.chartInstance) {
               self.chartInstance.destroy();
            }

            const chartConfigs = self.getChartConfigs();
            self.chartInstance = markRaw(new Chart(chartRef, chartConfigs));

         } catch (error) {
            console.log('Error in createCharts BarChart Component:', error);
         }
      },

      /**
       * @method   updateChartData
       * @summary  Update existing chart smoothly
       * @author   Avinash Sahoo
       * @created  09-12-2025
       */
      updateChartData() {
         let self = this;
         try {
            if (!self.chartInstance) {
               self.createCharts();
               return;
            }

            const arrColors = self.themeColors;
            const bgColor = arrColors[0] ? arrColors[0].background : '#ccc';
            const borderColor = arrColors[0] ? arrColors[0].border : '#ccc';

            self.chartInstance.data.labels = self.data.labels;
            self.chartInstance.data.datasets[0].data = self.data.labelsData;

            self.chartInstance.data.datasets[0].backgroundColor = bgColor;
            self.chartInstance.data.datasets[0].borderColor = borderColor;

            self.chartInstance.update();

         } catch (error) {
            console.log('Error in updateChartData:', error);
            self.createCharts();
         }
      }
   }
}