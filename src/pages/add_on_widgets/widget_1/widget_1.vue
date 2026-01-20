<template>
  <q-page>
    <PageHeader title="Tiered Outage Breakdown" />
    <div class="row justify-center">
      <NestedPieChart 
        :inner-data="innerData" 
        :outer-data="outerData" 
      />
    </div>
  </q-page>
</template>

<script src="./widget_1.js"></script>