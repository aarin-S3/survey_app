<template>
  <div class="responsive-table">
    <div id="work-order-table" class="tabulator-container"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, nextTick, computed, watch } from 'vue'
import { TabulatorFull as Tabulator } from "tabulator-tables";

const table = ref(null);
const newTask = ref({
  title: "",
  location: "",
  priority: "",
  status: "",
  start: "",
  end: "",
  duration: "",
  customers: "",
});

const errors = ref({});

const statusOptions = ["To Do", "In Progress", "Review", "Done"];
const priorityOptions = ["Low", "Medium", "High"];


const tabledata = ref([
  {
    id: "PO-101",
    title: "Website Redesign",
    location: "New York Office",
    priority: "High",
    status: "In Progress",
    start: "2025-10-01 00:00",
    end: "2025-10-10 00:00",
    duration: "10 hours",
    customers: "Acme Corp",
  },
  {
    id: "PO-102",
    title: "Database Migration",
    location: "Remote",
    priority: "Medium",
    status: "To Do",
    start: "2025-11-05 00:00",
    end: "2025-11-15 00:00",
    duration: "10 hours",
    customers: "DataFlow Inc",
  },
  {
    id: "PO-103",
    title: "Marketing Campaign",
    location: "Los Angeles",
    priority: "Low",
    status: "Review",
    start: "2025-09-12 00:00",
    end: "2025-09-20 00:00",
    duration: "8 hours",
    customers: "Bright Media",
  },
  {
    id: "PO-104",
    title: "Mobile App UI",
    location: "Chicago",
    priority: "High",
    status: "Done",
    start: "2025-08-05 00:00",
    end: "2025-08-18 00:00",
    duration: "13 hours",
    customers: "Appify Labs",
  },
  {
    id: "PO-105",
    title: "SEO Optimization",
    location: "Mumbai",
    priority: "Medium",
    status: "In Progress",
    start: "2025-11-01 00:00",
    end: "2025-11-08 00:00",
    duration: "7 hours",
    customers: "RankUp Digital",
  },
  {
    id: "PO-106",
    title: "Server Maintenance",
    location: "Berlin Data Center",
    priority: "High",
    status: "To Do",
    start: "2025-11-10 00:00",
    end: "2025-11-12 00:00",
    duration: "2 hours",
    customers: "TechSys",
  },
  {
    id: "PO-107",
    title: "Brand Identity Design",
    location: "San Francisco",
    priority: "Medium",
    status: "Review",
    start: "2025-10-02 00:00",
    end: "2025-10-07 00:00",
    duration: "5 hours",
    customers: "Nova Brands",
  },
  {
    id: "PO-108",
    title: "Payment Gateway Integration",
    location: "Remote",
    priority: "High",
    status: "In Progress",
    start: "2025-10-25 00:00",
    end: "2025-11-05 00:00",
    duration: "11 hours",
    customers: "PayPlus",
  },
  {
    id: "PO-109",
    title: "Internal Training Session",
    location: "London HQ",
    priority: "Low",
    status: "Done",
    start: "2025-09-01 00:00",
    end: "2025-09-03 00:00",
    duration: "2 hours",
    customers: "In-house",
  },
  {
    id: "PO-110",
    title: "Cloud Setup",
    location: "Singapore",
    priority: "Medium",
    status: "To Do",
    start: "2025-11-06 00:00",
    end: "2025-11-10 00:00",
    duration: "4 hours",
    customers: "SkyNet",
  },
  {
    id: "PO-111",
    title: "API Development",
    location: "Remote",
    priority: "High",
    status: "Review",
    start: "2025-10-12 00:00",
    end: "2025-10-22 00:00",
    duration: "10 hours",
    customers: "CodeWorks",
  },
  {
    id: "PO-112",
    title: "Testing Automation",
    location: "Delhi Office",
    priority: "Medium",
    status: "In Progress",
    start: "2025-10-29 00:00",
    end: "2025-11-09 00:00",
    duration: "11 hours",
    customers: "Testify",
  },
  {
    id: "PO-113",
    title: "Security Audit",
    location: "Toronto",
    priority: "High",
    status: "To Do",
    start: "2025-11-07 00:00",
    end: "2025-11-12 00:00",
    duration: "5 hours",
    customers: "SecureX",
  },
  {
    id: "PO-114",
    title: "Client Demo Presentation",
    location: "Paris",
    priority: "Low",
    status: "Done",
    start: "2025-10-03 00:00",
    end: "2025-10-04 00:00",
    duration: "1 day",
    customers: "VisionTech",
  },
  {
    id: "PO-115",
    title: "Email Campaign Setup",
    location: "Remote",
    priority: "Medium",
    status: "Review",
    start: "2025-10-14 00:00",
    end: "2025-10-18 00:00",
    duration: "4 hours",
    customers: "MailSpark",
  },
  {
    id: "PO-116",
    title: "Backend Refactoring",
    location: "Bangalore",
    priority: "High",
    status: "In Progress",
    start: "2025-10-21 00:00",
    end: "2025-10-30 00:00",
    duration: "9 hours",
    customers: "DevNest",
  },
  {
    id: "PO-117",
    title: "HR Portal Upgrade",
    location: "Remote",
    priority: "Low",
    status: "Done",
    start: "2025-09-20 00:00",
    end: "2025-09-25 00:00",
    duration: "5 hours",
    customers: "HROne",
  },
  {
    id: "PO-118",
    title: "Bug Fix Sprint",
    location: "Kolkata",
    priority: "High",
    status: "In Progress",
    start: "2025-10-28 00:00",
    end: "2025-11-03 00:00",
    duration: "6 hours",
    customers: "FixIT",
  },
  {
    id: "PO-119",
    title: "Social Media Strategy",
    location: "Dubai",
    priority: "Medium",
    status: "To Do",
    start: "2025-11-11 00:00",
    end: "2025-11-18 00:00",
    duration: "7 hours",
    customers: "BuzzLine",
  },
  {
    id: "PO-120",
    title: "UX Research",
    location: "Tokyo",
    priority: "Low",
    status: "Review",
    start: "2025-10-15 00:00",
    end: "2025-10-20 00:00",
    duration: "5 hours",
    customers: "UserMind",
  },
  {
    id: "PO-121",
    title: "UX Research",
    location: "Tokyo",
    priority: "Low",
    status: "Review",
    start: "2025-10-15 00:00",
    end: "2025-10-20 00:00",
    duration: "5 hours",
    customers: "UserMind",
  },
])

