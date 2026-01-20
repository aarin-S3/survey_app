<template>
    <!-- <q-page class="q-pa-sm" :class="$q.dark.isActive ? '' : 'bg-grey-2'" style="padding-bottom: 0rem; display: flex; flex-direction: column; flex-wrap: wrap; position: relative; padding-top: 0px !important;">  -->
  <div style="padding-left: 8px;" class="bg-transparent"> 
    <q-toolbar style="min-height: 30px; padding: 0px !important;"> 
      <h3 :style="$q.dark.isActive ? 'color:#9e9e9e;' : ''" style="font-size: 1rem; display: inline-block; font-weight: 400;"> 
        Network Diagram
      </h3> 
    </q-toolbar> 
  </div> 
  <div style="height: 90vh; margin-top: -5px;">
    <VueFlow :nodes="nodes" :edges="edges" fit-view-on-init 
    :default-viewport="{ zoom: 0.5 }"
    :min-zoom="0.2"
    :max-zoom="1.1"
    :style="{ background: 'var(--vf-node-bg)' }">
      <Background :pattern-color="$q.dark.isActive ? '#90a4ae' : '#000'" :gap="16" />
    </VueFlow>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { VueFlow } from '@vue-flow/core';
// Import the Background component
import { Background } from '@vue-flow/background';
import { MarkerType } from '@vue-flow/core'
import '@vue-flow/core/dist/style.css';
import '@vue-flow/core/dist/theme-default.css'; // Optional default theme

const nodes = ref([
  {
    id: '1',
    type: 'input',
    data: { label: 'Node 1' },
    position: { x: 250, y: 0 },
    class: 'light',
    style: { backgroundColor: '#90a4ae' },
  },
  {
    id: '2',
    type: 'output',
    data: { label: 'Node 2' },
    position: { x: 100, y: 100 },
    class: 'light',
    style: { backgroundColor: '#90a4ae' },
  },
  {
    id: '3',
    data: { label: 'Node 3' },
    position: { x: 400, y: 100 },
    class: 'light',
    style: { backgroundColor: '#90a4ae' },
  },
  {
    id: '4',
    data: { label: 'Node 4' },
    position: { x: 150, y: 200 },
    class: 'light',
    style: { backgroundColor: '#90a4ae' },
  },
  {
    id: '5',
    type: 'output',
    data: { label: 'Node 5' },
    position: { x: 300, y: 300 },
    class: 'light',
    style: { backgroundColor: '#90a4ae' },
  },
]);

const edges = ref([
   {
    id: 'e1-2',
    source: '1',
    target: '2',
    animated: true,
  },
  {
    id: 'e1-3',
    source: '1',
    target: '3',
    label: 'edge with arrowhead',
    markerEnd: MarkerType.ArrowClosed,
    style: { stroke: 'orange' },
    labelBgStyle: { fill: 'orange' },
  },
  {
    id: 'e4-5',
    type: 'step',
    source: '4',
    target: '5',
    label: 'Node 2',
    style: { stroke: 'orange' },
    labelBgStyle: { fill: 'orange' },
  },
  {
    id: 'e3-4',
    type: 'smoothstep',
    source: '3',
    animated: true,
    target: '4',
    label: 'smoothstep-edge',
    style: { stroke: 'green' },
    labelBgStyle: { fill: 'green' },
  },
]);
</script>

<style>

:root {
    --vf-node-bg: #fff;
    --vf-node-text: #222;
    --vf-connection-path: #b1b1b7;
    --vf-handle: #555;
}
.body--dark {
    --vf-node-bg: #121212;
    --vf-node-text: #222;
    --vf-connection-path: #b1b1b7;
    --vf-handle: #555;
}


</style>