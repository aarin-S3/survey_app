import Echart_donut from './Echart_donut/Echart_donut.vue';
import pageHeader from 'src/components/header/page_header.vue';

export default {
  components: {
    Echart_donut,
    pageHeader
  },
  data() {
    return {
      intervalId: null,
      strTitle: 'OMS Current Trouble Ticket Status',
      // Initial Data
      ticketData: [
        { value: 120, name: 'Open - High Priority' },
        { value: 450, name: 'Work in Progress' },
        { value: 300, name: 'Assigned Dispatch' },
        { value: 180, name: 'Pending Feedback' },
        { value: 500, name: 'Closed Today' }
      ]
    };
  },
  methods: {
    getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    randomizeData() {
      // Reassigning the array triggers Vue reactivity
      this.ticketData = [
        { value: this.getRandomInt(50, 150), name: 'Open - High Priority' },
        { value: this.getRandomInt(300, 500), name: 'Work in Progress' },
        { value: this.getRandomInt(200, 400), name: 'Assigned Dispatch' },
        { value: this.getRandomInt(100, 250), name: 'Pending Feedback' },
        { value: this.getRandomInt(400, 600), name: 'Closed Today' }
      ];
    }
  },
  mounted() {
    // Update data every 2 seconds
    this.intervalId = setInterval(this.randomizeData, 2000);
  },
  beforeUnmount() {
    if (this.intervalId) clearInterval(this.intervalId);
  }
};