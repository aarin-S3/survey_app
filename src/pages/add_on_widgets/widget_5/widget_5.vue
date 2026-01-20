<template>
  <q-page class="">
    <pageHeader :title="strTitle"/>
    <div class="row justify-center">
      <stackedPolarBarChart 
        :equipment-data="dataEquipmentFailure"
        :weather-data="dataWeather"
        :third-party-data="dataThirdParty"
      />
    </div>
  </q-page>
</template>

<script src="./widget_5.js"></script>

