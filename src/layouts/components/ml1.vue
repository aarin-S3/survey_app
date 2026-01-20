<template>
  <q-layout view="hHh LpR fFf">
    <q-header class="text-grey-4 db-toolbar" height-hint="98">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="leftShown = !leftShown" />
        
        <q-btn dense flat icon="dashboard" type="a" href="#" target="_blank" />
        
        <q-toolbar-title v-if="!smallScreen" style="padding-left: 4px;">
          dashblocks.io
        </q-toolbar-title>
        
        <q-space></q-space>
        
        <q-btn
          v-if="smallScreen"
          :text-color="showSearchToolbar ? 'primary' : ''"
          dense
          unelevated
          icon="search"
          class="q-ma-xs"
          @click="showSearchToolbar = !showSearchToolbar"
        ></q-btn>
        
        <q-input v-if="!smallScreen" :dark="true" v-model="searchQuery" debounce="500" dense filled placeholder="Search" clearable class="col-md-3">
          <template v-slot:prepend>
            <q-icon name="search" />
          </template>
        </q-input>
        
        <q-btn dense unelevated icon="notifications" class="q-ma-xs">
          <q-badge color="red" floating>5</q-badge>
          <q-menu v-model="messagesOpen">
            <q-card class="q-pa-md">
              <div class="text-h6">Messages</div>
              <div class="text-body2">No new messages</div>
            </q-card>
          </q-menu>
        </q-btn>
        
        <q-btn-dropdown dense unelevated v-model="settingsOpen" dropdown-icon="settings" class="q-ma-xs">
          <q-card class="q-pa-md">
            <div class="text-h6">Settings</div>
            <q-toggle v-model="$q.dark.isActive" label="Dark Mode" />
          </q-card>
        </q-btn-dropdown>
        
        <q-btn-dropdown unelevated v-model="userInfoOpen" no-caps>
          <template v-slot:label>
            <div class="row items-center no-wrap">
              <q-avatar size="sm">
                <img src="~assets/img/user.svg" />
              </q-avatar>
              <div class="text-center q-pa-sm">
                John Smith
              </div>
            </div>
          </template>
          <q-card class="q-pa-md">
            <div class="text-h6">User Info</div>
            <q-btn label="Logout" color="primary" @click="Logout" />
          </q-card>
        </q-btn-dropdown>
      </q-toolbar>
      <q-toolbar v-if="smallScreen && showSearchToolbar">
        <q-input :dark="true" v-model="searchQuery" debounce="500" dense filled placeholder="Search" clearable class="full-width">
          <template v-slot:prepend>
            <q-icon name="search" />
          </template>
        </q-input>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftShown" :mini="menuMini" :width="270" bordered>
      <!-- <div class="q-ml-md q-mb-lg q-mt-lg">
        <div class="row">
          <div class="row q-col-gutter-x-md items-center">
            <div class="col-auto">
              <q-img src="~assets/img/logo.png" width="4em"/>
            </div>
            <div class="col-auto" v-if="!menuMini">
              <div class="text-h5 text-bold text-primary">Dashboard</div>
            </div>
          </div>
        </div>
      </div> -->
      <!-- <q-separator spaced inset /> -->
      <q-list>
        <!-- <q-item-label header v-if="!menuMini">Menu</q-item-label> -->
        
        <template v-for="item in menuItems" :key="item.id">
          <q-expansion-item v-if="item.items" :icon="item.icon" :label="item.title" :caption="item.caption">
            <q-item v-for="subItem in item.items" :key="subItem.id" :to="subItem.link" clickable v-ripple class="q-ml-md">
              <q-item-section avatar>
                <q-icon :name="subItem.icon" />
              </q-item-section>
              <q-item-section>
                <q-item-label>{{ subItem.title }}</q-item-label>
                <q-item-label caption v-if="subItem.caption">{{ subItem.caption }}</q-item-label>
              </q-item-section>
              <q-item-section side v-if="subItem.badge">
                <q-badge :color="subItem.badgeColor || 'primary'">{{ subItem.badge }}</q-badge>
              </q-item-section>
            </q-item>
          </q-expansion-item>
          
          <q-item v-else :to="item.link" clickable v-ripple>
            <q-item-section avatar>
              <q-icon :name="item.icon" />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ item.title }}</q-item-label>
            </q-item-section>
          </q-item>
        </template>
      </q-list>
    </q-drawer>

    <q-page-container>
      <transition name="fade">
        <router-view />
      </transition>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useQuasar } from 'quasar'
import Logout from 'src/helpers/Logout'

const $q = useQuasar()

const leftShown = ref(true)
const menuMini = ref(false)
const settingsOpen = ref(false)
const messagesOpen = ref(false)
const userInfoOpen = ref(false)
const showSearchToolbar = ref(false)
const searchQuery = ref('')

const smallScreen = computed(() => ['xs', 'sm'].includes($q.screen.name))

