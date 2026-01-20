import stackedRadialBarChart from './stacked_radial_bar_chart/stacked_radial_bar_chart.vue';
import pageHeader from 'src/components/header/page_header.vue';

export default {
  components: {
    stackedRadialBarChart,
    pageHeader
  },
  data() {
    return {
      strTitle: "Weekly Incident Volume by Reporting Source",
      intervalId: null,
      // Initial Data (7 days per array)
      dataCustomerCalls: [120, 80, 75, 90, 150, 110, 95],
      dataSCADA: [50, 40, 35, 45, 60, 30, 25],
      dataMobileReport: [20, 15, 10, 18, 25, 12, 8]
    };
  },
  methods: {
    getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    randomizeData() {
      // Map to new arrays to trigger Vue reactivity
      this.dataCustomerCalls = this.dataCustomerCalls.map(() => this.getRandomInt(70, 160));
      this.dataSCADA = this.dataSCADA.map(() => this.getRandomInt(20, 70));
      this.dataMobileReport = this.dataMobileReport.map(() => this.getRandomInt(5, 30));
    }
  },
  mounted() {
    // Update data every 2.5 seconds
    this.intervalId = setInterval(this.randomizeData, 2500);
  },
  beforeUnmount() {
    if (this.intervalId) clearInterval(this.intervalId);
  }
};