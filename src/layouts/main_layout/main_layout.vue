<template>
  <q-layout view="hHh LpR fFf">
    <q-header class="text-grey-4" :class="$q.dark.isActive ? 'db-toolbar-dark' : 'db-toolbar-light'">
      <q-toolbar dark :style="$q.screen.lt.md ? 'padding : 0px;' : ''">
        <q-btn flat dense round aria-label="Menu" @click="toggleLeftDrawer">
          <q-icon>
            <img src="~assets/img/dock_to_right.png" :style="{
              width: '22px',
              height: '22px',
              objectFit: 'contain',
              opacity: '0.85',
              display: $q.dark.isActive ? 'block' : 'none'
            }" />
            <img src="~assets/img/dock_to_right_dark.png" :style="{
              width: '22px',
              height: '22px',
              objectFit: 'contain',
              display: $q.dark.isActive ? 'none' : 'block',
              opacity: '0.85',
            }" />
          </q-icon>
          <q-tooltip>
            Collapse Sidebar
          </q-tooltip>
        </q-btn>


        <q-img src="~assets/img/SSS_logo.png" fit="contain" color="white" style="height:28px;" :style="{
          display: $q.dark.isActive ? 'block' : 'none',
          marginLeft: $q.screen.lt.sm ? '0px' : '0.5em',
          width: $q.screen.lt.sm ? '30px' : '36px'
        }" />
        <q-img src="~assets/img/SSS_logo2.png" fit="contain" color="white" style="height:28px;margin-left:0.5em;"
          :style="{
            display: $q.dark.isActive ? 'none' : 'block',
            marginLeft: $q.screen.lt.sm ? '0px' : '0.5em',
            width: $q.screen.lt.sm ? '30px' : '36px'
          }" />

        <q-toolbar-title :style="[$q.dark.isActive ? '' : 'color:#606266;', $q.screen.lt.md ? 'display: none;' : ' ']">
          ADMS Survey App </q-toolbar-title>
        <q-toolbar-title style="font-size: 17px !important;"
          :style="[$q.dark.isActive ? '' : 'color:#606266;', $q.screen.lt.md ? ' ' : 'display: none;']"> Survey App 
        </q-toolbar-title>

        <q-space></q-space>

        <q-btn v-if="smallScreen" :text-color="showSearchToolbar ? 'primary' : ''" dense unelevated icon="search"
          @click="openSearchModal" style="padding: 0px;"
          :style="$q.dark.isActive ? 'color:rgba(204, 204, 220);' : 'color:#606266;'"></q-btn>

        <q-input v-if="!smallScreen" v-model="searchQuery" dense filled placeholder="Search..." class="col-md-3"
          @click="openSearchModal" :style="{
            padding: '0px 0px 0px 1em',
            width: '20%',
            color: '#fff',
            marginRight: '4px',
            cursor: 'pointer',
            '--q-field-bg': 'rgba(36, 41, 46, 0.95)',
            '--q-field-border': '1px solid rgba(204, 204, 220, 0.15)',
            '--q-field-border-hover': '1px solid rgba(204, 204, 220, 0.25)'
          }">
          <template v-slot:prepend>
            <q-icon name="search" :style="{
              color: $q.dark.isActive ? 'rgba(204, 204, 220, 0.7)' : '#606266',
              fontSize: '18px'
            }" />
          </template>

          <template v-slot:append>
            <div :style="{
              height: '100%',
              padding: '2px 4px',
              paddingTop: '8px',
              borderRadius: '3px',
              fontSize: '10px',
              fontWeight: '400',
              color: $q.dark.isActive ? '#90A4AE' : '#606266',
            }">
              ctrl+k
            </div>
          </template>
        </q-input>

        <!-- <q-btn style="padding: 0.285em; margin-right: 0px;" :style="$q.dark.isActive ? '' : 'color:#606266;'" dense
          unelevated icon="notifications" class="" :class="$q.screen.lt.sm ? '' : 'q-ma-xs'">
          <q-badge color="red" floating>5</q-badge>
          <q-menu v-model="messagesOpen">
            <messages @close="messagesOpen = false"></messages>
          </q-menu>
          <q-tooltip>
            Notifications
          </q-tooltip>
        </q-btn>

        <q-btn style="padding: 0.285em; margin-right: 0px;" :style="$q.dark.isActive ? '' : 'color:#606266;'" dense
          unelevated icon="help" class="" :class="$q.screen.lt.sm ? '' : 'q-ma-xs'">
          <q-tooltip>
            Help
          </q-tooltip>
        </q-btn>

        <q-btn-dropdown style="padding: 0.285em; margin-right: 2px;" :style="$q.dark.isActive ? '' : 'color:#606266;'"
          dense unelevated v-model="settingsOpen" dropdown-icon="settings" class="ub-btn-dropdown-bare" :class="$q.screen.lt.sm ? '' : 'q-ma-xs'">
          <settings @close="settingsOpen = false"></settings>
        </q-btn-dropdown> -->
         <q-btn-dropdown style="padding: 0.285em; margin-right: 2px;" :style="$q.dark.isActive ? '' : 'color:#606266;'"
          dense unelevated v-model="settingsOpen" dropdown-icon="settings" class="ub-btn-dropdown-bare" :class="$q.screen.lt.sm ? '' : 'q-ma-xs'">
          <settings @close="settingsOpen = false"></settings>
        </q-btn-dropdown> 

        <q-separator vertical inset style="background-color: #90a4ae !important; margin-left: 10px; " />

        <q-btn-dropdown style="padding: 0.285em; margin-left: 2px;" :style="$q.dark.isActive ? '' : 'color:#606266;'"
          unelevated v-model="userInfoOpen" no-caps>
          <template v-slot:label>
            <div class="row items-center no-wrap" style="height: 1rem;">
              <q-avatar size="sm">
                <q-icon name="person" :style="$q.dark.isActive ? '' : 'color:#606266;'" />
              </q-avatar>
              <div class="text-center q-pa-sm"
                :style="[$q.dark.isActive ? '' : 'color:#606266;', $q.screen.lt.sm ? 'display : none;' : '']">Operator
              </div>
            </div>
          </template>
          <user-info></user-info>
        </q-btn-dropdown>
      </q-toolbar>

      <q-toolbar v-if="smallScreen && showSearchToolbar">
        <q-input :dark="true" v-model="searchQuery" debounce="500" dense filled placeholder="Search" clearable
          class="full-width" @update:model-value="handleSearch">
          <template v-slot:prepend>
            <q-icon name="search" />
          </template>
        </q-input>
      </q-toolbar>
    </q-header>

    <search-dialog v-model="searchModalOpen" v-model:modalSearchQuery="modalSearchQuery" :sidebarPages="sidebarPages"
      :selectedPage="selectedPage" @page-selected="handlePageClick" />

    <q-drawer v-model="leftDrawerOpen" show-if-above :mini="miniState" :mini-width="50" class="column no-wrap" bordered
      :width="180">
      <q-scroll-area class="col"
        :thumb-style="{ backgroundColor: 'var(--scroll-bar-color)', width: '5px', borderRadius: '5px', opacity: 0.7, borderRadius: '5px' }">
        <q-list>
          <menu-item v-for="(m, i) in menus" :key="i" :icon="m.icon" :text="m.text" :isTitle="m.isTitle"
            :description="m.description" :badge="m.badge" :to="m.to" :child="m.child" :subMenu="m.child" />
        </q-list>
      </q-scroll-area>

      <div v-if="$q.screen.gt.sm">
        <q-item clickable v-ripple @click="miniState = !miniState" class="text-black drawer_btn">
          <q-item-section avatar style="">
            <q-icon :class="$q.dark.isActive ? 'drawer_btn--dark' : ''"
              :name="miniState ? 'chevron_right' : 'chevron_left'" :style="miniState ? '' : ''" />
          </q-item-section>
        </q-item>
      </div>
    </q-drawer>

    <q-page-container>
      <q-scroll-area style="height: 100vh;" class="col"
        :thumb-style="{ backgroundColor: 'var(--scroll-bar-color)', width: '5px', borderRadius: '5px', opacity: 0.7, borderRadius: '5px' }">

        <router-view />
        <div
          style="position: fixed; right: 0; width: 100%; height: 59px; margin-right: -8px; z-index: 7000; pointer-events: none;"
          :style="[$q.screen.lt.sm ? 'display: none;' : '', $q.screen.lt.md ? 'bottom: 58px;' : 'bottom: 0']">
          <div
            style="pointer-events: auto; display: flex; width: 100%; justify-content: space-between; align-items: center; padding: 4px 10px 5px 17px; margin: 0px -8px -8px -8px;"
            :style="$q.dark.isActive ? 'background: linear-gradient(90deg, #2c5364, #203a43, #0f2027);' : 'background: #ffff; border-top:1px solid lightgrey;'">

            <div style="display: flex; align-items: center; gap: 6px; flex: 1;">
              <transition-group name="dock-anim" tag="div" class="row q-gutter-x-sm">
                <div v-for="win in store.minimizedWindows" :key="win.id" class="dock-item cursor-pointer"
                  :class="$q.dark.isActive ? 'dock-item-dark' : 'dock-item-light'" @click="store.restore(win.id)">
                  <q-icon name="call_to_action" size="10px" class="q-mr-xs" />
                  <span class="ellipsis" style="max-width: 120px;">
                    {{ win.title }}
                  </span>
                  <q-icon name="keyboard_arrow_up" size="12px" class="q-ml-xs restore-icon" />
                </div>
              </transition-group>
            </div>

            <div style="flex: 0; white-space: nowrap; margin-top: -2px;">
              <p style="font-size: 11px; margin-bottom: 0px;"
                :style="$q.dark.isActive ? 'color: #b0bec5;' : 'color: #606266'">&copy; Synergy Systems & Solutions 2026
              </p>
            </div>

            <div style="display: flex; align-items: center; justify-content: flex-end; flex: 1; margin-top: -2px;">
              <!-- <span class="server-pill" style="background-color: #2e7d32;">SERVER 1</span>
              <span class="server-pill" style="background-color: #a72020;">SERVER 2</span>
              <span class="server-pill" style="background-color: #e48900;">SERVER 3</span>
              <span class="server-pill" style="background-color: #909090;">SERVER 4</span> -->
            </div>

          </div>
        </div>

        <div
          style="position: fixed; bottom: 90px; right: 0; width: 100%; height: 28px; margin-right: 0px; z-index: 7000; pointer-events: none;"
          :style="$q.screen.lt.sm ? '' : 'display: none;'">
          <div
            style="pointer-events: auto; display: flex; width: 100%; height: 100%; align-items: center; justify-content: center; padding: 0 8px;"
            :style="$q.dark.isActive ? 'background: rgba(32, 58, 67, 0.95); backdrop-filter: blur(5px); border-top: 1px solid #444;' : 'background: rgba(255, 255, 255, 0.95); backdrop-filter: blur(5px); border-top: 1px solid #ccc;'">

            <div style="flex: 0 0 auto;">
              <p style="font-size: 9px; margin-bottom: 0px; white-space: nowrap;"
                :style="$q.dark.isActive ? 'color: #b0bec5;' : 'color: #606266'">
                &copy; Synergy Systems & Solutions 2026
              </p>
            </div>

            <!-- <div style="flex: 0 0 auto; display: flex; align-items: center;">
              <span class="server-pill-small" style="background-color: #2e7d32;">Server 1</span>
              <span class="server-pill-small" style="background-color: #a72020;">Server 2</span>
            </div> -->
          </div>
        </div>

      </q-scroll-area>
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useQuasar, Dark, AppFullscreen } from 'quasar'
import { useRouter } from 'vue-router'
import { menus } from '../components/Menu'
import MenuItem from '../components/MenuItem.vue'
import Logout from 'src/helpers/Logout'
import Messages from '../../components/user/messages.vue'
import UserInfo from '../../components/user/userinfo.vue'
import Settings from '../../components/settings/settings.vue'
import { useThemeStore } from '../../stores/theme_store'
import SearchDialog from './components/search_dialog/search_dialog.vue'
import { useWindowManager } from '../../stores/window_manager'
import { substationPages } from '../../helpers/helper_function'
import { useSurveyStore } from '../../stores/survey_store'

