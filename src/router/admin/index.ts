import { admin } from 'src/helpers/ListAkses'

export default {
  path: `/${admin.path}/`,
  meta: {
    requiredAuth: true,
    allowedRole: admin.value
  },
  component: () => import('layouts/main_layout/main_layout.vue'),
  children: [
    {
      path: '',
      redirect: { name: 'crewManagement' }
    },
    // {
    //   path: 'dashboard',
    //   name: 'dashboardAdmin',
    //   component: () => import('src/pages/dashboard/dashboard.vue')
    // },
    {
      path: 'crew-managment',
      name: 'crewManagement',
      component: () => import('src/pages/crew_management/crew_management.vue')
    },
    // {
    //   path: 'trouble-call',
    //   name: 'troubleCall',
    //   component: () => import('src/pages/trouble_call_management/trouble_call_management.vue')
    // },
    // {
    //   path: 'planned-outage-schedule-v4',
    //   name: 'plannedOutageV4',
    //   component: () => import('src/pages/planned_outage_schedule/planned_outage_schedule.vue')
    // },
    // {
    //   path: 'analytics-reporting',
    //   name: 'analyticReport',
    //   component: () => import('src/pages/analytics_reporting/analytics_reporting.vue')
    // },
    // {
    //   path: 'widgets',
    //   name: 'widgets',
    //   component: () => import('src/pages/add_on_widgets/widget_1/widget_1.vue')
    // },
    // {
    //   path: 'widgets2',
    //   name: 'widgets2',
    //   component: () => import('src/pages/add_on_widgets/widget_2/widget_2.vue')
    // },
    // {
    //   path: 'widgets3',
    //   name: 'widgets3',
    //   component: () => import('src/pages/add_on_widgets/widget_3/widget_3.vue')
    // },
    // {
    //   path: 'widgets4',
    //   name: 'widgets4',
    //   component: () => import('src/pages/add_on_widgets/widget_4/widget_4.vue')
    // },
    // {
    //   path: 'widgets5',
    //   name: 'widgets5',
    //   component: () => import('src/pages/add_on_widgets/widget_5/widget_5.vue')
    // },
    // {
    //   path: 'widgets6',
    //   name: 'widgets6',
    //   component: () => import('src/pages/add_on_widgets/widget_6/widget_6.vue')
    // },
    // {
    //   path: 'widgets7',
    //   name: 'widgets7',
    //   component: () => import('src/pages/add_on_widgets/widget_7/widget_7.vue')
    // },

    // {
    //   path: 'form',
    //   name: 'form',
    //   component: () => import('src/components/form/Form.vue')
    // },
    // {
    //   path: 'form1',
    //   name: 'form1',
    //   component: () => import('src/components/form/Form1.vue')
    // },
    //  {
    //   path: 'honey',
    //   name: 'honey',
    //   component: () => import('src/pages/add_on_widgets/widget_8/widget_8.vue')
    // },
    //  {
    //   path: 'honeyAnim',
    //   name: 'honeyAnim',
    //   component: () => import('src/pages/switching/widcomponent/BeehiveAnim.vue')
    // },
    // {
    //   path: 'network',
    //   name: 'network',
    //   component: () => import('src/pages/add_on_widgets/widget_9/widget_9.vue')
    // },
    // {
    //   path: 'honey2',
    //   name: 'honey2',
    //   component: () => import('src/pages/add_on_widgets/widget_10/widget_10.vue')
    // },
    // {
    //   path: 'honey2',
    //   name: 'honey2',
    //   component: () => import('src/pages/add_on_widgets/widget_11/widget_11.vue')
    // },
    // {
    //   path: 'switching/sheets',
    //   name: 'switchingSheetsAdmin',
    //   component: () => import('src/pages/switching_management/switching_sheets/switching_sheets.vue')
    // },
    // {
    //   path: 'switching/safety-documents',
    //   name: 'safetyDocumentsAdmin',
    //   component: () => import('src/pages/switching_management/safety_documents/safety_documents.vue')
    // },
    // {
    //   path: 'honey4',
    //   name: 'honey4',
    //   component: () => import('src/pages/switching/widcomponent/BeehiveAnim.vue')
    // },
    // {
    //   path: 'table/default',
    //   name: 'tableAdmin',
    //   component: () => import('src/pages/dashboard/d.vue')
    // },
    // {
    //   path: 'table/pagination',
    //   name: 'tablePaginationAdmin',
    //   component: () => import('src/pages/dashboard/d2.vue')
    // },
    // {
    //   path: 'card',
    //   name: 'cardAdmin',
    //   component: () => import('src/pages/admin/card/Index.vue')
    // },
    // {
    //   path: 'button',
    //   name: 'buttonAdmin',
    //   component: () => import('src/pages/admin/button/Index.vue')
    // },
    // {
    //   path: 'tab',
    //   name: 'tabAdmin',
    //   component: () => import('src/pages/admin/tab/Index.vue')
    // },
    // {
    //   path: 'notify',
    //   name: 'notifyAdmin',
    //   component: () => import('src/pages/admin/notify/Index.vue')
    // },
    // {
    //   path: 'dialog',
    //   name: 'dialogAdmin',
    //   component: () => import('src/pages/admin/dialog/Index.vue')
    // },
    // {
    //   path: 'blank',
    //   name: 'blankAdmin',
    //   component: () => import('src/pages/admin/card/Index.vue')
    // },
    // {
    //   path: 'form',
    //   name: 'formAdmin',
    //   component: () => import('src/pages/admin/card/Index.vue')
    // },
    // {
    //   path: 'notes',
    //   name: 'notesAppAdmin',
    //   component: () => import('src/pages/dashboard/d2.vue')
    // },
    
    // {
    //   path: 'switching/crew-management',
    //   name: 'crewManagementAdmin',
    //   component: () => import('src/pages/switching/CrewManagement.vue')
    // },
    // {
    //   path: 'switching/scada-operations',
    //   name: 'scadaOperationsAdmin',
    //   component: () => import('src/pages/switching/ScadaOperations.vue')
    // },
    // {
    //   path: 'trouble-call/crew-management-demo',
    //   name: 'crewManagementTcomsAdmin',
    //   component: () => import('src/pages/switching/CrewDemo.vue')
    // },
    // {
    //   path: 'trouble-call/crew-management-pro',
    //   name: 'crewManagementProTcomsAdmin',
    //   component: () => import('src/pages/switching/CrewPro.vue')
    // },
    // {
    //   path: 'trouble-call/crew-management-v1',
    //   name: 'crewManagementv1TcomsAdmin',
    //   component: () => import('src/pages/switching/CrewV1.vue')
    // },
    // {
    //   path: 'trouble-call/crew-management-v2',
    //   name: 'crewManagementv2TcomsAdmin',
    //   component: () => import('src/pages/switching/CrewV2.vue')
    // },
    // {
    //   path: 'trouble-call/planned-outage-schedule',
    //   name: 'plannedoutageschedule',
    //   component: () => import('src/pages/switching/plannedOutage.vue')
    // }
  ]
}