const newTabledata = () => {

  for (let i = 0; i < 100; i++) {
    tabledata.value.push({
      id: "PO-" + (122 + i), 
      title: "UX Research",
      location: "Tokyo",
      priority: "Low",
      status: "Review",
      start: "2025-10-15 00:00",
      end: "2025-10-20 00:00",
      duration: "5 hours",
      customers: "UserMind",
    });
  }
};


const notify = (type, message) => {
  $q.notify({ type, message, position: "top-right", timeout: 1500 });
};

const resetForm = () => {
  Object.keys(newTask.value).forEach((key) => (newTask.value[key] = ""));
  errors.value = {};
};

const closeDialog = () => {
  dialog.value = false;
};

const openDialog = () => {
  editMode.value = false;
  editingIndex.value = null;
  resetForm();
  dialog.value = true;
};

const editDialog = (task = null, index = null) => {
  if (task) {
    editMode.value = true;
    editingIndex.value = index;
    errors.value = {};
    Object.assign(newTask.value, {
      title: task.title,
      location: task.location,
      status: task.status,
      priority: task.priority,
      start: task.start,
      end: task.end,
      duration: task.duration,
      customers: task.customers,
    });
    dialog.value = true;
  }
};

const validateForm = () => {
  errors.value = {};

  if (!newTask.value.title || !newTask.value.title.trim()) {
    errors.value.title = "Title is required";
  }
  if (!newTask.value.location || !newTask.value.location.trim()) {
    errors.value.title = "Location is required";
  }
  if (!newTask.value.priority) {
    errors.value.priority = "Priority is required";
  }
  if (!newTask.value.duration || !newTask.value.duration.trim()) {
    errors.value.duration = "Duration is required";
  }
  if (!newTask.value.customers || !newTask.value.customers.trim()) {
    errors.value.customers = "Customers is required";
  }
  if (!newTask.value.status) {
    errors.value.status = "Status is required";
  }
  if (!newTask.value.start) {
    errors.value.start = "Start Date is required";
  }
  if (!newTask.value.end) {
    errors.value.end = "End Date is required";
  }

  return Object.keys(errors.value).length === 0;
};

