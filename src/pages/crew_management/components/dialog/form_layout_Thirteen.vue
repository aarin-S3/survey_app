<template>
   <!-- <h3 :style="$q.screen.lt.sm ?  'margin-top: 15px; background-color: blue; line-height: 1.8rem; font-size: 1.4rem;' : ' margin-top: 20px; font-size: 1.6rem;'" style="text-align: center; " :class="$q.dark.isActive ? 'dialog-header-dark' : 'dialog-header-light'">{{ props.name }}</h3> -->
   <!-- <h3 style="text-align: center; margin-bottom: -30px;" :class="$q.dark.isActive ? 'dialog-header-dark' : 'dialog-header-light'">{{ props.name }}</h3> -->
   <q-card :class="[$q.dark.isActive ? 'background: #2f2f2f' : 'background: #385562']"
      :style="[{ height: $q.screen.lt.md ? 'calc(100vh - 160px)' : 'calc(100vh - 100px)', width: '100%', display: 'flex', flexDirection: 'column', border: 'none', boxShadow: 'none !important' }]">


      <q-tab-panel name="notification_details" class="q-pa-none"
         :style="$q.screen.lt.sm ? 'width: 75%;' : 'width: 65%;'"
         style="margin: 0px auto; padding-bottom: 2rem !important;">
         <q-bar class="my-dialog text-white q-pa-none"
            :style="$q.dark.isActive ? 'background: #2f2f2f' : 'background: #385562'" style="margin: auto;">

            <div :class="$q.dark.isActive ? 'dialog-form-header-dark' : 'dialog-form-header-light'">{{ props.name }}
            </div>

            <q-space />
         </q-bar>

         <q-separator spaced style="margin: 1.5rem 0;" />


         <div class="text-subtitle1 q-mb-sm" :class="$q.dark.isActive ? 'dialog-header-dark' : 'dialog-header-light'">
         </div>

         <div class="row q-col-gutter-md q-mb-md">

            <!-- ===================== 1. SS Entry Photo ===================== -->
            <div class="col-12">
               <div class="text-subtitle2 q-mb-sm"
                  :class="$q.dark.isActive ? 'dialog-subtitle-dark' : 'dialog-subtitle-light'">
                  SS Entry from outside with surroundings and SS name visible
               </div>

               <q-option-group v-model="form.ssEntryPhotoStatus" :options="doneNotDoneOptions" color="secondary" inline
                  dense :class="$q.dark.isActive ? 'dialog-field-label-dark' : 'dialog-field-label-light'" />
            </div>

            <!-- Photo + Remarks (only if Done) -->
            <template v-if="form.ssEntryPhotoStatus === 'Done'">
               <div class="col-12 col-sm-6">
                  <q-file outlined accept="image/*" v-model="form.ssEntryPhoto" label="Upload SS Entry Photo" clearable>
                     <template #prepend>
                        <q-icon name="image" />
                     </template>
                  </q-file>
               </div>

               <div class="col-12 col-sm-6">
                  <q-input outlined type="textarea" autogrow label="Remarks" v-model="form.ssEntryPhotoRemarks" />
               </div>
            </template>

            <!-- ===================== 2. GPS Coordinates Screenshot ===================== -->
            <div class="col-12 q-mt-md">
               <div class="text-subtitle2 q-mb-sm"
                  :class="$q.dark.isActive ? 'dialog-subtitle-dark' : 'dialog-subtitle-light'">
                  GPS Coordinates Screenshot
               </div>

               <q-option-group v-model="form.gpsScreenshotStatus" :options="doneNotDoneOptions" color="secondary" inline
                  dense :class="$q.dark.isActive ? 'dialog-field-label-dark' : 'dialog-field-label-light'" />
            </div>

            <!-- Photo + Remarks (only if Done) -->
            <template v-if="form.gpsScreenshotStatus === 'Done'">
               <div class="col-12 col-sm-6">
                  <q-file outlined accept="image/*" v-model="form.gpsScreenshotPhoto" label="Upload GPS Screenshot"
                     clearable>
                     <template #prepend>
                        <q-icon name="image" />
                     </template>
                  </q-file>
               </div>

               <div class="col-12 col-sm-6">
                  <q-input outlined type="textarea" autogrow label="Remarks" v-model="form.gpsScreenshotRemarks" />
               </div>
            </template>

            <!-- ===================== 1. Existing RTU Panels front view ===================== -->
            <div class="col-12">
               <div class="text-subtitle2 q-mb-sm"
                  :class="$q.dark.isActive ? 'dialog-subtitle-dark' : 'dialog-subtitle-light'">
                  Existing RTU Panels front view
               </div>

               <q-option-group v-model="form.rtuFrontViewStatus" :options="doneNotDoneOptions" color="secondary" inline
                  dense :class="$q.dark.isActive ? 'dialog-field-label-dark' : 'dialog-field-label-light'" />
            </div>

            <!-- Photo + Remarks (only if Done) -->
            <template v-if="form.rtuFrontViewStatus === 'Done'">
               <div class="col-12 col-sm-6">
                  <q-file outlined accept="image/*" v-model="form.rtuFrontViewPhoto" label="Upload RTU Front View Photo"
                     clearable>
                     <template #prepend>
                        <q-icon name="image" />
                     </template>
                  </q-file>
               </div>

               <div class="col-12 col-sm-6">
                  <q-input outlined type="textarea" autogrow label="Remarks" v-model="form.rtuFrontViewRemarks" />
               </div>
            </template>

            <!-- ===================== 2. Existing RTU Panels side view ===================== -->
            <div class="col-12 q-mt-md">
               <div class="text-subtitle2 q-mb-sm"
                  :class="$q.dark.isActive ? 'dialog-subtitle-dark' : 'dialog-subtitle-light'">
                  Existing RTU Panels side view
               </div>

               <q-option-group v-model="form.rtuSideViewStatus" :options="doneNotDoneOptions" color="secondary" inline
                  dense :class="$q.dark.isActive ? 'dialog-field-label-dark' : 'dialog-field-label-light'" />
            </div>

            <!-- Photo + Remarks (only if Done) -->
            <template v-if="form.rtuSideViewStatus === 'Done'">
               <div class="col-12 col-sm-6">
                  <q-file outlined accept="image/*" v-model="form.rtuSideViewPhoto" label="Upload RTU Side View Photo"
                     clearable>
                     <template #prepend>
                        <q-icon name="image" />
                     </template>
                  </q-file>
               </div>

               <div class="col-12 col-sm-6">
                  <q-input outlined type="textarea" autogrow label="Remarks" v-model="form.rtuSideViewRemarks" />
               </div>
            </template>


            <!-- ===================== 1. High gain antenna Location ===================== -->
            <div class="col-12">
               <div class="text-subtitle2 q-mb-sm"
                  :class="$q.dark.isActive ? 'dialog-subtitle-dark' : 'dialog-subtitle-light'">
                  High gain antenna Location
               </div>

               <q-option-group v-model="form.highGainAntennaStatus" :options="doneNotDoneOptions" color="secondary"
                  inline dense :class="$q.dark.isActive ? 'dialog-field-label-dark' : 'dialog-field-label-light'" />
            </div>

            <!-- Photo + Remarks (only if Done) -->
            <template v-if="form.highGainAntennaStatus === 'Done'">
               <div class="col-12 col-sm-6">
                  <q-file outlined accept="image/*" v-model="form.highGainAntennaPhoto"
                     label="Upload High Gain Antenna Photo" clearable>
                     <template #prepend>
                        <q-icon name="image" />
                     </template>
                  </q-file>
               </div>

               <div class="col-12 col-sm-6">
                  <q-input outlined type="textarea" autogrow label="Remarks" v-model="form.highGainAntennaRemarks" />
               </div>
            </template>

            <!-- ===================== 2. Network switch (if available) ===================== -->
            <div class="col-12 q-mt-md">
               <div class="text-subtitle2 q-mb-sm"
                  :class="$q.dark.isActive ? 'dialog-subtitle-dark' : 'dialog-subtitle-light'">
                  Network switch (if available)
               </div>

               <q-option-group v-model="form.networkSwitchStatus" :options="doneNotDoneOptions" color="secondary" inline
                  dense :class="$q.dark.isActive ? 'dialog-field-label-dark' : 'dialog-field-label-light'" />
            </div>

            <!-- Photo + Remarks (only if Done) -->
            <template v-if="form.networkSwitchStatus === 'Done'">
               <div class="col-12 col-sm-6">
                  <q-file outlined accept="image/*" v-model="form.networkSwitchPhoto"
                     label="Upload Network Switch Photo" clearable>
                     <template #prepend>
                        <q-icon name="image" />
                     </template>
                  </q-file>
               </div>

               <div class="col-12 col-sm-6">
                  <q-input outlined type="textarea" autogrow label="Remarks" v-model="form.networkSwitchRemarks" />
               </div>
            </template>

            <!-- ===================== 1. Transformer Name Plate Photo ===================== -->
            <div class="col-12">
               <div class="text-subtitle2 q-mb-sm"
                  :class="$q.dark.isActive ? 'dialog-subtitle-dark' : 'dialog-subtitle-light'">
                  Transformer Name Plate Photo

               </div>

               <q-option-group v-model="form.transformerNamePlateStatus" :options="doneNotDoneOptions" color="secondary"
                  inline dense :class="$q.dark.isActive ? 'dialog-field-label-dark' : 'dialog-field-label-light'" />
            </div>

            <!-- Photo + Remarks (only if Done) -->
            <template v-if="form.transformerNamePlateStatus === 'Done'">
               <div class="col-12 col-sm-6">
                  <q-file outlined accept="image/*" v-model="form.transformerNamePlatePhoto"
                     label="Upload Transformer Name Plate Photo" clearable>
                     <template #prepend>
                        <q-icon name="image" />
                     </template>
                  </q-file>
               </div>

               <div class="col-12 col-sm-6">
                  <q-input outlined type="textarea" autogrow label="Remarks"
                     v-model="form.transformerNamePlateRemarks" />
               </div>
            </template>

            <!-- ===================== 2. CB Name Plate Photo ===================== -->
            <div class="col-12 q-mt-md">
               <div class="text-subtitle2 q-mb-sm"
                  :class="$q.dark.isActive ? 'dialog-subtitle-dark' : 'dialog-subtitle-light'">
                  CB Name Plate Photo
               </div>

               <q-option-group v-model="form.cbNamePlateStatus" :options="doneNotDoneOptions" color="secondary" inline
                  dense :class="$q.dark.isActive ? 'dialog-field-label-dark' : 'dialog-field-label-light'" />
            </div>

            <!-- Photo + Remarks (only if Done) -->
            <template v-if="form.cbNamePlateStatus === 'Done'">
               <div class="col-12 col-sm-6">
                  <q-file outlined accept="image/*" v-model="form.cbNamePlatePhoto" label="Upload CB Name Plate Photo"
                     clearable>
                     <template #prepend>
                        <q-icon name="image" />
                     </template>
                  </q-file>
               </div>

               <div class="col-12 col-sm-6">
                  <q-input outlined type="textarea" autogrow label="Remarks" v-model="form.cbNamePlateRemarks" />
               </div>
            </template>

            <!-- ===================== 1. Location Of MFT in feeder Panel after marking ===================== -->
            <div class="col-12">
               <div class="text-subtitle2 q-mb-sm"
                  :class="$q.dark.isActive ? 'dialog-subtitle-dark' : 'dialog-subtitle-light'">
                  Location Of MFT in feeder Panel after marking

               </div>

               <q-option-group v-model="form.mftLocationStatus" :options="doneNotDoneOptions" color="secondary" inline
                  dense :class="$q.dark.isActive ? 'dialog-field-label-dark' : 'dialog-field-label-light'" />
            </div>

            <!-- Photo + Remarks (only if Done) -->
            <template v-if="form.mftLocationStatus === 'Done'">
               <div class="col-12 col-sm-6">
                  <q-file outlined accept="image/*" v-model="form.mftLocationPhoto" label="Upload MFT Location Photo"
                     clearable>
                     <template #prepend>
                        <q-icon name="image" />
                     </template>
                  </q-file>
               </div>

               <div class="col-12 col-sm-6">
                  <q-input outlined type="textarea" autogrow label="Remarks" v-model="form.mftLocationRemarks" />
               </div>
            </template>

            <!-- ===================== 2. Location Of FDI in feeder Panel after marking ===================== -->
            <div class="col-12 q-mt-md">
               <div class="text-subtitle2 q-mb-sm"
                  :class="$q.dark.isActive ? 'dialog-subtitle-dark' : 'dialog-subtitle-light'">
                  Location Of FDI in feeder Panel after marking
               </div>

               <q-option-group v-model="form.fdiLocationStatus" :options="doneNotDoneOptions" color="secondary" inline
                  dense :class="$q.dark.isActive ? 'dialog-field-label-dark' : 'dialog-field-label-light'" />
            </div>

            <!-- Photo + Remarks (only if Done) -->
            <template v-if="form.fdiLocationStatus === 'Done'">
               <div class="col-12 col-sm-6">
                  <q-file outlined accept="image/*" v-model="form.fdiLocationPhoto" label="Upload FDI Location Photo"
                     clearable>
                     <template #prepend>
                        <q-icon name="image" />
                     </template>
                  </q-file>
               </div>

               <div class="col-12 col-sm-6">
                  <q-input outlined type="textarea" autogrow label="Remarks" v-model="form.fdiLocationRemarks" />
               </div>
            </template>

            <!-- ===================== 3. Location Of CMR in feeder Panel after marking ===================== -->
            <div class="col-12 q-mt-md">
               <div class="text-subtitle2 q-mb-sm"
                  :class="$q.dark.isActive ? 'dialog-subtitle-dark' : 'dialog-subtitle-light'">
                  Location Of CMR in feeder Panel after marking
               </div>

               <q-option-group v-model="form.cmrLocationStatus" :options="doneNotDoneOptions" color="secondary" inline
                  dense :class="$q.dark.isActive ? 'dialog-field-label-dark' : 'dialog-field-label-light'" />
            </div>

            <!-- Photo + Remarks (only if Done) -->
            <template v-if="form.cmrLocationStatus === 'Done'">
               <div class="col-12 col-sm-6">
                  <q-file outlined accept="image/*" v-model="form.cmrLocationPhoto" label="Upload CMR Location Photo"
                     clearable>
                     <template #prepend>
                        <q-icon name="image" />
                     </template>
                  </q-file>
               </div>

               <div class="col-12 col-sm-6">
                  <q-input outlined type="textarea" autogrow label="Remarks" v-model="form.cmrLocationRemarks" />
               </div>
            </template>

            <!-- ===================== 4. Location Of HDR in feeder Panel after marking ===================== -->
            <div class="col-12 q-mt-md">
               <div class="text-subtitle2 q-mb-sm"
                  :class="$q.dark.isActive ? 'dialog-subtitle-dark' : 'dialog-subtitle-light'">
                  Location Of HDR in feeder Panel after marking
               </div>

               <q-option-group v-model="form.hdrLocationStatus" :options="doneNotDoneOptions" color="secondary" inline
                  dense :class="$q.dark.isActive ? 'dialog-field-label-dark' : 'dialog-field-label-light'" />
            </div>

            <!-- Photo + Remarks (only if Done) -->
            <template v-if="form.hdrLocationStatus === 'Done'">
               <div class="col-12 col-sm-6">
                  <q-file outlined accept="image/*" v-model="form.hdrLocationPhoto" label="Upload HDR Location Photo"
                     clearable>
                     <template #prepend>
                        <q-icon name="image" />
                     </template>
                  </q-file>
               </div>

               <div class="col-12 col-sm-6">
                  <q-input outlined type="textarea" autogrow label="Remarks" v-model="form.hdrLocationRemarks" />
               </div>
            </template>


            <!-- ===================== 1. Panels Line up-1 Photo ===================== -->
            <div class="col-12">
               <div class="text-subtitle2 q-mb-sm"
                  :class="$q.dark.isActive ? 'dialog-subtitle-dark' : 'dialog-subtitle-light'">
                  Panels Line up-1 Photo

               </div>

               <q-option-group v-model="form.panelLineup1Status" :options="doneNotDoneOptions" color="secondary" inline
                  dense :class="$q.dark.isActive ? 'dialog-field-label-dark' : 'dialog-field-label-light'" />
            </div>

            <!-- Photo + Remarks (only if Done) -->
            <template v-if="form.panelLineup1Status === 'Done'">
               <div class="col-12 col-sm-6">
                  <q-file outlined accept="image/*" v-model="form.panelLineup1Photo" label="Upload Panel Lineup-1 Photo"
                     clearable>
                     <template #prepend>
                        <q-icon name="image" />
                     </template>
                  </q-file>
               </div>

               <div class="col-12 col-sm-6">
                  <q-input outlined type="textarea" autogrow label="Remarks" v-model="form.panelLineup1Remarks" />
               </div>
            </template>

            <!-- ===================== 2. Panels Line up-2 Photo ===================== -->
            <div class="col-12 q-mt-md">
               <div class="text-subtitle2 q-mb-sm"
                  :class="$q.dark.isActive ? 'dialog-subtitle-dark' : 'dialog-subtitle-light'">
                  Panels Line up-2 Photo
               </div>

               <q-option-group v-model="form.panelLineup2Status" :options="doneNotDoneOptions" color="secondary" inline
                  dense :class="$q.dark.isActive ? 'dialog-field-label-dark' : 'dialog-field-label-light'" />
            </div>

            <!-- Photo + Remarks (only if Done) -->
            <template v-if="form.panelLineup2Status === 'Done'">
               <div class="col-12 col-sm-6">
                  <q-file outlined accept="image/*" v-model="form.panelLineup2Photo" label="Upload Panel Lineup-2 Photo"
                     clearable>
                     <template #prepend>
                        <q-icon name="image" />
                     </template>
                  </q-file>
               </div>

               <div class="col-12 col-sm-6">
                  <q-input outlined type="textarea" autogrow label="Remarks" v-model="form.panelLineup2Remarks" />
               </div>
            </template>

            <!-- ===================== 3. Panels Line up-3 Photo ===================== -->
            <div class="col-12 q-mt-md">
               <div class="text-subtitle2 q-mb-sm"
                  :class="$q.dark.isActive ? 'dialog-subtitle-dark' : 'dialog-subtitle-light'">
                  Panels Line up-3 Photo
               </div>

               <q-option-group v-model="form.panelLineup3Status" :options="doneNotDoneOptions" color="secondary" inline
                  dense :class="$q.dark.isActive ? 'dialog-field-label-dark' : 'dialog-field-label-light'" />
            </div>

            <!-- Photo + Remarks (only if Done) -->
            <template v-if="form.panelLineup3Status === 'Done'">
               <div class="col-12 col-sm-6">
                  <q-file outlined accept="image/*" v-model="form.panelLineup3Photo" label="Upload Panel Lineup-3 Photo"
                     clearable>
                     <template #prepend>
                        <q-icon name="image" />
                     </template>
                  </q-file>
               </div>

               <div class="col-12 col-sm-6">
                  <q-input outlined type="textarea" autogrow label="Remarks" v-model="form.panelLineup3Remarks" />
               </div>
            </template>

            <!-- ===================== 4. Panels Line up-4 Photo ===================== -->
            <div class="col-12 q-mt-md">
               <div class="text-subtitle2 q-mb-sm"
                  :class="$q.dark.isActive ? 'dialog-subtitle-dark' : 'dialog-subtitle-light'">
                  Panels Line up-4 Photo
               </div>

               <q-option-group v-model="form.panelLineup4Status" :options="doneNotDoneOptions" color="secondary" inline
                  dense :class="$q.dark.isActive ? 'dialog-field-label-dark' : 'dialog-field-label-light'" />
            </div>

            <!-- Photo + Remarks (only if Done) -->
            <template v-if="form.panelLineup4Status === 'Done'">
               <div class="col-12 col-sm-6">
                  <q-file outlined accept="image/*" v-model="form.panelLineup4Photo" label="Upload Panel Lineup-4 Photo"
                     clearable>
                     <template #prepend>
                        <q-icon name="image" />
                     </template>
                  </q-file>
               </div>

               <div class="col-12 col-sm-6">
                  <q-input outlined type="textarea" autogrow label="Remarks" v-model="form.panelLineup4Remarks" />
               </div>
            </template>

            <!-- ===================== 5. Panels Line up-5 Photo ===================== -->
            <div class="col-12 q-mt-md">
               <div class="text-subtitle2 q-mb-sm"
                  :class="$q.dark.isActive ? 'dialog-subtitle-dark' : 'dialog-subtitle-light'">
                  Panels Line up-5 Photo
               </div>

               <q-option-group v-model="form.panelLineup5Status" :options="doneNotDoneOptions" color="secondary" inline
                  dense :class="$q.dark.isActive ? 'dialog-field-label-dark' : 'dialog-field-label-light'" />
            </div>

            <!-- Photo + Remarks (only if Done) -->
            <template v-if="form.panelLineup5Status === 'Done'">
               <div class="col-12 col-sm-6">
                  <q-file outlined accept="image/*" v-model="form.panelLineup5Photo" label="Upload Panel Lineup-5 Photo"
                     clearable>
                     <template #prepend>
                        <q-icon name="image" />
                     </template>
                  </q-file>
               </div>

               <div class="col-12 col-sm-6">
                  <q-input outlined type="textarea" autogrow label="Remarks" v-model="form.panelLineup5Remarks" />
               </div>
            </template>

            <!-- ===================== 6. Panels Line up-6 Photo ===================== -->
            <div class="col-12 q-mt-md">
               <div class="text-subtitle2 q-mb-sm"
                  :class="$q.dark.isActive ? 'dialog-subtitle-dark' : 'dialog-subtitle-light'">
                  Panels Line up-6 Photo
               </div>

               <q-option-group v-model="form.panelLineup6Status" :options="doneNotDoneOptions" color="secondary" inline
                  dense :class="$q.dark.isActive ? 'dialog-field-label-dark' : 'dialog-field-label-light'" />
            </div>

            <!-- Photo + Remarks (only if Done) -->
            <template v-if="form.panelLineup6Status === 'Done'">
               <div class="col-12 col-sm-6">
                  <q-file outlined accept="image/*" v-model="form.panelLineup6Photo" label="Upload Panel Lineup-6 Photo"
                     clearable>
                     <template #prepend>
                        <q-icon name="image" />
                     </template>
                  </q-file>
               </div>

               <div class="col-12 col-sm-6">
                  <q-input outlined type="textarea" autogrow label="Remarks" v-model="form.panelLineup6Remarks" />
               </div>
            </template>

            <!-- ===================== 1. Tap Transducer location Photo for XFMR-1 ===================== -->
            <div class="col-12">
               <div class="text-subtitle2 q-mb-sm"
                  :class="$q.dark.isActive ? 'dialog-subtitle-dark' : 'dialog-subtitle-light'">
                  Tap Transducer location Photo for XFMR-1

               </div>

               <q-option-group v-model="form.tapTransducerXfmr1Status" :options="doneNotDoneOptions" color="secondary"
                  inline dense :class="$q.dark.isActive ? 'dialog-field-label-dark' : 'dialog-field-label-light'" />
            </div>

            <!-- Photo + Remarks (only if Done) -->
            <template v-if="form.tapTransducerXfmr1Status === 'Done'">
               <div class="col-12 col-sm-6">
                  <q-file outlined accept="image/*" v-model="form.tapTransducerXfmr1Photo"
                     label="Upload Tap Transducer XFMR-1 Photo" clearable>
                     <template #prepend>
                        <q-icon name="image" />
                     </template>
                  </q-file>
               </div>

               <div class="col-12 col-sm-6">
                  <q-input outlined type="textarea" autogrow label="Remarks" v-model="form.tapTransducerXfmr1Remarks" />
               </div>
            </template>

            <!-- ===================== 2. Tap Transducer location Photo for XFMR-2 ===================== -->
            <div class="col-12 q-mt-md">
               <div class="text-subtitle2 q-mb-sm"
                  :class="$q.dark.isActive ? 'dialog-subtitle-dark' : 'dialog-subtitle-light'">
                  Tap Transducer location Photo for XFMR-2
               </div>

               <q-option-group v-model="form.tapTransducerXfmr2Status" :options="doneNotDoneOptions" color="secondary"
                  inline dense :class="$q.dark.isActive ? 'dialog-field-label-dark' : 'dialog-field-label-light'" />
            </div>

            <!-- Photo + Remarks (only if Done) -->
            <template v-if="form.tapTransducerXfmr2Status === 'Done'">
               <div class="col-12 col-sm-6">
                  <q-file outlined accept="image/*" v-model="form.tapTransducerXfmr2Photo"
                     label="Upload Tap Transducer XFMR-2 Photo" clearable>
                     <template #prepend>
                        <q-icon name="image" />
                     </template>
                  </q-file>
               </div>

               <div class="col-12 col-sm-6">
                  <q-input outlined type="textarea" autogrow label="Remarks" v-model="form.tapTransducerXfmr2Remarks" />
               </div>
            </template>

            <!-- ===================== 3. Tap Transducer location Photo for XFMR-3 ===================== -->
            <div class="col-12 q-mt-md">
               <div class="text-subtitle2 q-mb-sm"
                  :class="$q.dark.isActive ? 'dialog-subtitle-dark' : 'dialog-subtitle-light'">
                  Tap Transducer location Photo for XFMR-3
               </div>

               <q-option-group v-model="form.tapTransducerXfmr3Status" :options="doneNotDoneOptions" color="secondary"
                  inline dense :class="$q.dark.isActive ? 'dialog-field-label-dark' : 'dialog-field-label-light'" />
            </div>

            <!-- Photo + Remarks (only if Done) -->
            <template v-if="form.tapTransducerXfmr3Status === 'Done'">
               <div class="col-12 col-sm-6">
                  <q-file outlined accept="image/*" v-model="form.tapTransducerXfmr3Photo"
                     label="Upload Tap Transducer XFMR-3 Photo" clearable>
                     <template #prepend>
                        <q-icon name="image" />
                     </template>
                  </q-file>
               </div>

               <div class="col-12 col-sm-6">
                  <q-input outlined type="textarea" autogrow label="Remarks" v-model="form.tapTransducerXfmr3Remarks" />
               </div>
            </template>

            <!-- ===================== 4. Tap Transducer location Photo for XFMR-4 ===================== -->
            <div class="col-12 q-mt-md">
               <div class="text-subtitle2 q-mb-sm"
                  :class="$q.dark.isActive ? 'dialog-subtitle-dark' : 'dialog-subtitle-light'">
                  Tap Transducer location Photo for XFMR-4
               </div>

               <q-option-group v-model="form.tapTransducerXfmr4Status" :options="doneNotDoneOptions" color="secondary"
                  inline dense :class="$q.dark.isActive ? 'dialog-field-label-dark' : 'dialog-field-label-light'" />
            </div>

            <!-- Photo + Remarks (only if Done) -->
            <template v-if="form.tapTransducerXfmr4Status === 'Done'">
               <div class="col-12 col-sm-6">
                  <q-file outlined accept="image/*" v-model="form.tapTransducerXfmr4Photo"
                     label="Upload Tap Transducer XFMR-4 Photo" clearable>
                     <template #prepend>
                        <q-icon name="image" />
                     </template>
                  </q-file>
               </div>

               <div class="col-12 col-sm-6">
                  <q-input outlined type="textarea" autogrow label="Remarks" v-model="form.tapTransducerXfmr4Remarks" />
               </div>
            </template>

            <!-- ===================== 1. Individual Feeder/TRF panel full front view photo ===================== -->
            <div class="col-12">
               <div class="text-subtitle2 q-mb-sm"
                  :class="$q.dark.isActive ? 'dialog-subtitle-dark' : 'dialog-subtitle-light'">
                  Individual Feeder/TRF panel full front view photo
               </div>

               <q-option-group v-model="form.feederPanelFrontStatus" :options="doneNotDoneOptions" color="secondary"
                  inline dense :class="$q.dark.isActive ? 'dialog-field-label-dark' : 'dialog-field-label-light'" />
            </div>

            <!-- Photo + Remarks (only if Done) -->
            <template v-if="form.feederPanelFrontStatus === 'Done'">
               <div class="col-12 col-sm-6">
                  <q-file outlined accept="image/*" v-model="form.feederPanelFrontPhoto"
                     label="Upload Feeder Panel Front View Photo" clearable>
                     <template #prepend>
                        <q-icon name="image" />
                     </template>
                  </q-file>
               </div>

               <div class="col-12 col-sm-6">
                  <q-input outlined type="textarea" autogrow label="Remarks" v-model="form.feederPanelFrontRemarks" />
               </div>
            </template>

            <!-- ===================== 66KV Capacitor Bank Photo ===================== -->
            <div class="col-12">
               <div class="text-subtitle2 q-mb-sm"
                  :class="$q.dark.isActive ? 'dialog-subtitle-dark' : 'dialog-subtitle-light'">
                  66KV Capacitor Bank Photo
               </div>

               <q-option-group v-model="form.capBank66Status" :options="doneNotDoneOptions" color="secondary" inline
                  dense :class="$q.dark.isActive ? 'dialog-field-label-dark' : 'dialog-field-label-light'" />
            </div>

            <template v-if="form.capBank66Status === 'Done'">
               <div class="col-12 col-sm-6">
                  <q-file outlined accept="image/*" v-model="form.capBank66Photo"
                     label="Upload 66KV Capacitor Bank Photo" clearable>
                     <template #prepend>
                        <q-icon name="image" />
                     </template>
                  </q-file>
               </div>

               <div class="col-12 col-sm-6">
                  <q-input outlined type="textarea" autogrow label="Remarks" v-model="form.capBank66Remarks" />
               </div>
            </template>

            <!-- ===================== 66KV Battery Charger Photo ===================== -->
            <div class="col-12">
               <div class="text-subtitle2 q-mb-sm"
                  :class="$q.dark.isActive ? 'dialog-subtitle-dark' : 'dialog-subtitle-light'">
                  66KV Battery Charger Photo
               </div>

               <q-option-group v-model="form.batteryCharger66Status" :options="doneNotDoneOptions" color="secondary"
                  inline dense :class="$q.dark.isActive ? 'dialog-field-label-dark' : 'dialog-field-label-light'" />
            </div>

            <template v-if="form.batteryCharger66Status === 'Done'">
               <div class="col-12 col-sm-6">
                  <q-file outlined accept="image/*" v-model="form.batteryCharger66Photo"
                     label="Upload 66KV Battery Charger Photo" clearable>
                     <template #prepend>
                        <q-icon name="image" />
                     </template>
                  </q-file>
               </div>

               <div class="col-12 col-sm-6">
                  <q-input outlined type="textarea" autogrow label="Remarks" v-model="form.batteryCharger66Remarks" />
               </div>
            </template>

            <!-- ===================== 66KV Battery Bank Photo ===================== -->
            <div class="col-12">
               <div class="text-subtitle2 q-mb-sm"
                  :class="$q.dark.isActive ? 'dialog-subtitle-dark' : 'dialog-subtitle-light'">
                  66KV Battery Bank Photo
               </div>

               <q-option-group v-model="form.batteryBank66Status" :options="doneNotDoneOptions" color="secondary" inline
                  dense :class="$q.dark.isActive ? 'dialog-field-label-dark' : 'dialog-field-label-light'" />
            </div>

            <template v-if="form.batteryBank66Status === 'Done'">
               <div class="col-12 col-sm-6">
                  <q-file outlined accept="image/*" v-model="form.batteryBank66Photo"
                     label="Upload 66KV Battery Bank Photo" clearable>
                     <template #prepend>
                        <q-icon name="image" />
                     </template>
                  </q-file>
               </div>

               <div class="col-12 col-sm-6">
                  <q-input outlined type="textarea" autogrow label="Remarks" v-model="form.batteryBank66Remarks" />
               </div>
            </template>

            <!-- ===================== 33KV Capacitor Bank Photo ===================== -->
            <div class="col-12">
               <div class="text-subtitle2 q-mb-sm"
                  :class="$q.dark.isActive ? 'dialog-subtitle-dark' : 'dialog-subtitle-light'">
                  33KV Capacitor Bank Photo
               </div>

               <q-option-group v-model="form.capBank33Status" :options="doneNotDoneOptions" color="secondary" inline
                  dense :class="$q.dark.isActive ? 'dialog-field-label-dark' : 'dialog-field-label-light'" />
            </div>

            <template v-if="form.capBank33Status === 'Done'">
               <div class="col-12 col-sm-6">
                  <q-file outlined accept="image/*" v-model="form.capBank33Photo"
                     label="Upload 33KV Capacitor Bank Photo" clearable>
                     <template #prepend>
                        <q-icon name="image" />
                     </template>
                  </q-file>
               </div>

               <div class="col-12 col-sm-6">
                  <q-input outlined type="textarea" autogrow label="Remarks" v-model="form.capBank33Remarks" />
               </div>
            </template>

            <!-- ===================== 33KV Battery Charger Photo ===================== -->
            <div class="col-12">
               <div class="text-subtitle2 q-mb-sm"
                  :class="$q.dark.isActive ? 'dialog-subtitle-dark' : 'dialog-subtitle-light'">
                  33KV Battery Charger Photo
               </div>

               <q-option-group v-model="form.batteryCharger33Status" :options="doneNotDoneOptions" color="secondary"
                  inline dense :class="$q.dark.isActive ? 'dialog-field-label-dark' : 'dialog-field-label-light'" />
            </div>

            <template v-if="form.batteryCharger33Status === 'Done'">
               <div class="col-12 col-sm-6">
                  <q-file outlined accept="image/*" v-model="form.batteryCharger33Photo"
                     label="Upload 33KV Battery Charger Photo" clearable>
                     <template #prepend>
                        <q-icon name="image" />
                     </template>
                  </q-file>
               </div>

               <div class="col-12 col-sm-6">
                  <q-input outlined type="textarea" autogrow label="Remarks" v-model="form.batteryCharger33Remarks" />
               </div>
            </template>



            <!-- ===================== 33KV Battery Bank Photo ===================== -->
            <div class="col-12">
               <div class="text-subtitle2 q-mb-sm"
                  :class="$q.dark.isActive ? 'dialog-subtitle-dark' : 'dialog-subtitle-light'">
                  33KV Battery Bank Photo
               </div>

               <q-option-group v-model="form.batteryBank33Status" :options="doneNotDoneOptions" color="secondary" inline
                  dense :class="$q.dark.isActive ? 'dialog-field-label-dark' : 'dialog-field-label-light'" />
            </div>

            <template v-if="form.batteryBank33Status === 'Done'">
               <div class="col-12 col-sm-6">
                  <q-file outlined accept="image/*" v-model="form.batteryBank33Photo"
                     label="Upload 33KV Battery Bank Photo" clearable>
                     <template #prepend>
                        <q-icon name="image" />
                     </template>
                  </q-file>
               </div>

               <div class="col-12 col-sm-6">
                  <q-input outlined type="textarea" autogrow label="Remarks" v-model="form.batteryBank33Remarks" />
               </div>
            </template>



            <!-- ===================== 11KV Capacitor Bank Photo ===================== -->
            <div class="col-12">
               <div class="text-subtitle2 q-mb-sm"
                  :class="$q.dark.isActive ? 'dialog-subtitle-dark' : 'dialog-subtitle-light'">
                  11KV Capacitor Bank Photo
               </div>

               <q-option-group v-model="form.capBank11Status" :options="doneNotDoneOptions" color="secondary" inline
                  dense :class="$q.dark.isActive ? 'dialog-field-label-dark' : 'dialog-field-label-light'" />
            </div>

            <template v-if="form.capBank11Status === 'Done'">
               <div class="col-12 col-sm-6">
                  <q-file outlined accept="image/*" v-model="form.capBank11Photo"
                     label="Upload 11KV Capacitor Bank Photo" clearable>
                     <template #prepend>
                        <q-icon name="image" />
                     </template>
                  </q-file>
               </div>

               <div class="col-12 col-sm-6">
                  <q-input outlined type="textarea" autogrow label="Remarks" v-model="form.capBank11Remarks" />
               </div>
            </template>



            <!-- ===================== 11KV Battery Charger Photo ===================== -->
            <div class="col-12">
               <div class="text-subtitle2 q-mb-sm"
                  :class="$q.dark.isActive ? 'dialog-subtitle-dark' : 'dialog-subtitle-light'">
                  11KV Battery Charger Photo
               </div>

               <q-option-group v-model="form.batteryCharger11Status" :options="doneNotDoneOptions" color="secondary"
                  inline dense :class="$q.dark.isActive ? 'dialog-field-label-dark' : 'dialog-field-label-light'" />
            </div>

            <template v-if="form.batteryCharger11Status === 'Done'">
               <div class="col-12 col-sm-6">
                  <q-file outlined accept="image/*" v-model="form.batteryCharger11Photo"
                     label="Upload 11KV Battery Charger Photo" clearable>
                     <template #prepend>
                        <q-icon name="image" />
                     </template>
                  </q-file>
               </div>

               <div class="col-12 col-sm-6">
                  <q-input outlined type="textarea" autogrow label="Remarks" v-model="form.batteryCharger11Remarks" />
               </div>
            </template>



            <!-- ===================== 11KV Battery Bank Photo ===================== -->
            <div class="col-12">
               <div class="text-subtitle2 q-mb-sm"
                  :class="$q.dark.isActive ? 'dialog-subtitle-dark' : 'dialog-subtitle-light'">
                  11KV Battery Bank Photo
               </div>

               <q-option-group v-model="form.batteryBank11Status" :options="doneNotDoneOptions" color="secondary" inline
                  dense :class="$q.dark.isActive ? 'dialog-field-label-dark' : 'dialog-field-label-light'" />
            </div>

            <template v-if="form.batteryBank11Status === 'Done'">
               <div class="col-12 col-sm-6">
                  <q-file outlined accept="image/*" v-model="form.batteryBank11Photo"
                     label="Upload 11KV Battery Bank Photo" clearable>
                     <template #prepend>
                        <q-icon name="image" />
                     </template>
                  </q-file>
               </div>

               <div class="col-12 col-sm-6">
                  <q-input outlined type="textarea" autogrow label="Remarks" v-model="form.batteryBank11Remarks" />
               </div>
            </template>



            <!-- ===================== Numerical Relays Photo ===================== -->
            <div class="col-12">
               <div class="text-subtitle2 q-mb-sm"
                  :class="$q.dark.isActive ? 'dialog-subtitle-dark' : 'dialog-subtitle-light'">
                  Numerical Relays Photo
               </div>

               <q-option-group v-model="form.numericalRelayStatus" :options="doneNotDoneOptions" color="secondary"
                  inline dense :class="$q.dark.isActive ? 'dialog-field-label-dark' : 'dialog-field-label-light'" />
            </div>

            <template v-if="form.numericalRelayStatus === 'Done'">
               <div class="col-12 col-sm-6">
                  <q-file outlined accept="image/*" v-model="form.numericalRelayPhoto"
                     label="Upload Numerical Relays Photo" clearable>
                     <template #prepend>
                        <q-icon name="image" />
                     </template>
                  </q-file>
               </div>

               <div class="col-12 col-sm-6">
                  <q-input outlined type="textarea" autogrow label="Remarks" v-model="form.numericalRelayRemarks" />
               </div>
            </template>



            <!-- ===================== Naming Convention Feeder ===================== -->
            <div class="col-12">
               <div class="text-subtitle2 q-mb-sm"
                  :class="$q.dark.isActive ? 'dialog-subtitle-dark' : 'dialog-subtitle-light'">
                  Naming Convention – Feeder
               </div>

               <q-option-group v-model="form.feederNamingStatus" :options="doneNotDoneOptions" color="secondary" inline
                  dense :class="$q.dark.isActive ? 'dialog-field-label-dark' : 'dialog-field-label-light'" />
            </div>

            <template v-if="form.feederNamingStatus === 'Done'">
               <div class="col-12 col-sm-6">
                  <q-file outlined accept="image/*" v-model="form.feederNamingPhoto" label="Upload Feeder Naming Photo"
                     clearable>
                     <template #prepend>
                        <q-icon name="image" />
                     </template>
                  </q-file>
               </div>

               <div class="col-12 col-sm-6">
                  <q-input outlined type="textarea" autogrow label="Remarks" v-model="form.feederNamingRemarks" />
               </div>
            </template>

         </div>


      </q-tab-panel>
   </q-card>

