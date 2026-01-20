/**
 * Copyright(c) 2025. Synergy Systems & Solutions. @link : http://s3india.com 
 * 
 * @file        dashboard.js  
 * @summary     Dashboard component for OMS
 * 
 * @author      Avinash Sahoo
 * Created on : 28-11-2025
 */
import { TabulatorFull as Tabulator } from 'tabulator-tables';
import { useQuasar } from 'quasar'
import { useThemeStore } from '../../stores/theme_store'
import DbNumber from '../../components/widgets/DbNumber.vue'
import CombContainer from './components/charts/comb_container.vue';
import AccuracyChart from './components/charts/accuracy_chart.vue';
import PieDash from './components/charts/pie_dash.vue';
import DonutChart from './components/chartjs/donut_chart/donut_chart.vue';
import BarChart from './components/chartjs/bar_chart/bar_chart.vue';
import PageHeader from 'src/components/header/page_header.vue';

export default {

	name: 'MainDashboard',

	components: {
		DbNumber,
		CombContainer,
		AccuracyChart,
		PieDash,
		DonutChart,
		BarChart,
		PageHeader
	},

	setup() {
		const $q = useQuasar()
		return { $q }
	},

	data() {
		return {
			objInstAuditLogtable: null,
			objThemeStore: useThemeStore(),
			arrContainers: [],
			arrChartInstances: [],
			arrServers: [
				{ id: 1, name: 'WIN-SRV1', ip: '192.168.52.13', cpu: 24, memoryUsage: 70, status: 'online', powerOn: true, color: '#2E7D32' },
				{ id: 2, name: 'WIN-SRV2', ip: '192.168.52.14', cpu: 0, memoryUsage: 0, status: 'warning', powerOn: false, color: '#A72020' },
				{ id: 3, name: 'WIN-SRV3', ip: '192.168.52.15', cpu: 12, memoryUsage: 30, status: 'online', powerOn: true, color: '#E48900' },
				{ id: 4, name: 'WIN-SRVx', ip: '192.168.52.16', cpu: 8, memoryUsage: 20, status: 'warning', powerOn: false, color: '#909090' },
			],
			arrCircularValues: [
				{ value: 50, total: 100, title: 'GET Requests', subtitle: 'HTTP GET', percentRanges: [{ value: 70, color: '#f44336' }, { value: 90, color: '#ff9800' }, { value: 100, color: '#4caf50' }], trend: [10, 40, 25, 50, 30, 60, 35, 55, 40, 50, 45, 60, 50, 40, 55, 35, 60, 30, 65, 25, 70, 20, 75, 15, 80, 10] },
				{ value: 90, total: 100, title: 'Success Rate', subtitle: 'API Success', percentRanges: [{ value: 70, color: '#f44336' }, { value: 90, color: '#ff9800' }, { value: 100, color: '#4caf50' }], trend: [5, 95, 10, 90, 3, 97, 15, 85, 8, 92, 2, 99, 18, 82, 4, 96, 20, 80, 5, 95, 25, 75, 3, 98, 10, 90, 8, 92, 6, 94, 4, 96, 2, 98, 0, 100] },
				{ value: 70, total: 100, title: 'Success Rate', subtitle: 'API Success', percentRanges: [{ value: 70, color: '#f44336' }, { value: 90, color: '#ff9800' }, { value: 100, color: '#4caf50' }], trend: [2.1, 2.5, 2.2, 2.8, 2.3, 2.6, 2.4, 2.1, 2.7, 2.3] },
				{ value: 80, total: 100, title: 'Success Rate', subtitle: 'API Success', percentRanges: [{ value: 70, color: '#f44336' }, { value: 90, color: '#ff9800' }, { value: 100, color: '#4caf50' }], trend: [5, 95, 10, 90, 3, 97, 15, 85, 8, 92, 2, 99, 18, 82, 4, 96, 20, 80, 5, 95, 25, 75, 3, 98, 10, 90, 8, 92, 6, 94, 4, 96, 2, 98, 0, 100] },
			],
			arrCircularConfigs: [
				{ value: 50.05, color: '#6B8E23' },
				{ value: 24.59, color: '#CD853F' },
				{ value: 0.00, color: '#DAA520' },
				{ value: 25.36, color: '#D2691E' }
			],
			arrAuditRows: [
				{ method: 'GET', requests: 1036, responses: 1036, apdexScore: '0.55', errors: 128, reqRate: 2.61, errRate: '0.32', success: 908, redirect: 0, clientError: 94, serverError: 34, maxTime: 102, avgTime: 50.76, avgReqSize: 0, avgResSize: 97 },
				{ method: 'POST', requests: 509, responses: 509, apdexScore: '0.53', errors: 67, reqRate: 1.28, errRate: '0.17', success: 442, redirect: 0, clientError: 47, serverError: 20, maxTime: 102, avgTime: 52.24, avgReqSize: 111, avgResSize: 98 },
				{ method: 'PUT', requests: 0, responses: 0, apdexScore: '0.00', errors: 0, reqRate: 0.00, errRate: '0.00', success: 0, redirect: 0, clientError: 0, serverError: 0, maxTime: 0, avgTime: 0.00, avgReqSize: 0, avgResSize: 0 },
				{ method: 'DELETE', requests: 525, responses: 525, apdexScore: '0.54', errors: 62, reqRate: 1.32, errRate: '0.16', success: 463, redirect: 0, clientError: 45, serverError: 17, maxTime: 103, avgTime: 51.22, avgReqSize: 0, avgResSize: 97 }
			],
			objAccuracyChartData: {
				indicators: [
					{ name: 'ETRop Prediction Accuracy', max: 100 },
					{ name: 'Fault Location Precision', max: 100 },
					{ name: 'Crew ETA Adherence', max: 100 },
					{ name: 'Reg. Reporting Quality', max: 100 },
					{ name: 'Auto-Closure Rate', max: 100 },
					{ name: 'Switching Plan Safety', max: 100 },
				],
				chartData: [
					{
						value: [95, 90, 85, 99, 80, 100],
						name: 'SLA Target'
					},
					{
						value: [92, 88, 78, 99.5, 95, 98],
						name: 'Current Accuracy'
					}
				]
			},
			pieSimulationInterval: null,
			dbnumInterval: null,
			arrPieCategories: [
				'Equipment Failure',
				'Vegetation (Trees)',
				'Weather / Storm',
				'Planned Outage X',
			],
			arrPieChartData: [
				{ name: 'Equipment Failure', value: 35 },
				{ name: 'Vegetation (Trees)', value: 25 },
				{ name: 'Weather / Storm', value: 30 },
				{ name: 'Planned Outage X', value: 10 },
			],
			// nreload: 0

			objDonutChartData: {
				title: 'Requests by method',
				labels: ['GET', 'POST', 'PUTx', 'DELETE'],
				labelsData: [50, 20, 20, 10]
			},
			donutInterval: null,

			objBarChartData: {
				title: 'Average Handle Time',
				maxValue: 60,
				labels: ['GET', 'POST', 'PUT$', 'DELETE'],
				labelsData: [50, 20, 20, 10]
			},
			barInterval: null,


		}
	},

	/**
	 * @method   mounted
	 * @summary  mounted hook
	 * @param    
	 * @returns
	 * @author   Avinash Sahoo
	 * @created  28-11-2025
	 */
	mounted() {
		let self = this;
		try {
			self.initAuditLogTable();
			self.generateRandomDbnum();
			self.generateRandomData();
			self.generateRandomDonutData();
			self.generateRandomBarData();
			self.pieSimulationInterval = setInterval(self.generateRandomData, 3000);

		} catch (error) {
			console.log('Error in mounted:', error);
		}
	},

	/**
	 * @method   beforeUnmount
	 * @summary  beforeUnmount hook
	 * @param    
	 * @returns
	 * @author   Avinash Sahoo
	 * @created  28-11-2025
	 */
	beforeUnmount() {
		let self = this;
		try {
			if (self.objInstAuditLogtable) {
				self.objInstAuditLogtable.destroy()
			}
			if (self.pieSimulationInterval) clearInterval(self.pieSimulationInterval);
			if (self.dbnumInterval) clearInterval(self.dbnumInterval);
			if (self.donutInterval) clearInterval(self.donutInterval);
			if (self.barInterval) clearInterval(self.barInterval);
		} catch (error) {
			console.log('Error in beforeUnmount:', error);
		}
	},

	methods: {
		generateRandomBarData() {
			let self = this;
			try {
				self.barInterval = setInterval(() => {
					self.objBarChartData.labelsData = self.objBarChartData.labelsData.map(() => {
						return Math.floor(Math.random() * (60 - 0 + 1)) + 0;
					});
				}, 3000)

			} catch (error) {
				console.log('Error in generateRandomBarData:', error);
			}
		},
		generateRandomDonutData() {
			let self = this;
			try {
				self.donutInterval = setInterval(() => {
					self.objDonutChartData.labelsData = self.objDonutChartData.labelsData.map(() => {
						return Math.floor(Math.random() * (50 - 0 + 1)) + 0;
					});
				}, 3000)

			} catch (error) {
				console.log('Error in generateRandomDonutData:', error);
			}
		},
		/**
		 * @method   generateRandomDbnum
		 * @summary  generate random data for dbnum chart
		 * @param    
		 * @returns
		 * @author   Avinash Sahoo
		 * @created  09-12-2025
		 */
		generateRandomDbnum() {
			let self = this;
			try {
				self.dbnumInterval = setInterval(() => {
					self.arrCircularValues.forEach((item, index) => {
						item.value = Math.floor(Math.random() * (100 - 0 + 1)) + 0;
					})
				}, 3000)

			} catch (error) {
				console.log('Error in generateRandomDbnum:', error);
			}
		},
		/**
		 * @method   generateRandomData
		 * @summary  generate random data for e-pie chart
		 * @param    
		 * @returns
		 * @author   Avinash Sahoo
		 * @created  09-12-2025
		 */
		generateRandomData() {
			let self = this;
			try {
				self.arrPieChartData = self.arrPieCategories.map(name => ({
					name: name,
					value: Math.floor(Math.random() * (50 - 20 + 1)) + 20
				}));
			} catch (error) {
				console.log('Error in generateRandomData:', error);
				return [];
			}
		},

		/**
		 * @method   initAuditLogTable
		 * @summary  initialize audit log table
		 * @returns
		 * @author   Avinash Sahoo
		 * @created  28-11-2025
		 */
		initAuditLogTable() {
			let self = this;
			try {
				if (self.objInstAuditLogtable) {
					self.objInstAuditLogtable.destroy();
				}

				self.objInstAuditLogtable = new Tabulator('#audit-log-table', {
					data: self.arrAuditRows,
					// layout: 'fitColumns',
					placeholder: 'No Data Available',
					columns: [
						{
							title: 'Method', field: 'method', width: '11%',
							formatter: function (cell) {
								let value = cell.getValue()
								return `<span style="font-weight:700">${value}</span>`
							},
							cellContext: function (e, cell) {
								e.preventDefault()
								self.showMethodContextMenu(e, cell)
							}
						},
						{
							title: 'Requests',
							field: 'requests',
							hozAlign: 'right',
							width: '11%',
							formatter: (cell) => {
								const value = cell.getValue()
								if (value || value === 0) {
									return `<span style="color:black;padding:1px 6px; font-size:12px; background-color:#eec658;border-radius:6px;font-weight:500;">${value}</span>`
								}
							},
						},
						{ title: 'Responses', field: 'responses', hozAlign: "right", width: '12%' },
						{ title: 'Apdex Score', field: 'apdexScore', hozAlign: "right", width: '11.11%' },
						{
							title: 'Errors', field: 'errors', hozAlign: "right",
							formatter: function (cell) {
								let value = cell.getValue()
								if (value) {
									return `<span style="padding:1px 6px; font-size:12px; background-color:#d86471; color:white; border-radius:6px">${value}</span>`
								}
								return value
							},
							width: '11.11%',
						},
						{ title: 'Req rate', field: 'reqRate', hozAlign: "right", width: '11.11%' },
						{ title: 'Err rate', field: 'errRate', hozAlign: "right", width: '11.11%' },
						{ title: 'Success', field: 'success', hozAlign: "right", width: '11.11%' },
						{ title: 'Redirect', field: 'redirect', hozAlign: "right", width: '11.11%' },
					],
				});

				self.objInstAuditLogtable.on('tableBuilt', () => {
					let downloadBtn = document.getElementById('downloadCSVBtn');
					if (downloadBtn) {
						downloadBtn.addEventListener('click', () => {
							self.objInstAuditLogtable.download('csv', 'audit-log.csv');
						});
					}
				});

			} catch (error) {
				console.error("Tabulator init error:", error);
			}
		}
	}
}