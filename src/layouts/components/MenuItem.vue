<template>
  <q-item-label header v-if="isTitle">
    <div class="title-item" style="color: #455a64;">
      {{ text }}
    </div>
  </q-item-label>

  <q-expansion-item v-else-if="child.length > 0" :icon="icon" :label="text" :content-inset-level="0.1"
    active-class="my-active" class="my-font-color">
    <template v-slot:header>
      <q-item-section avatar>
        <q-icon :name="icon">
          <q-tooltip anchor="top middle" self="bottom middle">
            {{ text }}
          </q-tooltip>
        </q-icon>
      </q-item-section>

      <q-item-section>
        {{ text }}
      </q-item-section>
    </template>

    <child-item v-for="(m, i) in child" :key="i" :to="m.to" :text="m.text" :icon="m.icon" :description="m.description"
      :badge="m.badge" />
  </q-expansion-item>

  <child-item v-else :to="to" :text="text" :icon="icon" :description="description" />
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import ChildItem from './ChildMenu.vue'
import { ChildMenu } from './types'

export default defineComponent({
  name: 'MenuLink',
  components: { ChildItem },
  props: {
    isTitle: {
      type: Boolean,
      default: false
    },
    icon: {
      type: String,
      default: 'dashboard'
    },
    text: {
      type: String,
      default: '-'
    },
    to: {
      type: String,
      default: ''
    },
    description: {
      type: String,
      default: ''
    },
    hasChild: {
      default: false,
      type: Boolean
    },
    child: {
      type: Array as PropType<ChildMenu[]>,
      default: () => []
    },
  }
})
</script>

<style lang='sass' scoped>
.my-font-color
  color: #455a64 !important

.q-list--dark, .q-item--dark 
  color: #455a64 !important
  border-color: rgba(255, 255, 255, 0.28)

.q-item--dark 
  color: #90a4ae !important
  border-color: rgba(255, 255, 255, 0.28)
</style>

<style scoped>
.draw {
  border-top: 1px solid green;
  border-bottom: 1px solid red;
}

.q-expansion-item--expanded {
  border-top: 1px solid;
  border-bottom: 1px solid;
}
</style>

<style>

body:not(.body--dark) .my-active {
  /* background-color: #e93916e0 !important; */
  padding: 5px 5px;
  margin: 4px 4px;
  border-radius: 2px;
  background: rgba(36, 41, 46, 0.12);
  border-left: 5px solid #264754 !important;
}


body.body--dark .my-active {
  /* background-color: #22a5e6 !important; */
  padding: 5px 5px;
  margin: 4px 4px;
  border-radius: 2px;
  background: rgba(38, 71, 84, 0.5);
  border-left: 5px solid #264754 !important;
}
</style>