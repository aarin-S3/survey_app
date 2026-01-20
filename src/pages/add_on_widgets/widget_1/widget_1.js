
import NestedPieChart from './nested_pie_chart/nested_pie_chart.vue';
import PageHeader from 'src/components/header/page_header.vue';

export default {
  components: {
    NestedPieChart,
    PageHeader
  },
  data() {
    return {
      intervalId: null,
      // Initial Data
      innerData: [
        { value: 1548, name: 'Unplanned' },
        { value: 775, name: 'Planned' },
        { value: 679, name: 'Emergency', selected: true }
      ],
      outerData: [
        { value: 1048, name: 'Transformer Fault' },
        { value: 335, name: 'Feeder Trip' },
        { value: 510, name: 'Severe Weather' },
        { value: 251, name: 'Third-Party' },
        { value: 234, name: 'Substation Maint.' },
        { value: 335, name: 'Vegetation' },
        { value: 352, name: 'Vandalism' }
      ]
    };
  },
  methods: {
    getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    randomizeData() {
      // We map to new objects to ensure Vue detects the change smoothly
      this.innerData = this.innerData.map(item => ({
        ...item,
        value: this.getRandomInt(200, 1500)
      }));
      
      this.outerData = this.outerData.map(item => ({
        ...item,
        value: this.getRandomInt(100, 800)
      }));
    }
  },
  mounted() {
    // Automatically update data every 2000ms
    // ECharts will handle the smooth animation between these updates
    this.intervalId = setInterval(this.randomizeData, 2000);
  },
  beforeUnmount() {
    if (this.intervalId) clearInterval(this.intervalId);
  }
};