const deleteTask = (index) => {
  const task = tabledata.value[index];
  if (!task) return;

  $q.dialog({
    title: "Confirm Delete",
    message: "Are you sure you want to delete this task?",
    cancel: true,
    persistent: true,
  }).onOk(() => {

    tabledata.value.splice(index, 1);


    const row = table.value.getRow(task.id);
    if (row) row.delete();

    notify("negative", "Task Deleted Successfully");
  });
};

const handleSubmit = async () => {
  if (!validateForm()) {
    notify("warning", "Please fill all required fields");
    return;
  }

  if (editMode.value && editingIndex.value !== null) {

    const updatedTask = {
      ...tabledata.value[editingIndex.value],
      ...newTask.value,
      duration: `${newTask.value.duration} hours`,
    };
    tabledata.value[editingIndex.value] = updatedTask;


    const row = table.value.getRow(updatedTask.id);
    if (row) row.update(updatedTask);

    notify("positive", "Task Updated Successfully");
  } else {

    const newId = "PO-" + (tabledata.value.length + 101);

    const newEntry = {
      id: newId,
      ...newTask.value,
      duration: `${newTask.value.duration} hours`,
    };


    tabledata.value.push(newEntry);


    table.value.addRow(newEntry, false);

    notify("positive", "New Task Added Successfully");
  }

  closeDialog();
};

const statusFormatter = (cell) => {
  const value = cell.getValue() || "";
  const colors = {
    "Todo": "#9c4141",
    "In Progress": "#6b8ba4",
    "Review": "#a084ca",
    "Done": "#4a8a59",
  };
  const bg = colors[value] || "#777";
  return `<span style="display:inline-block;padding:3px 8px;border-radius:4px;color:white;background-color:${bg};font-weight:500; font-size:10px;">${value}</span>`
}