</template>

<script setup>
import { reactive } from 'vue'
import { useQuasar } from 'quasar'

const $q = useQuasar()

const props = defineProps(['name'])

const doneNotDoneOptions = [
   { label: 'Done', value: 'Done' },
   { label: 'Not Done', value: 'Not Done' }
]

const form = reactive({
   /* ===================== SS ENTRY & GPS ===================== */
   ssEntryPhotoStatus: '',
   ssEntryPhoto: null,
   ssEntryPhotoRemarks: '',

   gpsScreenshotStatus: '',
   gpsScreenshotPhoto: null,
   gpsScreenshotRemarks: '',

   /* ===================== RTU PANELS ===================== */
   rtuFrontViewStatus: '',
   rtuFrontViewPhoto: null,
   rtuFrontViewRemarks: '',

   rtuSideViewStatus: '',
   rtuSideViewPhoto: null,
   rtuSideViewRemarks: '',

   /* ===================== ANTENNA & NETWORK ===================== */
   highGainAntennaStatus: '',
   highGainAntennaPhoto: null,
   highGainAntennaRemarks: '',

   networkSwitchStatus: '',
   networkSwitchPhoto: null,
   networkSwitchRemarks: '',

   /* ===================== NAME PLATES ===================== */
   transformerNamePlateStatus: '',
   transformerNamePlatePhoto: null,
   transformerNamePlateRemarks: '',

   cbNamePlateStatus: '',
   cbNamePlatePhoto: null,
   cbNamePlateRemarks: '',

   /* ===================== FEEDER MARKINGS ===================== */
   mftLocationStatus: '',
   mftLocationPhoto: null,
   mftLocationRemarks: '',

   fdiLocationStatus: '',
   fdiLocationPhoto: null,
   fdiLocationRemarks: '',

   cmrLocationStatus: '',
   cmrLocationPhoto: null,
   cmrLocationRemarks: '',

   hdrLocationStatus: '',
   hdrLocationPhoto: null,
   hdrLocationRemarks: '',

   /* ===================== PANEL LINE UPS ===================== */
   panelLineup1Status: '',
   panelLineup1Photo: null,
   panelLineup1Remarks: '',

   panelLineup2Status: '',
   panelLineup2Photo: null,
   panelLineup2Remarks: '',

   panelLineup3Status: '',
   panelLineup3Photo: null,
   panelLineup3Remarks: '',

   panelLineup4Status: '',
   panelLineup4Photo: null,
   panelLineup4Remarks: '',

   panelLineup5Status: '',
   panelLineup5Photo: null,
   panelLineup5Remarks: '',

   panelLineup6Status: '',
   panelLineup6Photo: null,
   panelLineup6Remarks: '',

   /* ===================== TAP TRANSDUCER ===================== */
   tapTransducerXfmr1Status: '',
   tapTransducerXfmr1Photo: null,
   tapTransducerXfmr1Remarks: '',

   tapTransducerXfmr2Status: '',
   tapTransducerXfmr2Photo: null,
   tapTransducerXfmr2Remarks: '',

   tapTransducerXfmr3Status: '',
   tapTransducerXfmr3Photo: null,
   tapTransducerXfmr3Remarks: '',

   tapTransducerXfmr4Status: '',
   tapTransducerXfmr4Photo: null,
   tapTransducerXfmr4Remarks: '',

   /* ===================== FEEDER / TRF PANEL ===================== */
   feederPanelFrontStatus: '',
   feederPanelFrontPhoto: null,
   feederPanelFrontRemarks: '',

   /* ===================== 66KV YARD ===================== */
   capBank66Status: '',
   capBank66Photo: null,
   capBank66Remarks: '',

   batteryCharger66Status: '',
   batteryCharger66Photo: null,
   batteryCharger66Remarks: '',

   batteryBank66Status: '',
   batteryBank66Photo: null,
   batteryBank66Remarks: '',

   /* ===================== 33KV YARD ===================== */
   capBank33Status: '',
   capBank33Photo: null,
   capBank33Remarks: '',

   batteryCharger33Status: '',
   batteryCharger33Photo: null,
   batteryCharger33Remarks: '',

   batteryBank33Status: '',
   batteryBank33Photo: null,
   batteryBank33Remarks: '',

   /* ===================== 11KV YARD ===================== */
   capBank11Status: '',
   capBank11Photo: null,
   capBank11Remarks: '',

   batteryCharger11Status: '',
   batteryCharger11Photo: null,
   batteryCharger11Remarks: '',

   batteryBank11Status: '',
   batteryBank11Photo: null,
   batteryBank11Remarks: '',

   /* ===================== RELAYS & NAMING ===================== */
   numericalRelayStatus: '',
   numericalRelayPhoto: null,
   numericalRelayRemarks: '',

   feederNamingStatus: '',
   feederNamingPhoto: null,
   feederNamingRemarks: ''
})

