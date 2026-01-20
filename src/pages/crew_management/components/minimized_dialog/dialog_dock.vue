<template>
   <q-page-sticky position="right" :offset="[0, -50]" style="z-index: 6000;" v-if="store.minimizedDialogs.length > 0">
      <div class="dock-container">
         <q-btn round dense size="lg" :color="$q.dark.isActive ? 'grey-9' : 'white'"
            :text-color="$q.dark.isActive ? 'blue-4' : 'primary'" icon="folder_open" class="dock-btn shadow-5"
            :class="$q.dark.isActive ? 'dock-btn-dark' : 'dock-btn-light'">
            <q-badge color="red" floating rounded>{{ store.minimizedDialogs.length }}</q-badge>

            <q-tooltip anchor="center left" self="center right" :offset="[10, 0]" class="bg-grey-9 text-caption">
               Minimized Windows
            </q-tooltip>

            <q-menu anchor="center left" self="center right" :class="$q.dark.isActive ? 'bg-dark-menu' : 'bg-white'">
               <q-list style="min-width: 220px">
                  <q-item-label header :class="$q.dark.isActive ? 'text-grey-5' : 'text-grey-8'"
                     class="text-caption text-uppercase">
                     Restorable Windows
                  </q-item-label>

                  <q-separator :color="$q.dark.isActive ? 'grey-8' : 'grey-3'" />

                  <q-item v-for="dialog in store.minimizedDialogs" :key="dialog.id" clickable v-close-popup
                     @click="store.restore(dialog.id)" class="q-py-md">
                     <q-item-section avatar>
                        <q-icon name="aspect_ratio" :color="$q.dark.isActive ? 'blue-4' : 'primary'" />
                     </q-item-section>
                     <q-item-section>
                        <q-item-label :class="$q.dark.isActive ? 'text-white' : 'text-dark'" style="font-weight: 500;">
                           {{ dialog.title }}
                        </q-item-label>
                        <q-item-label caption :class="$q.dark.isActive ? 'text-grey-5' : 'text-grey-6'">
                           Click to restore
                        </q-item-label>
                     </q-item-section>
                  </q-item>
               </q-list>
            </q-menu>
         </q-btn>
      </div>
   </q-page-sticky>
</template>

<script setup>
import { useDialogStore } from '../../../stores/dialog_store';
const store = useDialogStore();
</script>

<style scoped>
.dock-btn {
   transition: all 0.2s ease-in-out;
}

.dock-btn:hover {
   transform: scale(1.05);
}

.dock-btn-light {
   border: 1px solid #e0e0e0;
}

.dock-btn-dark {
   border: 1px solid #444;
   background-color: #1d1d1d !important;
}

.bg-dark-menu {
   background-color: #1d1d1d;
   border: 1px solid #444;
}
</style>