// D:/SSS/Avi OMS/vitest-setup.js
import 'vitest-canvas-mock'
import { vi } from 'vitest'

// Chart.js crashes without this
global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}))

global.URL.createObjectURL = vi.fn()