</script>


<!-- <script setup>
import { reactive } from 'vue'

const props = defineProps(['name'])

const yesNoOptions = [
   { label: 'Yes', value: 'yes' },
   { label: 'No', value: 'no' }
]
const availNAOptions = [
   { label: 'Available', value: 'available' },
   { label: 'NA', value: 'na' }
]


// Form Data
const eventTypes = ['replacing meters', 'maintenance', 'emergency']
const outageTypes = ['Regular Outage', 'Planned Outage']

const form = reactive({
   civilWorkCompletion: '', mplsAvailable: 'no', highGainRequired: 'no', rtuHighGainDistance: '', highGainCableRoute: 'no',
   utilitiesAcAvailable: 'yes', dcVolt66: '', dcVolt33: '', dcVolt11: '', substationBatteryBank66kv: 'available'
   , shuntAvailable66kv: 'available'
})
</script> -->


<style scoped>
/* --- SCOPED STYLES (Colors, Buttons, Inputs) --- */
.bg-card-light {
   background: white;
   border: 1px solid #ccc;
}

.bg-card-dark {
   background: #1d1d1d;
   /* border: 2px solid #444; */
}

.dialog-header-light {
   color: #fff;
   font-weight: 500;
   font-size: 14px;
}

.dialog-header-dark {
   color: #e0e0e0;
   font-weight: 500;
   font-size: 14px;
}