interface SidebarPage {
  label: string
  value: string
  route: string
  keywords?: string[]
}

export default {
  name: 'MainLayout',
  components: { MenuItem, Messages, UserInfo, Settings, SearchDialog },

  setup() {
    const $q = useQuasar()
    const router = useRouter()
    const themeStore = useThemeStore()
    const store = useWindowManager()
    const surveyStore = useSurveyStore()

    const leftDrawerOpen = ref(false)
    const messagesOpen = ref(false)
    const userInfoOpen = ref(false)
    const settingsOpen = ref(false)
    const searchQuery = ref('')
    const showSearchToolbar = ref(false)
    const smallScreen = computed(() => $q.screen.lt.md)

    const searchModalOpen = ref(false)
    const modalSearchQuery = ref('')
    const selectedPage = ref('home')

    const miniState = computed({
      get: () => themeStore.menuMini,
      set: (value: boolean) => {
        themeStore.setMenuMini(value)
      }
    })

    const allSidebarPages: SidebarPage[] = substationPages

    const sidebarPages = computed(() => {
      if (!modalSearchQuery.value.trim()) return allSidebarPages
      const query = modalSearchQuery.value.toLowerCase()
      return allSidebarPages.filter(page =>
        page.label.toLowerCase().includes(query) ||
        (page.keywords && page.keywords.some(k => k.toLowerCase().includes(query)))
      )
    })


    const openSearchModal = () => { searchModalOpen.value = true }
    const closeSearchModal = () => {
      searchModalOpen.value = false
      modalSearchQuery.value = ''
      selectedPage.value = 'home'
    }

    // const handlePageClick = (page: SidebarPage) => {
    //   selectedPage.value = page.value
    //   if (page.route) {
    //     router.push(page.route)
    //     closeSearchModal()
    //   }
    // }

    const handlePageClick = (page: SidebarPage) => {
      // Set the name in the global store based on the search result label
      surveyStore.setSurveyName(page.label) 
      
      selectedPage.value = page.value
      if (page.route) {
        router.push(page.route)
        closeSearchModal()
      }
    }

    const handleSearch = (query: string) => { searchQuery.value = query }

    const handleKeyboardShortcut = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key === 'k') {
        event.preventDefault()
        openSearchModal()
      }
    }

    const toggleLeftDrawer = () => { leftDrawerOpen.value = !leftDrawerOpen.value }

    // MODIFIED: New function to handle delayed restore
    const handleRestore = (id: string) => {
      // Delay restore to allow menu closing animation to finish (avoid jump)
      setTimeout(() => {
        store.restore(id)
      }, 350)
    }

    onMounted(() => { window.addEventListener('keydown', handleKeyboardShortcut) })
    onBeforeUnmount(() => { window.removeEventListener('keydown', handleKeyboardShortcut) })

    return {
      $q, Dark, AppFullscreen, Logout, router,
      leftDrawerOpen, toggleLeftDrawer, miniState, menus,
      messagesOpen, userInfoOpen, settingsOpen,
      searchQuery, showSearchToolbar, handleSearch, smallScreen,
      searchModalOpen, modalSearchQuery, openSearchModal, closeSearchModal,
      sidebarPages, selectedPage, handlePageClick,
      store,
      handleRestore
    }
  }
}
</script>

