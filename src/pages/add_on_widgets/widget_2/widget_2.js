import FishBone from './fish_bone/fish_bone.vue';
import pageHeader from 'src/components/header/page_header.vue';

export default {
  components: {
    FishBone,
    pageHeader
  },
  data() {
    return {
      strTitle: 'Fish Bone Diagram',
      fishboneData: {
        id: 'Outage Management\nSystem Issues',
        children: [
          {
            id: 'Functional Requirements',
            children: [
              { id: 'Planned Outage Scheduling' }, 
              { id: 'Trouble Call Management' },
              { id: 'Crew Dispatch Delays' }, 
              { id: 'Analytics Reporting' },
            ],
          },
          {
            id: 'System Components',
            children: [
              { id: 'TCOMS Service' }, 
              { id: 'CAWOM Service' },
              { id: 'Planned Outage Service' }, 
              { id: 'Analytics Service' }
            ],
          },
          {
            id: 'External Interfaces',
            children: [
              { id: 'SCADA/ADMS Integration' }, 
              { id: 'GIS Connectivity' },
              { id: 'Customer Care/CIS' }, 
              { id: 'Historian IS&R' }
            ],
          },
          {
            id: 'Data Management',
            children: [
              { id: 'Ticket Processing' }, 
              { id: 'Incident Records' },
              { id: 'Work Order Tracking' }, 
              { id: 'KPI Snapshots' },
            ],
          },
          {
            id: 'Crew Operations',
            children: [
              { id: 'Availability Monitoring' }, 
              { id: 'Work Assignment' },
              { id: 'Field Updates' }, 
              { id: 'Completion Tracking' },
            ],
          },
          {
            id: 'Notifications',
            children: [
              { id: 'SMS Gateway' }, 
              { id: 'Email Service' },
              { id: 'IVR System' }, 
              { id: 'Customer Callbacks' },
            ],
          },
        ],
      }
    };
  }
};