import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import trendChart from '../trouble_call_management/components/charts/trend_chart/trend_chart.vue'

vi.mock('chart.js/auto', () => {
   return {
      default: class MockTrendChart {
         constructor(ctx, config) {
            this.data = config.data
            this.options = config.options
            this.destroy = vi.fn()
            this.update = vi.fn()
         }
      }
   }

})

describe('trend chart', () => {
   it('renders and passes correct data to Chart.js', async () => {

      const title = "Trend Chart"
      const labels = ['08:00', '09:00', '10:00', '11:00']
      const inputData = [120, 135, 110, 150]
      const data = [
         {
            label: 'Total Calls',
            data: inputData,
            borderColor: '#2196F3',
            fill: false,
            tension: 0.4,
         },
      ]

      const wrapper = mount(trendChart, {
         props: {
            title,
            labels,
            data
         },
         global: {
            stubs: {
               'q-card': {
                  template: '<div><slot /></div>'
               },
               'q-card-section': {
                  template: '<div><slot /></div>'
               }
            },
            mocks: {
               $q: {
                  dark: {
                     isActive: false
                  }
               }
            }
         }
      })

      await wrapper.vm.$nextTick()
      expect(wrapper.find('canvas').exists()).toBe(true)

      const chartInstance = wrapper.vm.chartInstance

      expect(chartInstance).not.toBeNull()

      expect(chartInstance.data.labels).toEqual(labels)
      expect(chartInstance.data.datasets).toEqual(data)
      expect(chartInstance.data.datasets[0].data).toEqual(inputData)

      //Default Props values

      expect(chartInstance.options.animation).toBe(false)
      expect(chartInstance.options.plugins.legend.labels.color).toBe('#9e9e9e')
      expect(chartInstance.options.plugins.legend.labels.font.size).toBe(10)
      expect(chartInstance.options.plugins.datalabels.display).toBe(false)
      expect(chartInstance.options.scales.x.ticks.color).toBe('#9e9e9e')
      expect(chartInstance.options.scales.x.ticks.font.size).toBe(8)
      expect(chartInstance.options.scales.x.ticks.maxRotation).toBe(45)
      expect(chartInstance.options.scales.x.ticks.minRotation).toBe(45)
      expect(chartInstance.options.scales.x.ticks.autoSkip).toBe(true)
      expect(chartInstance.options.scales.x.ticks.maxTicksLimit).toBe(10)
      expect(chartInstance.options.scales.x.grid.color).toBe('rgba(0,0,0,0.1)')
      expect(chartInstance.options.scales.y.min).toBe(100)
      expect(chartInstance.options.scales.y.max).toBe(250)
      expect(chartInstance.options.scales.y.ticks.color).toBe('#9e9e9e')
      expect(chartInstance.options.scales.y.ticks.font.size).toBe(9)
      expect(chartInstance.options.scales.y.grid.color).toBe('rgba(0,0,0,0.1)')
   })

   it('updates the chart when data props change', async () => {
      const title = "Trend Chart"
      const labels = ['08:00', '09:00', '10:00', '11:00']
      const inputData = [120, 135, 110, 150]
      const data = [
         {
            label: 'Total Calls',
            data: inputData,
            borderColor: '#2196F3',
            fill: false,
            tension: 0.4,
         },
      ]
      const animation = true
      const legendLabelFontSize = 11
      const dataLabels = true
      const scaleXticksFontSize = 9
      const scaleXticksMaxRotation = 40
      const scaleXticksMinRotation = 40
      const scaleXticksAutoSkip = false
      const scaleXMaxTicksLimit = 11
      const scaleYmin = 110
      const scaleYmax = 260
      const scaleYticksFontSize = 10
      const scaleYticksColorLight = '#eeeeee'

      const wrapper = mount(trendChart, {
         props: {
            title,
            labels,
            data,
            animation,
            legendLabelFontSize,
            dataLabels,
            scaleXticksFontSize,
            scaleXticksMaxRotation,
            scaleXticksMinRotation,
            scaleXticksAutoSkip,
            scaleXMaxTicksLimit,
            scaleYmin,
            scaleYmax,
            scaleYticksFontSize,
            scaleYticksColorLight

         },
         global: {
            stubs: {
               'q-card': {
                  template: '<div><slot /></div>'
               },
               'q-card-section': {
                  template: '<div><slot /></div>'
               }
            },
            mocks: {
               $q: {
                  dark: {
                     isActive: false
                  }
               }
            }
         }
      })

      await wrapper.vm.$nextTick()
      expect(wrapper.find('canvas').exists()).toBe(true)

      const chartInstance = wrapper.vm.chartInstance
      expect(chartInstance).not.toBeNull()

      expect(chartInstance.data.labels).toEqual(labels)
      expect(chartInstance.data.datasets).toEqual(data)
      expect(chartInstance.data.datasets[0].data).toEqual(inputData)
      expect(chartInstance.options.animation).toBe(animation)
      expect(chartInstance.options.plugins.legend.labels.font.size).toBe(legendLabelFontSize)
      expect(chartInstance.options.plugins.datalabels.display).toBe(dataLabels)
      expect(chartInstance.options.scales.x.ticks.font.size).toBe(scaleXticksFontSize)
      expect(chartInstance.options.scales.x.ticks.maxRotation).toBe(scaleXticksMaxRotation)
      expect(chartInstance.options.scales.x.ticks.minRotation).toBe(scaleXticksMinRotation)
      expect(chartInstance.options.scales.x.ticks.autoSkip).toBe(scaleXticksAutoSkip)
      expect(chartInstance.options.scales.x.ticks.maxTicksLimit).toBe(scaleXMaxTicksLimit)
      expect(chartInstance.options.scales.y.min).toBe(scaleYmin)
      expect(chartInstance.options.scales.y.max).toBe(scaleYmax)
      expect(chartInstance.options.scales.y.ticks.font.size).toBe(scaleYticksFontSize)
      expect(chartInstance.options.scales.y.ticks.color).toBe(scaleYticksColorLight)


      const updatedInputData = [50, 60]

      const newProps = {

         title: 'Updated Trend Chart',
         labels: ['4:00', '5:00'],
         data: [
            {
               label: 'Calls',
               data: updatedInputData,
               borderColor: '#2196F3',
               fill: false,
               tension: 0.4,
            },
         ],
         animation: false,
         legendLabelFontSize: 12,
         dataLabels: false,
         scaleXticksFontSize: 10,
         scaleXticksMaxRotation: 50,
         scaleXticksMinRotation: 50,
         scaleXticksAutoSkip: true,
         scaleXMaxTicksLimit: 12,
         scaleYmin: 120,
         scaleYmax: 270,
         scaleYticksFontSize: 11,
         scaleYticksColorLight: '#000'
      }

      await wrapper.setProps(newProps)

      expect(chartInstance.data.labels).toEqual(newProps.labels)
      expect(chartInstance.data.datasets).toEqual(newProps.data)
      expect(chartInstance.data.datasets[0]).toEqual(newProps.data[0])
      expect(chartInstance.data.datasets[0].data).toEqual(updatedInputData)
      expect(chartInstance.options.animation).toBe(newProps.animation)
      expect(chartInstance.options.plugins.legend.labels.font.size).toBe(newProps.legendLabelFontSize)
      expect(chartInstance.options.plugins.datalabels.display).toBe(newProps.dataLabels)
      expect(chartInstance.options.scales.x.ticks.font.size).toBe(newProps.scaleXticksFontSize)
      expect(chartInstance.options.scales.x.ticks.maxRotation).toBe(newProps.scaleXticksMaxRotation)
      expect(chartInstance.options.scales.x.ticks.minRotation).toBe(newProps.scaleXticksMinRotation)
      expect(chartInstance.options.scales.x.ticks.autoSkip).toBe(newProps.scaleXticksAutoSkip)
      expect(chartInstance.options.scales.x.ticks.maxTicksLimit).toBe(newProps.scaleXMaxTicksLimit)
      expect(chartInstance.options.scales.y.min).toBe(newProps.scaleYmin)
      expect(chartInstance.options.scales.y.max).toBe(newProps.scaleYmax)
      expect(chartInstance.options.scales.y.ticks.font.size).toBe(newProps.scaleYticksFontSize)
      expect(chartInstance.options.scales.y.ticks.color).toBe(newProps.scaleYticksColorLight)

      expect(chartInstance.update).toHaveBeenCalled()
   })

   it('destroy the chartInstance when Unmount', async () => {
      const title = "Trend Chart"
      const labels = ['08:00', '09:00', '10:00', '11:00']
      const inputData = [120, 135, 110, 150]
      const data = [
         {
            label: 'Total Calls',
            data: inputData,
            borderColor: '#2196F3',
            fill: false,
            tension: 0.4,
         },
      ]

      const wrapper = mount(trendChart, {
         props: {
            title,
            labels,
            data,
         },
         global: {
            stubs: {
               'q-card': {
                  template: '<div><slot /></div>'
               },
               'q-card-section': {
                  template: '<div><slot /></div>'
               }
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
      expect(wrapper.find('canvas').exists()).toBe(true)

      const chartInstance = wrapper.vm.chartInstance
      expect(chartInstance).not.toBeNull()

      wrapper.unmount()
      expect(chartInstance.destroy).toHaveBeenCalled()
   })

   it('Handles Empty Data Without Crashing', async () => {

      const title = "Trend Chart"
      const labels = []
      const data = []

      const wrapper = mount(trendChart, {
         props: {
            title,
            labels,
            data,
         },
         global: {
            stubs: {
               'q-card': {
                  template: '<div><slot /></div>'
               },
               'q-card-section': {
                  template: '<div><slot /></div>'
               }
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
      expect(wrapper.find('canvas').exists()).toBe(true)

      const chartInstance = wrapper.vm.chartInstance
      expect(chartInstance).not.toBeNull()

      expect(chartInstance.data.labels).toEqual(labels)
      expect(chartInstance.data.datasets).toEqual(data)
   })

   it('re-initializes with correct colors when dark mode changes', async () => {
      const title = "Trend Chart"
      const labels = ['08:00', '09:00', '10:00', '11:00']
      const inputData = [120, 135, 110, 150]
      const data = [
         {
            label: 'Total Calls',
            data: inputData,
            borderColor: '#2196F3',
            fill: false,
            tension: 0.4,
         },
      ]

      const wrapper = mount(trendChart, {
         props: {
            title,
            labels,
            data,
         },
         global: {
            stubs: {
               'q-card': {
                  template: '<div><slot /></div>'
               },
               'q-card-section': {
                  template: '<div><slot /></div>'
               }
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
      expect(wrapper.find('canvas').exists()).toBe(true)

      const chartInstance = wrapper.vm.chartInstance
      expect(chartInstance).not.toBeNull()

      expect(chartInstance.options.plugins.legend.labels.color).toBe('#E0E0E0')
      expect(chartInstance.options.scales.x.ticks.color).toBe('#E0E0E0')
      expect(chartInstance.options.scales.x.grid.color).toBe('rgba(255,255,255,0.1)')
      expect(chartInstance.options.scales.y.grid.color).toBe('rgba(255,255,255,0.1)')
      expect(chartInstance.options.scales.y.ticks.color).toBe('#E0E0E0')


      wrapper.vm.$q.dark.isActive = false
      wrapper.vm.$options.watch['$q.dark.isActive'].call(wrapper.vm)

      const updatedChartInstance = wrapper.vm.chartInstance
      expect(updatedChartInstance.options.plugins.legend.labels.color).toBe('#9e9e9e')
      expect(updatedChartInstance.options.scales.x.ticks.color).toBe('#9e9e9e')
      expect(updatedChartInstance.options.scales.x.grid.color).toBe('rgba(0,0,0,0.1)')
      expect(updatedChartInstance.options.scales.y.grid.color).toBe('rgba(0,0,0,0.1)')
      expect(updatedChartInstance.options.scales.y.ticks.color).toBe('#9e9e9e')
   })
})