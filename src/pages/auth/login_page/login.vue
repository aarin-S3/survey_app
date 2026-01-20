<template>
  <q-layout view="lHh Lpr fff">
    <q-page-container>
      <q-page class="window-height window-width row no-wrap">

        <!-- <div class="col-0 col-md-8 bg-blue-1 flex flex-center relative-position overflow-hidden"> -->
        <!-- ../../assets/img/login image.jpg -->
        <q-img src="../../../assets/img/login_image.jpg" width="100%" height="100%" fit="fill" class="z-top"
          style="opacity: 0.8;" />
        <!-- </div> -->

        <div class="col-12 col-md-4 bg-white column justify-center q-px-xl relative-position">

          <div class="full-width" style="max-width: 400px; margin: 0 auto !important;">
            <div class="q-mb-xl">
              <div style="display: flex; justify-content: center; padding-bottom: 30px;">

                <q-img src="../../../assets/img/SSS_logo2.png" width="130px" height="130px" fit="fill" class="z-top"
                  style="opacity: 0.8;" />

              </div>

              <div class="text-weight-bolder text-blue-grey-10" style="font-size: 24px;">
                SIRIUS OMS
              </div>
              <div class="text-subtitle1 text-grey-7" style="margin-bottom: 35px;">
                Outage Management System
              </div>
            </div>

            <q-form @submit="onSubmit" class="q-gutter-y-sm">

              <q-input outlined v-model="form.username" label="Username" dense :rules="$requiredField" bg-color="grey-3"
                style="color: #757575 !important;">
                <template v-slot:prepend>
                  <q-icon name="badge" color="grey-7" size="24px" />
                </template>
              </q-input>

              <q-input outlined v-model="form.password" :rules="$requiredField"
                :type="showPassword ? 'text' : 'password'" label="Password" dense bg-color="grey-3">
                <template v-slot:prepend>
                  <q-icon name="lock" color="grey-7" size="24px" />
                </template>
                <template v-slot:append>
                  <q-icon :name="showPassword ? 'visibility' : 'visibility_off'" class="cursor-pointer" color="grey-7"
                    @click="showPassword = !showPassword" style="padding-top: 10px;" />
                </template>
              </q-input>

              <!-- <div class="row items-center justify-between no-wrap q-mt-sm">
                <q-checkbox v-model="rememberMe" label="Remember Session" color="primary" size="sm" dense />
                <a href="#" class="text-primary text-caption no-decoration hover-underline">Reset Credentials?</a>
              </div> -->

              <q-btn unelevated color="primary" size="md" class="full-width q-mt-lg shadow-2" label="Sign In" no-caps
                type="submit" />
            </q-form>
            <div class="text-caption text-black" style="text-align: center; font-size: 10px; font-weight: 500;">
              &copy; Synergy Systems & Solutions 2025
            </div>

            <div class="text-center q-mt-xl">
              <div class="text-caption text-grey-5">
                Authorized Personnel Only. <br />
                System activity is logged for audit compliance.
              </div>
            </div>

          </div>

          <!-- <q-btn
            round
            icon="support_agent"
            color="grey-3"
            text-color="primary"
            class="absolute-bottom-right q-ma-lg"
            style="bottom: 20px; right: 20px;"
            size="lg"
          >
            <q-tooltip>Contact IT Support</q-tooltip>
          </q-btn> -->

        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from 'vue'
import { useQuasar } from 'quasar'
import { useRouter } from 'vue-router'
import { errNotif } from 'src/helpers/Notify'
import { setProfile, TUser } from 'src/helpers/Session'
import { allAkses } from 'src/helpers/ListAkses'

const $q = useQuasar()
const router = useRouter()
const isLoading = ref(false)
const visible = ref(false)

// const username = ref('admin') 
// const password = ref('SCADA123!')
// const rememberMe = ref(true)
const showPassword = ref(false)
const form = ref({
  username: 'admin',
  password: '123'
})

const onSubmit = async () => {
  if (form.value.username === 'admin' && form.value.password === '123') {
    // example from api
    // const res = await api.post<ResponseAPI<TUser>>('user/sign-in', form.value)
    // if (res.data.status) {
    //   goToHome(res.data.result)
    // }
    const TUser = {
      iduser: 1,
      nama: 'Dika Hastanto',
      role: 'admin',
      token: '323949298hifih4infnfn494ibfi449',
      username: 'admin'
    }
    goToHome(TUser)
    // router.push({ name: 'dashboardAdmin' })
  } else {
    errNotif('Username or Password not correct')
  }
}

const goToHome = (TUser) => {
  const access = TUser.role
  if (access) {
    const page = allAkses.find(r => {
      return r.value === access
    })
    if (page) {
      setProfile(TUser)
      router.push({ name: page.index })
    } else {
      deniedAccess()
    }
  } else {
    deniedAccess()
  }
}
const deniedAccess = () => {
  errNotif('Akses Dilarang')
}
</script>

<style scoped>
/* :deep(.q-field--dense) :deep(.q-field__control){
    height: 40px !important;
} */
.hover-underline:hover {
  text-decoration: underline;
}

.q-field--dark :deep(.q-field__native) {
  color: black !important;
}

.q-field--dark:not(.q-field--highlighted) :deep(.q-field__label),
.q-field--dark .q-field__marginal,
.q-field--dark .q-field__bottom {
  color: rgb(0 0 0 / 70%) !important;
}

:deep(.q-field--dense) .q-field__prepend {
  height: 40px !important;
  margin-top: 0px !important;
}

:deep(.q-field--dense .q-field__control, .q-field--dense .q-field__marginal) {
  height: 40px !important;
}

:deep(.q-field__native) {
  font-weight: 400 !important;
  font-size: 16px !important;
  color: rgba(0, 0, 0, 0.87) !important;
}
</style>