import { Text } from '@antv/g';
import { BaseTransform, ExtensionCategory, Graph, register, treeToGraphData } from '@antv/g6';
import { toRaw } from 'vue';

// --- 1. Custom Transforms ---

class AssignColorByBranch extends BaseTransform {
  static defaultOptions = {
    colors: [
      '#00CED1', '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4',
      '#FFEAA7', '#DDA15E', '#BC6C25', '#6C5CE7', '#00B894',
    ],
  };
  constructor(context, options) {
    super(context, Object.assign({}, AssignColorByBranch.defaultOptions, options));
  }
  beforeDraw(input) {
    const nodes = this.context.model.getNodeData();
    if (nodes.length === 0) return input;
    let colorIndex = 0;
    const dfs = (nodeId, color) => {
      const node = nodes.find((datum) => datum.id == nodeId);
      if (!node) return;
      node.style ||= {};
      node.style.color = color || this.options.colors[colorIndex++ % this.options.colors.length];
      node.children?.forEach((childId) => dfs(childId, node.style?.color));
    };
    nodes.filter((node) => node.depth === 1).forEach((rootNode) => dfs(rootNode.id));
    return input;
  }
}

class ArrangeEdgeZIndex extends BaseTransform {
  beforeDraw(input) {
    const { model } = this.context;
    const { nodes, edges } = model.getData();
    const oneLevelNodes = nodes.filter((node) => node.depth === 1);
    const oneLevelNodeIds = oneLevelNodes.map((node) => node.id);
    edges.forEach((edge) => {
      if (oneLevelNodeIds.includes(edge.target)) {
        edge.style ||= {};
        edge.style.zIndex = oneLevelNodes.length - oneLevelNodes.findIndex((node) => node.id === edge.target);
      }
    });
    return input;
  }
}

register(ExtensionCategory.TRANSFORM, 'assign-color-by-branch', AssignColorByBranch);
register(ExtensionCategory.TRANSFORM, 'arrange-edge-z-index', ArrangeEdgeZIndex);


// --- 2. Component Logic ---

export default {
  name: 'FishboneDiagram',

  props: {
    data: {
      type: Object,
      required: true
    }
  },

  // Use created hook to initialize non-reactive properties
  created() {
    this.graph = null;
    this.textShape = null;
    this.resizeObserver = null; // Store observer here
  },

  data() {
    return {
      // Empty reactive data to avoid Proxy issues
    };
  },

  watch: {
    data: {
      deep: true,
      handler() {
        this.reloadGraph();
      }
    },
    '$q.dark.isActive': function () {
      this.reloadGraph();
    }
  },

  mounted() {
    this.initFishbone();
  },

  beforeUnmount() {
    this.destroyGraph();
  },

  methods: {
    destroyGraph() {
      if (this.resizeObserver) {
        this.resizeObserver.disconnect();
        this.resizeObserver = null;
      }
      if (this.graph) {
        this.graph.destroy();
        this.graph = null;
      }
      if (this.textShape) {
        this.textShape.destroy();
        this.textShape = null;
      }
    },

    measureText(style) {
      if (!this.textShape) this.textShape = new Text({ style });
      this.textShape.attr(style);
      return this.textShape.getBBox().width;
    },

    getNodeSize(id, depth) {
      const FONT_FAMILY = 'system-ui, sans-serif';
      if (depth === 0) {
        return [this.measureText({ text: id, fontSize: 22, fontWeight: 'bold', fontFamily: FONT_FAMILY }) + 80, 90];
      } else if (depth === 1) {
        return [this.measureText({ text: id, fontSize: 16, fontFamily: FONT_FAMILY }) + 50, 42];
      } else {
        return [2, 30];
      }
    },

    getThemeConfig() {
      const isDark = this.$q.dark.isActive;
      return {
        canvasBackground: isDark ? '#121212' : '#ffffff',
        rootFill: isDark ? '#1a1a1a' : '#f5f5f5',
        rootStroke: '#4CAF50',
        rootLabelFill: isDark ? '#e8e8e8' : '#333333',
        rootShadow: isDark ? 'rgba(76, 175, 80, 0.5)' : 'rgba(76, 175, 80, 0.3)',
        l1LabelFill: isDark ? '#0d0d0d' : '#ffffff',
        leafLabelFill: isDark ? '#e8e8e8' : '#4a4a4a',
        edgeStroke: isDark ? '#666666' : '#cccccc'
      };
    },

    initFishbone() {
      const container = this.$refs.containerRef;
      if (!container) return;

      try {
        const theme = this.getThemeConfig();
        const rawData = toRaw(this.data);

        // 1. Initialize Graph
        this.graph = new Graph({
          container: container,
          autoFit: 'view', // Centers initially
          padding: 30,
          data: treeToGraphData(rawData),
          background: theme.canvasBackground,
          
          node: {
            type: 'rect',
            style: (d) => {
              const style = {
                radius: 8,
                size: this.getNodeSize(d.id, d.depth),
                labelText: d.id,
                labelPlacement: 'left',
                labelFontFamily: 'system-ui, sans-serif',
                cursor: d.children ? 'pointer' : 'default',
              };

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
                });
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
                });
              } else {
                Object.assign(style, {
                  fill: 'transparent',
                  labelFontSize: 14,
                  labelFill: theme.leafLabelFill,
                  labelFillOpacity: 0.9,
                });
              }
              return style;
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
            getRibSep: (node) => (node.depth === 0 ? 0 : -50),
          },
          behaviors: [
            {
              type: 'collapse-expand',
              key: 'collapse-expand',
              trigger: 'click',
              animation: true,
              enable: (event) => {
                if (!this.graph) return false;
                const nodeData = this.graph.getNodeData(event.target.id);
                return nodeData && nodeData.children && nodeData.children.length > 0;
              },
            },
            'zoom-canvas',
            'drag-canvas'
          ],
          transforms: ['assign-color-by-branch', 'arrange-edge-z-index'],
        });

        this.graph.render();

        // 2. Add Resize Observer to handle window resizing properly
        this.resizeObserver = new ResizeObserver(() => {
          if (this.graph) {
            this.graph.resize();   // Updates graph size to match container
            this.graph.fitView();  // Forces the chart back to the center
          }
        });
        this.resizeObserver.observe(container);

      } catch (error) {
        console.error('Error initializing fishbone:', error);
      }
    },

    reloadGraph() {
      this.destroyGraph();
      setTimeout(() => {
        this.initFishbone();
      }, 50);
    }
  }
};