const menuItems = [
  { id: '1', title: 'Dashboard1', link: '/', icon: 'dashboard' },
  { id: '2', title: 'Dashboard2', link: '/', icon: 'dashboard' },
//   {
//     id: 'observability',
//     title: 'Observability Dashboards',
//     icon: 'visibility',
//     caption: 'Monitor your Microservices',
//     items: [
//       { id: 'summary', title: 'Summary', link: '/summary', caption: 'Microservice Status', icon: 'show_chart' },
//       { id: 'requests', title: 'Requests', link: '/requests', icon: 'sync_alt', badge: '2070', badgeColor: 'accent' },
//       { id: 'errors', title: 'Errors', link: '/errors', icon: 'error', caption: 'Errors Trend', badge: '10.62%', badgeColor: 'negative' },
//       { id: 'apiop', title: 'API Operation', link: '/apiop', icon: 'settings_ethernet', caption: 'API Operation Scorecard' },
//       { id: 'timeline', title: 'Timeline', link: '/timeline', icon: 'show_chart', caption: 'Visits over time' }
//     ]
//   },
  {
    id: '4',
    title: 'Tables',
    icon: 'table_chart',
    items: [
      { id: 'quasartable', title: 'Quasar Tables', link: '/quasartable', icon: 'sync_alt' },
      { id: 'vgt', title: 'Vue-Good-Table', link: '/vgt', icon: 'sync_alt' }
    ]
  },
  {
    id: '5',
    title: 'Charts',
    icon: 'pie_chart',
    items: [
      { id: 'chartjs', title: 'Chart.js', link: '/chartjs', icon: 'bar_chart' },
      { id: 'dygraphs', title: 'Dygraphs', link: '/dygraphs', icon: 'show_chart' }
    ]
  },
  {
    id: '6',
    title: 'Style',
    icon: 'palette',
    items: [
      { id: '7', title: 'Typography', link: '/typography', icon: 'text_fields' },
      { id: '8', title: 'Icons', link: '/icons', icon: 'apps' },
      {
        id: '9',
        title: 'MDI Icons',
        caption: 'Material Design Icons',
        link: '/mdi',
        icon: 'apps',
        badge: '5045',
        badgeColor: 'accent'
      }
    ]
  },
  {
    id: 'pages',
    title: 'Pages',
    icon: 'link',
    items: [{ id: '7', title: 'Login', link: '/login', icon: 'login' }]
  }
]
// const menuItems = [
//   { id: '1', title: 'Dashboard', link: '/', icon: 'dashboard' },
//   {
//     id: 'observability',
//     title: 'Observability Dashboards',
//     icon: 'visibility',
//     caption: 'Monitor your Microservices',
//     items: [
//       { id: 'summary', title: 'Summary', link: '/summary', caption: 'Microservice Status', icon: 'show_chart' },
//       { id: 'requests', title: 'Requests', link: '/requests', icon: 'sync_alt', badge: '2070', badgeColor: 'accent' },
//       { id: 'errors', title: 'Errors', link: '/errors', icon: 'error', caption: 'Errors Trend', badge: '10.62%', badgeColor: 'negative' },
//       { id: 'apiop', title: 'API Operation', link: '/apiop', icon: 'settings_ethernet', caption: 'API Operation Scorecard' },
//       { id: 'timeline', title: 'Timeline', link: '/timeline', icon: 'show_chart', caption: 'Visits over time' }
//     ]
//   },
//   {
//     id: '4',
//     title: 'Tables',
//     icon: 'table_chart',
//     items: [
//       { id: 'quasartable', title: 'Quasar Tables', link: '/quasartable', icon: 'sync_alt' },
//       { id: 'vgt', title: 'Vue-Good-Table', link: '/vgt', icon: 'sync_alt' }
//     ]
//   },
//   {
//     id: '5',
//     title: 'Charts',
//     icon: 'pie_chart',
//     items: [
//       { id: 'chartjs', title: 'Chart.js', link: '/chartjs', icon: 'bar_chart' },
//       { id: 'dygraphs', title: 'Dygraphs', link: '/dygraphs', icon: 'show_chart' }
//     ]
//   },
//   {
//     id: '6',
//     title: 'Style',
//     icon: 'palette',
//     items: [
//       { id: '7', title: 'Typography', link: '/typography', icon: 'text_fields' },
//       { id: '8', title: 'Icons', link: '/icons', icon: 'apps' },
//       {
//         id: '9',
//         title: 'MDI Icons',
//         caption: 'Material Design Icons',
//         link: '/mdi',
//         icon: 'apps',
//         badge: '5045',
//         badgeColor: 'accent'
//       }
//     ]
//   },
//   {
//     id: 'pages',
//     title: 'Pages',
//     icon: 'link',
//     items: [{ id: '7', title: 'Login', link: '/login', icon: 'login' }]
//   }
// ]
</script>

<style lang="scss" scoped>
.db-toolbar {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>