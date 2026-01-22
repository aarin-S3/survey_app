<template>
   <!-- <h3 :style="$q.screen.lt.sm ?  'margin-top: 15px; background-color: blue; line-height: 1.8rem; font-size: 1.4rem;' : ' margin-top: 20px; font-size: 1.6rem;'" style="text-align: center; " :class="$q.dark.isActive ? 'dialog-header-dark' : 'dialog-header-light'">{{ props.name }}</h3> -->
   <!-- <h3 style="text-align: center; margin-bottom: -30px;" :class="$q.dark.isActive ? 'dialog-header-dark' : 'dialog-header-light'">{{ props.name }}</h3> -->
   <q-card :class="[$q.dark.isActive ? 'background: #2f2f2f' : 'background: #385562']"
      :style="[{ height: $q.screen.lt.md ? 'calc(100vh - 160px)' : 'calc(100vh - 100px)', width: '100%', display: 'flex', flexDirection: 'column', border: 'none', boxShadow: 'none !important' }]">

       
      <q-tab-panel name="notification_details" class="q-pa-none" :style="$q.screen.lt.sm ? 'width: 75%;' : 'width: 65%;'" style="margin: 0px auto; padding-bottom: 2rem !important;">
         <q-bar class="my-dialog text-white q-pa-none" 
            :style="$q.dark.isActive ? 'background: #2f2f2f' : 'background: #385562'" style="margin: auto;">

            <div :class="$q.dark.isActive ? 'dialog-form-header-dark' : 'dialog-form-header-light'">{{ props.name }}</div>

            <q-space />
         </q-bar>

         <div class="text-subtitle2 q-mb-sm" style="margin-top: 2rem !important"
            :class="$q.dark.isActive ? 'dialog-subtitle-dark' : 'dialog-subtitle-light'">Indoor/Outdoor CIVIL Work
            Completion Status
         </div>
         <div class="row items-center q-mb-md">
            <div class="col-12">
               <q-input dense outlined v-model="form.civilWorkCompletion"
                  :class="$q.dark.isActive ? 'dialog-field-label-dark' : 'dialog-field-label-light'" />
            </div>
         </div>

         <q-separator spaced style="margin: 1.5rem 0;" />


         <div class="text-subtitle1 q-mb-sm" :class="$q.dark.isActive ? 'dialog-header-dark' : 'dialog-header-light'">
            Proposed location of
            Communication equipment Details
         </div>


         <div class="row q-col-gutter-md q-mb-md">

            <div class="col-12 col-sm-6">
               <div class="text-subtitle2 q-mb-sm"
                  :class="$q.dark.isActive ? 'dialog-subtitle-dark' : 'dialog-subtitle-light'">
                  MPLS Cable route available
               </div>
               <q-option-group v-model="form.mplsAvailable" :options="yesNoOptions" color="secondary" inline dense
                  :class="$q.dark.isActive ? 'dialog-field-label-dark' : 'dialog-field-label-light'" />
            </div>

            <div class="col-12 col-sm-6">
               <div class="text-subtitle2 q-mb-sm"
                  :class="$q.dark.isActive ? 'dialog-subtitle-dark' : 'dialog-subtitle-light'">
                  High Gain Antenna Required
               </div>
               <q-option-group v-model="form.highGainRequired" :options="yesNoOptions" color="secondary" inline dense
                  :class="$q.dark.isActive ? 'dialog-field-label-dark' : 'dialog-field-label-light'" />
            </div>

            <div class="col-12 col-sm-6">
               <div class="text-subtitle2 q-mb-sm"
                  :class="$q.dark.isActive ? 'dialog-subtitle-dark' : 'dialog-subtitle-light'">
                  Distance: RTU to High Gain Antenna
               </div>
               <q-input dense outlined v-model="form.rtuHighGainDistance" placeholder="Enter distance..."
                  :class="$q.dark.isActive ? 'dialog-field-label-dark' : 'dialog-field-label-light'" />
            </div>

            <div class="col-12 col-sm-6">
               <div class="text-subtitle2 q-mb-sm"
                  :class="$q.dark.isActive ? 'dialog-subtitle-dark' : 'dialog-subtitle-light'">
                  Cable route for High Gain Antenna
               </div>
               <q-option-group v-model="form.highGainCableRoute" :options="yesNoOptions" color="secondary" inline dense
                  :class="$q.dark.isActive ? 'dialog-field-label-dark' : 'dialog-field-label-light'" />
            </div>

         </div>

         <q-separator spaced style="margin: 1.5rem 0;" />

         <div class="text-subtitle1 q-mb-sm" :class="$q.dark.isActive ? 'dialog-header-dark' : 'dialog-header-light'">
            Station AC & DC (Battery Charger & ACDB) Supply Details: -
         </div>

         <div class="row q-col-gutter-md q-mb-md">

            <div class="col-12 col-sm-6">
               <div class="text-subtitle2 q-mb-sm"
                  :class="$q.dark.isActive ? 'dialog-subtitle-dark' : 'dialog-subtitle-light'">
                  230VAC for Utilities available
               </div>
               <q-option-group v-model="form.utilitiesAcAvailable" :options="yesNoOptions" color="secondary" inline
                  dense :class="$q.dark.isActive ? 'dialog-field-label-dark' : 'dialog-field-label-light'" />
            </div>

            <div class="col-12 col-sm-6">
               <div class="text-subtitle2 q-mb-sm"
                  :class="$q.dark.isActive ? 'dialog-subtitle-dark' : 'dialog-subtitle-light'">
                  DC Voltage for Breakers on 66kV
               </div>
               <q-input dense outlined v-model="form.dcVolt66" placeholder="Enter Voltage"
                  :class="$q.dark.isActive ? 'dialog-field-label-dark' : 'dialog-field-label-light'" />
            </div>

            <div class="col-12 col-sm-6">
               <div class="text-subtitle2 q-mb-sm"
                  :class="$q.dark.isActive ? 'dialog-subtitle-dark' : 'dialog-subtitle-light'">
                  DC Voltage for Breakers on 33kV
               </div>
               <q-input dense outlined v-model="form.dcVolt33" placeholder="Enter Voltage"
                  :class="$q.dark.isActive ? 'dialog-field-label-dark' : 'dialog-field-label-light'" />
            </div>

            <div class="col-12 col-sm-6">
               <div class="text-subtitle2 q-mb-sm"
                  :class="$q.dark.isActive ? 'dialog-subtitle-dark' : 'dialog-subtitle-light'">
                  DC Voltage for Breakers on 11kV
               </div>
               <q-input dense outlined v-model="form.dcVolt11" placeholder="Enter Voltage"
                  :class="$q.dark.isActive ? 'dialog-field-label-dark' : 'dialog-field-label-light'" />
            </div>

            <div class="col-12 col-sm-6">
               <div class="text-subtitle2 q-mb-sm"
                  :class="$q.dark.isActive ? 'dialog-subtitle-dark' : 'dialog-subtitle-light'">
                  Details of Substation Battery Bank 66kv
               </div>
               <q-option-group v-model="form.substationBatteryBank66kv" :options="availNAOptions" color="secondary"
                  inline dense :class="$q.dark.isActive ? 'dialog-field-label-dark' : 'dialog-field-label-light'" />
            </div>

            <div class="col-12 col-sm-6" v-if="form.substationBatteryBank66kv === 'available'">
               <div class="text-subtitle2 q-mb-sm"
                  :class="$q.dark.isActive ? 'dialog-subtitle-dark' : 'dialog-subtitle-light'">
                  Shunt available or not in 66kv Battery charger
               </div>
               <q-option-group v-model="form.shuntAvailable66kv" :options="availNAOptions" color="secondary" inline
                  dense :class="$q.dark.isActive ? 'dialog-field-label-dark' : 'dialog-field-label-light'" />
            </div>

            <div class="col-12 col-sm-6"
               v-if="form.substationBatteryBank66kv === 'available' && form.shuntAvailable66kv === 'available'">
               <div class="text-subtitle2 q-mb-sm"
                  :class="$q.dark.isActive ? 'dialog-subtitle-dark' : 'dialog-subtitle-light'">
                  Upload Shunt Photo 66kV
               </div>
               <q-file outlined v-model="form.shuntPhoto66kv" label="Click to select photo" accept="image/*" clearable>
                  <template v-slot:prepend>
                     <q-icon name="image" />
                  </template>
               </q-file>
            </div>

            <div class="col-12 col-sm-6" v-if="form.substationBatteryBank66kv === 'available'">
               <div class="text-subtitle2 q-mb-sm"
                  :class="$q.dark.isActive ? 'dialog-subtitle-dark' : 'dialog-subtitle-light'">
                  Space available or Not for Transducer installation
               </div>
               <q-option-group v-model="form.spaceAvailableTransducer" :options="availNAOptions" color="secondary"
                  inline dense :class="$q.dark.isActive ? 'dialog-field-label-dark' : 'dialog-field-label-light'" />
            </div>

            <div class="col-12 col-sm-6"
               v-if="form.substationBatteryBank66kv === 'available' && form.spaceAvailableTransducer === 'available'">
               <div class="text-subtitle2 q-mb-sm"
                  :class="$q.dark.isActive ? 'dialog-subtitle-dark' : 'dialog-subtitle-light'">
                  Upload Space Available Photo 66kV
               </div>
               <q-file outlined v-model="form.spaceAvailableTransducerPhoto" label="Click to select photo"
                  accept="image/*" clearable>
                  <template v-slot:prepend>
                     <q-icon name="image" />
                  </template>
               </q-file>
            </div>

            <div class="col-12 col-sm-6" v-if="form.substationBatteryBank66kv === 'available'">
               <div class="text-subtitle2 q-mb-sm"
                  :class="$q.dark.isActive ? 'dialog-subtitle-dark' : 'dialog-subtitle-light'">
                  Proposed RTU to 66kv Battery charger distance
               </div>
               <q-input dense outlined v-model="form.proposedRTUto66kvBatteryChargerDistance"
                  placeholder="Enter Distance"
                  :class="$q.dark.isActive ? 'dialog-field-label-dark' : 'dialog-field-label-light'" />
            </div>


            <div class="col-12 col-sm-6">
               <div class="text-subtitle2 q-mb-sm"
                  :class="$q.dark.isActive ? 'dialog-subtitle-dark' : 'dialog-subtitle-light'">
                  Details of Substation Battery Bank 33kv
               </div>
               <q-option-group v-model="form.substationBatteryBank33kv" :options="availNAOptions" color="secondary"
                  inline dense :class="$q.dark.isActive ? 'dialog-field-label-dark' : 'dialog-field-label-light'" />
            </div>

            <div class="col-12 col-sm-6" v-if="form.substationBatteryBank33kv === 'available'">
               <div class="text-subtitle2 q-mb-sm"
                  :class="$q.dark.isActive ? 'dialog-subtitle-dark' : 'dialog-subtitle-light'">
                  Shunt available or not in 33kv Battery charger
               </div>
               <q-option-group v-model="form.shuntAvailable33kv" :options="availNAOptions" color="secondary" inline
                  dense :class="$q.dark.isActive ? 'dialog-field-label-dark' : 'dialog-field-label-light'" />
            </div>

            <div class="col-12 col-sm-6"
               v-if="form.substationBatteryBank33kv === 'available' && form.shuntAvailable33kv === 'available'">
               <div class="text-subtitle2 q-mb-sm"
                  :class="$q.dark.isActive ? 'dialog-subtitle-dark' : 'dialog-subtitle-light'">
                  Upload Shunt Photo 33kV
               </div>
               <q-file outlined v-model="form.shuntPhoto33kv" label="Click to select photo" clearable accept="image/*">
                  <template v-slot:prepend>
                     <q-icon name="image" />
                  </template>
               </q-file>
            </div>

            <div class="col-12 col-sm-6" v-if="form.substationBatteryBank33kv === 'available'">
               <div class="text-subtitle2 q-mb-sm"
                  :class="$q.dark.isActive ? 'dialog-subtitle-dark' : 'dialog-subtitle-light'">
                  Space available or Not for Transducer installation
               </div>
               <q-option-group v-model="form.spaceAvailableTransducer33kv" :options="availNAOptions" color="secondary"
                  inline dense :class="$q.dark.isActive ? 'dialog-field-label-dark' : 'dialog-field-label-light'" />
            </div>

            <div class="col-12 col-sm-6"
               v-if="form.substationBatteryBank33kv === 'available' && form.spaceAvailableTransducer33kv === 'available'">
               <div class="text-subtitle2 q-mb-sm"
                  :class="$q.dark.isActive ? 'dialog-subtitle-dark' : 'dialog-subtitle-light'">
                  Upload Space Available Photo 33kV
               </div>
               <q-file outlined v-model="form.spaceAvailableTransducerPhoto33kv" label="Click to select photo"
                  accept="image/*" clearable>
                  <template v-slot:prepend>
                     <q-icon name="image" />
                  </template>
               </q-file>
            </div>

            <div class="col-12 col-sm-6" v-if="form.substationBatteryBank33kv === 'available'">
               <div class="text-subtitle2 q-mb-sm"
                  :class="$q.dark.isActive ? 'dialog-subtitle-dark' : 'dialog-subtitle-light'">
                  Proposed RTU to 33kv Battery charger distance
               </div>
               <q-input dense outlined v-model="form.proposedRTUto33kvBatteryChargerDistance"
                  placeholder="Enter Distance"
                  :class="$q.dark.isActive ? 'dialog-field-label-dark' : 'dialog-field-label-light'" />
            </div>


            <div class="col-12 col-sm-6">
               <div class="text-subtitle2 q-mb-sm"
                  :class="$q.dark.isActive ? 'dialog-subtitle-dark' : 'dialog-subtitle-light'">
                  Details of Substation Battery Bank 11kv
               </div>
               <q-option-group v-model="form.substationBatteryBank11kv" :options="availNAOptions" color="secondary"
                  inline dense :class="$q.dark.isActive ? 'dialog-field-label-dark' : 'dialog-field-label-light'" />
            </div>

            <div class="col-12 col-sm-6" v-if="form.substationBatteryBank11kv === 'available'">
               <div class="text-subtitle2 q-mb-sm"
                  :class="$q.dark.isActive ? 'dialog-subtitle-dark' : 'dialog-subtitle-light'">
                  Shunt available or not in 11kv Battery charger
               </div>
               <q-option-group v-model="form.shuntAvailable11kv" :options="availNAOptions" color="secondary" inline
                  dense :class="$q.dark.isActive ? 'dialog-field-label-dark' : 'dialog-field-label-light'" />
            </div>

            <div class="col-12 col-sm-6"
               v-if="form.substationBatteryBank11kv === 'available' && form.shuntAvailable11kv === 'available'">
               <div class="text-subtitle2 q-mb-sm"
                  :class="$q.dark.isActive ? 'dialog-subtitle-dark' : 'dialog-subtitle-light'">
                  Upload Shunt Photo 11kV
               </div>
               <q-file outlined v-model="form.shuntPhoto11kv" label="Click to select photo" clearable accept="image/*">
                  <template v-slot:prepend>
                     <q-icon name="image" />
                  </template>
               </q-file>
            </div>

            <div class="col-12 col-sm-6" v-if="form.substationBatteryBank11kv === 'available'">
               <div class="text-subtitle2 q-mb-sm"
                  :class="$q.dark.isActive ? 'dialog-subtitle-dark' : 'dialog-subtitle-light'">
                  Space available or Not for Transducer installation
               </div>
               <q-option-group v-model="form.spaceAvailableTransducer11kv" :options="availNAOptions" color="secondary"
                  inline dense :class="$q.dark.isActive ? 'dialog-field-label-dark' : 'dialog-field-label-light'" />
            </div>

            <div class="col-12 col-sm-6"
               v-if="form.substationBatteryBank11kv === 'available' && form.spaceAvailableTransducer11kv === 'available'">
               <div class="text-subtitle2 q-mb-sm"
                  :class="$q.dark.isActive ? 'dialog-subtitle-dark' : 'dialog-subtitle-light'">
                  Upload Space Available Photo 11kV
               </div>
               <q-file outlined v-model="form.spaceAvailableTransducerPhoto11kv" label="Click to select photo" clearable
                  accept="image/*">
                  <template v-slot:prepend>
                     <q-icon name="image" />
                  </template>
               </q-file>
            </div>

            <div class="col-12 col-sm-6" v-if="form.substationBatteryBank11kv === 'available'">
               <div class="text-subtitle2 q-mb-sm"
                  :class="$q.dark.isActive ? 'dialog-subtitle-dark' : 'dialog-subtitle-light'">
                  Proposed RTU to 11kv Battery charger distance
               </div>
               <q-input dense outlined v-model="form.proposedRTUto11kvBatteryChargerDistance"
                  placeholder="Enter Distance"
                  :class="$q.dark.isActive ? 'dialog-field-label-dark' : 'dialog-field-label-light'" />
            </div>

            <div class="col-12 col-sm-6" v-if="form.substationBatteryBank11kv === 'available'">
               <div class="text-subtitle2 q-mb-sm"
                  :class="$q.dark.isActive ? 'dialog-subtitle-dark' : 'dialog-subtitle-light'">
                  Proposed RTU to 11kv Battery charger distance
               </div>
               <q-input dense outlined v-model="form.proposedRTUto11kvBatteryChargerDistance"
                  placeholder="Enter Distance"
                  :class="$q.dark.isActive ? 'dialog-field-label-dark' : 'dialog-field-label-light'" />
            </div>

            <div class="col-12 col-sm-6" v-if="form.substationBatteryBank11kv === 'available'">
               <div class="text-subtitle2 q-mb-sm"
                  :class="$q.dark.isActive ? 'dialog-subtitle-dark' : 'dialog-subtitle-light'">
                  Distance between proposed RTU location and ACDB
               </div>
               <q-input dense outlined v-model="form.distanceBetweenProposedRTUlocationAndACDB"
                  placeholder="Enter Distance"
                  :class="$q.dark.isActive ? 'dialog-field-label-dark' : 'dialog-field-label-light'" />
            </div>

         </div>

         <q-separator spaced style="margin: 1.5rem 0;" />

         <div class="text-subtitle1 q-mb-sm" :class="$q.dark.isActive ? 'dialog-header-dark' : 'dialog-header-light'">
            Single Line Diagram Details:
         </div>

         <div class="row q-col-gutter-md q-mb-md">

            <div class="col-12 col-sm-6">
               <div class="text-subtitle2 q-mb-sm"
                  :class="$q.dark.isActive ? 'dialog-subtitle-dark' : 'dialog-subtitle-light'">
                  Draw the Single Line Diagram of the Station showing all existing bays as well as future bays
               </div>
               <q-file outlined v-model="form.singleLineDiagram" label="Click to select photo" accept="image/*"
                  clearable>
                  <template v-slot:prepend>
                     <q-icon name="image" />
                  </template>
               </q-file>
            </div>

            <div class="col-12 col-sm-6">
               <div class="text-subtitle2 q-mb-sm"
                  :class="$q.dark.isActive ? 'dialog-subtitle-dark' : 'dialog-subtitle-light'">
                  Make sure that Breakers, CTs, PTs, LAs, Reactors, Capacitor Banks, Isolators, Earth Switches, Bus
                  Couplers, are
                  shown in SLD(Standardise symbol to be used)
               </div>
               <q-input dense outlined readonly placeholder="NA"
                  :class="$q.dark.isActive ? 'dialog-field-label-dark' : 'dialog-field-label-light'" />
            </div>



         </div>

         <q-separator spaced style="margin: 1.5rem 0;" />
         <div class="text-subtitle1 q-mb-sm" :class="$q.dark.isActive ? 'dialog-header-dark' : 'dialog-header-light'">
            Substation Earthing Details:
         </div>

         <div class="row q-col-gutter-md q-mb-md">

            <div class="col-12 col-sm-6">
               <div class="text-subtitle2 q-mb-sm"
                  :class="$q.dark.isActive ? 'dialog-subtitle-dark' : 'dialog-subtitle-light'">
                  What is the distance between proposed RTU and associated equipment’s to Earth Strip?
               </div>
               <q-input dense outlined v-model="form.distanceBetweenProposedRTUandAssociatedEquipmentstoEarthStrip"
                  placeholder="Enter Distance"
                  :class="$q.dark.isActive ? 'dialog-field-label-dark' : 'dialog-field-label-light'" />
            </div>

            <div class="col-12 col-sm-6">
               <div class="text-subtitle2 q-mb-sm"
                  :class="$q.dark.isActive ? 'dialog-subtitle-dark' : 'dialog-subtitle-light'">
                  Battery Charger to RTU distance
               </div>
               <q-input dense outlined v-model="form.batteryChargerToRTUdistance" placeholder="Enter Distance"
                  :class="$q.dark.isActive ? 'dialog-field-label-dark' : 'dialog-field-label-light'" />
            </div>
         </div>

         <q-separator spaced style="margin: 1.5rem 0;" />
         <div class="text-subtitle1 q-mb-sm" :class="$q.dark.isActive ? 'dialog-header-dark' : 'dialog-header-light'">
            Storage Details:
         </div>

         <div class="text-subtitle2 q-mb-sm"
            :class="$q.dark.isActive ? 'dialog-subtitle-dark' : 'dialog-subtitle-light'">Access
            to Site
         </div>
         <div class="row items-center q-mb-md">
            <div class="col-12">
               <q-input dense outlined v-model="form.accessToSite"
                  :class="$q.dark.isActive ? 'dialog-field-label-dark' : 'dialog-field-label-light'" />
            </div>
         </div>

         <div class="row q-col-gutter-md q-mb-md">

            <div class="col-12 col-sm-6">
               <div class="text-subtitle2 q-mb-sm"
                  :class="$q.dark.isActive ? 'dialog-subtitle-dark' : 'dialog-subtitle-light'">
                  Storage for Site Equipment (RTU Panel)-10 sq.ft
               </div>
               <q-input dense outlined v-model="form.storageForSiteEquipment" placeholder="Enter Distance"
                  :class="$q.dark.isActive ? 'dialog-field-label-dark' : 'dialog-field-label-light'" />
            </div>

            <div class="col-12 col-sm-6">
               <div class="items-center q-mb-xs">
                  <div class="text-subtitle2 q-mb-sm"
                     :class="$q.dark.isActive ? 'dialog-subtitle-dark' : 'dialog-subtitle-light'">
                     Biggest vehicle that can enter for unloading
                  </div>
                  <div class="" :class="[$q.screen.lt.md ? 'col-9' : 'col-8']">
                     <q-select dense outlined v-model="form.biggestVehicle" :options="biggestVehicleOptions"
                        behavior="menu"
                        :class="$q.dark.isActive ? 'dialog-field-label-dark' : 'dialog-field-label-light'" />
                  </div>
               </div>
            </div>
         </div>

         <q-separator spaced style="margin: 1.5rem 0;" />

         <div class="text-subtitle1 q-mb-sm" :class="$q.dark.isActive ? 'dialog-header-dark' : 'dialog-header-light'">
            Ethernet Switch details:
         </div>

         <div class="row q-col-gutter-md q-mb-md">

            <div class="col-12 col-sm-6">
               <div class="text-subtitle2 q-mb-sm"
                  :class="$q.dark.isActive ? 'dialog-subtitle-dark' : 'dialog-subtitle-light'">
                  Make of Switch
               </div>
               <q-input dense outlined v-model="form.makeOfSwitch"
                  :class="$q.dark.isActive ? 'dialog-field-label-dark' : 'dialog-field-label-light'" />
            </div>

            <div class="col-12 col-sm-6">
               <div class="text-subtitle2 q-mb-sm"
                  :class="$q.dark.isActive ? 'dialog-subtitle-dark' : 'dialog-subtitle-light'">
                  Model of Switch
               </div>
               <q-input dense outlined v-model="form.modelOfSwitch"
                  :class="$q.dark.isActive ? 'dialog-field-label-dark' : 'dialog-field-label-light'" />
            </div>

            <div class="col-12 col-sm-6">
               <div class="items-center q-mb-xs">
                  <div class="text-subtitle2 q-mb-sm"
                     :class="$q.dark.isActive ? 'dialog-subtitle-dark' : 'dialog-subtitle-light'">
                     Qty. of switch available at Site
                  </div>
                  <div class="" :class="[$q.screen.lt.md ? 'col-9' : 'col-8']">
                     <q-select dense outlined v-model="form.qtyOfSwitchAvailableAtSite"
                        :options="availableSwitchOptions" behavior="menu"
                        :class="$q.dark.isActive ? 'dialog-field-label-dark' : 'dialog-field-label-light'" />
                  </div>
               </div>
            </div>

            <template v-if="form.qtyOfSwitchAvailableAtSite > 0">
               <div class="col-12 col-sm-6" v-for="n in Number(form.qtyOfSwitchAvailableAtSite)" :key="n">
                  <div class="text-subtitle2 q-mb-sm"
                     :class="$q.dark.isActive ? 'dialog-subtitle-dark' : 'dialog-subtitle-light'">
                     Upload Photo for Switch {{ n }}
                  </div>

                  <q-file outlined v-model="form.switchPhotos[n - 1]" label="Click to select photo" accept="image/*"
                     clearable :class="$q.dark.isActive ? 'dialog-field-label-dark' : 'dialog-field-label-light'">
                     <template v-slot:prepend>
                        <q-icon name="image" />
                     </template>
                  </q-file>
               </div>
            </template>

            <div class="col-12 q-mt-md">
               <div class="text-subtitle2" :class="$q.dark.isActive ? 'dialog-subtitle-dark' : 'dialog-subtitle-light'">
                  No. of Ports available in Switch
               </div>
            </div>

            <div class="col-12 col-sm-6 col-md-3" v-for="i in 4" :key="`sw-${i}`">
               <div class="text-subtitle3 q-mb-sm"
                  :class="$q.dark.isActive ? 'dialog-subtitle-dark' : 'dialog-subtitle-light'">
                  {{ `SW-${i}` }}
               </div>
               <q-select dense outlined v-model="form[`sw${i}Ports`]" :options="portOptions" behavior="menu"
                  :class="$q.dark.isActive ? 'dialog-field-label-dark' : 'dialog-field-label-light'" />
            </div>

            <div class="col-12 col-sm-6">
               <div class="text-subtitle2 q-mb-sm"
                  :class="$q.dark.isActive ? 'dialog-subtitle-dark' : 'dialog-subtitle-light'">
                  Relay to Ethernet Switch cable laid
               </div>
               <q-option-group v-model="form.relayToSwitchCableLaid" :options="yesNoOptions" color="secondary" inline
                  dense :class="$q.dark.isActive ? 'dialog-field-label-dark' : 'dialog-field-label-light'" />
            </div>

            <div class="col-12 col-sm-6">
               <div class="text-subtitle2 q-mb-sm"
                  :class="$q.dark.isActive ? 'dialog-subtitle-dark' : 'dialog-subtitle-light'">
                  Ethernet Switch is working
               </div>
               <q-option-group v-model="form.ethernetSwitchIsWorking" :options="yesNoOptions" color="secondary" inline
                  dense :class="$q.dark.isActive ? 'dialog-field-label-dark' : 'dialog-field-label-light'" />
            </div>

            <div class="col-12 col-sm-6" v-if="form.ethernetSwitchIsWorking === 'yes'">
               <div class="text-subtitle2 q-mb-sm"
                  :class="$q.dark.isActive ? 'dialog-subtitle-dark' : 'dialog-subtitle-light'">
                  Upload Ethernet Switch Photo
               </div>
               <q-file outlined v-model="form.ethernetSwitchPhoto" label="Click to select photo" accept="image/*"
                  clearable>
                  <template v-slot:prepend>
                     <q-icon name="image" />
                  </template>
               </q-file>
            </div>

         </div>

         <q-separator spaced style="margin: 1.5rem 0;" />

         <div class="text-subtitle1 q-mb-sm" :class="$q.dark.isActive ? 'dialog-header-dark' : 'dialog-header-light'">
            Additional Reports/Documents Expected Apart from Above
         </div>


         <div class="row q-col-gutter-md q-mb-md">

            <div class="col-12 col-sm-6">
               <div class="text-subtitle2 q-mb-sm"
                  :class="$q.dark.isActive ? 'dialog-subtitle-dark' : 'dialog-subtitle-light'">
                  Substation Single Line Diagram
               </div>
               <q-option-group v-model="form.substationSingleLineDiagram" :options="yesNoOptions" color="secondary"
                  inline dense :class="$q.dark.isActive ? 'dialog-field-label-dark' : 'dialog-field-label-light'" />
            </div>

            <div class="col-12 col-sm-6" v-if="form.substationSingleLineDiagram === 'yes'">
               <div class="text-subtitle2 q-mb-sm"
                  :class="$q.dark.isActive ? 'dialog-subtitle-dark' : 'dialog-subtitle-light'">
                  Upload Substation Single Line Diagram
               </div>
               <q-file outlined v-model="form.substationSingleLineDiagramPhoto" label="Click to select photo"
                  accept="image/*" clearable>
                  <template v-slot:prepend>
                     <q-icon name="image" />
                  </template>
               </q-file>
            </div>

            <div class="col-12 col-sm-6">
               <div class="text-subtitle2 q-mb-sm"
                  :class="$q.dark.isActive ? 'dialog-subtitle-dark' : 'dialog-subtitle-light'">
                  Control Room Layout
               </div>
               <q-option-group v-model="form.controlRoomLayout" :options="yesNoOptions" color="secondary" inline dense
                  :class="$q.dark.isActive ? 'dialog-field-label-dark' : 'dialog-field-label-light'" />
            </div>

            <div class="col-12 col-sm-6" v-if="form.controlRoomLayout === 'yes'">
               <div class="text-subtitle2 q-mb-sm"
                  :class="$q.dark.isActive ? 'dialog-subtitle-dark' : 'dialog-subtitle-light'">
                  Upload Control Room Layout
               </div>
               <q-file outlined v-model="form.controlRoomLayoutPhoto" label="Click to select photo" accept="image/*"
                  clearable>
                  <template v-slot:prepend>
                     <q-icon name="image" />
                  </template>
               </q-file>
            </div>

            <div class="col-12 col-sm-6">
               <div class="text-subtitle2 q-mb-sm"
                  :class="$q.dark.isActive ? 'dialog-subtitle-dark' : 'dialog-subtitle-light'">
                  Space Available /Not for LDMS (only for 66/33Kv)
               </div>
               <q-option-group v-model="form.spaceAvailable" :options="yesNoOptions" color="secondary" inline dense
                  :class="$q.dark.isActive ? 'dialog-field-label-dark' : 'dialog-field-label-light'" />
            </div>

            <div class="col-12 col-sm-6">
               <div class="text-subtitle2 q-mb-sm"
                  :class="$q.dark.isActive ? 'dialog-subtitle-dark' : 'dialog-subtitle-light'">
                  LDMS distance from proposed RTU
               </div>
               <q-input dense outlined v-model="form.ldmsDistanceFromProposedRTU"
                  :class="$q.dark.isActive ? 'dialog-field-label-dark' : 'dialog-field-label-light'" />
            </div>

            <div class="col-12 col-sm-6">
               <div class="text-subtitle2 q-mb-sm"
                  :class="$q.dark.isActive ? 'dialog-subtitle-dark' : 'dialog-subtitle-light'">
                  LDMS to ACDB Distance
               </div>
               <q-input dense outlined v-model="form.ldmsToAcdbDistance"
                  :class="$q.dark.isActive ? 'dialog-field-label-dark' : 'dialog-field-label-light'" />
            </div>

            <div class="col-12 col-sm-6">
               <div class="text-subtitle2 q-mb-sm"
                  :class="$q.dark.isActive ? 'dialog-subtitle-dark' : 'dialog-subtitle-light'">
                  Furniture available or not for LDMS (Table & chair)
               </div>
               <q-option-group v-model="form.furnitureAvailable" :options="yesNoOptions" color="secondary" inline dense
                  :class="$q.dark.isActive ? 'dialog-field-label-dark' : 'dialog-field-label-light'" />
            </div>


         </div>



         <!-- </div> -->

      </q-tab-panel>
   </q-card>

