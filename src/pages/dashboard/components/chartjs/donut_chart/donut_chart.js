import Chart from 'chart.js/auto'
import { markRaw } from 'vue' 
import { useThemeStore } from 'src/stores/theme_store'

export default {
   name: 'DonutChart',
   props: {
      data: {
         type: Object,
         default: () => ({ title: '', labels: [], labelsData: [] })
      },
      chartClass: {
         type: String,
         default: 'graph-container'
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
      this.chartInstance = null;
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
            console.log('Error in themeColors DonutChart Component:', error);
            return [];
         }
      }
   },
   mounted() {
      let self = this;
      try {
         self.$nextTick(() => {
            self.createCharts();
         });
      } catch (error) {
         console.log('Error in mounted DonutChart Component:', error);
      }
   },
   beforeUnmount() {
      let self = this;
      try {
         if (self.chartInstance) {
            self.chartInstance.destroy();
         }
      } catch (error) {
         console.log('Error in beforeUnmount DonutChart Component:', error);
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
      }
   },
   methods: {
      getChartConfigs() {
         let self = this;
         try {
            const arrColors = self.themeColors;
            return {
               type: 'doughnut',
               data: {
                  labels: self.data.labels,
                  datasets: [{
                     data: self.data.labelsData,
                     backgroundColor: arrColors.map(c => c.background),
                     borderColor: arrColors.map(c => c.border),
                     borderWidth: 1
                  }]
               },
               options: {
                  responsive: true,
                  maintainAspectRatio: false,
                  resizeDelay: 200,
                  cutout: '40%',
                  plugins: {
                     title: { display: true, text: self.data.title, color: '#9e9e9e', font: { size: 14, weight: '500' } },
                     legend: { display: true, position: 'right', labels: { color: '#9e9e9e', usePointStyle: true, padding: 20 } }
                  }
               }
            }
         } catch (error) {
            console.log('Error in getChartConfigs DonutChart Component:', error);
         }
      },
      
      /**
       * @method   createCharts
       * @summary  Create or Initialize the chart
       * @author   Avinash Sahoo
       * @created  09-12-2025
       */
      createCharts() {
         let self = this;
         try {
            const ctx = self.$refs.myCanvas;
            if (!ctx) return;

            if (self.chartInstance) {
               self.chartInstance.destroy();
            }

            const config = self.getChartConfigs();
            self.chartInstance = markRaw(new Chart(ctx, config));

         } catch (error) {
            console.log('Error in createCharts DonutChart Component:', error);
         }
      },

      /**
       * @method   updateChartData
       * @summary  Update existing chart instance to prevent flickering/disappearing
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
            
            self.chartInstance.data.labels = self.data.labels;
            self.chartInstance.data.datasets[0].data = self.data.labelsData;
            
            self.chartInstance.data.datasets[0].backgroundColor = arrColors.map(c => c.background);
            self.chartInstance.data.datasets[0].borderColor = arrColors.map(c => c.border);

            if (self.chartInstance.options.plugins.title) {
                self.chartInstance.options.plugins.title.text = self.data.title;
            }
            self.chartInstance.update();

         } catch (error) {
            console.log('Error in updateChartData:', error);
            self.createCharts();
         }
      }
   }
}