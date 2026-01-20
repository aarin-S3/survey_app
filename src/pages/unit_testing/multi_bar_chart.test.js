import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import multiBarChart from '../trouble_call_management/components/charts/multi_bar_chart/multi_bar_chart.vue'


vi.mock('chart.js/auto', () => {
   return {
      default: class MockMultiBarChart {
         constructor(ctx, config) {
            this.data = config.data
            this.options = config.options
            this.destroy = vi.fn()
            this.update = vi.fn()
         }
      }
   }

})

describe('multi bar chart', () => {

   it('renders and passes correct data to Chart.js', async () => {
      const title = "Multi Bar"
      const labels = ['North', 'South', 'East', 'West', 'Central', 'Suburban']
      const data = [
         {
            label: 'SCADA',
            data: [18, 22, 15, 28, 12, 20],
            backgroundColor: '#2196F3'
         }
      ]
      const wrapper = mount(multiBarChart, {
         props: {
            title,
            labels,
            data
         },
         global: {
            stubs: {
               'q-card': { template: '<div><slot /></div>' },
               'q-card-section': { template: '<div><slot /></div>' }
            },
            mocks: {
               $q: {
                  dark: {
                     isActive: true
                  }
               }
            }
         }
      })

      await wrapper.vm.$nextTick()

      const chartInstance = wrapper.vm.chartInstance
      expect(wrapper.find('canvas').exists()).toBe(true)
      expect(chartInstance).not.toBeNull()
      expect(chartInstance.data.labels).toEqual(labels)
      expect(chartInstance.data.datasets).toEqual(data)

      //Default Parameters
      expect(chartInstance.options.animation.duration).toBe(1000)
      expect(chartInstance.options.animation.easing).toBe('easeOutQuart')
      expect(chartInstance.options.plugins.legend.labels.color).toBe('#E0E0E0')
      expect(chartInstance.options.plugins.legend.labels.font.size).toBe(9)
      expect(chartInstance.options.plugins.datalabels.display).toBe(false)
      expect(chartInstance.options.scales.x.ticks.color).toBe('#E0E0E0')
      expect(chartInstance.options.scales.x.ticks.font.size).toBe(8)
      expect(chartInstance.options.scales.x.grid.color).toBe('rgba(255,255,255,0.1)')
      expect(chartInstance.options.scales.y.beginAtZero).toBe(true)
      expect(chartInstance.options.scales.y.ticks.color).toBe('#E0E0E0')
      expect(chartInstance.options.scales.y.ticks.font.size).toBe(8)
      expect(chartInstance.options.scales.y.grid.color).toBe('rgba(255,255,255,0.1)')
   })

   it('updates the chart when data props change', async () => {

      const title = "Multi Bar"
      const labels = ['North', 'South', 'East', 'West', 'Central', 'Suburban']
      const data = [
         {
            label: 'SCADA',
            data: [18, 22, 15, 28, 12, 20],
            backgroundColor: '#2196F3'
         }
      ]
      const animationDuration = 500
      const animationEasing = 'easeInQuart'
      const legendLabelFontSize = 10
      const dataLabelsDisplay = true
      const scaleXticksFontSize = 10
      const scaleYbeginAtZero = false
      const scaleYticksFontSize = 10

      const wrapper = mount(multiBarChart, {
         props: {
            title,
            labels,
            data,
            animationDuration,
            animationEasing,
            legendLabelFontSize,
            dataLabelsDisplay,
            scaleXticksFontSize,
            scaleYbeginAtZero,
            scaleYticksFontSize
         },
         global: {
            stubs: {
               'q-card': { template: '<div><slot /></div>' },
               'q-card-section': { template: '<div><slot /></div>' }
            },
            mocks: {
               $q: {
                  dark: {
                     isActive: true
                  }
               }
            }
         }
      })

      await wrapper.vm.$nextTick()


      const chartInstance = wrapper.vm.chartInstance
      expect(chartInstance).not.toBeNull()
      expect(chartInstance.data.labels).toEqual(labels)
      expect(chartInstance.data.datasets).toEqual(data)
      expect(chartInstance.options.animation.duration).toEqual(animationDuration)
      expect(chartInstance.options.animation.easing).toEqual(animationEasing)
      expect(chartInstance.options.plugins.legend.labels.font.size).toEqual(legendLabelFontSize)
      expect(chartInstance.options.plugins.datalabels.display).toEqual(dataLabelsDisplay)
      expect(chartInstance.options.scales.x.ticks.font.size).toEqual(scaleXticksFontSize)
      expect(chartInstance.options.scales.y.beginAtZero).toEqual(scaleYbeginAtZero)
      expect(chartInstance.options.scales.y.ticks.font.size).toEqual(scaleYticksFontSize)

      const updatedLabels = ['South', 'East']
      const updatedData = [
         {
            label: 'Trips',
            data: [20, 25],
            backgroundColor: '#2196F3'
         }
      ]
      await wrapper.setProps({
         labels: updatedLabels,
         data: updatedData,
         animationDuration: 800,
         animationEasing: 'easeQuart',
         legendLabelFontSize: 12,
         dataLabelsDisplay: false,
         scaleXticksFontSize: 12,
         scaleYbeginAtZero: true,
         scaleYticksFontSize: 12
      })

      expect(chartInstance.data.labels).toEqual(updatedLabels)
      expect(chartInstance.data.datasets).toEqual(updatedData)
      expect(chartInstance.options.animation.duration).toEqual(800)
      expect(chartInstance.options.animation.easing).toEqual('easeQuart')
      expect(chartInstance.options.plugins.legend.labels.font.size).toEqual(12)
      expect(chartInstance.options.plugins.datalabels.display).toEqual(false)
      expect(chartInstance.options.scales.x.ticks.font.size).toEqual(12)
      expect(chartInstance.options.scales.y.beginAtZero).toEqual(true)
      expect(chartInstance.options.scales.y.ticks.font.size).toEqual(12)
      expect(chartInstance.update).toHaveBeenCalled()
   })

   it('destroy the chartInstance when Unmount', async () => {
      const title = "Multi Bar"
      const labels = ['North', 'South', 'East', 'West', 'Central', 'Suburban']
      const data = [
         {
            label: 'SCADA',
            data: [18, 22, 15, 28, 12, 20],
            backgroundColor: '#2196F3'
         }
      ]
      const wrapper = mount(multiBarChart, {
         props: {
            title,
            labels,
            data
         },
         global: {
            stubs: {
               'q-card': { template: '<div><slot /></div>' },
               'q-card-section': { template: '<div><slot /></div>' }
            },
            mocks: {
               $q: {
                  dark: {
                     isActive: true
                  }
               }
            }
         }
      })

      await wrapper.vm.$nextTick()

      const chartInstance = wrapper.vm.chartInstance
      expect(chartInstance).not.toBeNull()

      wrapper.unmount()
      expect(chartInstance.destroy).toHaveBeenCalled()
   })

   it('Handles Empty Data Without Crashing', async () => {
      const title = "Multi Bar"
      const labels = []
      const data = []
      const wrapper = mount(multiBarChart, {
         props: {
            title,
            labels,
            data
         },
         global: {
            stubs: {
               'q-card': { template: '<div><slot /></div>' },
               'q-card-section': { template: '<div><slot /></div>' }
            },
            mocks: {
               $q: {
                  dark: {
                     isActive: true
                  }
               }
            }
         }
      })

      await wrapper.vm.$nextTick()
      const chartInstance = wrapper.vm.chartInstance
      expect(chartInstance).not.toBeNull()

      expect(chartInstance.data.labels).toEqual(labels)
      expect(chartInstance.data.datasets).toEqual(data)
   })

   it('re-initializes with correct colors when dark mode changes', async () => {
      const title = "Multi Bar"
      const labels = ['North', 'South', 'East', 'West', 'Central', 'Suburban']
      const data = [
         {
            label: 'SCADA',
            data: [18, 22, 15, 28, 12, 20],
            backgroundColor: '#2196F3'
         }
      ]
      const wrapper = mount(multiBarChart, {
         props: {
            title,
            labels,
            data,
            legendLabelsColorLight: '#000',
            legendLabelsColorDark: '#fff',
            scaleXticksColorDark: '#fff',
            scaleXticksColorLight: '#000',
            scaleYticksColorDark: '#fff',
            scaleYticksColorLight: '#000',
            scaleXgridColorDark: '#fff',
            scaleXgridColorLight: '#000',
            scaleYgridColorDark: '#fff',
            scaleYgridColorLight: '#000'


         },
         global: {
            stubs: {
               'q-card': { template: '<div><slot /></div>' },
               'q-card-section': { template: '<div><slot /></div>' }
            },
            mocks: {
               $q: {
                  dark: {
                     isActive: true
                  }
               }
            }
         }
      })

      await wrapper.vm.$nextTick()
      await wrapper.vm.$nextTick()

      const chartInstance = wrapper.vm.chartInstance
      expect(chartInstance).not.toBeNull()

      expect(chartInstance.options.plugins.legend.labels.color).toEqual('#fff')
      expect(chartInstance.options.scales.x.ticks.color).toEqual('#fff')
      expect(chartInstance.options.scales.y.ticks.color).toEqual('#fff')
      expect(chartInstance.options.scales.x.grid.color).toEqual('#fff')
      expect(chartInstance.options.scales.y.grid.color).toEqual('#fff')

      wrapper.vm.$q.dark.isActive = false

      wrapper.vm.$options.watch['$q.dark.isActive'].call(wrapper.vm)

      const updatedchartInstance = wrapper.vm.chartInstance

      expect(updatedchartInstance.options.plugins.legend.labels.color).toEqual('#000')
      expect(updatedchartInstance.options.scales.x.ticks.color).toEqual('#000')
      expect(updatedchartInstance.options.scales.y.ticks.color).toEqual('#000')
      expect(updatedchartInstance.options.scales.x.grid.color).toEqual('#000')
      expect(updatedchartInstance.options.scales.y.grid.color).toEqual('#000')


   })
})