onMounted(() => {

  newTabledata();

  table.value = new Tabulator("#work-order-table", {
    data: tabledata.value,
    height: "100%",
    columnHeaderVertAlign: "center",
    layout: 'fitColumns',
    index: "id",
    width: "100%",
    columns: [
      { title: "ID", field: "id", vertAlign: "middle", widthGrow: 1, /* , vertAlign removed for safety */ },
      { title: "Title", field: "title", vertAlign: "middle", widthGrow: 1.5, },
      // { 
      //   title: "Location", 
      //   field: "location", 
      //   vertAlign: "middle", 
      //  width: 250, 
      //   formatter: (cell) => { 
      //     const text = cell.getValue() || ""; 

      //     return `<div style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${text}</div>` 
      //   }, 
      // },   
      {
        title: "Priority",
        field: "priority",
        vertAlign: "middle",
        widthGrow: 1,
        formatter: (cell) => {
          const value = cell.getValue() || "";
          const colors = {
            Low: "#4a7355",
            Medium: "#a27b4b",
            High: "#a74d4d",
          };
          const bg = colors[value] || "#777";
          return `<span style="display:inline-block;padding:3px 8px;border-radius:4px;color:white;background-color:${bg};font-weight:500; font-size:10px;">${value}</span>`
        },
      },
      {
        title: "Status",
        field: "status",
        widthGrow: 1,
        vertAlign: "middle",
        formatter: (cell) => {
          const value = cell.getValue() || "";
          const colors = {
            "To Do": "#9c4141",
            "In Progress": "#6b8ba4",
            "Review": "#a084ca",
            "Done": "#4a8a59",
          };
          const bg = colors[value] || "#777";
          return `<span style="display:inline-block;padding:3px 8px;border-radius:4px;color:white;background-color:${bg};font-weight:500; font-size:10px;">${value}</span>`
        },
      },
      { title: "Start Date", field: "start", vertAlign: "middle", widthGrow: 1.5, },
      { title: "End Date", field: "end", vertAlign: "middle", widthGrow: 1.5, },
      { title: "Duration", field: "duration", vertAlign: "middle", widthGrow: 0.8, },
      //{ title: "Customers", field: "customers", vertAlign: "middle", widthGrow: 1, },

      {
        title: "Views",
        widthGrow: 0.8,
        headerSort: false,
        vertAlign: "middle",
        hozAlign: "center",
        formatter: () => {
          // Returns the eye icon
          return `<div style="display: flex; align-items: center; justify-content: center; height: 100%;">
                    <i class="material-icons action-icon view-btn" title="View Details" style="color: #4CAF50; cursor: pointer;">visibility</i>
                  </div>`;
        },
        cellClick: (e, cell) => {
          // Check if the icon itself was clicked
          if (e.target.closest(".view-btn")) {
            const rowData = cell.getRow().getData();

            selectedViewData.value = {
              title: `Details for ${rowData.id}`,
              details: "This is the detailed information for the outage. It includes several key points and paragraphs based on your request. You can customize this content by pulling specific data from the clicked row.",
              pointers: [
                "This is the first pointer.",
                "Here is another important point.",
                "Ensure all checks are completed.",
                "This dialog can be closed using the 'X' or the 'Close' button."
              ]
            };

            // Open the dialog
            viewDialog.value = true;
          }
        },
      },
      // END NEW

      {
        title: "Actions",
        widthGrow: 0.8,
        headerSort: false,
        formatter: () => {

          return ` 
            <div style="display: flex; align-items: center; justify-content: left; height: 100%; margin-left:5px; "> 
              <i class="material-icons q-mr-sm action-icon edit-btn" title="Edit Task" style="color: #1976D2; margin-right:1.5rem;">edit</i> 
              <i class="material-icons action-icon delete-btn" title="Delete Task" style="color: #C10015;">delete</i> 
            </div> 
            `;
        },
        cellClick: (e, cell) => {
          const rowData = cell.getRow().getData();
          const index = tabledata.value.findIndex((task) => task.id === rowData.id);

          if (e.target.closest(".edit-btn")) {
            editDialog(rowData, index);
          }
          else if (e.target.closest(".delete-btn")) {
            deleteTask(index);
          }
        },
      },
    ],
  });
});
</script>

<style lang="sass" scoped>


.tabulator-container
  width: 100%
  height: 100%
  background-color: white
  box-shadow: 0 1px 3px rgba(0,0,0,0.1)
  overflow-x: auto


  .q-dark & 
    background-color: #1f1f1f
    color: #e0e0e0
    border: 1px solid #333
    box-shadow: 0 2px 10px rgba(255,255,255,0.05)

.responsive-table 
  width: calc(100vw - 320px)
  height: calc(100vh - 100px)

  @media (max-width: 1023px)
    height: calc(100vh - 158px)
    width: calc(100vw - 48px)
  
  @media (max-width: 600px)
    height: calc(100vh - 150px)
    width: calc(100vw - 48px)

</style>

<style>
:root {
  --form-bg: #ffffff;
  --form-text: #222;
  --form-label-text: #444;
  --input-bg: #ffffff;
  --input-border: #dcdcdc;
  --footer-pagination: #f2f4f7;
  --input-focus-border: #007bff;
  --btn-primary-bg: #007bff;
  --btn-primary-hover-bg: #0069d9;
  --btn-primary-text: #ffffff;
  --btn-secondary-bg: transparent;
  --btn-secondary-text: #555;
  --btn-secondary-border: #ccc;
  --btn-secondary-hover-bg: #f1f1f1;
  --danger-text: #dc3545;
  --modal-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  --modal-header-border: #eee;
  --btn-border-text: #1f3841;
  --btn-background-hover: #1f3841;
  --table-row-even-bg: #f5f5f5;
  --editor-color: rgba(0, 0, 0, 0.6);
}

