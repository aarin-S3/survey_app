<template>
  <q-page>
    <pageHeader :title="strTitle" />
    <FishBone :data="fishboneData" />
  </q-page>
</template>

<script src="./widget_2.js"></script>

<!-- <template>
  <div class="bg-transparent">
    <q-toolbar style="min-height: 30px; padding: 0px !important; margin-bottom: 0px !important;">
      <h3 :style="$q.dark.isActive ? 'color:#9e9e9e;' : ''"
        style="font-size: 1rem; display: inline-block; font-weight: 400; padding: 0px 8px;">
        Widgets
      </h3>
    </q-toolbar>
  </div>

  <div class="graph-wrapper" :style="{ backgroundColor: $q.dark.isActive ? '#121212' : '#ffffff' }">
    <div ref="containerRef" class="graph-container"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { useQuasar } from 'quasar'
import { Text } from '@antv/g'
import { BaseTransform, ExtensionCategory, Graph, register, treeToGraphData } from '@antv/g6'

const $q = useQuasar()
const containerRef = ref(null)
let graph = null
let textShape = null

// --- Data Structure (Unchanged) ---
const fishboneData = {
  id: 'Outage Management\nSystem Issues',
  children: [
    {
      id: 'Functional Requirements',
      children: [
        { id: 'Planned Outage Scheduling' }, { id: 'Trouble Call Management' },
        { id: 'Crew Dispatch Delays' }, { id: 'Analytics Reporting' },
      ],
    },
    {
      id: 'System Components',
      children: [
        { id: 'TCOMS Service' }, { id: 'CAWOM Service' },
        { id: 'Planned Outage Service' }, { id: 'Analytics Service' }
      ],
    },
    {
      id: 'External Interfaces',
      children: [
        { id: 'SCADA/ADMS Integration' }, { id: 'GIS Connectivity' },
        { id: 'Customer Care/CIS' }, { id: 'Historian IS&R' }
      ],
    },
    {
      id: 'Data Management',
      children: [
        { id: 'Ticket Processing' }, { id: 'Incident Records' },
        { id: 'Work Order Tracking' }, { id: 'KPI Snapshots' },
      ],
    },
    {
      id: 'Crew Operations',
      children: [
        { id: 'Availability Monitoring' }, { id: 'Work Assignment' },
        { id: 'Field Updates' }, { id: 'Completion Tracking' },
      ],
    },
    {
      id: 'Notifications',
      children: [
        { id: 'SMS Gateway' }, { id: 'Email Service' },
        { id: 'IVR System' }, { id: 'Customer Callbacks' },
      ],
    },
  ],
}

// --- Measurements & Transforms (Unchanged) ---
const measureText = (style) => {
  if (!textShape) textShape = new Text({ style })
  textShape.attr(style)
  return textShape.getBBox().width
}

class AssignColorByBranch extends BaseTransform {
  static defaultOptions = {
    colors: [
      '#00CED1', '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4',
      '#FFEAA7', '#DDA15E', '#BC6C25', '#6C5CE7', '#00B894',
    ],
  }
  constructor(context, options) {
    super(context, Object.assign({}, AssignColorByBranch.defaultOptions, options))
  }
  beforeDraw(input) {
    const nodes = this.context.model.getNodeData()
    if (nodes.length === 0) return input
    let colorIndex = 0
    const dfs = (nodeId, color) => {
      const node = nodes.find((datum) => datum.id == nodeId)
      if (!node) return
      node.style ||= {}
      node.style.color = color || this.options.colors[colorIndex++ % this.options.colors.length]
      node.children?.forEach((childId) => dfs(childId, node.style?.color))
    }
    nodes.filter((node) => node.depth === 1).forEach((rootNode) => dfs(rootNode.id))
    return input
  }
}

class ArrangeEdgeZIndex extends BaseTransform {
  beforeDraw(input) {
    const { model } = this.context
    const { nodes, edges } = model.getData()
    const oneLevelNodes = nodes.filter((node) => node.depth === 1)
    const oneLevelNodeIds = oneLevelNodes.map((node) => node.id)
    edges.forEach((edge) => {
      if (oneLevelNodeIds.includes(edge.target)) {
        edge.style ||= {}
        edge.style.zIndex = oneLevelNodes.length - oneLevelNodes.findIndex((node) => node.id === edge.target)
      }
    })
    return input
  }
}

register(ExtensionCategory.TRANSFORM, 'assign-color-by-branch', AssignColorByBranch)
register(ExtensionCategory.TRANSFORM, 'arrange-edge-z-index', ArrangeEdgeZIndex)

const getNodeSize = (id, depth) => {
  const FONT_FAMILY = 'system-ui, sans-serif'
  return depth === 0
    ? [measureText({ text: id, fontSize: 22, fontWeight: 'bold', fontFamily: FONT_FAMILY }) + 80, 90]
    : depth === 1
      ? [measureText({ text: id, fontSize: 16, fontFamily: FONT_FAMILY }) + 50, 42]
      : [2, 30]
}

// --- Theme Logic ---

