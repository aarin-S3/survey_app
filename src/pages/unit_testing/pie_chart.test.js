import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import pieChart from '../trouble_call_management/components/charts/pie_chart/pie_chart.vue'

vi.mock('chart.js/auto', () => {
  return {
    default: class MockPieChart {
      constructor(ctx, config) {
        this.data = config.data
        this.options = config.options
        this.destroy = vi.fn()
        this.update = vi.fn()
      }
    }
  }
})

describe('pie chart', () => {
  it('renders and passes correct data to Chart.js', async () => {

    const title = 'System Status'
    const labels = ['Normal', 'VIP', 'Medical', 'Critical']
    const inputData = [60, 25, 10, 5]
    const backgroundColor = ['#2196F3', '#FF9800', '#4CAF50', '#F44336']

    const data = [{
      data: inputData,
      backgroundColor
    }]


    const wrapper = mount(pieChart, {
      props: { title, labels, data },
      global: {
        stubs: {
          'q-card': { template: '<div><slot /></div>' },
          'q-card-section': { template: '<div><slot /></div>' }
        },
        mocks: { $q: { dark: { isActive: true } } }
      }
    })


    await wrapper.vm.$nextTick()

    await wrapper.vm.$nextTick()


    expect(wrapper.find('canvas').exists()).toBe(true)


    const chartInstance = wrapper.vm.pieChart


    expect(chartInstance).not.toBeNull()

    expect(chartInstance.data.labels).toEqual(labels)

    expect(chartInstance.data.datasets[0].data).toEqual(inputData)

    // Default Value testing

    expect(chartInstance.options.cutout).toEqual('0%')
    expect(chartInstance.options.animation.duration).toEqual(800)
    expect(chartInstance.options.animation.easing).toEqual('easeInOutQuart')
    expect(chartInstance.options.plugins.legend.position).toEqual('bottom')
    expect(chartInstance.options.plugins.legend.labels.color).toEqual('#9e9e9e')
    expect(chartInstance.options.plugins.legend.labels.font.size).toEqual(9)

  }),

    it('updates the chart when data props change', async () => {

      const title = 'System Status'
      const labels = ['Normal', 'VIP', 'Medical', 'Critical']
      const inputData = [60, 25, 10, 5]
      const backgroundColor = ['#2196F3', '#FF9800', '#4CAF50', '#F44336']
      const cutout = '70%'
      const animationDuration = 1000
      const animationEasing = 'easeInQuart'
      const legendPosition = 'top'
      const legendFontSize = 10
      const legendFontColorLight = '#999999'

      const data = [{
        data: inputData,
        backgroundColor
      }]

      const wrapper = mount(pieChart, {
        props: {
          title,
          labels,
          data,
          cutout,
          animationDuration,
          animationEasing,
          legendPosition,
          legendFontSize,
          legendFontColorLight,
        },
        global: {
          stubs: {
            'q-card': { template: '<div><slot /></div>' },
            'q-card-section': { template: '<div><slot /></div>' }
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
      await wrapper.vm.$nextTick()

      if (!wrapper.find('canvas').exists()) {
        console.error('Canvas element not found in DOM! Check stubs.')
      }

      const chartInstance = wrapper.vm.pieChart

      expect(chartInstance).not.toBeNull()

      expect(chartInstance.data.labels).toEqual(['Normal', 'VIP', 'Medical', 'Critical'])
      expect(chartInstance.data.datasets[0].data).toEqual([60, 25, 10, 5])
      expect(chartInstance.data.datasets[0].backgroundColor).toEqual(['#2196F3', '#FF9800', '#4CAF50', '#F44336'])
      expect(chartInstance.options.cutout).toEqual('70%')
      expect(chartInstance.options.animation.duration).toEqual(1000)
      expect(chartInstance.options.animation.easing).toEqual('easeInQuart')
      expect(chartInstance.options.plugins.legend.position).toEqual('top')
      expect(chartInstance.options.plugins.legend.labels.color).toEqual('#999999')
      expect(chartInstance.options.plugins.legend.labels.font.size).toEqual(10)

      await wrapper.setProps({
        labels: ['Normal', 'VIP'],
        data: [{
          data: [80, 20],
          backgroundColor: ['#2196F3', '#FF9800']
        }],
        cutout: '60%',
        animationDuration: 700,
        animationEasing: 'easeQuart',
        legendPosition: 'left',
        legendFontSize: 9,
        legendFontColorLight: '#111111'
      })

      await wrapper.vm.$nextTick()

      expect(chartInstance.data.labels).toEqual(['Normal', 'VIP'])
      expect(chartInstance.data.datasets[0].data).toEqual([80, 20])
      expect(chartInstance.data.datasets[0].backgroundColor).toEqual(['#2196F3', '#FF9800'])
      expect(chartInstance.options.cutout).toEqual('60%')
      expect(chartInstance.options.animation.duration).toEqual(700)
      expect(chartInstance.options.animation.easing).toEqual('easeQuart')
      expect(chartInstance.options.plugins.legend.position).toEqual('left')
      expect(chartInstance.options.plugins.legend.labels.color).toEqual('#111111')
      expect(chartInstance.options.plugins.legend.labels.font.size).toEqual(9)

      expect(chartInstance.update).toHaveBeenCalled()
    }),

    it('destroy the chartInstance when Unmount', async () => {

      const title = 'System Status'
      const labels = ['Normal', 'VIP', 'Medical', 'Critical']
      const inputData = [60, 25, 10, 5]
      const backgroundColor = ['#2196F3', '#FF9800', '#4CAF50', '#F44336']

      const data = [{
        data: inputData,
        backgroundColor
      }]

      const wrapper = mount(pieChart, {
        props: { title, labels, data },
        global: {
          stubs: {
            'q-card': { template: '<div><slot /></div>' },
            'q-card-section': { template: '<div><slot /></div>' }
          },
          mocks: { $q: { dark: { isActive: true } } }
        }
      })

      await wrapper.vm.$nextTick()
      await wrapper.vm.$nextTick()

      if (!wrapper.find('canvas').exists()) {
        console.error('Canvas element not found in DOM! Check stubs.')
      }

      const chartInstance = wrapper.vm.pieChart

      expect(chartInstance).not.toBeNull()

      wrapper.unmount()

      expect(chartInstance.destroy).toHaveBeenCalled()


    })

  it('Handles Empty Data Without Crashing', async () => {

    const title = 'System Status'
    const labels = []
    const data = []

    const wrapper = mount(pieChart, {
      props: { title, labels, data },
      global: {
        stubs: {
          'q-card': { template: '<div><slot /></div>' },
          'q-card-section': { template: '<div><slot /></div>' }
        },
        mocks: { $q: { dark: { isActive: true } } }
      }
    })

    await wrapper.vm.$nextTick()
    await wrapper.vm.$nextTick()

    if (!wrapper.find('canvas').exists()) {
      console.error('Canvas element not found in DOM! Check stubs.')
    }

    const chartInstance = wrapper.vm.pieChart

    expect(chartInstance).not.toBeNull()

    expect(chartInstance.data.labels).toEqual([])
    expect(chartInstance.data.datasets).toEqual([])

  })

  it('re-initializes with correct colors when dark mode changes', async () => {
    const wrapper = mount(pieChart, {
      props: { title: '', labels: [], data: [] },
      global: {
        stubs: { 'q-card': { template: '<div><slot /></div>' }, 'q-card-section': { template: '<div><slot /></div>' } },
        mocks: { $q: { dark: { isActive: false } } }
      }
    })

    await wrapper.vm.$nextTick()
    await wrapper.vm.$nextTick()

    const chartInstance = wrapper.vm.pieChart

    expect(chartInstance).not.toBeNull()

    expect(chartInstance.options.plugins.legend.labels.color).toBe('#E0E0E0')

    wrapper.vm.$q.dark.isActive = true
    wrapper.vm.$options.watch['$q.dark.isActive'].call(wrapper.vm)

    const updatedChartInstance = wrapper.vm.pieChart

    expect(updatedChartInstance.options.plugins.legend.labels.color).toBe('#9e9e9e')
  })
})