/**
 * Copyright(c) 2025. Synergy Systems & Solutions. @link : http://s3india.com 
 * * @file        planned_outage_schedule.js  
 * @summary     Planned Outage Schedule script Page. 
 * Created on : 18-12-2025
 */
import { TabulatorFull as Tabulator } from "tabulator-tables";
import { setPageColor , setDbNumberTrackColor , setDbNumberClass } from "../../helpers/helper_function";
import PageHeader from 'src/components/header/page_header.vue';
import DonutChart from '../dashboard/components/chartjs/donut_chart/donut_chart.vue';
import BarChart from '../dashboard/components/chartjs/bar_chart/bar_chart.vue';
import DbNumber from '../../components/widgets/DbNumber.vue';
import plannedDia from './components/planned_Dia.vue';

export default {
   name: 'PlannedOutageSchedule',

   components: {
      PageHeader,
      DonutChart,
      BarChart,
      DbNumber,
      plannedDia
   },

   data() {
      return {
         strPageHeaderTitle: 'Planned Outage Schedule',
         tabulator: null,
         donutInterval: null,
         barInterval: null,
         dbInterval: null,
         objDonutChartData: {
            title: 'Monthly Outage',
            labels: ['4 week', '5 week', '6 week', '7 week'],
            labelsData: [50, 20, 20, 10],
         },
         objBarChartData: {
            title: 'Monthly Planned Outages',
            maxValue: 60,
            labels: ['1 week', '2 week', '3 week', '4 week'],
            labelsData: [50, 20, 20, 10],
         },
         arrCircularValues: [
            { 
               nValue: 50, 
               nTotal: 100, 
               strTitle: 'SCHEDULED', 
               strSubtitle: 'This Month', 
               arrPercentRanges: [{ value: 70, color: '#f44336' }, { value: 90, color: '#ff9800' }, { value: 100, color: '#4caf50' }], 
               arrTrend: [10, 40, 25, 50, 30, 60, 35, 55, 40, 50, 45, 60, 50, 40, 55, 35, 60, 30, 65, 25, 70, 20, 75, 15, 80, 10] 
            },
            { 
               nValue: 90, 
               nTotal: 100, 
               strTitle: 'IN PROGRESS', 
               strSubtitle: 'Currently Active', 
               arrPercentRanges: [{ value: 70, color: '#f44336' }, { value: 90, color: '#ff9800' }, { value: 100, color: '#4caf50' }], 
               arrTrend: [5, 95, 10, 90, 3, 97, 15, 85, 8, 92, 2, 99, 18, 82, 4, 96, 20, 80, 5, 95, 25, 75, 3, 98, 10, 90, 8, 92, 6, 94, 4, 96, 2, 98, 0, 100] 
            },
            { 
               nValue: 70, 
               nTotal: 100, 
               strTitle: 'COMPLETED', 
               strSubtitle: 'This Month', 
               arrPercentRanges: [{ value: 70, color: '#f44336' }, { value: 90, color: '#ff9800' }, { value: 100, color: '#4caf50' }], 
               arrTrend: [2.1, 2.5, 2.2, 2.8, 2.3, 2.6, 2.4, 2.1, 2.7, 2.3] 
            },
            { 
               nValue: 80, 
               nTotal: 100, 
               strTitle: 'CUSTOMER AFFECTED', 
               strSubtitle: 'Total Planned', 
               arrPercentRanges: [{ value: 70, color: '#f44336' }, { value: 90, color: '#ff9800' }, { value: 100, color: '#4caf50' }], 
               arrTrend: [5, 95, 10, 90, 3, 97, 15, 85, 8, 92, 2, 99, 18, 82, 4, 96, 20, 80, 5, 95, 25, 75, 3, 98, 10, 90, 8, 92, 6, 94, 4, 96, 2, 98, 0, 100] 
            },
         ],
         arrTableData: [
            { 
               strId: "PO-101", 
               strTitle: "Website Redesign", 
               strLocation: "New York Office", 
               strPriority: "High", 
               strStatus: "In Progress", 
               strStart: "2025-10-01 00:00", 
               strEnd: "2025-10-10 00:00", 
               strDuration: "10 hours", 
               strCustomers: "Acme Corp" 
            },
            { 
               strId: "PO-102", 
               strTitle: "Database Migration", 
               strLocation: "Remote", 
               strPriority: "Medium", 
               strStatus: "To Do", 
               strStart: "2025-11-05 00:00", 
               strEnd: "2025-11-15 00:00", 
               strDuration: "10 hours", 
               strCustomers: "DataFlow Inc" 
            },
            { 
               strId: "PO-103", 
               strTitle: "Marketing Campaign", 
               strLocation: "Remote", 
               strPriority: "Medium", 
               strStatus: "To Do", 
               strStart: "2025-11-05 00:00", 
               strEnd: "2025-11-15 00:00", 
               strDuration: "10 hours", 
               strCustomers: "DataFlow Inc" 
            },
            { 
               strId: "PO-104", 
               strTitle: "Marketing Campaign", 
               strLocation: "Los Angeles", 
               strPriority: "Low", 
               strStatus: "Review", 
               strStart: "2025-09-12 00:00", 
               strEnd: "2025-09-20 00:00", 
               strDuration: "8 hours", 
               strCustomers: "Bright Media" 
            },
            { 
               strId: "PO-105", 
               strTitle: "Mobile App UI", 
               strLocation: "Chicago", 
               strPriority: "High", 
               strStatus: "Done", 
               strStart: "2025-08-05 00:00", 
               strEnd: "2025-08-18 00:00", 
               strDuration: "13 hours", 
               strCustomers: "Appify Labs" 
            },
            { 
               strId: "PO-106", 
               strTitle: "SEO Optimization", 
               strLocation: "Mumbai", 
               strPriority: "Medium", 
               strStatus: "In Progress", 
               strStart: "2025-11-01 00:00", 
               strEnd: "2025-11-08 00:00", 
               strDuration: "7 hours", 
               strCustomers: "RankUp Digital" 
            },
            { 
               strId: "PO-107", 
               strTitle: "Server Maintenance", 
               strLocation: "Berlin Data Center", 
               strPriority: "High", 
               strStatus: "To Do", 
               strStart: "2025-11-10 00:00", 
               strEnd: "2025-11-12 00:00", 
               strDuration: "2 hours", 
               strCustomers: "TechSys" 
            },
            { 
               strId: "PO-108", 
               strTitle: "Brand Identity Design", 
               strLocation: "San Francisco", 
               strPriority: "Medium", 
               strStatus: "Review", 
               strStart: "2025-10-02 00:00", 
               strEnd: "2025-10-07 00:00", 
               strDuration: "5 hours", 
               strCustomers: "Nova Brands" 
            },
            { 
               strId: "PO-109", 
               strTitle: "Payment Gateway Integration", 
               strLocation: "Remote", 
               strPriority: "High", 
               strStatus: "In Progress", 
               strStart: "2025-10-25 00:00", 
               strEnd: "2025-11-05 00:00", 
               strDuration: "11 hours", 
               strCustomers: "PayPlus" 
            },
            { 
               strId: "PO-110", 
               strTitle: "Internal Training Session", 
               strLocation: "London HQ", 
               strPriority: "Low", 
               strStatus: "Done", 
               strStart: "2025-09-01 00:00", 
               strEnd: "2025-09-03 00:00", 
               strDuration: "2 hours", 
               strCustomers: "In-house" 
            },
            { 
               strId: "PO-111", 
               strTitle: "Cloud Setup", 
               strLocation: "Singapore", 
               strPriority: "Medium", 
               strStatus: "To Do", 
               strStart: "2025-11-06 00:00", 
               strEnd: "2025-11-10 00:00", 
               strDuration: "4 hours", 
               strCustomers: "SkyNet" 
            },
            { 
               strId: "PO-112", 
               strTitle: "API Development", 
               strLocation: "Remote", 
               strPriority: "High", 
               strStatus: "Review", 
               strStart: "2025-10-12 00:00", 
               strEnd: "2025-10-22 00:00", 
               strDuration: "10 hours", 
               strCustomers: "CodeWorks" 
            },
            { 
               strId: "PO-113", 
               strTitle: "Security Audit", 
               strLocation: "Toronto", 
               strPriority: "High", 
               strStatus: "To Do", 
               strStart: "2025-11-07 00:00", 
               strEnd: "2025-11-12 00:00", 
               strDuration: "5 hours", 
               strCustomers: "SecureX" 
            },
            { 
               strId: "PO-114", 
               strTitle: "Client Demo Presentation", 
               strLocation: "Paris", 
               strPriority: "Low", 
               strStatus: "Done", 
               strStart: "2025-10-03 00:00", 
               strEnd: "2025-10-04 00:00", 
               strDuration: "1 day", 
               strCustomers: "VisionTech" 
            },
            { 
               strId: "PO-115", 
               strTitle: "Email Campaign Setup", 
               strLocation: "Remote", 
               strPriority: "Medium", 
               strStatus: "Review", 
               strStart: "2025-10-14 00:00", 
               strEnd: "2025-10-18 00:00", 
               strDuration: "4 hours", 
               strCustomers: "MailSpark" 
            },
            { 
               strId: "PO-116", 
               strTitle: "Backend Refactoring", 
               strLocation: "Bangalore", 
               strPriority: "High", 
               strStatus: "In Progress", 
               strStart: "2025-10-21 00:00", 
               strEnd: "2025-10-30 00:00", 
               strDuration: "9 hours", 
               strCustomers: "DevNest" 
            },
            { 
               strId: "PO-117", 
               strTitle: "HR Portal Upgrade", 
               strLocation: "Remote", 
               strPriority: "Low", 
               strStatus: "Done", 
               strStart: "2025-09-20 00:00", 
               strEnd: "2025-09-25 00:00", 
               strDuration: "5 hours", 
               strCustomers: "HROne" 
            },
            { 
               strId: "PO-118", 
               strTitle: "Bug Fix Sprint", 
               strLocation: "Kolkata", 
               strPriority: "High", 
               strStatus: "In Progress", 
               strStart: "2025-10-28 00:00", 
               strEnd: "2025-11-03 00:00", 
               strDuration: "6 hours", 
               strCustomers: "FixIT" 
            },
            { 
               strId: "PO-119", 
               strTitle: "Social Media Strategy", 
               strLocation: "Dubai", 
               strPriority: "Medium", 
               strStatus: "To Do", 
               strStart: "2025-11-11 00:00", 
               strEnd: "2025-11-18 00:00", 
               strDuration: "7 hours", 
               strCustomers: "BuzzLine" 
            },
            { 
               strId: "PO-120", 
               strTitle: "UX Research", 
               strLocation: "Tokyo", 
               strPriority: "Medium", 
               strStatus: "To Do", 
               strStart: "2025-11-11 00:00", 
               strEnd: "2025-11-18 00:00", 
               strDuration: "7 hours", 
               strCustomers: "BuzzLine" 
            },
            { 
               strId: "PO-121", 
               strTitle: "UX Research", 
               strLocation: "Tokyo", 
               strPriority: "Low", 
               strStatus: "Review", 
               strStart: "2025-10-15 00:00", 
               strEnd: "2025-10-20 00:00", 
               strDuration: "5 hours", 
               strCustomers: "UserMind" 
            },
         ]
      }
   },

   computed:{
      /**
       * @method   setPageColor
       * @summary  Imported helper that calculates the background color class based on the current theme (light/dark).
       *
       * @author   Avinash Sahoo
       * @created  19-12-2025
       */
      setPageColor,

      /**
       * @method   setDbNumberTrackColor
       * @summary  Imported helper that determines the track/progress bar color for the DbNumber widget based on value thresholds.
       *
       * @author   Avinash Sahoo
       * @created  19-12-2025
       */
      setDbNumberTrackColor,
      
      /**
       * @method   setDbNumberClass
       * @summary  Imported helper that generates the CSS class string for the DbNumber widget container for styling.
       *
       * @author   Avinash Sahoo
       * @created  19-12-2025
       */
      setDbNumberClass,
      
   },
   

   /**
    * @method   created
    * @summary  Lifecycle hook that initializes the interval tracking variables to null to prepare for data generation timers.
    * @param    
    * @returns
    * @author   Avinash Sahoo
    * @created  18-12-2025
    */
   created() {
      let self = this;
      try {
         self.donutInterval = null;
         self.barInterval = null;
         self.dbInterval = null;
      } catch (error) {
         console.log('Error in Planned Outage Created: ', error);
      }
   },

   /**
    * @method   mounted
    * @summary  Lifecycle hook triggered after the component is mounted. It populates table data, initializes the Tabulator instance, and starts the simulation timers for chart data updates.
    * @param    
    * @returns
    * @author   Avinash Sahoo
    * @created  18-12-2025
    */
   mounted() {
      let self = this;
      try {
         self.$nextTick(() => {
            self.populateExtraTableData();
            self.initTabulator();
            self.dbRandomDataGenerators();
            self.donutRandomDataGenerators();
            self.barRandomDataGenerators();
         });
      } catch (error) {
         console.log('Error in Planned Outage Mounted: ', error);
      }
   },

   /**
    * @method   beforeUnmount
    * @summary  Cleanup hook that clears all active data generation intervals and destroys the Tabulator instance to prevent memory leaks.
    * @param    
    * @returns
    * @author   Avinash Sahoo
    * @created  18-12-2025
    */
   beforeUnmount() {
      let self = this;
      try {
         if (self.dbInterval) clearInterval(self.dbInterval);
         if (self.donutInterval) clearInterval(self.donutInterval);
         if (self.barInterval) clearInterval(self.barInterval);

         if (self.tabulator) {
            self.tabulator.destroy();
         }
      } catch (error) {
         console.log('Error in Planned Outage Before Unmount: ', error);
      }
   },

   methods: {
      /**
       * @method   populateExtraTableData
       * @summary  Generates and appends dummy records to the table data array to simulate a large dataset for the outage schedule.
       * @param    
       * @returns
       * @author   Avinash Sahoo
       * @created  18-12-2025
       */
      populateExtraTableData() {
         let self = this;
         try {
            const objBaseData = { strTitle: "UX Research", strLocation: "Tokyo", strPriority: "Low", strStatus: "Review", strStart: "2025-10-15 00:00", strEnd: "2025-10-20 00:00", strDuration: "5 hours", strCustomers: "UserMind" };
            for (let i = 0; i < 100; i++) {
               self.arrTableData.push({ strId: "PO-" + (122 + i), ...objBaseData });
            }
         } catch (error) {
            console.log('Error in Planned Outage Populate Extra Table Data: ', error);
         }
      },

      /**
       * @method   dbRandomDataGenerators
       * @summary  Starts an interval timer that updates the 'DbNumber' widget values with random integers to simulate real-time metrics.
       * @param    
       * @returns  
       * @author   Avinash Sahoo
       * @created  18-12-2025
       */
      dbRandomDataGenerators() {
         let self = this;
         try {
            self.dbInterval = setInterval(() => {
               self.arrCircularValues.forEach(objCircularValue => objCircularValue.nValue = Math.floor(Math.random() * 100));
            }, 3000);
         } catch (error) {
            console.log('Error in Planned Outage DB Random Data Generators: ', error);
         }
      },

      /**
       * @method   donutRandomDataGenerators
       * @summary  Starts an interval timer that updates the Donut Chart dataset with random values to simulate changing monthly outage distributions.
       * @param    
       * @returns  
       * @author   Avinash Sahoo
       * @created  18-12-2025
       */
      donutRandomDataGenerators() {
         let self = this;
         try {
            self.donutInterval = setInterval(() => {
               self.objDonutChartData.labelsData = self.objDonutChartData.labelsData.map(() => Math.floor(Math.random() * 51));
            }, 3000);
         } catch (error) {
            console.log('Error in Planned Outage Donut Random Data Generators: ', error);
         }
      },

      /**
       * @method   barRandomDataGenerators
       * @summary  Starts an interval timer that updates the Bar Chart dataset with random values to simulate fluctuating weekly planned outage statistics.
       * @param    
       * @returns  
       * @author   Avinash Sahoo
       * @created  18-12-2025
       */
      barRandomDataGenerators() {
         let self = this;
         try {
            self.barInterval = setInterval(() => {
               self.objBarChartData.labelsData = self.objBarChartData.labelsData.map(() => Math.floor(Math.random() * 61));
            }, 3000);
         } catch (error) {
            console.log('Error in Planned Outage Bar Random Data Generators: ', error);
         }
      },

      /**
       * @method   initTabulator
       * @summary  Configures and instantiates the Tabulator table with specific columns, color-coded status/priority formatters, and action buttons.
       * @param    
       * @returns  
       * @author   Avinash Sahoo
       * @created  18-12-2025
       */
      initTabulator() {
         let self = this;
         try {
            if (!self.$refs.tabulatorRef) return;

            self.tabulator = new Tabulator(self.$refs.tabulatorRef, {
               data: self.arrTableData,
               height: "100%",
               layout: 'fitColumns',
               index: "strId",
               columns: [
                  { title: "ID", field: "strId", vertAlign: "middle", widthGrow: 1 },
                  { title: "Title", field: "strTitle", vertAlign: "middle", widthGrow: 1.5 },
                  {
                     title: "Priority", field: "strPriority", vertAlign: "middle", widthGrow: 1,
                     formatter: (cell) => {
                        const colors = { Low: "#4a7355", Medium: "#a27b4b", High: "#a74d4d" };
                        const bg = colors[cell.getValue()] || "#777";
                        return `<span style="padding:3px 8px;border-radius:4px;color:white;background-color:${bg};font-weight:500; font-size:10px;">${cell.getValue()}</span>`;
                     }
                  },
                  {
                     title: "Status", field: "strStatus", widthGrow: 1, vertAlign: "middle",
                     formatter: (cell) => {
                        const colors = { "To Do": "#9c4141", "In Progress": "#6b8ba4", "Review": "#a084ca", "Done": "#4a8a59" };
                        const bg = colors[cell.getValue()] || "#777";
                        return `<span style="padding:3px 8px;border-radius:4px;color:white;background-color:${bg};font-weight:500; font-size:10px;">${cell.getValue()}</span>`;
                     }
                  },
                  { title: "Start Date", field: "strStart", vertAlign: "middle", widthGrow: 1.5 },
                  { title: "End Date", field: "strEnd", vertAlign: "middle", widthGrow: 1.5 },
                  { title: "Duration", field: "strDuration", vertAlign: "middle", widthGrow: 0.8 },
                  {
                     title: "Views", widthGrow: 0.8, headerSort: false, vertAlign: "middle", hozAlign: "center",
                     formatter: () => `<div style="display:flex;justify-content:center;height:100%;"><i class="material-icons view-btn" style="color:#4CAF50;cursor:pointer;">visibility</i></div>`,
                  },
                  {
                     title: "Actions", widthGrow: 0.8, headerSort: false,
                     formatter: () => `<div style="display:flex;align-items:center;height:100%;margin-left:5px;"><i class="material-icons edit-btn" style="color:#1976D2;margin-right:1.5rem;cursor:pointer;">edit</i><i class="material-icons delete-btn" style="color:#C10015;cursor:pointer;">delete</i></div>`,
                  }
               ],
            });
         } catch (error) {
            console.log('Error in Planned Outage Init Tabulator: ', error);
         }
      },
   }
}