.body--dark {
  --form-bg: #2d2d2d;
  --form-text: #e0e0e0;
  --form-label-text: #c0c0c0;
  --input-bg: #2d2d2d;
  --input-border: #555;
  --footer-pagination: #1d1d1d;
  --input-focus-border: #0d6efd;
  --btn-secondary-text: #ccc;
  --btn-secondary-border: #555;
  --btn-secondary-hover-bg: #383838;
  --modal-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  --modal-header-border: #444;
  --btn-border-text: #385562;
  --btn-background-hover: #385562;
  --editor-color: rgba(255, 255, 255, 0.7);

}

.body--dark .leaflet-tile {
  filter: invert(100%) hue-rotate(180deg) brightness(85%) contrast(90%);
}

.body--dark .leaflet-container {
  background: #303030;
}

.body--dark .leaflet-control-zoom-in,
.body--dark .leaflet-control-zoom-out,
.body--dark .leaflet-control-attribution {
  filter: invert(100%) hue-rotate(180deg);
}

.custom-create-btn {
  background-color: transparent;
  color: var(--btn-border-text);
  padding: 3px 12px;
  /* border-radius: 4px; */
  border: 2px solid var(--btn-border-text);
  cursor: pointer;
  font-size: 14px;
  font-weight: 700;
  text-transform: uppercase;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s ease;
}

.custom-create-btn:hover {
  background-color: var(--btn-background-hover);
  border: 1px solid var(--btn-background-hover);
  color: white;
}

.modal-overlay {
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
  backdrop-filter: blur(4px);
  margin-bottom: 3rem;
}

.modal-content {
  background-color: var(--form-bg);
  color: var(--form-text);
  width: 450px;
  max-width: 90vw;
  box-shadow: var(--modal-shadow);
  animation: modal-fade-in 0.3s ease-out;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 4px 24px;
  border-bottom: 1px solid var(--modal-header-border);
}

.modal-header h3 {
  margin: 0;
  font-size: 1.5rem;
  font-family: "Roboto", "-apple-system", "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-weight: 600;
  color: var(--form-text);
}

.modal-close-btn {
  background: none;
  border: none;
  font-size: 2rem;
  line-height: 1;
  color: var(--form-label-text);
  cursor: pointer;
  transition: color 0.2s;
}

.modal-close-btn:hover {
  color: var(--form-text);
}