.dialog-btn-light {
   color: #455a64;
}

.dialog-btn-dark {
   color: #bbb;
}

.dialog-btn-dark:hover {
   color: white;
   background: rgba(255, 255, 255, 0.1);
}

.dialog-subtitle-light {
   color: #385562;
}

.dialog-subtitle-dark {
   color: #81d4fa;
}

.dialog-field-label-light {
   color: #333;
}

.dialog-field-label-dark {
   color: #ccc;
}

:deep(.q-field__native) {
   padding-top: 5px;
}

:deep(.q-field--dense) .q-field__control {
   height: 1.6rem !important;
   background: transparent !important;
}

:deep(.q-field--auto-height).q-field--dense .q-field__control,
:deep(.q-field--auto-height.q-field--dense) .q-field__native {
   min-height: 1.6rem;
}

:deep(.q-field--dense .q-field__marginal) {
   height: 25px !important;
}

/* FIXED: Date Wrapper Styles for consistent icon placement on mobile */
.date-wrapper :deep(input) {
   display: block;
}

.date-wrapper.date-mode-light :deep(input) {
   color: #333 !important;
   color-scheme: light !important;
}

.date-wrapper.date-mode-light :deep(input::-webkit-calendar-picker-indicator) {
   filter: none !important;
   cursor: pointer;
   opacity: 0.8;
   /* Added to fix mobile view consistency */
   margin-left: auto;
   margin-right: 5px;
   display: block;
}