</template>

<script setup>
import { reactive } from 'vue'
import { useQuasar } from 'quasar'

const $q = useQuasar()

const props = defineProps(['name'])

const yesNoOptions = [
   { label: 'Yes', value: 'yes' },
   { label: 'No', value: 'no' }
]
const availNAOptions = [
   { label: 'Available', value: 'available' },
   { label: 'NA', value: 'na' }
]

const biggestVehicleOptions = ['Pickup', 'Bolaro', 'TATA']
const availableSwitchOptions = ['0', '1', '2', '3', '4', '5', '6']
const portOptions = [4, 6, 8, 12, 16, 18, 24]

const form = reactive({
   civilWorkCompletion: '',
   mplsAvailable: 'no',
   highGainRequired: 'no',
   rtuHighGainDistance: '',
   highGainCableRoute: 'no',
   utilitiesAcAvailable: 'yes',
   dcVolt66: '',
   dcVolt33: '',
   dcVolt11: '',

   substationBatteryBank66kv: 'na',
   shuntAvailable66kv: 'available',
   shuntPhoto66kv: null,
   spaceAvailableTransducer: 'available',
   spaceAvailableTransducerPhoto: null,
   proposedRTUto66kvBatteryChargerDistance: '',

   substationBatteryBank33kv: 'na',
   shuntAvailable33kv: 'available',
   shuntPhoto33kv: null,
   spaceAvailableTransducer33kv: 'available',
   spaceAvailableTransducerPhoto33kv: null,
   proposedRTUto33kvBatteryChargerDistance: '',

   substationBatteryBank11kv: 'na',
   shuntAvailable11kv: 'available',
   shuntPhoto11kv: null,
   spaceAvailableTransducer11kv: 'available',
   spaceAvailableTransducerPhoto11kv: null,
   proposedRTUto11kvBatteryChargerDistance: '',

   distanceBetweenProposedRTUlocationAndACDB: '',
   singleLineDiagram: null,
   distanceBetweenProposedRTUandAssociatedEquipmentstoEarthStrip: '',
   batteryChargerToRTUdistance: '',
   accessToSite: '',
   storageForSiteEquipment: '',
   biggestVehicle: 'Pickup',
   makeOfSwitch: '',
   modelOfSwitch: '',
   qtyOfSwitchAvailableAtSite: 0,
   switchPhotos: [],
   sw1Ports: '',
   sw2Ports: '',
   sw3Ports: '',
   sw4Ports: '',
   relayToSwitchCableLaid: 'no',
   ethernetSwitchIsWorking: 'no',
   ethernetSwitchPhoto: null,
   substationSingleLineDiagram: 'no',
   substationSingleLineDiagramPhoto: null,
   controlRoomLayout: 'no',
   controlRoomLayoutPhoto: null,
   spaceAvailable: 'no',
   ldmsDistanceFromProposedRTU: '',
   ldmsToAcdbDistance: '',
   furnitureAvailable: 'no',




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