<template>
<!-- Header Container -->
   <div class="bg-transparent">
    <!-- Header Toolbar -->
          <q-toolbar class="header-toolbar">
            <!-- Header Title -->
            <h3 class="header-title" :class="setHeaderTitleColor">
              {{ title }}
            </h3>
          </q-toolbar>
       </div>

</template>

<script src="./page_header.js"></script>

<style scoped>

.header-toolbar {
  min-height: 30px;
  padding-left: 8px;
  margin-bottom: 0px;
}
.header-title {
  font-size: 1rem;
  display: inline-block;
  font-weight: 400;
}
.header-title-dark {
  color: #9e9e9e;
}
.header-title-light {
  color: #424242;
}
</style>