@keyframes modal-fade-in {
  from {
    opacity: 0;
    transform: translateY(-20px) scale(0.98);
  }

  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.custom-form {
  padding: 15px 24px;
  display: flex;
  flex-direction: column;
  gap: 13px;
}

.form-row {
  display: flex;
  gap: 16px;
}

.form-row .form-group {
  flex: 1;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group label {
  margin-bottom: 6px;
  font-weight: 500;
  font-size: 1rem;
  font-family: "Roboto", "-apple-system", "Helvetica Neue", Helvetica, Arial, sans-serif;
  color: var(--form-label-text);
}

.form-group input[type="text"],
.form-group textarea,
.form-group select,
.form-group input[type="date"] {
  width: 100%;
  padding: 10px 6px;
  border: 1px solid var(--input-border);
  background-color: var(--input-bg);
  color: var(--form-text);
  border-radius: 4px;
  font-size: 1rem;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.form-group input[type="text"]::placeholder,
.form-group textarea::placeholder {
  color: #999;
}

.body--dark .form-group input[type="text"]::placeholder,
.body--dark .form-group textarea::placeholder {
  color: #777;
}

.form-group textarea {
  resize: vertical;
  min-height: 80px;
}

.custom-date-input {
  position: relative;
  -webkit-appearance: none;
}

.body--light .custom-date-input::-webkit-calendar-picker-indicator {
  filter: invert(0.3);
}

.body--dark .custom-date-input::-webkit-calendar-picker-indicator {
  filter: invert(0.8);
}

.form-group input:focus,
.form-group textarea:focus,
.form-group select:focus {
  outline: none;
  border-color: var(--input-focus-border);
  box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
}

.error-message {
  color: var(--danger-text);
  font-size: 0.875em;
  margin-top: 4px;
}

.form-group input.has-error,
.form-group select.has-error,
.form-group textarea.has-error {
  border-color: var(--danger-text);
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 8px;
  padding-top: 16px;
  border-top: 1px solid var(--modal-header-border);
}

.form-btn {
  padding: 10px 22px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 400;
  font-family: "Roboto", "-apple-system", "Helvetica Neue", Helvetica, Arial, sans-serif;
  transition: background-color 0.2s, border-color 0.2s;
}

.btn-primary {
  background-color: #122a87;
  color: var(--btn-primary-text);
}

.btn-primary:hover {
  background-color: #0d1f67;
}

.btn-secondary {
  background-color: var(--btn-secondary-bg);
  color: var(--btn-secondary-text);
  border: 1px solid var(--btn-secondary-border);
}

.btn-secondary:hover {
  background-color: var(--btn-secondary-hover-bg);
}

.custom-input .q-field__control {

  background-color: var(--q-color-grey-2);
}

.body--dark .custom-input .q-field__control {
  background-color: #1d1d1d;
}

.custom-card-header {
  color: #3a416f;
}

.body--dark .custom-card-header {
  color: var(--q-color-grey-3);
}

.task-list-card {
  border-radius: 12px;
}

.custom-section-title {
  font-weight: 600;
  font-size: 1.1rem;
  color: #555;
}

.body--dark .custom-section-title {
  color: var(--q-color-grey-3);
}

.input-field {
  padding-top: 0px;
}

.heading {
  font-size: 30px;
  font-weight: 400;
  line-height: 3.125rem;
  letter-spacing: normal;
}

.body--dark {
  color-scheme: dark;
}


.body--dark .form-group label[for="dueDate"] {
  color: #c0c0c0 !important;
}

.body--dark .custom-date-input {

  color: #e0e0e0 !important;
  background-color: ;
  border: 1px solid #555 !important;


  color-scheme: dark !important;
}

.body--dark .custom-date-input::-webkit-calendar-picker-indicator {
  filter: invert(1) !important;
}


.body--dark .custom-date-input::-moz-calendar-picker-indicator {
  filter: invert(1) !important;
}

.heading {
  font-size: 20px;
}

.sub-head {
  font-size: 13px;
  margin-top: -10px;
}

.q-pa-md {
  padding: 10px 16px !important;
  margin-bottom: -11px !important;
}


.tabulator-footer {
  background-color: #ffffff !important;
  border-top: 1px solid #e0e0e0 !important;
  /* padding: 8px 12px !important; */
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif !important;
  margin: 0px !important;

}

.tabulator-paginator {
  color: #333 !important;
  font-size: 13px !important;
  display: flex !important;
  align-items: center !important;
  /* gap: 8px !important; */
  justify-content: end !important;
}

.tabulator-page-size {
  display: inline-block !important;
  margin: 0 4px !important;
  padding: 4px 8px !important;
  border: 1px solid #d0d0d0 !important;
  border-radius: 4px !important;
  background-color: #ffffff !important;
  color: #333 !important;
  cursor: pointer !important;
  transition: all 0.2s ease !important;
}

.tabulator-page-size:hover {
  border-color: #999 !important;
  background-color: #f5f5f5 !important;
}

.tabulator-pages {
  display: inline-flex !important;
  gap: 4px !important;
  margin: 0 8px !important;
}

.tabulator-page {
  display: inline-flex !important;
  align-items: center !important;
  justify-content: center !important;
  min-width: 32px !important;
  height: 32px !important;
  padding: 0 8px !important;
  border: 1px solid #d0d0d0 !important;
  border-radius: 4px !important;
  background-color: #ffffff !important;
  color: #555 !important;
  cursor: pointer !important;
  transition: all 0.2s ease !important;
  font-weight: 500 !important;
}

.tabulator .tabulator-footer .tabulator-paginator label {
  color: #555 !important;

}

.tabulator-page:hover:not(.disabled) {
  background-color: #f5f5f5 !important;
  border-color: #999 !important;
  color: #333 !important;
}

.tabulator-page.active {
  background-color: #333 !important;
  border-color: #333 !important;
  color: #ffffff !important;
  font-weight: 600 !important;
}

.tabulator-page.disabled {
  opacity: 0.4 !important;
  cursor: not-allowed !important;
  pointer-events: none !important;
}

.tabulator-page-counter {
  color: #666 !important;
  font-size: 13px !important;
  margin: 0 8px !important;
}

.body--dark .tabulator-footer {
  background-color: #1e1e1e !important;
  border-top: 1px solid #444 !important;
}


.body--dark .tabulator-paginator {
  color: #f5f5f5 !important;
}

.body--dark .tabulator-page-size {
  border: 1px solid #555 !important;
  background-color: #2a2a2a !important;
  color: #f5f5f5 !important;
}

.body--dark .tabulator-page-size:hover {
  border-color: #777 !important;
  background-color: #333 !important;
}

.body--dark .tabulator-page {
  border: 1px solid #555 !important;
  background-color: #2a2a2a !important;
  color: #b0b0b0 !important;
}

.body--dark .tabulator-page:hover:not(.disabled) {
  background-color: #333 !important;
  border-color: #777 !important;
  color: #f5f5f5 !important;
}

.body--dark .tabulator-page.active {
  background-color: #bdd9f5 !important;
  border-color: #bdd9f5 !important;
  color: #1e1e1e !important;
  font-weight: 600 !important;
}

.body--dark .tabulator-page.disabled {
  opacity: 0.3 !important;
}

.body--dark .tabulator-page-counter {
  color: #b0b0b0 !important;
}

.tabulator-page[data-page="first"]::before {
  content: "«";
  font-weight: bold;
}

.tabulator-page[data-page="prev"]::before {
  content: "‹";
  font-weight: bold;
}

.tabulator-page[data-page="next"]::before {
  content: "«";
  font-weight: bold;
}

.tabulator-page[data-page="last"]::before {
  content: "»";
  font-weight: bold;
}


.tabulator .tabulator-header .tabulator-col .tabulator-col-content {

  padding: 7px 0px 4px 4px !important;
}

.tabulator-row {
  min-height: 19px;
}

.q-splitter_panel .q-splitter_after .col {
  width: fit-content !important;
}

.q-card__section--vert {
  padding: 12px 12px 4px 12px;
}

.q-field--dark .q-field__control:before {
  border-color: #90a4ae !important;
}

.tabulator .tabulator-footer .tabulator-footer-contents {
  background-color: var(--footer-pagination);
}

/* .q-card__section{
    background-color: var(--btn-background-hover);
} */

.q-dialog__inner>div {
  border-radius: 0px;
}

.tabulator-row.tabulator-row-even {
  background-color: var(--table-row-even-bg) !important;
}

/* .reverse{
    flex-direction: column-reverse !important;
} */
.text-h6 {
  font-size: 1.2rem !important;
}

.body--dark .tabulator-row .tabulator-cell {
  color: #90a4ae !important;
}

/* .q-field__control{
    height: 40px !important;
}
.q-field--auto-height .q-field__control, .q-field--auto-height .q-field__native{
    min-height: 40px !important;
} */
.chart-height {

  height: calc(100vh - 77.5vh) !important;
  min-height: calc(100vh - 78vh) !important;

}

.bar-height {

  height: calc(100vh - 80vh) !important;
  min-height: calc(100vh - 80vh) !important;

}
</style>