<style lang="scss" scoped>
:deep(.q-btn-dropdown--simple * .q-btn-dropdown__arrow) {
  margin-left: 0px !important;
}

.db-toolbar-light {
  background: #ffff;
  border: 1px solid lightgrey;
}

.db-toolbar-dark {
  background: linear-gradient(90deg, #2c5364, #203a43, #0f2027);
}

.text-grey-4 {
  color: #e0e0e0 !important;
}

:deep(.q-field__native) {
  font-size: 12px !important;
  // color: #fff;
}

:deep(.q-field--dense .q-field__control) {
  background: #fff;
  border: 1px solid lightgray;
  border-radius: 5px !important;
}

:deep(.q-field--filled.q-field--dark .q-field__control, .q-field--filled.q-field--dark .q-field__control:before) {
  background: rgb(15 32 39) !important;
  border: none;
  border-radius: 5px;
  height: 30px !important;
}
</style>

<style scoped>
.drawer_btn {
  border-radius: 4px;
  display: flex;
  justify-content: center;
}

.drawer_btn--dark {
  color: #808080B2;
}

/* === DOCK ITEM STYLING === */
.dock-item {
  display: inline-flex;
  align-items: center;
  padding: 2px 8px;
  border-radius: 30px;
  font-size: 9px;
  font-weight: 500;
  transition: all 0.2s ease;
  user-select: none;
  min-width: 80px;
  justify-content: space-between;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.dock-item-light {
  background-color: #455a64;
  color: white;
  border-color: rgba(255, 255, 255, 0.3);
}

.dock-item-light:hover {
  background-color: #546e7a;
  transform: translateY(-1px);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.dock-item-dark {
  background-color: #37474f;
  color: #e0e0e0;
  border-color: rgba(255, 255, 255, 0.1);
}

.dock-item-dark:hover {
  background-color: #455a64;
  transform: translateY(-1px);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

/* === Mobile Restore Chip Specific === */
.mobile-restore-chip {
  min-width: auto !important;
  padding: 1px 8px !important;
  height: 18px;
  /* Very compact */
  border-radius: 13px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  /* box-shadow: none !important; */
}

.restore-icon {
  opacity: 0.7;
}

/* === SERVER PILLS === */
.server-pill {
  display: inline-block;
  padding: 2px 6px;
  border: 2px solid rgb(33 60 69);
  border-radius: 30px;
  color: white;
  font-weight: 400;
  font-size: 9px;
  margin-left: 3px;
}

.server-pill-small {
  display: inline-block;
  /* align-items: center; */
  /* justify-content: center; */
  padding: 0px 4px;
  height: 18px;
  min-width: 20px;
  border: 2px solid rgb(33 60 69);
  border-radius: 30px;
  color: white;
  font-weight: 400;
  font-size: 9px;
  margin-left: 2px;
}

/* Animations */
.dock-anim-enter-active,
.dock-anim-leave-active {
  transition: all 0.3s ease;
}

.dock-anim-enter-from,
.dock-anim-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>

<style>
:root {
  --scroll-bar-color: #d1d1d1;
}

.body--dark {
  --scroll-bar-color: #4a4a4a;
}

.q-drawer-container:not(.q-drawer--mini-animate) .q-drawer--mini .q-item,
.q-drawer-container:not(.q-drawer--mini-animate) .q-drawer--mini .q-item__section {
  padding-left: 4px !important;
  width: 42px;
}

.q-toolbar {
  position: relative;
  padding: 0 12px;
  min-height: 2.2rem !important;
  height: 2.2rem !important;
  width: 100%;
}

.q-toolbar__title {
  font-size: 20px !important;
}

.q-btn .q-icon {
  font-size: 1.4em !important;
}

.q-badge {
  padding: 1px 4px !important;
  font-size: 8px !important;
}

.q-item__section--avatar {
  color: inherit;
  min-width: 36px !important;
}

.q-field--dense .q-field__prepend {
  height: fit-content !important;
  margin-top: 5px !important;
  font-size: 18px;
}

.q-badge--floating {
  top: -1px !important;
  right: 0px !important;
}

.q-field--dense .q-field__append {
  padding-left: 6px;
}
</style>