/**
 * Copyright(c) 2025. Synergy Systems & Solutions. @link : http://s3india.com 
 * 
 * @file        trouble_call_management.js  
 * @summary     Trouble Call Management Script Page 
 * 
 * @author      Avinash Sahoo
 * Created on : 18-12-2025
 */
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { markRaw } from 'vue';
import { setPageColor, setDbNumberTrackColor, setDbNumberClass, setChartContainerClass } from 'src/helpers/helper_function.js';
import DbNumber from '../../components/widgets/DbNumber.vue';
import TrendChart from './components/charts/trend_chart/trend_chart.vue';
import PageHeader from '../../components/header/page_header.vue';
import MultiBarChart from './components/charts/multi_bar_chart/multi_bar_chart.vue';
import PieChart from './components/charts/pie_chart/pie_chart.vue';


export default {
   name: 'TroubleCallManagement',

   components: {
      DbNumber,
      TrendChart,
      PageHeader,
      MultiBarChart,
      PieChart,
   },

   data() {
      let strNow = new Date();
      let arrActive = Array.from({ length: 20 }, () => Math.floor(Math.random() * 50 + 150));
      let arrResolved = Array.from({ length: 20 }, () => Math.floor(Math.random() * 50 + 120));

      return {
         strPageTitle: 'Trouble Call Management',
         arrCircularValues: [
            {
               nValue: 50,
               nTotal: 100,
               strTitle: 'Active Tickets',
               strSubtitle: '12% from yesterday',
               arrPercentRanges: [{ value: 70, color: '#f44336' }, { value: 90, color: '#ff9800' }, { value: 100, color: '#4caf50' }],
               arrTrend: [10, 40, 25, 50, 30, 60, 35, 55, 40, 50, 45, 60, 50, 40, 55, 35, 60, 30, 65, 25, 70, 20, 75, 15, 80, 10],
            },
            {
               nValue: 90,
               nTotal: 100,
               strTitle: 'SCADA Auto-Generated',
               strSubtitle: 'No crew confirmation',
               arrPercentRanges: [{ value: 70, color: '#f44336' }, { value: 90, color: '#ff9800' }, { value: 100, color: '#4caf50' }],
               arrTrend: [5, 95, 10, 90, 3, 97, 15, 85, 8, 92, 2, 99, 18, 82, 4, 96, 20, 80, 5, 95, 25, 75, 3, 98, 10, 90, 8, 92, 6, 94, 4, 96, 2, 98, 0, 100],
            },
            {
               nValue: 70,
               nTotal: 100,
               strTitle: 'Predicted Faults',
               strSubtitle: 'Downstream analysis',
               arrPercentRanges: [{ value: 70, color: '#f44336' }, { value: 90, color: '#ff9800' }, { value: 100, color: '#4caf50' }],
               arrTrend: [2.1, 2.5, 2.2, 2.8, 2.3, 2.6, 2.4, 2.1, 2.7, 2.3],
            },
            {
               nValue: 80,
               nTotal: 100,
               strTitle: 'Critical Customers',
               strSubtitle: 'VIP/Medical/Critical',
               arrPercentRanges: [{ value: 70, color: '#f44336' }, { value: 90, color: '#ff9800' }, { value: 100, color: '#4caf50' }],
               arrTrend: [5, 95, 10, 90, 3, 97, 15, 85, 8, 92, 2, 99, 18, 82, 4, 96, 20, 80, 5, 95, 25, 75, 3, 98, 10, 90, 8, 92, 6, 94, 4, 96, 2, 98, 0, 100],
            },
         ],
         arrtickets: [
            {
               strId: 'TCK-2301',
               strType: 'SCADA-Auto',
               strArea: 'North Zone',
               strPriority: 'Critical',
               nCustomers: 234,
               strCrew: 'Crew A',
               strStatus: 'Assigned',
               strDuration: '45m',
               fLat: 12.9716,
               fLng: 77.5946,
            },
            {
               strId: 'TCK-2302',
               strType: 'Protective Trip',
               strArea: 'South Zone',
               strPriority: 'VIP',
               nCustomers: 89,
               strCrew: 'Crew B',
               strStatus: 'In Progress',
               strDuration: '1h 23m',
               fLat: 12.9116,
               fLng: 77.6446,
            },
            {
               strId: 'TCK-2303',
               strType: 'Manual Report',
               strArea: 'East Zone',
               strPriority: 'Medical',
               nCustomers: 12,
               strCrew: 'Unassigned',
               strStatus: 'Unassigned',
               strDuration: '12m',
               fLat: 13.0216,
               fLng: 77.6446,
            },
            {
               strId: 'TCK-2304',
               strType: 'SCADA-Auto',
               strArea: 'West Zone',
               strPriority: 'Normal',
               nCustomers: 456,
               strCrew: 'Crew C',
               strStatus: 'Completed',
               strDuration: '2h 10m',
               fLat: 12.9416,
               fLng: 77.5446,
            },
            {
               strId: 'TCK-2305',
               strType: 'Outage',
               strArea: 'Central',
               strPriority: 'Critical',
               nCustomers: 678,
               strCrew: 'Crew D',
               strStatus: 'In Progress',
               strDuration: '3h 45m',
               fLat: 12.9816,
               fLng: 77.5846,
            },
         ],
         strBarChartTitle: 'CALLS BY AREA',
         arrBarLabels: ['North', 'South', 'East', 'West', 'Central', 'Suburban'],
         arrBarData: [
            {
               label: 'SCADA',
               data: [18, 22, 15, 28, 12, 20],
               backgroundColor: '#2196F3'
            },
            {
               label: 'Trips',
               data: [12, 18, 10, 15, 8, 14],
               backgroundColor: '#FF9800'
            },
            {
               label: 'Manual',
               data: [8, 12, 6, 10, 5, 9],
               backgroundColor: '#4CAF50'
            },
         ],
         strTrendChartTitle: 'Trend Chart',
         arrLabels: Array.from({ length: 20 }, (_, i) => {
            let strTime = new Date(strNow.getTime() - (19 - i) * 2000);
            return strTime.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });
         }),
         arrTrendData: [
            markRaw({
               label: 'Active',
               data: arrActive,
               borderColor: '#2196F3',
               fill: false,
               tension: 0,
            }),
            markRaw({
               label: 'Resolved',
               data: arrResolved,
               borderColor: '#4CAF50',
               fill: false,
               tension: 0,
            }),
         ],
         strPieChartTitle: 'CALLS BY TYPE',
         arrPieLabels: ['Normal', 'VIP', 'Medical', 'Critical'],
         arrPieData: [
            {
               data: [60, 25, 10, 5],
               backgroundColor: ['#2196F3', '#FF9800', '#4CAF50', '#F44336']
            }
         ],
      }
   },

   computed: {
      /**
      * @method   setPageColor
      * @summary  Determines the dynamic CSS classes for the page background based on Quasar's dark mode state and screen responsiveness.
      *
      * @author   Avinash Sahoo
      * @created  19-12-2025
      */
      setPageColor,
      /**
      * @method   setDbNumberTrackColor
      * @summary  Determines the dynamic Colour for the track of the DB Number Chart based on Quasar's dark mode state.
      *
      * @author   Avinash Sahoo
      * @created  19-12-2025
      */
      setDbNumberTrackColor,
      /**
      * @method   setDbNumberClass
      * @summary  Determines the dynamic CSS classes for the DB Number Chart based on Quasar's dark mode state.
      *
      * @author   Avinash Sahoo
      * @created  19-12-2025
      */
      setDbNumberClass,
      /**
      * @method   setChartContainerClass
      * @summary  Determines the dynamic classes for the Chart Container based on screen responsiveness.
      *
      * @author   Avinash Sahoo
      * @created  19-12-2025
      */
      setChartContainerClass,
   },

   /**
   * @method   created
   * @summary  Initializes non-reactive references and timer variables.
   * @param    
   * @returns
   * @author   Avinash Sahoo
   * @created  18-12-2025
   */
   created() {
      let self = this;
      try {
         self.map = null;
         self.trendChart = null;
         self.trendInterval = null;
         self.barInterval = null;
         self.dbInterval = null;
         self.donutInterval = null;

      } catch (error) {
         console.log('Error in trouble call created:', error);
      }
   },

   /**
   * @method   mounted
   * @summary  Triggers data simulation intervals and renders the map.
   * @param    
   * @returns
   * @author   Avinash Sahoo
   * @created  18-12-2025
   */
   mounted() {
      let self = this;
      try {
         self.generateRandomDbData();
         self.generateRandomBarData();
         self.generateRandomDonutData();

         setTimeout(() => self.initMap(), 100);
      } catch (error) {
         console.log('Error in trouble call mounted:', error);
      }
   },

   /**
   * @method   beforeUnmount
   * @summary  Clears active timers and destroys the map instance to prevent memory leaks.
   * @param    
   * @returns
   * @author   Avinash Sahoo
   * @created  18-12-2025
   */
   beforeUnmount() {
      let self = this;
      try {
         if (self.trendInterval) clearInterval(self.trendInterval);
         if (self.barInterval) clearInterval(self.barInterval);
         if (self.dbInterval) clearInterval(self.dbInterval);
         if (self.donutInterval) clearInterval(self.donutInterval);

         if (self.map) {
            self.map.remove();
            self.map = null;
         }
      } catch (error) {
         console.log('Error in trouble call beforeUnmount:', error);
      }
   },

   methods: {
      /**
      * @method   onTrendChartReady
      * @summary  saves a non-reactive reference to trend chart and generates random data.
      * @param    chartInstance
      * @returns
      * @author   Avinash Sahoo
      * @created  18-12-2025
      */
      onTrendChartReady(chartInstance) {
         let self = this;
         try {
            self.trendChart = markRaw(chartInstance);
            self.generateRandomTrendData();
         } catch (error) {
            console.log('Error in trouble call onTrendChartReady:', error);
         }
      },

      /**
      * @method   generateRandomTrendData
      * @summary  generates random data for trend chart.
      * @param    
      * @returns
      * @author   Avinash Sahoo
      * @created  18-12-2025
      */
      generateRandomTrendData() {
         let self = this;
         try {
            if (self.trendInterval) clearInterval(self.trendInterval);

            self.trendInterval = setInterval(() => {
               if (!self.trendChart) return;

               let objCurrentTime = new Date().toLocaleTimeString('en-US', {
                  hour12: false,
                  hour: '2-digit',
                  minute: '2-digit',
                  second: '2-digit',
               });

               self.trendChart.data.labels.shift();
               self.trendChart.data.labels.push(objCurrentTime);

               self.trendChart.data.datasets[0].data.shift();
               self.trendChart.data.datasets[0].data.push(Math.floor(Math.random() * 50 + 150));

               self.trendChart.data.datasets[1].data.shift();
               self.trendChart.data.datasets[1].data.push(Math.floor(Math.random() * 50 + 120));

               self.trendChart.update('none');
            }, 2000);
         } catch (error) {
            console.log('Error in trouble call generateRandomTrendData:', error);
         }
      },

      /**
      * @method   generateRandomDbData
      * @summary  generates random data for db chart.
      * @param    
      * @returns
      * @author   Avinash Sahoo
      * @created  18-12-2025
      */
      generateRandomDbData() {
         let self = this;
         try {
            if (self.dbInterval) clearInterval(self.dbInterval);
            self.dbInterval = setInterval(() => {
               self.arrCircularValues.forEach((objCircularValue) => {
                  objCircularValue.nValue = Math.floor(Math.random() * 100);
               })
            }, 3000);
         } catch (error) {
            console.log('Error in trouble call generateRandomDbData:', error);
         }
      },

      /**
      * @method   generateRandomBarData
      * @summary  generates random data for bar chart.
      * @param    
      * @returns
      * @author   Avinash Sahoo
      * @created  18-12-2025
      */
      generateRandomBarData() {
         let self = this;
         try {
            if (self.barInterval) clearInterval(self.barInterval);
            self.barInterval = setInterval(() => {
               self.arrBarData = self.arrBarData.map((objBarData) => {
                  return {
                     ...objBarData,
                     data: objBarData.data.map(v => Math.max(5, v + Math.floor(Math.random() * 20 - 10))),
                  };
               });
            }, 3000);
         } catch (error) {
            console.log('Error in trouble call generateRandomBarData:', error);
         }
      },

      /**
      * @method   generateRandomDonutData
      * @summary  generates random data for donut chart.
      * @param    
      * @returns
      * @author   Avinash Sahoo
      * @created  18-12-2025
      */
      generateRandomDonutData() {
         let self = this;
         try {
            if (self.donutInterval) clearInterval(self.donutInterval);
            self.donutInterval = setInterval(() => {
               self.arrPieData = self.arrPieData.map((objPieData) => {
                  return {
                     ...objPieData,
                     data: objPieData.data.map(v => Math.max(5, v + Math.floor(Math.random() * 20 - 10))),
                  };
               });
            }, 3000);
         } catch (error) {
            console.log('Error in trouble call generateRandomDonutData:', error);
         }
      },

      /**
      * @method   initMap
      * @summary  Initialize the map.
      * @param    
      * @returns
      * @author   Avinash Sahoo
      * @created  18-12-2025
      */
      initMap() {
         let self = this;
         try {
            let mapContainer = document.getElementById('outageMap');
            if (!mapContainer) return;

            if (self.map) {
               self.map.remove();
               self.map = null;
            }
            let mapInstance = L.map('outageMap', { attributionControl: false, zoomControl: false }).setView([12.9716, 77.5946], 12);
            self.map = markRaw(mapInstance);

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(self.map);

            self.arrtickets.forEach(objTicket => {
               let colors = { Critical: 'red', VIP: 'orange', Medical: 'green', Normal: 'blue' };
               L.circleMarker([objTicket.fLat, objTicket.fLng], { radius: 8, fillColor: colors[objTicket.strPriority], color: '#fff', weight: 2, fillOpacity: 0.8 })
                  .addTo(self.map)
                  .bindPopup(`<strong>${objTicket.strId}</strong><br>${objTicket.strType}<br>${objTicket.strArea}<br>${objTicket.strPriority}`);
            });

         } catch (error) {
            console.log('Error in trouble call initMap:', error);
         }
      }
   }
}