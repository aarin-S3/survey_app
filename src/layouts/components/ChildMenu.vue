<template>
  <q-item clickable active-class="my-active" :to="{name: to}" style="color: #455a64;">
    <q-item-section avatar>
       <div style="position: relative; display: inline-block;">
      <q-icon :name="icon" class="icon-drawer" size="22px" />
      <q-tooltip anchor="top middle" self="bottom middle">
        {{ text }}
      </q-tooltip>
       <!-- <q-item-label caption v-if="description">{{ description }}</q-item-label> -->
    </div>
      <!-- <q-icon :name="icon" class="icon-drawer tooltip" /> -->
    </q-item-section>
    <q-item-section >
      <q-item-label>{{ text }}</q-item-label>
      <q-item-label caption v-if="description">{{ description }}</q-item-label>
    </q-item-section>
    <q-item-label class="custom-badge" :class="badge ==='10.62%' ? 'custom-badge-danger': ''" v-if="badge">{{ badge }}</q-item-label>
  </q-item>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  props: {
    icon: {
      type: String,
      default: 'navigate_next'
    },
    text: {
      type: String,
      default: 'menu'
    },
    to: {
      type: String,
      default: ''
    },
    description: {
      type: String,
      default: ''
    },
    badge:{
      type:String,
      default : ""
    }
  }
})
</script>

<style scoped>
/* .q-item:hover {
  color: #027be3 !important;
} */
.custom-badge{
  padding:2px 4px;
  border-radius: 2px;
  background-color: #9c27b0;
  color: white;
  height: fit-content;
  font-size: 8px;
  font-weight: 300;
  margin-top: 3px;
}

.custom-badge-danger{
  background-color: rgb(203, 0, 0);
  /* margin-top: 7px; */
}

</style>
