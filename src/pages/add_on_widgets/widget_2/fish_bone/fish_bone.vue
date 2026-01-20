<template>
  <div class="graph-wrapper" :style="{ backgroundColor: $q.dark.isActive ? '#121212' : '#ffffff' }">
    <div ref="containerRef" class="graph-container"></div>
  </div>
</template>

<script src="./fishbone.js"></script>

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
</style>