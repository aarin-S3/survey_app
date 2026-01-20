import stackedPolarBarChart from './stacked_polar_bar_chart/stacked_polar_bar_chart.vue';
import pageHeader from 'src/components/header/page_header.vue';

export default {
  components: {
    stackedPolarBarChart,
    pageHeader
  },
  data() {
    return {
      intervalId: null,
      // Initial Data
      dataEquipmentFailure: [150, 100, 80, 50],
      dataWeather: [80, 70, 60, 40],
      dataThirdParty: [40, 30, 20, 10],
      strTitle: "Outage Duration by Feeder and Cause"
    };
  },
  methods: {
    getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    randomizeData() {
      // Map to new arrays to trigger Vue reactivity
      this.dataEquipmentFailure = this.dataEquipmentFailure.map(() => this.getRandomInt(50, 180));
      this.dataWeather = this.dataWeather.map(() => this.getRandomInt(30, 100));
      this.dataThirdParty = this.dataThirdParty.map(() => this.getRandomInt(10, 50));
    }
  },
  mounted() {
    // Update data every 3 seconds to match the animation flow
    this.intervalId = setInterval(this.randomizeData, 3000);
  },
  beforeUnmount() {
    if (this.intervalId) clearInterval(this.intervalId);
  }
};