const getThemeConfig = () => {
  const isDark = $q.dark.isActive
  return {
    canvasBackground: isDark ? '#121212' : '#ffffff',

    // Root Node (Main Title)
    rootFill: isDark ? '#1a1a1a' : '#f5f5f5',
    rootStroke: isDark ? '#4CAF50' : '#4CAF50', // Keep green accent
    rootLabelFill: isDark ? '#e8e8e8' : '#333333',
    rootShadow: isDark ? 'rgba(76, 175, 80, 0.5)' : 'rgba(76, 175, 80, 0.3)',

    // Level 1 Nodes (Categories)
    l1LabelFill: isDark ? '#0d0d0d' : '#ffffff', // Text inside colored bubbles

    // Leaf Nodes (Details)
    leafLabelFill: isDark ? '#e8e8e8' : '#4a4a4a',

    // Edges
    edgeStroke: isDark ? '#666666' : '#cccccc'
  }
}

// --- Initialization ---

const initFishbone = () => {
  try {
    const theme = getThemeConfig()

    graph = new Graph({
      container: containerRef.value,
      autoFit: 'view',
      padding: 30,
      data: treeToGraphData(fishboneData),
      background: theme.canvasBackground, // Dynamic Background
      node: {
        type: 'rect',
        style: (d) => {
          const style = {
            radius: 8,
            size: getNodeSize(d.id, d.depth),
            labelText: d.id,
            labelPlacement: 'left',
            labelFontFamily: 'system-ui, sans-serif',
            cursor: d.children ? 'pointer' : 'default',
          }

          if (d.depth === 0) {
            Object.assign(style, {
              fill: theme.rootFill,
              stroke: theme.rootStroke,
              lineWidth: 3,
              labelFill: theme.rootLabelFill,
              labelFontWeight: 'bold',
              labelFontSize: 22,
              labelOffsetY: 3,
              labelPlacement: 'center',
              labelLineHeight: 32,
              shadowColor: theme.rootShadow,
              shadowBlur: 15,
            })
          } else if (d.depth === 1) {
            Object.assign(style, {
              labelFontSize: 16,
              labelFill: theme.l1LabelFill,
              labelFillOpacity: 1,
              labelOffsetY: 5,
              labelPlacement: 'center',
              labelFontWeight: 600,
              fill: d.style?.color,
              fillOpacity: 0.9,
              lineWidth: 2,
              stroke: d.style?.color,
              shadowColor: d.style?.color,
              shadowBlur: 10,
            })
          } else {
            Object.assign(style, {
              fill: 'transparent',
              labelFontSize: 14,
              labelFill: theme.leafLabelFill,
              labelFillOpacity: 0.9,
            })
          }
          return style
        },
      },
      edge: {
        type: 'polyline',
        style: {
          stroke: theme.edgeStroke,
          lineWidth: 2.5,
          strokeOpacity: 0.8,
        },
      },
      layout: {
        type: 'fishbone',
        direction: 'LR',
        hGap: 40,
        vGap: 80,
        getRibSep: (node) => {
          return node.depth === 0 ? 0 : -50
        },
      },
      behaviors: [
        {
          type: 'collapse-expand',
          key: 'collapse-expand',
          trigger: 'click',
          animation: true,
          enable: (event) => {
            const nodeData = graph.getNodeData(event.target.id)
            return nodeData && nodeData.children && nodeData.children.length > 0
          },
        },
        'zoom-canvas',
        'drag-canvas'
      ],
      transforms: ['assign-color-by-branch', 'arrange-edge-z-index'],
    })

    graph.render()
  } catch (error) {
    console.error('Error initializing fishbone:', error)
  }
}

// --- Watcher & Lifecycle ---

// Watch for dark mode changes
watch(() => $q.dark.isActive, () => {
  if (graph) {
    // We must destroy and re-create to fully repaint the canvas background and styles
    graph.destroy()
    graph = null
  }
  initFishbone()
})

onMounted(() => {
  initFishbone()
})

onUnmounted(() => {
  if (graph) {
    graph.destroy()
    graph = null
  }
  if (textShape) {
    textShape.destroy()
    textShape = null
  }
})
</script>

<style scoped>
.graph-wrapper {
  width: 100%;
  height: 90vh;
  position: relative;
  /* Background color is handled via inline style binding now */
  transition: background-color 0.3s ease;
}

.graph-container {
  width: 100%;
  height: 90vh;
  /* Remove !important background here so it inherits or is transparent */
  cursor: pointer;
  padding-bottom: 70px;
}

/* Custom scrollbar - Adjusted for potential light mode visibility */
.graph-container::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}

.graph-container::-webkit-scrollbar-track {
  background: transparent;
  border-radius: 5px;
}

.graph-container::-webkit-scrollbar-thumb {
  background: #4CAF50;
  border-radius: 5px;
  transition: background 0.3s ease;
}

.graph-container::-webkit-scrollbar-thumb:hover {
  background: #66BB6A;
}

/* Firefox scrollbar */
.graph-container {
  scrollbar-width: thin;
  scrollbar-color: #4CAF50 transparent;
}
</style> -->