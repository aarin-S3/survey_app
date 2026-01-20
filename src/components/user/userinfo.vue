<template>
  <div class=" my-font-color" style="max-width: 280px" >
    <q-list style="width: 160px">
      <q-item @click="onLogout" clickable v-ripple v-close-popup style="min-height: 38px !important;" >
        <q-item-section avatar>
          <q-icon name="logout" style="font-size: 18px !important;"></q-icon>
        </q-item-section>
        <q-item-section>
          <q-item-label lines="1" style="font-size: 0.8rem; margin-left: -6px;">
            Log Out
          </q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </div>
</template>
<script>
export default {
  name: 'UserInfo',
  components: {},
  props: {},
  data() {
    return {};
  },
  computed: {},
  watch: {},
  methods: {
    onLogout(){
        try {
          this.$q.cookies.remove("datauser")
          this.$router.push('/')
          
        } catch (error) {
          console.log(error)
          
        }
    }
  }
};
</script>
<style lang="sass" scoped>
.my-font-color
  color: #90a4ae
</style>