<template>
    <div style=" display: flex; justify-content: center; align-items: center; padding: 0px 0px 0px 11px;    padding: 0px 0px 0px 11px; margin-right: 0px !important;">
          <div class="search-bar-wrapper" :class="{ expanded: isExpanded }">
    <q-input
      ref="searchInput"
      v-model="searchValue"
      :class="['animated-input', { square: isExpanded }]"
      type="text"
      dark
      borderless
      dense
      placeholder="Search..."
      @input="onSearch"
     
    />
    <q-btn
      :class="['search-btn', { close: isExpanded }]"
      type="button"
      
      flat
      dense
      @click="toggleSearch"
    />
  </div>
    </div>
  
</template>
<!-- <script lang="ts">
import { ref } from 'vue'
export default {
  name: 'SearchBar',
  emits: ['search'],
  setup(props, { emit }) {
    const searchInput = ref(null)
    const searchValue = ref('')
    const isExpanded = ref(false)
    const toggleSearch = () => {
      isExpanded.value = !isExpanded.value
      
      if (isExpanded.value) {
        // setTimeout(() => {
        //   searchInput.value?.focus()
        // }, 100)
      } else {
        searchValue.value = ''
        emit('search', '')
      }
    }
    const onSearch = () => {
      emit('search', searchValue.value)
    }
    return {
      searchInput,
      searchValue,
      isExpanded,
      toggleSearch,
      onSearch
    }
  }
}
</script> -->
<!-- <script lang="ts">
import { ref } from 'vue'
export default {
  name: 'SearchBar',
  emits: ['search'],
  setup(props, { emit }) {
    const searchInput = ref(null)
    const searchValue = ref('')
    const isExpanded = ref(false)
    const toggleSearch = () => {
      isExpanded.value = !isExpanded.value
      
      if (isExpanded.value) {
        setTimeout(() => {
          searchInput.value?.focus()
        }, 100)
      } else {
        searchValue.value = ''
        emit('search', '')
      }
    }
    const onSearch = () => {
      emit('search', searchValue.value)
    }
    return {
      searchInput,
      searchValue,
      isExpanded,
      toggleSearch,
      onSearch
    }
  }
}
</script> -->
<script lang="ts">
import { ref, SetupContext } from 'vue'
import { QInput } from 'quasar'

export default {
  name: 'SearchBar',
  emits: ['search'],
  setup(_: unknown, { emit }: SetupContext) {
    const searchInput = ref<InstanceType<typeof QInput> | null>(null)
    const searchValue = ref('')
    const isExpanded = ref(false)

    const toggleSearch = () => {
      isExpanded.value = !isExpanded.value

      if (isExpanded.value) {
        setTimeout(() => {
          searchInput.value?.focus()
        }, 100)
      } else {
        searchValue.value = ''
        emit('search', '')
      }
    }

    const onSearch = () => {
      emit('search', searchValue.value)
    }

    return {
      searchInput,
      searchValue,
      isExpanded,
      toggleSearch,
      onSearch
    }
  }
}
</script>