.date-wrapper.date-mode-dark :deep(input) {
   color: #f4f5f7 !important;
   color-scheme: dark !important;
}

.date-wrapper.date-mode-dark :deep(input::-webkit-calendar-picker-indicator) {
   filter: invert(1) !important;
   cursor: pointer;
   opacity: 0.8;
   /* Added to fix mobile view consistency */
   margin-left: auto;
   margin-right: 5px;
   display: block;
}

.date-wrapper :deep(input::-webkit-calendar-picker-indicator):hover {
   opacity: 1;
}

.custom-create-btn {
   background-color: transparent;
   color: #385562;
   border: 2px solid #385562;
   cursor: pointer;
   font-size: 14px;
   font-weight: 500;
   text-transform: uppercase;
   display: inline-flex;
   align-items: center;
   justify-content: center;
   transition: background-color 0.3s ease;
}

.custom-create-btn:hover {
   background-color: #1d2c33;
   border: 2px solid #385562;
   color: grey;
   font-weight: 500;
}
</style>

<style>
/* Active State: Controls the duration and curve */
.minimize-to-footer-leave-active {
   /* Use a cubic-bezier for a smooth 'suck' effect */
   transition: all 0.6s cubic-bezier(0.55, 0.085, 0.68, 0.53);
}

/* Ending State: Where the dialog goes */
.minimize-to-footer-leave-to {
   opacity: 0;
   transform: translate(-35vw, 48vh) scale(0.1) !important;
}
</style>