<style scoped>
.search-bar-wrapper {
  position: relative;
  height: 32px;
  margin-right: 0px !important;
  width: 40px;
  transition: width 0.4s ease-in-out;
  display: flex;
  align-items: center;
}
.search-bar-wrapper.expanded {
  width: 300px;
}
:deep(.animated-input) {
  box-sizing: border-box;
  width: 20px;
  height: 20px;
  margin-top: -10px;
  border: 2px solid #ffffff;
  border-radius: 50%;
  background: transparent !important;
  color: #fff;
  font-size: 14px;
  font-weight: 400;
  font-family: Roboto;
  outline: 0;
  transition: width 0.4s ease-in-out, border-radius 0.8s ease-in-out,
    padding 0.2s, height 0.4s ease-in-out;
  transition-delay: 0.4s;
  padding: 0 8px;
}
:deep(.animated-input.square) {
  box-sizing: border-box;
  margin-top: 0px;
  padding: 0 40px 0 10px;
  width: 300px;
  height: 40px;
  border: 2px solid #ffffff;
  border-radius: 4px;
  background: transparent !important;
  transition: width 0.4s ease-in-out, border-radius 0.4s ease-in-out,
    padding 0.2s, height 0.4s ease-in-out;
  transition-delay: 0.4s, 0s, 0.4s;
}
:deep(.animated-input .q-field__control) {
  background: transparent !important;
  color: #fff;
  min-height: 40px;
  height: 40px;
}
:deep(.animated-input .q-field__native) {
  color: #fff !important;
  padding: 0;
}
:deep(.animated-input .q-field__control:before),
:deep(.animated-input .q-field__control:after) {
  border: none !important;
}
:deep(.animated-input.square .q-field__control:before),
:deep(.animated-input.square .q-field__control:after) {
  border: none !important;
}
.search-btn {
  background: none;
  position: absolute;
  top: 0;
  right: 0;
  height: 40px;
  width: 40px;
  padding: 0;
  border-radius: 100%;
  outline: 0;
  border: 0;
  color: inherit;
  cursor: pointer;
  transition: 0.2s ease-in-out;
  z-index: 10;
}
.search-btn:before {
  content: "";
  position: absolute;
  width: 16px;
  height: 2.5px;
  background-color: #fff;
  transform: rotate(45deg);
  top: 21px;
  left: 14px;
  transition: 0.2s ease-in-out;
}
.search-btn.close {
  transition: 0.4s ease-in-out;
  transition-delay: 0.4s;
}
.search-btn.close:before {
  content: "";
  position: absolute;
  width: 24px;
  height: 2.5px;
  top: 50%;
  left: 50%;
  margin-top: -1.25px;
  margin-left: -12px;
  background-color: #fff;
  transform: rotate(45deg);
  transition: 0.2s ease-in-out;
}
.search-btn.close:after {
  content: "";
  position: absolute;
  width: 24px;
  height: 2.5px;
  background-color: #fff;
  top: 50%;
  left: 50%;
  margin-top: -1.25px;
  margin-left: -12px;
  cursor: pointer;
  transform: rotate(-45deg);
}
</style>
<!-- <style scoped>
.search-bar-wrapper {
  position: relative;
  height: 50px;
  width: 50px;
  transition: width 0.4s ease-in-out;
}
.search-bar-wrapper.expanded {
  width: 300px;
}
:deep(.animated-input) {
  box-sizing: border-box;
  width: 25px;
  height: 25px;
  border: 3px solid #ffffff;
  border-radius: 50%;
  background: transparent !important;
  color: #fff;
  font-size: 16px;
  font-weight: 400;
  font-family: Roboto;
  outline: 0;
  transition: width 0.4s ease-in-out, border-radius 0.8s ease-in-out,
    padding 0.2s;
  transition-delay: 0.4s;
  padding: 0 10px;
}
:deep(.animated-input.square) {
  box-sizing: border-box;
  padding: 0 40px 0 10px;
  width: 300px;
  height: 50px;
  border: 3px solid #ffffff;
  border-radius: 4px;
  background: transparent !important;
  transition: width 0.4s ease-in-out, border-radius 0.4s ease-in-out,
    padding 0.2s;
  transition-delay: 0.4s, 0s, 0.4s;
}
:deep(.animated-input .q-field__control) {
  background: transparent !important;
  color: #fff;
}
:deep(.animated-input .q-field__native) {
  color: #fff !important;
}
:deep(.animated-input .q-field__control:before),
:deep(.animated-input .q-field__control:after) {
  border: none !important;
}
:deep(.animated-input.square .q-field__control:before),
:deep(.animated-input.square .q-field__control:after) {
  border: none !important;
}
.search-btn {
  background: none;
  position: absolute;
  top: 0px;
  right: 0;
  height: 50px;
  width: 50px;
  padding: 0;
  border-radius: 100%;
  outline: 0;
  border: 0;
  color: inherit;
  cursor: pointer;
  transition: 0.2s ease-in-out;
  z-index: 10;
}
.search-btn:before {
  content: "";
  position: absolute;
  width: 20px;
  height: 3px;
  background-color: #fff;
  transform: rotate(45deg);
  top: 26px;
  left: 17px;
  transition: 0.2s ease-in-out;
}
.search-btn.close {
  transition: 0.4s ease-in-out;
  transition-delay: 0.4s;
}
.search-btn.close:before {
  content: "";
  position: absolute;
  width: 27px;
  height: 3px;
  top: 50%;
  left: 50%;
  margin-top: -1.5px;
  margin-left: -13.5px;
  background-color: #fff;
  transform: rotate(45deg);
  transition: 0.2s ease-in-out;
}
.search-btn.close:after {
  content: "";
  position: absolute;
  width: 27px;
  height: 3px;
  background-color: #fff;
  top: 50%;
  left: 50%;
  margin-top: -1.5px;
  margin-left: -13.5px;
  cursor: pointer;
  transform: rotate(-45deg);
}
</style> -->