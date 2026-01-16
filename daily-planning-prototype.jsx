import React, { useState } from 'react';

// Status colors for assignments
const statusColors = {
  pending: { bg: '#FEFCBF', color: '#975A16', label: 'Pending' },
  in_transit: { bg: '#BEE3F8', color: '#2B6CB0', label: 'In Transit' },
  delivered: { bg: '#C6F6D5', color: '#276749', label: 'Delivered' },
};

// Sample data based on the screenshot
const initialJobs = [
  {
    id: 1,
    customer: 'Bommarito Construction',
    jobName: 'Bommarito - Midwest Petroleum Ballwin',
    commodity: 'Dig Out',
    commodityColor: '#4A5568',
    pickup: { name: 'Midwest Petroleum Ballwin', type: 'pickup' },
    dropoff: null,
    notes: 'Foreman: Mike Reynolds. Gate code 4521.',
    startTime: '6:00 AM',
    targets: [],
    references: [
      { type: 'PO', value: '2026-0142' },
    ],
    tags: ['Midwest Petro'],
    rateSchedule: 'Bommarito - Standard Haul',
    charges: [
      { type: 'Haul charge', description: '', qty: 0, unit: 'Tons', rate: 8.50, amount: 0 },
    ],
    assignments: [
      { id: 75, driver: 'Wills', loads: 1, tonnage: 22, recurring: false, status: 'delivered' },
      { id: 145, driver: 'Elliott', loads: 1, tonnage: 24, recurring: false, status: 'in_transit' },
      { id: 205, driver: 'Dobbs', loads: 1, tonnage: 21, recurring: false, status: 'pending' },
    ],
  },
  {
    id: 2,
    customer: 'Bommarito Construction',
    jobName: 'Bommarito - Dogwood Commons Haul Off',
    commodity: 'Dig Out',
    commodityColor: '#4A5568',
    pickup: { name: 'Dogwood Commons', type: 'pickup' },
    dropoff: null,
    notes: '',
    startTime: '6:30 AM',
    targets: [{ unit: 'loads', value: 5 }],
    references: [],
    tags: [],
    rateSchedule: null,
    charges: [],
    assignments: [
      { id: 105, driver: 'Wurst', loads: 1, tonnage: 23, recurring: false, status: 'delivered' },
      { id: 192, driver: 'Torque', loads: 1, tonnage: 20, recurring: false, status: 'in_transit' },
      { id: 165, driver: 'Wills', loads: 1, tonnage: 22, recurring: false, status: 'pending' },
    ],
  },
  {
    id: 3,
    customer: 'Bommarito Construction',
    jobName: 'Dig Out',
    commodity: 'Dig Out',
    commodityColor: '#4A5568',
    pickup: { name: null, type: 'pickup' },
    dropoff: { name: 'Rock Hill Landfill', type: 'dropoff' },
    notes: 'Use west entrance only',
    startTime: '7:00 AM',
    targets: [{ unit: 'tonnage', value: 100 }],
    references: [
      { type: 'PO', value: '2026-0143' },
    ],
    tags: [],
    rateSchedule: null,
    charges: [],
    assignments: [
      { id: 188, driver: 'Clutch', loads: 1, tonnage: 24, recurring: false, status: 'pending' },
    ],
  },
  {
    id: 4,
    customer: 'Eco Material Technologies Inc.',
    jobName: 'Labadie to Buzzi MJ',
    commodity: 'Bottom Ash',
    commodityColor: '#D69E2E',
    pickup: { name: 'Labadie Power Plant Rd', type: 'pickup' },
    dropoff: { name: 'River Cement Buzzi', type: 'dropoff' },
    notes: 'Foreman: Jerry Walsh. Call 30 min ahead.',
    startTime: null, // Variable times - see assignments
    targets: [{ unit: 'tonnage', value: 500 }, { unit: 'trucks', value: 5 }],
    references: [
      { type: 'Contract', value: 'CT-2025-889' },
    ],
    tags: ['Labadie Contract', 'Jerry W'],
    rateSchedule: 'Eco Material - Labadie Contract',
    charges: [
      { type: 'Haul charge', description: '', qty: 0, unit: 'Tons', rate: 5.55, amount: 0 },
      { type: 'Fuel surcharge', description: '12%', qty: 0, unit: 'Percent', rate: 12, amount: 0 },
    ],
    assignments: [
      { id: 180, driver: 'Haithcoat', loads: 3, tonnage: 66, recurring: true, status: 'in_transit', startTime: '5:30 AM' },
      { id: null, driver: 'Bollinger', loads: 3, tonnage: 69, recurring: true, status: 'in_transit', startTime: '6:00 AM' },
      { id: 170, driver: 'Kassen', loads: 3, tonnage: 63, recurring: true, status: 'delivered', startTime: '6:00 AM' },
      { id: 110, driver: 'Ehrenreich', loads: 3, tonnage: 72, recurring: true, status: 'delivered', startTime: '7:30 AM' },
      { id: 380, driver: 'Dean', loads: 1, tonnage: 25, recurring: false, status: 'pending', startTime: '9:00 AM' },
    ],
  },
  {
    id: 5,
    customer: 'Goodwin Bros. Construction',
    jobName: 'Project Redbird N Phase 2 Bridge (Rock)',
    commodity: '6 Minus',
    commodityColor: '#805AD5',
    pickup: { name: 'New Frontier Festus', type: 'pickup' },
    dropoff: { name: 'Calvary Church Rd Bridge', type: 'dropoff' },
    notes: 'Bridge project - check in with site super',
    startTime: '6:00 AM',
    targets: [{ unit: 'trucks', value: 2 }],
    references: [],
    tags: ['Redbird Phase 2'],
    rateSchedule: null,
    charges: [],
    assignments: [
      { id: 15, driver: 'Gallaway', loads: 1, tonnage: 22, recurring: true, status: 'in_transit' },
    ],
  },
  {
    id: 6,
    customer: 'Goodwin Bros. Construction',
    jobName: 'Project Redbird N Phase 2 Bridge (Rock)',
    commodity: '6 Minus',
    commodityColor: '#805AD5',
    pickup: { name: 'New Frontier Festus', type: 'pickup' },
    dropoff: { name: 'Calvary Church Rd Bridge', type: 'dropoff' },
    notes: 'Foreman: Dale Cooper',
    startTime: '7:00 AM',
    targets: [],
    references: [
      { type: 'PO', value: 'GBC-017' },
    ],
    tags: [],
    rateSchedule: 'Goodwin Bros - Redbird',
    charges: [
      { type: 'Haul charge', description: '', qty: 0, unit: 'Tons', rate: 7.25, amount: 0 },
      { type: 'Material', description: '6 Minus rock', qty: 0, unit: 'Tons', rate: 12.00, amount: 0 },
    ],
    assignments: [
      { id: 15, driver: 'Gallaway', loads: 7, tonnage: 154, recurring: true, status: 'delivered' },
    ],
  },
];

// Jobs for January 16th - all pending since they're future/penciled in
const jan16Jobs = [
  {
    id: 101,
    customer: 'Bommarito Construction',
    jobName: 'Bommarito - West County Dig',
    commodity: 'Dig Out',
    commodityColor: '#4A5568',
    pickup: { name: 'West County Mall Site', type: 'pickup' },
    dropoff: { name: 'Rock Hill Landfill', type: 'dropoff' },
    notes: 'Foreman: Steve Martinez. Start 6am sharp.',
    startTime: '6:00 AM',
    targets: [{ unit: 'trucks', value: 6 }],
    references: [
      { type: 'PO', value: '2026-0150' },
    ],
    tags: ['West County'],
    rateSchedule: 'Bommarito - Standard Haul',
    charges: [
      { type: 'Haul charge', description: '', qty: 0, unit: 'Tons', rate: 8.50, amount: 0 },
    ],
    assignments: [
      { id: 75, driver: 'Wills', loads: 2, tonnage: 44, recurring: false, status: 'pending' },
      { id: 145, driver: 'Elliott', loads: 2, tonnage: 44, recurring: false, status: 'pending' },
      { id: 205, driver: 'Dobbs', loads: 2, tonnage: 44, recurring: false, status: 'pending' },
    ],
  },
  {
    id: 102,
    customer: 'Eco Material Technologies Inc.',
    jobName: 'Labadie to River Cement',
    commodity: 'Bottom Ash',
    commodityColor: '#D69E2E',
    pickup: { name: 'Labadie Power Plant Rd', type: 'pickup' },
    dropoff: { name: 'River Cement Buzzi', type: 'dropoff' },
    notes: 'Same crew as yesterday',
    startTime: '5:30 AM',
    targets: [{ unit: 'tonnage', value: 400 }],
    references: [
      { type: 'PO', value: 'ECO-78445' },
    ],
    tags: ['River Cement'],
    rateSchedule: 'Eco Material - Labadie Contract',
    charges: [
      { type: 'Haul charge', description: '', qty: 0, unit: 'Tons', rate: 5.55, amount: 0 },
      { type: 'Fuel surcharge', description: '12%', qty: 0, unit: 'Percent', rate: 12, amount: 0 },
    ],
    assignments: [
      { id: 180, driver: 'Haithcoat', loads: 4, tonnage: 88, recurring: true, status: 'pending' },
      { id: 170, driver: 'Kassen', loads: 4, tonnage: 88, recurring: true, status: 'pending' },
      { id: 110, driver: 'Ehrenreich', loads: 4, tonnage: 88, recurring: true, status: 'pending' },
    ],
  },
  {
    id: 103,
    customer: 'Holcim',
    jobName: 'Marissa Quarry Run',
    commodity: 'Limestone',
    commodityColor: '#A0AEC0',
    pickup: { name: 'Marissa Quarry', type: 'pickup' },
    dropoff: { name: 'Holcim Plant', type: 'dropoff' },
    notes: '',
    startTime: '7:00 AM',
    targets: [{ unit: 'trucks', value: 4 }, { unit: 'loads', value: 12 }],
    references: [],
    tags: [],
    rateSchedule: null,
    charges: [],
    assignments: [
      { id: 220, driver: 'Martinez', loads: 3, tonnage: 66, recurring: true, status: 'pending' },
      { id: 225, driver: 'Thompson', loads: 3, tonnage: 66, recurring: true, status: 'pending' },
    ],
  },
  {
    id: 104,
    customer: 'US Silica',
    jobName: 'US Silica - Pacific Distribution',
    commodity: 'Sand',
    commodityColor: '#ED8936',
    pickup: { name: 'US Silica Mine', type: 'pickup' },
    dropoff: { name: 'Pacific Ave Depot', type: 'dropoff' },
    notes: 'Foreman: Bill Tucker. Weigh tickets required.',
    startTime: '8:00 AM',
    targets: [{ unit: 'tonnage', value: 250 }],
    references: [
      { type: 'PO', value: 'USS-4521' },
    ],
    tags: ['Added', 'Bill T'],
    rateSchedule: null,
    charges: [],
    assignments: [
      { id: 310, driver: 'Roberts', loads: 2, tonnage: 50, recurring: false, status: 'pending' },
    ],
  },
];

// Jobs for January 14th - yesterday, mostly completed
const jan14Jobs = [
  {
    id: 201,
    customer: 'Bommarito Construction',
    jobName: 'Bommarito - Highway 40 Expansion',
    commodity: 'Dig Out',
    commodityColor: '#4A5568',
    pickup: { name: 'Highway 40 Site', type: 'pickup' },
    dropoff: { name: 'Rock Hill Landfill', type: 'dropoff' },
    notes: 'Foreman: Mike Reynolds. Completed early.',
    startTime: '6:00 AM',
    targets: [{ unit: 'trucks', value: 4 }, { unit: 'tonnage', value: 200 }],
    references: [
      { type: 'PO', value: '2026-0138' },
    ],
    tags: [],
    rateSchedule: 'Bommarito - Standard Haul',
    charges: [
      { type: 'Haul charge', description: '', qty: 0, unit: 'Tons', rate: 8.50, amount: 0 },
    ],
    assignments: [
      { id: 75, driver: 'Wills', loads: 3, tonnage: 66, recurring: false, status: 'delivered' },
      { id: 145, driver: 'Elliott', loads: 3, tonnage: 68, recurring: false, status: 'delivered' },
      { id: 205, driver: 'Dobbs', loads: 3, tonnage: 64, recurring: false, status: 'delivered' },
      { id: 110, driver: 'Ehrenreich', loads: 2, tonnage: 44, recurring: false, status: 'delivered' },
    ],
  },
  {
    id: 202,
    customer: 'Eco Material Technologies Inc.',
    jobName: 'Labadie to Buzzi MJ',
    commodity: 'Bottom Ash',
    commodityColor: '#D69E2E',
    pickup: { name: 'Labadie Power Plant Rd', type: 'pickup' },
    dropoff: { name: 'River Cement Buzzi', type: 'dropoff' },
    notes: 'Target exceeded - customer happy',
    startTime: '5:30 AM',
    targets: [{ unit: 'tonnage', value: 450 }],
    references: [
      { type: 'PO', value: 'ECO-78430' },
    ],
    tags: ['Buzzi MJ'],
    rateSchedule: 'Eco Material - Labadie Contract',
    charges: [
      { type: 'Haul charge', description: '', qty: 0, unit: 'Tons', rate: 5.55, amount: 0 },
      { type: 'Fuel surcharge', description: '12%', qty: 0, unit: 'Percent', rate: 12, amount: 0 },
    ],
    assignments: [
      { id: 180, driver: 'Haithcoat', loads: 5, tonnage: 110, recurring: true, status: 'delivered' },
      { id: 170, driver: 'Kassen', loads: 5, tonnage: 115, recurring: true, status: 'delivered' },
      { id: 380, driver: 'Dean', loads: 5, tonnage: 108, recurring: true, status: 'delivered' },
      { id: null, driver: 'Bollinger', loads: 5, tonnage: 120, recurring: true, status: 'delivered' },
    ],
  },
  {
    id: 203,
    customer: 'Goodwin Bros. Construction',
    jobName: 'Project Redbird N Phase 2 Bridge',
    commodity: '6 Minus',
    commodityColor: '#805AD5',
    pickup: { name: 'New Frontier Festus', type: 'pickup' },
    dropoff: { name: 'Calvary Church Rd Bridge', type: 'dropoff' },
    notes: 'Came up short - rain delay',
    startTime: '7:00 AM',
    targets: [{ unit: 'trucks', value: 3 }, { unit: 'loads', value: 15 }],
    references: [
      { type: 'PO', value: 'GBC-016' },
    ],
    tags: [],
    rateSchedule: 'Goodwin Bros - Redbird',
    charges: [
      { type: 'Haul charge', description: '', qty: 0, unit: 'Tons', rate: 7.25, amount: 0 },
      { type: 'Material', description: '6 Minus rock', qty: 0, unit: 'Tons', rate: 12.00, amount: 0 },
    ],
    assignments: [
      { id: 15, driver: 'Gallaway', loads: 4, tonnage: 88, recurring: true, status: 'delivered' },
      { id: 105, driver: 'Runner', loads: 3, tonnage: 66, recurring: false, status: 'delivered' },
    ],
  },
  {
    id: 204,
    customer: 'Holcim',
    jobName: 'Ste. Genevieve Plant Run',
    commodity: 'Limestone',
    commodityColor: '#A0AEC0',
    pickup: { name: 'Ste. Genevieve Quarry', type: 'pickup' },
    dropoff: { name: 'Holcim Plant', type: 'dropoff' },
    notes: '',
    startTime: '6:30 AM',
    targets: [{ unit: 'tonnage', value: 300 }],
    references: [],
    tags: [],
    rateSchedule: null,
    charges: [],
    assignments: [
      { id: 220, driver: 'Martinez', loads: 4, tonnage: 100, recurring: true, status: 'delivered' },
      { id: 225, driver: 'Thompson', loads: 4, tonnage: 102, recurring: true, status: 'delivered' },
      { id: 215, driver: 'Gravel', loads: 4, tonnage: 98, recurring: true, status: 'delivered' },
    ],
  },
];

const commodityOptions = [
  { label: 'Dig Out', color: '#4A5568', emoji: '⛏️' },
  { label: 'Bottom Ash', color: '#D69E2E', emoji: '🔶' },
  { label: '6 Minus', color: '#805AD5', emoji: '🪨' },
  { label: 'Sand', color: '#ED8936', emoji: '🏖️' },
  { label: 'Gravel', color: '#718096', emoji: '🪨' },
  { label: 'Topsoil', color: '#48BB78', emoji: '🌱' },
  { label: 'Rip Rap', color: '#4299E1', emoji: '🧱' },
  { label: 'Limestone', color: '#A0AEC0', emoji: '🏔️' },
];

const locationOptions = [
  'Midwest Petroleum Ballwin',
  'Dogwood Commons',
  'Rock Hill Landfill',
  'Labadie Power Plant Rd',
  'Labadie Power Plant',
  'River Cement Buzzi',
  'New Frontier Festus',
  'Calvary Church Rd Bridge',
  'St. Louis Quarry',
  'Jefferson County Pit',
  'Arnold Materials',
  'Buzzi KA Plant',
  'US Silica Mine',
  'Various',
  'Marissa Quarry',
  'Holcim Plant',
  'West County Mall Site',
  'Pacific Ave Depot',
];

const unitTypes = [
  { key: 'tonnage', label: 'Tonnage', suffix: 'tons' },
  { key: 'trucks', label: 'Trucks', suffix: 'trucks' },
  { key: 'loads', label: 'Loads', suffix: 'loads' },
];

// Reference number types that can be added to jobs
const referenceTypes = [
  'PO',
  'Job Code',
  'Contract',
  'Ticket',
  'Work Order',
  'Invoice',
];

// Sample templates
const jobTemplates = [
  {
    id: 't1',
    name: 'Labadie to Buzzi KA',
    customer: 'Buzzi Unicem',
    pickup: 'Labadie Power Plant',
    dropoff: 'Buzzi KA Plant',
    commodity: 'Bottom Ash',
    commodityColor: '#D69E2E',
  },
  {
    id: 't2',
    name: 'US Silica Standard',
    customer: 'US Silica',
    pickup: 'US Silica Mine',
    dropoff: 'Various',
    commodity: 'Sand',
    commodityColor: '#ED8936',
  },
  {
    id: 't3',
    name: 'Marissa to Holcim',
    customer: 'Holcim',
    pickup: 'Marissa Quarry',
    dropoff: 'Holcim Plant',
    commodity: 'Limestone',
    commodityColor: '#A0AEC0',
  },
  {
    id: 't4',
    name: 'Bommarito Dogwood Haul',
    customer: 'Bommarito Construction',
    pickup: 'Dogwood Commons',
    dropoff: 'Rock Hill Landfill',
    commodity: 'Dig Out',
    commodityColor: '#4A5568',
  },
  {
    id: 't5',
    name: 'Goodwin Bridge Rock',
    customer: 'Goodwin Bros. Construction',
    pickup: 'New Frontier Festus',
    dropoff: 'Calvary Church Rd Bridge',
    commodity: '6 Minus',
    commodityColor: '#805AD5',
  },
];

// Customer options for the form
const customerOptions = [
  'Bommarito Construction',
  'Eco Material Technologies Inc.',
  'Goodwin Bros. Construction',
  'Buzzi Unicem',
  'US Silica',
  'Holcim',
];

// All unique customers for filtering
const allCustomers = [
  'Bommarito Construction',
  'Eco Material Technologies Inc.',
  'Goodwin Bros. Construction',
  'Buzzi Unicem',
  'US Silica',
  'Holcim',
];

// Driver pool grouped by fleet
const driverPool = {
  'BROKERED GUYS': [
    { id: 'bg1', name: 'Jimmy Freightwell', truckId: null },
    { id: 'bg2', name: 'Patrick Wilson', truckId: null, note: 'OFF' },
    { id: 'bg3', name: 'Rusty Gearhart', truckId: null },
    { id: 'bg4', name: 'Carl Bridgestone', truckId: null },
  ],
  'JW DRIVERS': [
    { id: 'jw1', name: 'Buck Diesel', truckId: 180 },
    { id: 'jw2', name: 'Crank Stevenson', truckId: 145, note: 'SERVICE til 11am' },
    { id: 'jw3', name: 'Hank Axleman', truckId: 170 },
    { id: 'jw4', name: 'Tex Mudflap', truckId: 205 },
    { id: 'jw5', name: 'Billy Clutch', truckId: 188 },
    { id: 'jw6', name: 'Randy Torque', truckId: 192 },
  ],
  'OTR': [
    { id: 'otr1', name: 'Big Tony', truckId: 310, note: 'OFF - back Mon' },
    { id: 'otr2', name: 'Biggie Loadhauler', truckId: 75 },
    { id: 'otr3', name: 'Road Runner', truckId: 105 },
    { id: 'otr4', name: 'Smokey Barnes', truckId: 112 },
  ],
  'LOCAL HAULERS': [
    { id: 'lh1', name: 'Mike Wills', truckId: 165 },
    { id: 'lh2', name: 'Dave Elliott', truckId: 110 },
    { id: 'lh3', name: 'Sam Goforth', truckId: null, note: 'SICK' },
    { id: 'lh4', name: 'Joe Kassen', truckId: 380 },
    { id: 'lh5', name: 'Pete Gravel', truckId: 215 },
    { id: 'lh6', name: 'Tom Ashby', truckId: 220 },
  ],
};

export default function DailyPlanningPrototype() {
  // Date and filter state
  const [currentDate, setCurrentDate] = useState(new Date(2026, 0, 15)); // Jan 15, 2026
  const [selectedCustomers, setSelectedCustomers] = useState([]); // empty = all
  const [showCustomerDropdown, setShowCustomerDropdown] = useState(false);
  const [selectedJobIds, setSelectedJobIds] = useState([]); // for bulk operations
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState('customer-asc');

  // View config settings
  const [showConfigPanel, setShowConfigPanel] = useState(false);
  const [viewConfig, setViewConfig] = useState({
    showStartTimes: false,
    showReferences: false,
    showNotes: true,
    showCharges: false,
    showTags: false,
    showCommodity: true,
  });
  
  // Get jobs for current date
  const getJobsForDate = (date) => {
    const month = date.getMonth();
    const day = date.getDate();
    if (month === 0 && day === 14) {
      return jan14Jobs;
    } else if (month === 0 && day === 15) {
      return initialJobs;
    } else if (month === 0 && day === 16) {
      return jan16Jobs;
    }
    return []; // No jobs for other dates
  };
  
  const [jobs, setJobs] = useState(getJobsForDate(currentDate));
  const [selectedJob, setSelectedJob] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [newTargetUnit, setNewTargetUnit] = useState('');
  const [newTargetValue, setNewTargetValue] = useState('');
  
  // Create modal state
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [createMode, setCreateMode] = useState('template'); // 'template' or 'scratch'
  const [templateSearch, setTemplateSearch] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [newJobForm, setNewJobForm] = useState({
    customer: '',
    pickup: '',
    dropoff: '',
    commodity: '',
    commodityColor: '',
    targets: [],
  });
  const [newJobTargetUnit, setNewJobTargetUnit] = useState('');
  const [newJobTargetValue, setNewJobTargetValue] = useState('');

  // Assign driver modal state
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [assigningJobId, setAssigningJobId] = useState(null);
  const [driverSearch, setDriverSearch] = useState('');
  const [selectedDrivers, setSelectedDrivers] = useState([]); // [{driverId, name, truckId, loads, recurring}]
  const [expandedFleets, setExpandedFleets] = useState(Object.keys(driverPool));

  // Copy forward modal state
  const [showCopyModal, setShowCopyModal] = useState(false);
  const [copyingJob, setCopyingJob] = useState(null);
  const [copyingJobs, setCopyingJobs] = useState([]); // for bulk copy
  const [copyMode, setCopyMode] = useState('tomorrow'); // 'tomorrow' or 'range'
  const [copyStartDate, setCopyStartDate] = useState('');
  const [copyEndDate, setCopyEndDate] = useState('');
  const [copyIncludeDrivers, setCopyIncludeDrivers] = useState(true);
  const [copyIncludeTargets, setCopyIncludeTargets] = useState(true);
  const [copyTargets, setCopyTargets] = useState([]);
  const [copyNewTargetUnit, setCopyNewTargetUnit] = useState('');
  const [copyNewTargetValue, setCopyNewTargetValue] = useState('');

  // Message modal state
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [messagingJob, setMessagingJob] = useState(null);
  const [messageText, setMessageText] = useState('');
  const [messageMode, setMessageMode] = useState('group'); // 'group' or 'individual'

  const handleJobClick = (job) => {
    setSelectedJob(job);
    setEditForm({
      jobName: job.jobName,
      commodity: job.commodity,
      commodityColor: job.commodityColor,
      pickupName: job.pickup?.name || '',
      dropoffName: job.dropoff?.name || '',
      targets: [...job.targets],
      references: [...(job.references || [])],
      startTime: job.startTime || '',
      rateSchedule: job.rateSchedule || null,
      charges: [...(job.charges || [])],
    });
    setNewTargetUnit('');
    setNewTargetValue('');
  };

  const handleClosePanel = () => {
    setSelectedJob(null);
    setEditForm({});
    setNewTargetUnit('');
    setNewTargetValue('');
    setNewRefType('');
    setNewRefValue('');
  };

  // Date navigation
  const formatDate = (date) => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const day = date.getDate();
    const suffix = day === 1 || day === 21 || day === 31 ? 'st' : 
                   day === 2 || day === 22 ? 'nd' : 
                   day === 3 || day === 23 ? 'rd' : 'th';
    return `${months[date.getMonth()]} ${day}${suffix}, ${date.getFullYear()}`;
  };

  const goToPreviousDay = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() - 1);
    setCurrentDate(newDate);
    setJobs(getJobsForDate(newDate));
    setSelectedJob(null);
    setSelectedJobIds([]);
  };

  const goToNextDay = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + 1);
    setCurrentDate(newDate);
    setJobs(getJobsForDate(newDate));
    setSelectedJob(null);
    setSelectedJobIds([]);
  };

  const goToToday = () => {
    const today = new Date(2026, 0, 15); // Jan 15, 2026
    setCurrentDate(today);
    setJobs(getJobsForDate(today));
    setSelectedJob(null);
    setSelectedJobIds([]);
  };

  // Customer filter
  const toggleCustomer = (customer) => {
    if (selectedCustomers.includes(customer)) {
      setSelectedCustomers(selectedCustomers.filter(c => c !== customer));
    } else {
      setSelectedCustomers([...selectedCustomers, customer]);
    }
  };

  const clearCustomerFilter = () => {
    setSelectedCustomers([]);
  };

  const getFilteredJobs = () => {
    let filtered = jobs;
    
    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(job => 
        job.customer.toLowerCase().includes(query) ||
        job.jobName.toLowerCase().includes(query) ||
        job.commodity.toLowerCase().includes(query) ||
        job.pickup?.name?.toLowerCase().includes(query) ||
        job.dropoff?.name?.toLowerCase().includes(query) ||
        job.tags?.some(tag => tag.toLowerCase().includes(query)) ||
        job.references?.some(ref => ref.value.toLowerCase().includes(query))
      );
    }
    
    // Apply customer filter
    if (selectedCustomers.length > 0) {
      filtered = filtered.filter(job => selectedCustomers.includes(job.customer));
    }
    
    // Apply sort order
    return filtered.sort((a, b) => {
      switch (sortOrder) {
        case 'customer-asc':
          return a.customer.localeCompare(b.customer);
        case 'customer-desc':
          return b.customer.localeCompare(a.customer);
        case 'trucks-desc':
          return b.assignments.length - a.assignments.length;
        case 'trucks-asc':
          return a.assignments.length - b.assignments.length;
        case 'tonnage-desc':
          const aTonnage = a.assignments.reduce((sum, ass) => sum + (ass.tonnage || 0), 0);
          const bTonnage = b.assignments.reduce((sum, ass) => sum + (ass.tonnage || 0), 0);
          return bTonnage - aTonnage;
        case 'tonnage-asc':
          const aTon = a.assignments.reduce((sum, ass) => sum + (ass.tonnage || 0), 0);
          const bTon = b.assignments.reduce((sum, ass) => sum + (ass.tonnage || 0), 0);
          return aTon - bTon;
        case 'time-asc':
          const aTime = a.startTime || '99:99';
          const bTime = b.startTime || '99:99';
          return aTime.localeCompare(bTime);
        case 'time-desc':
          const aT = a.startTime || '00:00';
          const bT = b.startTime || '00:00';
          return bT.localeCompare(aT);
        default:
          return a.customer.localeCompare(b.customer);
      }
    });
  };

  const getCustomerFilterLabel = () => {
    if (selectedCustomers.length === 0) {
      return 'All Customers';
    } else if (selectedCustomers.length === 1) {
      return selectedCustomers[0];
    } else {
      return `${selectedCustomers.length} customers`;
    }
  };

  // Bulk selection functions
  const toggleJobSelection = (jobId, e) => {
    e.stopPropagation();
    if (selectedJobIds.includes(jobId)) {
      setSelectedJobIds(selectedJobIds.filter(id => id !== jobId));
    } else {
      setSelectedJobIds([...selectedJobIds, jobId]);
    }
  };

  const selectAllJobs = () => {
    const filteredJobIds = getFilteredJobs().map(j => j.id);
    setSelectedJobIds(filteredJobIds);
  };

  const clearJobSelection = () => {
    setSelectedJobIds([]);
  };

  const getSelectedJobs = () => {
    return jobs.filter(j => selectedJobIds.includes(j.id));
  };

  const handleAddTarget = () => {
    if (newTargetUnit && newTargetValue) {
      const exists = editForm.targets.some(t => t.unit === newTargetUnit);
      if (!exists) {
        setEditForm({
          ...editForm,
          targets: [...editForm.targets, { unit: newTargetUnit, value: parseInt(newTargetValue) }]
        });
        setNewTargetUnit('');
        setNewTargetValue('');
      }
    }
  };

  const handleRemoveTarget = (unitToRemove) => {
    setEditForm({
      ...editForm,
      targets: editForm.targets.filter(t => t.unit !== unitToRemove)
    });
  };

  const handleUpdateTargetValue = (unit, newValue) => {
    setEditForm({
      ...editForm,
      targets: editForm.targets.map(t => 
        t.unit === unit ? { ...t, value: parseInt(newValue) || 0 } : t
      )
    });
  };

  const handleSave = () => {
    setJobs(jobs.map(job => {
      if (job.id === selectedJob.id) {
        const selectedCommodity = commodityOptions.find(c => c.label === editForm.commodity);
        return {
          ...job,
          jobName: editForm.jobName || job.jobName,
          commodity: editForm.commodity,
          commodityColor: selectedCommodity?.color || job.commodityColor,
          pickup: { ...job.pickup, name: editForm.pickupName || null },
          dropoff: editForm.dropoffName ? { name: editForm.dropoffName, type: 'dropoff' } : null,
          targets: editForm.targets,
          references: editForm.references || [],
          startTime: editForm.startTime || null,
          rateSchedule: editForm.rateSchedule || null,
          charges: editForm.charges || [],
        };
      }
      return job;
    }));
    handleClosePanel();
  };

  // Generate consistent tag colors based on tag name
  const getTagColor = (tag) => {
    const tagColors = [
      { bg: '#FED7E2', text: '#97266D' },  // pink
      { bg: '#BEE3F8', text: '#2B6CB0' },  // blue
      { bg: '#FEFCBF', text: '#975A16' },  // yellow
      { bg: '#1A365D', text: '#FFFFFF' },  // dark blue
      { bg: '#FEB2B2', text: '#C53030' },  // red/coral
      { bg: '#C6F6D5', text: '#276749' },  // green
      { bg: '#E9D8FD', text: '#6B46C1' },  // purple
      { bg: '#FED7AA', text: '#C05621' },  // orange
      { bg: '#B2F5EA', text: '#285E61' },  // teal
      { bg: '#CBD5E0', text: '#2D3748' },  // gray
    ];
    // Simple hash based on tag string
    let hash = 0;
    for (let i = 0; i < tag.length; i++) {
      hash = tag.charCodeAt(i) + ((hash << 5) - hash);
    }
    return tagColors[Math.abs(hash) % tagColors.length];
  };

  // Calculate actuals from assignments
  const getActuals = (assignments) => {
    // Trucks count all assigned (they're committed), but tonnage/loads only count delivered
    const trucks = assignments.length;
    const delivered = assignments.filter(a => a.status === 'delivered');
    const loads = delivered.reduce((sum, a) => sum + a.loads, 0);
    const tonnage = delivered.reduce((sum, a) => sum + (a.tonnage || 0), 0);
    return { trucks, loads, tonnage };
  };

  // Get available unit types (ones not already added)
  const getAvailableUnits = () => {
    const usedUnits = editForm.targets?.map(t => t.unit) || [];
    return unitTypes.filter(u => !usedUnits.includes(u.key));
  };

  // Reference management for edit panel
  const [newRefType, setNewRefType] = useState('');
  const [newRefValue, setNewRefValue] = useState('');

  const handleAddReference = () => {
    if (newRefType && newRefValue) {
      setEditForm({
        ...editForm,
        references: [...(editForm.references || []), { type: newRefType, value: newRefValue }]
      });
      setNewRefType('');
      setNewRefValue('');
    }
  };

  const handleRemoveReference = (index) => {
    setEditForm({
      ...editForm,
      references: editForm.references.filter((_, i) => i !== index)
    });
  };

  const handleUpdateReference = (index, field, value) => {
    setEditForm({
      ...editForm,
      references: editForm.references.map((ref, i) => 
        i === index ? { ...ref, [field]: value } : ref
      )
    });
  };

  const getAvailableRefTypes = () => {
    const usedTypes = editForm.references?.map(r => r.type) || [];
    return referenceTypes.filter(t => !usedTypes.includes(t));
  };

  // Inline notes editing
  const handleNotesChange = (jobId, newNotes) => {
    setJobs(jobs.map(job => 
      job.id === jobId ? { ...job, notes: newNotes } : job
    ));
  };

  // Delete job
  const handleDeleteJob = (jobId, e) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this job?')) {
      setJobs(jobs.filter(job => job.id !== jobId));
    }
  };

  // Copy forward modal functions
  const handleOpenCopyModal = (job, e) => {
    e.stopPropagation();
    setCopyingJob(job);
    setCopyingJobs([]);
    setShowCopyModal(true);
    setCopyMode('tomorrow');
    setCopyIncludeDrivers(true);
    setCopyIncludeTargets(true);
    setCopyTargets([...job.targets]);
    setCopyNewTargetUnit('');
    setCopyNewTargetValue('');
    // Set default dates
    const tomorrow = new Date(currentDate);
    tomorrow.setDate(tomorrow.getDate() + 1);
    setCopyStartDate(tomorrow.toISOString().split('T')[0]);
    setCopyEndDate(tomorrow.toISOString().split('T')[0]);
  };

  const handleOpenBulkCopyModal = () => {
    const selected = getSelectedJobs();
    if (selected.length === 0) return;
    setCopyingJob(null);
    setCopyingJobs(selected);
    setShowCopyModal(true);
    setCopyMode('tomorrow');
    setCopyIncludeDrivers(true);
    setCopyIncludeTargets(true);
    setCopyTargets([]);
    setCopyNewTargetUnit('');
    setCopyNewTargetValue('');
    // Set default dates
    const tomorrow = new Date(currentDate);
    tomorrow.setDate(tomorrow.getDate() + 1);
    setCopyStartDate(tomorrow.toISOString().split('T')[0]);
    setCopyEndDate(tomorrow.toISOString().split('T')[0]);
  };

  const handleCloseCopyModal = () => {
    setShowCopyModal(false);
    setCopyingJob(null);
    setCopyingJobs([]);
    setCopyMode('tomorrow');
    setCopyIncludeDrivers(true);
    setCopyIncludeTargets(true);
    setCopyTargets([]);
    setCopyNewTargetUnit('');
    setCopyNewTargetValue('');
  };

  // Copy target management
  const handleAddCopyTarget = () => {
    if (copyNewTargetUnit && copyNewTargetValue) {
      const exists = copyTargets.some(t => t.unit === copyNewTargetUnit);
      if (!exists) {
        setCopyTargets([...copyTargets, { unit: copyNewTargetUnit, value: parseInt(copyNewTargetValue) }]);
        setCopyNewTargetUnit('');
        setCopyNewTargetValue('');
      }
    }
  };

  const handleRemoveCopyTarget = (unitToRemove) => {
    setCopyTargets(copyTargets.filter(t => t.unit !== unitToRemove));
  };

  const handleUpdateCopyTarget = (unit, newValue) => {
    setCopyTargets(copyTargets.map(t => 
      t.unit === unit ? { ...t, value: parseInt(newValue) || 0 } : t
    ));
  };

  const getAvailableCopyTargetUnits = () => {
    const usedUnits = copyTargets.map(t => t.unit);
    return unitTypes.filter(u => !usedUnits.includes(u.key));
  };

  const getTomorrowDate = () => {
    const tomorrow = new Date(currentDate);
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow;
  };

  const formatDateShort = (date) => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${months[date.getMonth()]} ${date.getDate()}`;
  };

  const handleCopyForward = () => {
    const isBulk = copyingJobs.length > 0;
    const jobsToCopy = isBulk ? copyingJobs : [copyingJob];
    
    if (jobsToCopy.length === 0) return;

    // For now, just show confirmation (in real app would save to specific dates)
    const dateDesc = copyMode === 'tomorrow' 
      ? formatDateShort(getTomorrowDate())
      : `${copyStartDate} to ${copyEndDate}`;
    
    const jobNames = isBulk 
      ? `${jobsToCopy.length} jobs`
      : `"${copyingJob.jobName}"`;

    const targetDesc = copyIncludeTargets && copyTargets.length > 0
      ? ` with ${copyTargets.length} target(s)`
      : copyIncludeTargets ? '' : ' (no targets)';
    
    alert(`${jobNames} copied to ${dateDesc}${copyIncludeDrivers ? ' with driver assignments' : ' (shell only)'}${targetDesc}`);
    
    if (isBulk) {
      clearJobSelection();
    }
    
    handleCloseCopyModal();
  };

  const getDaysInRange = () => {
    if (!copyStartDate || !copyEndDate) return 0;
    const start = new Date(copyStartDate);
    const end = new Date(copyEndDate);
    const diff = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;
    return Math.max(0, diff);
  };

  // Message modal functions
  const handleOpenMessageModal = (job, e) => {
    e.stopPropagation();
    setMessagingJob(job);
    setShowMessageModal(true);
    setMessageText('');
    setMessageMode('group');
  };

  const handleCloseMessageModal = () => {
    setShowMessageModal(false);
    setMessagingJob(null);
    setMessageText('');
    setMessageMode('group');
  };

  const handleSendMessage = () => {
    if (!messagingJob || !messageText.trim()) return;
    
    const driverNames = messagingJob.assignments.map(a => a.driver).join(', ');
    const modeDesc = messageMode === 'group' ? 'group message' : 'individual messages';
    
    alert(`Sending ${modeDesc} to ${driverNames}:\n\n"${messageText}"`);
    handleCloseMessageModal();
  };

  // Format target for display
  const formatTarget = (target) => {
    const unitInfo = unitTypes.find(u => u.key === target.unit);
    return `${target.value} ${unitInfo?.suffix || target.unit}`;
  };

  // Get start time display for a job
  const getStartTimeDisplay = (job) => {
    // If job has a single startTime, use that
    if (job.startTime) {
      return { type: 'single', display: job.startTime };
    }
    
    // Check if assignments have individual times
    const assignmentTimes = job.assignments
      .filter(a => a.startTime)
      .map(a => a.startTime);
    
    if (assignmentTimes.length === 0) {
      return null; // No time set
    }
    
    // Get unique times
    const uniqueTimes = [...new Set(assignmentTimes)];
    
    if (uniqueTimes.length === 1) {
      return { type: 'single', display: uniqueTimes[0] };
    }
    
    // Multiple different times - show range
    // Simple sort by extracting hour (works for AM times)
    const sorted = uniqueTimes.sort((a, b) => {
      const parseTime = (t) => {
        const [time, period] = t.split(' ');
        let [hours, minutes] = time.split(':').map(Number);
        if (period === 'PM' && hours !== 12) hours += 12;
        if (period === 'AM' && hours === 12) hours = 0;
        return hours * 60 + (minutes || 0);
      };
      return parseTime(a) - parseTime(b);
    });
    
    return { 
      type: 'range', 
      display: `${sorted[0]} - ${sorted[sorted.length - 1]}`,
      times: sorted,
    };
  };

  // Create modal functions
  const handleCloseCreateModal = () => {
    setShowCreateModal(false);
    setCreateMode('template');
    setTemplateSearch('');
    setSelectedTemplate(null);
    setNewJobForm({
      customer: '',
      pickup: '',
      dropoff: '',
      commodity: '',
      commodityColor: '',
      targets: [],
    });
    setNewJobTargetUnit('');
    setNewJobTargetValue('');
  };

  const filteredTemplates = jobTemplates.filter(t => 
    t.name.toLowerCase().includes(templateSearch.toLowerCase()) ||
    t.customer.toLowerCase().includes(templateSearch.toLowerCase()) ||
    t.commodity.toLowerCase().includes(templateSearch.toLowerCase())
  );

  const handleSelectTemplate = (template) => {
    setSelectedTemplate(template);
    // Pre-fill the form with template data
    setNewJobForm({
      customer: template.customer,
      pickup: template.pickup,
      dropoff: template.dropoff,
      commodity: template.commodity,
      commodityColor: template.commodityColor,
      targets: [],
    });
    setNewJobTargetUnit('');
    setNewJobTargetValue('');
  };

  const handleClearTemplate = () => {
    setSelectedTemplate(null);
    setNewJobForm({
      customer: '',
      pickup: '',
      dropoff: '',
      commodity: '',
      commodityColor: '',
      targets: [],
    });
    setNewJobTargetUnit('');
    setNewJobTargetValue('');
  };

  const handleAddNewJobTarget = () => {
    if (newJobTargetUnit && newJobTargetValue) {
      const exists = newJobForm.targets.some(t => t.unit === newJobTargetUnit);
      if (!exists) {
        setNewJobForm({
          ...newJobForm,
          targets: [...newJobForm.targets, { unit: newJobTargetUnit, value: parseInt(newJobTargetValue) }]
        });
        setNewJobTargetUnit('');
        setNewJobTargetValue('');
      }
    }
  };

  const handleRemoveNewJobTarget = (unitToRemove) => {
    setNewJobForm({
      ...newJobForm,
      targets: newJobForm.targets.filter(t => t.unit !== unitToRemove)
    });
  };

  const getAvailableUnitsForNewJob = () => {
    const usedUnits = newJobForm.targets?.map(t => t.unit) || [];
    return unitTypes.filter(u => !usedUnits.includes(u.key));
  };

  const handleCreateJob = () => {
    const selectedCommodity = commodityOptions.find(c => c.label === newJobForm.commodity);
    const newJob = {
      id: Date.now(),
      customer: newJobForm.customer,
      jobName: selectedTemplate ? selectedTemplate.name : `${newJobForm.pickup} to ${newJobForm.dropoff}`,
      commodity: newJobForm.commodity,
      commodityColor: selectedCommodity?.color || newJobForm.commodityColor || '#A0AEC0',
      pickup: { name: newJobForm.pickup, type: 'pickup' },
      dropoff: newJobForm.dropoff ? { name: newJobForm.dropoff, type: 'dropoff' } : null,
      notes: '',
      targets: newJobForm.targets,
      references: [],
      assignments: [],
    };
    
    setJobs([newJob, ...jobs]);
    handleCloseCreateModal();
  };

  const canCreateJob = () => {
    return newJobForm.customer && newJobForm.pickup && newJobForm.commodity;
  };

  // Assign driver modal functions
  const handleOpenAssignModal = (jobId, e) => {
    e.stopPropagation();
    setAssigningJobId(jobId);
    setShowAssignModal(true);
    setDriverSearch('');
    setExpandedFleets(Object.keys(driverPool));
    
    // Pre-populate with existing assignments for this job
    const job = jobs.find(j => j.id === jobId);
    if (job && job.assignments.length > 0) {
      const existingDrivers = job.assignments.map(a => {
        // Find the driver in the pool by matching last name
        let matchedDriver = null;
        Object.values(driverPool).forEach(fleet => {
          const found = fleet.find(d => d.name.split(' ').pop() === a.driver);
          if (found) matchedDriver = found;
        });
        return {
          driverId: matchedDriver?.id || `existing-${a.driver}`,
          name: matchedDriver?.name || a.driver,
          truckId: a.id,
          loads: a.loads,
          recurring: a.recurring,
        };
      });
      setSelectedDrivers(existingDrivers);
    } else {
      setSelectedDrivers([]);
    }
  };

  const handleCloseAssignModal = () => {
    setShowAssignModal(false);
    setAssigningJobId(null);
    setDriverSearch('');
    setSelectedDrivers([]);
  };

  const getDriverDaySchedule = (driver) => {
    const schedule = [];
    const driverLastName = driver.name.split(' ').pop();
    
    jobs.forEach(job => {
      const assignment = job.assignments.find(a => 
        a.driver === driverLastName || a.id === driver.truckId
      );
      if (assignment) {
        schedule.push({
          jobId: job.id,
          jobName: job.jobName,
          customer: job.customer,
          commodity: job.commodity,
          commodityColor: job.commodityColor,
          loads: assignment.loads,
          status: assignment.status,
        });
      }
    });
    
    return schedule;
  };

  const toggleDriverSelection = (driver) => {
    const existing = selectedDrivers.find(d => d.driverId === driver.id);
    if (existing) {
      setSelectedDrivers(selectedDrivers.filter(d => d.driverId !== driver.id));
    } else {
      setSelectedDrivers([...selectedDrivers, {
        driverId: driver.id,
        name: driver.name,
        truckId: driver.truckId,
        loads: 1,
        recurring: false,
      }]);
    }
  };

  const updateDriverLoads = (driverId, loads) => {
    setSelectedDrivers(selectedDrivers.map(d => 
      d.driverId === driverId ? { ...d, loads: parseInt(loads) || 1 } : d
    ));
  };

  const toggleDriverRecurring = (driverId) => {
    setSelectedDrivers(selectedDrivers.map(d => 
      d.driverId === driverId ? { ...d, recurring: !d.recurring } : d
    ));
  };

  const removeSelectedDriver = (driverId) => {
    setSelectedDrivers(selectedDrivers.filter(d => d.driverId !== driverId));
  };

  const clearAllDrivers = () => {
    setSelectedDrivers([]);
  };

  const toggleFleetExpanded = (fleet) => {
    if (expandedFleets.includes(fleet)) {
      setExpandedFleets(expandedFleets.filter(f => f !== fleet));
    } else {
      setExpandedFleets([...expandedFleets, fleet]);
    }
  };

  const getFilteredDriverPool = () => {
    if (!driverSearch) return driverPool;
    const filtered = {};
    Object.keys(driverPool).forEach(fleet => {
      const matchingDrivers = driverPool[fleet].filter(d => 
        d.name.toLowerCase().includes(driverSearch.toLowerCase())
      );
      if (matchingDrivers.length > 0) {
        filtered[fleet] = matchingDrivers;
      }
    });
    return filtered;
  };

  const handleAssignDrivers = () => {
    setJobs(jobs.map(job => {
      if (job.id === assigningJobId) {
        // Replace all assignments with current selections
        const newAssignments = selectedDrivers.map(d => ({
          id: d.truckId,
          driver: d.name.split(' ').pop(), // Last name
          loads: d.loads,
          tonnage: d.loads * 22, // Estimate tonnage
          recurring: d.recurring,
          status: 'pending',
        }));
        return {
          ...job,
          assignments: newAssignments,
        };
      }
      return job;
    }));
    
    handleCloseAssignModal();
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <header style={styles.header}>
        <div style={styles.headerLeft}>
          <h1 style={styles.dateTitle}>{formatDate(currentDate)}</h1>
          <div style={styles.navControls}>
            <button style={styles.navButton} onClick={goToPreviousDay}>‹</button>
            <button style={styles.navButton} onClick={goToNextDay}>›</button>
            <button style={styles.todayButton} onClick={goToToday}>Today</button>
          </div>
          <div style={styles.customerFilterWrapper}>
            <button 
              style={styles.customerFilterButton}
              onClick={() => setShowCustomerDropdown(!showCustomerDropdown)}
            >
              <span>Customer: {getCustomerFilterLabel()}</span>
              <span style={styles.chevron}>▾</span>
            </button>
            {showCustomerDropdown && (
              <div style={styles.customerDropdown}>
                <div style={styles.customerDropdownHeader}>
                  <span style={styles.customerDropdownTitle}>Filter by customer</span>
                  {selectedCustomers.length > 0 && (
                    <button style={styles.clearFilterButton} onClick={clearCustomerFilter}>
                      Clear
                    </button>
                  )}
                </div>
                <div style={styles.customerDropdownList}>
                  {allCustomers.map((customer) => (
                    <label key={customer} style={styles.customerCheckboxLabel}>
                      <input
                        type="checkbox"
                        checked={selectedCustomers.includes(customer)}
                        onChange={() => toggleCustomer(customer)}
                        style={styles.customerCheckbox}
                      />
                      <span>{customer}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div style={styles.sortWrapper}>
            <select 
              style={styles.sortSelect}
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
            >
              <option value="customer-asc">Customer A→Z</option>
              <option value="customer-desc">Customer Z→A</option>
              <option value="trucks-desc">Most Trucks</option>
              <option value="trucks-asc">Fewest Trucks</option>
              <option value="tonnage-desc">Highest Tonnage</option>
              <option value="tonnage-asc">Lowest Tonnage</option>
              <option value="time-asc">Earliest Start</option>
              <option value="time-desc">Latest Start</option>
            </select>
          </div>
        </div>
        
        {/* Search Bar */}
        <div style={styles.searchWrapper}>
          <span style={styles.searchIcon}>🔍</span>
          <input
            type="text"
            style={styles.searchInput}
            placeholder="Search jobs by customer, location, tag..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button 
              style={styles.searchClearButton}
              onClick={() => setSearchQuery('')}
            >
              ×
            </button>
          )}
        </div>

        <div style={styles.headerRight}>
          {/* View Toggle */}
          <div style={styles.viewToggle}>
            <button 
              style={{
                ...styles.viewToggleButton,
                ...styles.viewToggleButtonActive,
              }}
            >
              Jobs
            </button>
            <button 
              style={styles.viewToggleButton}
              onClick={() => alert('Timeline view coming soon - would show a calendar/Gantt style view of dispatch')}
            >
              Timeline
            </button>
          </div>
          <button 
            style={{
              ...styles.configButton,
              ...(showConfigPanel ? styles.configButtonActive : {}),
            }}
            onClick={() => setShowConfigPanel(!showConfigPanel)}
            title="View settings"
          >
            ⚙️
          </button>
          <button style={styles.addJobButton} onClick={() => setShowCreateModal(true)}>
            + Add Job
          </button>
        </div>
      </header>

      {/* Config Panel */}
      {showConfigPanel && (
        <div style={styles.configPanel}>
          <div style={styles.configPanelHeader}>
            <span style={styles.configPanelTitle}>View Settings</span>
          </div>
          <div style={styles.configOptions}>
            <label style={styles.configOption}>
              <input
                type="checkbox"
                checked={viewConfig.showStartTimes}
                onChange={(e) => setViewConfig({...viewConfig, showStartTimes: e.target.checked})}
                style={styles.configCheckbox}
              />
              <span style={styles.configLabel}>Start times</span>
            </label>
            <label style={styles.configOption}>
              <input
                type="checkbox"
                checked={viewConfig.showCommodity}
                onChange={(e) => setViewConfig({...viewConfig, showCommodity: e.target.checked})}
                style={styles.configCheckbox}
              />
              <span style={styles.configLabel}>Commodity</span>
            </label>
            <label style={styles.configOption}>
              <input
                type="checkbox"
                checked={viewConfig.showTags}
                onChange={(e) => setViewConfig({...viewConfig, showTags: e.target.checked})}
                style={styles.configCheckbox}
              />
              <span style={styles.configLabel}>Tags</span>
            </label>
            <label style={styles.configOption}>
              <input
                type="checkbox"
                checked={viewConfig.showCharges}
                onChange={(e) => setViewConfig({...viewConfig, showCharges: e.target.checked})}
                style={styles.configCheckbox}
              />
              <span style={styles.configLabel}>Charges</span>
            </label>
            <label style={styles.configOption}>
              <input
                type="checkbox"
                checked={viewConfig.showReferences}
                onChange={(e) => setViewConfig({...viewConfig, showReferences: e.target.checked})}
                style={styles.configCheckbox}
              />
              <span style={styles.configLabel}>References</span>
            </label>
            <label style={styles.configOption}>
              <input
                type="checkbox"
                checked={viewConfig.showNotes}
                onChange={(e) => setViewConfig({...viewConfig, showNotes: e.target.checked})}
                style={styles.configCheckbox}
              />
              <span style={styles.configLabel}>Notes column</span>
            </label>
          </div>
        </div>
      )}

      {/* Bulk Action Bar */}
      {selectedJobIds.length > 0 && (
        <div style={styles.bulkActionBar}>
          <div style={styles.bulkActionLeft}>
            <span style={styles.bulkSelectedCount}>
              {selectedJobIds.length} job{selectedJobIds.length !== 1 ? 's' : ''} selected
            </span>
            <button style={styles.bulkSelectAllButton} onClick={selectAllJobs}>
              Select all
            </button>
            <button style={styles.bulkClearButton} onClick={clearJobSelection}>
              Clear
            </button>
          </div>
          <div style={styles.bulkActionRight}>
            <button 
              style={styles.bulkBillingButton} 
              onClick={() => alert(`Preparing ${selectedJobIds.length} job(s) for billing audit...`)}
            >
              💲 Prep for Invoicing
            </button>
            <button style={styles.bulkCopyButton} onClick={handleOpenBulkCopyModal}>
              📋 Copy Forward
            </button>
          </div>
        </div>
      )}

      {/* Table */}
      <div style={styles.tableWrapper}>
        <table style={styles.table}>
          <thead>
            <tr style={styles.tableHeaderRow}>
              <th style={styles.thCheckbox}></th>
              <th style={styles.thWorkToDo}>WORK TO DO</th>
              {viewConfig.showNotes && <th style={styles.thNotes}>NOTES</th>}
              <th style={styles.thProgress}>PROGRESS</th>
              <th style={styles.thAssignments}>ASSIGNMENTS</th>
              <th style={styles.thActions}></th>
            </tr>
          </thead>
          <tbody>
            {getFilteredJobs().map((job) => {
              const actuals = getActuals(job.assignments);
              const startTimeInfo = getStartTimeDisplay(job);
              return (
                <tr 
                  key={job.id} 
                  style={styles.tableRow}
                  onClick={() => handleJobClick(job)}
                >
                  <td style={styles.tdCheckbox}>
                    <input 
                      type="checkbox" 
                      style={styles.checkbox} 
                      checked={selectedJobIds.includes(job.id)}
                      onChange={(e) => toggleJobSelection(job.id, e)}
                      onClick={(e) => e.stopPropagation()} 
                    />
                  </td>
                  <td style={styles.tdWorkToDo}>
                    <div style={styles.jobInfo}>
                      {/* Primary dispatch info */}
                      <div style={styles.primaryInfo}>
                        <div style={styles.customerRow}>
                          <span style={styles.customerName}>{job.customer}</span>
                          {viewConfig.showCommodity && (
                            <span style={{...styles.commodityBadge, backgroundColor: job.commodityColor}}>
                              {commodityOptions.find(c => c.label === job.commodity)?.emoji || '📦'} {job.commodity}
                            </span>
                          )}
                        </div>
                        <div style={styles.jobNamePrimary}>{job.jobName}</div>
                        <div style={styles.routeRow}>
                          {job.pickup && (
                            <span style={styles.locationTag}>
                              <span style={styles.pickupDot}>●</span>
                              {job.pickup.name || '—'}
                            </span>
                          )}
                          {job.pickup && job.dropoff && (
                            <span style={styles.routeArrow}>→</span>
                          )}
                          {job.dropoff && (
                            <span style={styles.locationTag}>
                              <span style={styles.dropoffDot}>●</span>
                              {job.dropoff.name}
                            </span>
                          )}
                        </div>
                      </div>
                      {/* Secondary info - muted */}
                      <div style={styles.secondaryInfo}>
                        <div style={styles.secondaryBadges}>
                          {viewConfig.showStartTimes && startTimeInfo && (
                            <span 
                              style={{
                                ...styles.startTimeBadgeSecondary,
                                ...(startTimeInfo.type === 'range' ? styles.startTimeBadgeRange : {}),
                              }}
                              title={startTimeInfo.type === 'range' ? `Staggered: ${startTimeInfo.times.join(', ')}` : 'Start time'}
                            >
                              🕐 {startTimeInfo.display}
                            </span>
                          )}
                          {viewConfig.showCharges && (
                            <span 
                              style={{
                                ...styles.chargesIcon,
                                ...(job.charges?.length > 0 ? styles.chargesIconSet : styles.chargesIconNotSet),
                              }}
                              title={job.charges?.length > 0 
                                ? `${job.rateSchedule || 'Custom charges'}\n${job.charges.map(c => `${c.type}: $${c.rate.toFixed(2)}/${c.unit}`).join('\n')}`
                                : 'No charges set'
                              }
                            >
                              $
                            </span>
                          )}
                          {viewConfig.showReferences && job.references?.map((ref, idx) => (
                            <span key={idx} style={styles.refBadgeSmall}>
                              {ref.type}: {ref.value}
                            </span>
                          ))}
                          {viewConfig.showTags && job.tags?.map((tag, idx) => {
                            const tagColor = getTagColor(tag);
                            return (
                              <span 
                                key={idx} 
                                style={{
                                  ...styles.tagBadgeSmall,
                                  backgroundColor: tagColor.bg,
                                  color: tagColor.text,
                                }}
                              >
                                {tag}
                              </span>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </td>
                  {viewConfig.showNotes && (
                    <td style={styles.tdNotes} onClick={(e) => e.stopPropagation()}>
                      <textarea
                        className="notesInput"
                        style={styles.notesTextarea}
                        value={job.notes}
                        placeholder="Jot a note..."
                        onChange={(e) => handleNotesChange(job.id, e.target.value)}
                        rows={2}
                      />
                    </td>
                  )}
                  <td style={styles.tdProgress}>
                    <div style={styles.targetPills}>
                      {job.targets.length > 0 ? (
                        // Show pill for each target
                        job.targets.map((target, idx) => {
                          const actual = target.unit === 'tonnage' ? actuals.tonnage :
                                        target.unit === 'trucks' ? actuals.trucks :
                                        target.unit === 'loads' ? actuals.loads : 0;
                          const percent = Math.min(100, Math.round((actual / target.value) * 100));
                          const isMet = actual >= target.value;
                          const isClose = percent >= 75;
                          const bgColor = isMet ? '#C6F6D5' : isClose ? '#FEFCBF' : '#FED7D7';
                          const textColor = isMet ? '#276749' : isClose ? '#975A16' : '#C53030';
                          const unitLabel = target.unit === 'tonnage' ? 'tons' : target.unit;
                          
                          return (
                            <span 
                              key={idx} 
                              style={{
                                ...styles.targetPill,
                                backgroundColor: bgColor,
                                color: textColor,
                              }}
                            >
                              {actual}/{target.value} {unitLabel}
                              {isMet && ' ✓'}
                            </span>
                          );
                        })
                      ) : (
                        // No targets - show truck count and encourage setting targets
                        <div style={styles.noTargetState}>
                          <span style={styles.noTargetTrucks}>
                            {job.assignments.length} truck{job.assignments.length !== 1 ? 's' : ''} assigned
                          </span>
                          <span style={styles.noTargetHint}>Set a target to track progress</span>
                        </div>
                      )}
                    </div>
                  </td>
                  <td style={styles.tdAssignments}>
                    <div style={styles.assignmentsList}>
                      {job.assignments.map((assignment, idx) => {
                        const statusStyle = statusColors[assignment.status] || statusColors.pending;
                        return (
                          <span 
                            key={idx}
                            style={{
                              ...styles.assignmentBadge,
                              backgroundColor: statusStyle.bg,
                              color: statusStyle.color,
                            }}
                          >
                            {viewConfig.showStartTimes && assignment.startTime && (
                              <span style={styles.assignmentTime}>{assignment.startTime}</span>
                            )}
                            {assignment.id || '—'} ({assignment.driver}): {assignment.loads}
                            {assignment.recurring && <span style={styles.recurringIcon}> ↻</span>}
                          </span>
                        );
                      })}
                      <button 
                        style={styles.addAssignmentButton}
                        onClick={(e) => handleOpenAssignModal(job.id, e)}
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td style={styles.tdActions}>
                    <div className="actionButtons" style={styles.actionButtons}>
                      <button
                        className="actionButton"
                        style={{...styles.actionButton, ...styles.actionButtonCopy}}
                        onClick={(e) => handleOpenCopyModal(job, e)}
                        title="Copy forward"
                      >
                        📋
                      </button>
                      <button
                        className="actionButton"
                        style={{...styles.actionButton, ...styles.actionButtonMessage}}
                        onClick={(e) => handleOpenMessageModal(job, e)}
                        title="Message drivers"
                        disabled={job.assignments.length === 0}
                      >
                        💬
                      </button>
                      <button
                        className="actionButton actionButtonDanger"
                        style={{...styles.actionButton, ...styles.actionButtonDanger}}
                        onClick={(e) => handleDeleteJob(job.id, e)}
                        title="Delete job"
                      >
                        🗑
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Edit Panel */}
      {selectedJob && (
        <>
          <div style={styles.overlay} onClick={handleClosePanel} />
          <div style={styles.editPanel}>
            <div style={styles.panelHeader}>
              <h2 style={styles.panelTitle}>Edit Job</h2>
              <button style={styles.closeButton} onClick={handleClosePanel}>×</button>
            </div>
            
            <div style={styles.panelContent}>
              <div style={styles.panelSection}>
                <div style={styles.customerDisplay}>
                  <span style={styles.labelSmall}>Customer</span>
                  <span style={styles.customerValue}>{selectedJob.customer}</span>
                </div>
              </div>

              <div style={styles.panelSection}>
                <label style={styles.label}>Job Name</label>
                <input 
                  type="text"
                  style={styles.input}
                  value={editForm.jobName || ''}
                  onChange={(e) => setEditForm({...editForm, jobName: e.target.value})}
                  placeholder="Enter job name..."
                />
              </div>

              <div style={styles.panelSection}>
                <label style={styles.label}>Commodity</label>
                <div style={styles.commoditySelectWrapper}>
                  <span 
                    style={{
                      ...styles.commodityDot,
                      backgroundColor: editForm.commodityColor || '#A0AEC0'
                    }}
                  />
                  <select 
                    style={styles.commoditySelect}
                    value={editForm.commodity}
                    onChange={(e) => {
                      const selected = commodityOptions.find(c => c.label === e.target.value);
                      setEditForm({
                        ...editForm, 
                        commodity: e.target.value, 
                        commodityColor: selected?.color || '#A0AEC0'
                      });
                    }}
                  >
                    <option value="">Select commodity...</option>
                    {commodityOptions.map((opt) => (
                      <option key={opt.label} value={opt.label}>{opt.emoji} {opt.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div style={styles.panelSection}>
                <label style={styles.label}>
                  <span style={styles.pickupDot}>●</span> Pickup Location
                </label>
                <select 
                  style={styles.select}
                  value={editForm.pickupName}
                  onChange={(e) => setEditForm({...editForm, pickupName: e.target.value})}
                >
                  <option value="">Select pickup...</option>
                  {locationOptions.map((loc) => (
                    <option key={loc} value={loc}>{loc}</option>
                  ))}
                </select>
              </div>

              <div style={styles.panelSection}>
                <label style={styles.label}>
                  <span style={styles.dropoffDot}>●</span> Drop-off Location
                </label>
                <select 
                  style={styles.select}
                  value={editForm.dropoffName}
                  onChange={(e) => setEditForm({...editForm, dropoffName: e.target.value})}
                >
                  <option value="">Select drop-off...</option>
                  {locationOptions.map((loc) => (
                    <option key={loc} value={loc}>{loc}</option>
                  ))}
                </select>
              </div>

              <div style={styles.divider} />

              <div style={styles.panelSection}>
                <div style={styles.sectionHeader}>
                  <span style={styles.panelSectionTitle}>Targets</span>
                </div>
                
                {/* Existing targets */}
                {editForm.targets?.length > 0 && (
                  <div style={styles.existingTargets}>
                    {editForm.targets.map((target) => {
                      const unitInfo = unitTypes.find(u => u.key === target.unit);
                      return (
                        <div key={target.unit} style={styles.targetRow}>
                          <div style={styles.targetRowLeft}>
                            <span style={styles.targetUnitLabel}>{unitInfo?.label}</span>
                            <input
                              type="number"
                              style={styles.targetValueInput}
                              value={target.value}
                              onChange={(e) => handleUpdateTargetValue(target.unit, e.target.value)}
                            />
                            <span style={styles.targetSuffix}>{unitInfo?.suffix}</span>
                          </div>
                          <button 
                            style={styles.removeTargetButton}
                            onClick={() => handleRemoveTarget(target.unit)}
                          >
                            ×
                          </button>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Add new target */}
                {getAvailableUnits().length > 0 && (
                  <div style={styles.addTargetSection}>
                    <div style={styles.addTargetRow}>
                      <select
                        style={styles.unitSelect}
                        value={newTargetUnit}
                        onChange={(e) => setNewTargetUnit(e.target.value)}
                      >
                        <option value="">Add target...</option>
                        {getAvailableUnits().map((unit) => (
                          <option key={unit.key} value={unit.key}>{unit.label}</option>
                        ))}
                      </select>
                      {newTargetUnit && (
                        <>
                          <input
                            type="number"
                            style={styles.newTargetValueInput}
                            placeholder="Value"
                            value={newTargetValue}
                            onChange={(e) => setNewTargetValue(e.target.value)}
                          />
                          <button 
                            style={styles.addTargetButton}
                            onClick={handleAddTarget}
                            disabled={!newTargetValue}
                          >
                            Add
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                )}

                {editForm.targets?.length === 0 && !newTargetUnit && (
                  <div style={styles.targetHint}>
                    Add targets to track fulfillment. Choose from tonnage, truck count, or load count based on how the customer requests work.
                  </div>
                )}
              </div>

              <div style={styles.divider} />

              {/* Start Time Section */}
              <div style={styles.panelSection}>
                <div style={styles.sectionHeader}>
                  <span style={styles.panelSectionTitle}>Start Time</span>
                </div>
                <div style={styles.startTimeInputRow}>
                  <input
                    type="text"
                    style={styles.startTimeInput}
                    placeholder="e.g. 6:00 AM"
                    value={editForm.startTime || ''}
                    onChange={(e) => setEditForm({...editForm, startTime: e.target.value})}
                  />
                  {editForm.startTime && (
                    <button 
                      style={styles.clearStartTimeButton}
                      onClick={() => setEditForm({...editForm, startTime: null})}
                    >
                      Clear
                    </button>
                  )}
                </div>
              </div>

              <div style={styles.divider} />

              {/* Reference Numbers Section */}
              <div style={styles.panelSection}>
                <div style={styles.sectionHeader}>
                  <span style={styles.panelSectionTitle}>Reference Numbers</span>
                </div>
                
                {/* Existing references */}
                {editForm.references?.length > 0 && (
                  <div style={styles.existingReferences}>
                    {editForm.references.map((ref, index) => (
                      <div key={index} style={styles.referenceRow}>
                        <div style={styles.referenceRowLeft}>
                          <span style={styles.referenceTypeLabel}>{ref.type}</span>
                          <input
                            type="text"
                            style={styles.referenceValueInput}
                            value={ref.value}
                            onChange={(e) => handleUpdateReference(index, 'value', e.target.value)}
                          />
                        </div>
                        <button 
                          style={styles.removeTargetButton}
                          onClick={() => handleRemoveReference(index)}
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {/* Add new reference */}
                {getAvailableRefTypes().length > 0 && (
                  <div style={styles.addReferenceSection}>
                    <div style={styles.addReferenceRow}>
                      <select
                        style={styles.refTypeSelect}
                        value={newRefType}
                        onChange={(e) => setNewRefType(e.target.value)}
                      >
                        <option value="">Add reference...</option>
                        {getAvailableRefTypes().map((type) => (
                          <option key={type} value={type}>{type}</option>
                        ))}
                      </select>
                      {newRefType && (
                        <>
                          <input
                            type="text"
                            style={styles.newRefValueInput}
                            placeholder="Value"
                            value={newRefValue}
                            onChange={(e) => setNewRefValue(e.target.value)}
                          />
                          <button 
                            style={styles.addTargetButton}
                            onClick={handleAddReference}
                            disabled={!newRefValue}
                          >
                            Add
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                )}

                {editForm.references?.length === 0 && !newRefType && (
                  <div style={styles.referenceHint}>
                    Add reference numbers like PO, job codes, or contracts to track this job.
                  </div>
                )}
              </div>

              <div style={styles.divider} />

              {/* Charges Section */}
              <div style={styles.panelSection}>
                <div style={styles.sectionHeader}>
                  <span style={styles.panelSectionTitle}>Charges</span>
                  <span style={{
                    ...styles.chargesStatusBadge,
                    ...(editForm.charges?.length > 0 ? styles.chargesStatusSet : styles.chargesStatusNotSet),
                  }}>
                    {editForm.charges?.length > 0 ? '✓ Set' : 'Not set'}
                  </span>
                </div>

                {/* Rate Schedule Selector */}
                <div style={styles.rateScheduleRow}>
                  <span style={styles.rateScheduleLabel}>Rate Schedule</span>
                  <div style={styles.rateScheduleSelector}>
                    <select
                      style={styles.rateScheduleSelect}
                      value={editForm.rateSchedule || ''}
                      onChange={(e) => {
                        const schedule = e.target.value;
                        if (schedule) {
                          // Simulate applying a rate schedule with preset charges
                          const presetCharges = {
                            'Bommarito - Standard Haul': [
                              { type: 'Haul charge', description: '', qty: 0, unit: 'Tons', rate: 8.50, amount: 0 },
                            ],
                            'Eco Material - Labadie Contract': [
                              { type: 'Haul charge', description: '', qty: 0, unit: 'Tons', rate: 5.55, amount: 0 },
                              { type: 'Fuel surcharge', description: '12%', qty: 0, unit: 'Percent', rate: 12, amount: 0 },
                            ],
                            'Goodwin Bros - Redbird': [
                              { type: 'Haul charge', description: '', qty: 0, unit: 'Tons', rate: 7.25, amount: 0 },
                              { type: 'Material', description: '6 Minus rock', qty: 0, unit: 'Tons', rate: 12.00, amount: 0 },
                            ],
                            'Holcim - Standard': [
                              { type: 'Haul charge', description: '', qty: 0, unit: 'Tons', rate: 6.75, amount: 0 },
                            ],
                          };
                          setEditForm({
                            ...editForm,
                            rateSchedule: schedule,
                            charges: presetCharges[schedule] || [],
                          });
                        } else {
                          setEditForm({...editForm, rateSchedule: null});
                        }
                      }}
                    >
                      <option value="">Select rate schedule...</option>
                      <option value="Bommarito - Standard Haul">Bommarito - Standard Haul</option>
                      <option value="Eco Material - Labadie Contract">Eco Material - Labadie Contract</option>
                      <option value="Goodwin Bros - Redbird">Goodwin Bros - Redbird</option>
                      <option value="Holcim - Standard">Holcim - Standard</option>
                    </select>
                    {editForm.rateSchedule && (
                      <button 
                        style={styles.clearRateScheduleButton}
                        onClick={() => setEditForm({...editForm, rateSchedule: null, charges: []})}
                      >
                        ×
                      </button>
                    )}
                  </div>
                </div>

                {/* Charges Table */}
                {editForm.charges?.length > 0 && (
                  <div style={styles.chargesTable}>
                    <div style={styles.chargesHeader}>
                      <span style={styles.chargesColType}>Type</span>
                      <span style={styles.chargesColUnit}>Unit</span>
                      <span style={styles.chargesColRate}>Rate</span>
                    </div>
                    {editForm.charges.map((charge, idx) => (
                      <div key={idx} style={styles.chargeRow}>
                        <span style={styles.chargesColType}>
                          {charge.type}
                          {charge.description && <span style={styles.chargeDesc}>{charge.description}</span>}
                        </span>
                        <span style={styles.chargesColUnit}>{charge.unit}</span>
                        <span style={styles.chargesColRate}>
                          {charge.unit === 'Percent' ? `${charge.rate}%` : `$${charge.rate.toFixed(2)}`}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {editForm.charges?.length === 0 && (
                  <div style={styles.chargesHint}>
                    Select a rate schedule above or add custom charges to set up billing for this job.
                  </div>
                )}

                {/* Add custom charge button */}
                <button 
                  style={styles.addChargeButton}
                  onClick={() => {
                    setEditForm({
                      ...editForm,
                      charges: [...(editForm.charges || []), { type: 'Haul charge', description: '', qty: 0, unit: 'Tons', rate: 0, amount: 0 }],
                    });
                  }}
                >
                  + Add Charge
                </button>
              </div>
            </div>

            <div style={styles.panelFooter}>
              <button style={styles.cancelButton} onClick={handleClosePanel}>Cancel</button>
              <button style={styles.saveButton} onClick={handleSave}>Save Changes</button>
            </div>
          </div>
        </>
      )}

      {/* Create Job Modal */}
      {showCreateModal && (
        <>
          <div style={styles.overlay} onClick={handleCloseCreateModal} />
          <div style={styles.createModal}>
            <div style={styles.modalHeader}>
              <h2 style={styles.modalTitle}>Add New Job</h2>
              <button style={styles.closeButton} onClick={handleCloseCreateModal}>×</button>
            </div>

            {/* Mode Tabs */}
            <div style={styles.modeTabs}>
              <button
                style={{
                  ...styles.modeTab,
                  ...(createMode === 'template' ? styles.modeTabActive : {}),
                }}
                onClick={() => setCreateMode('template')}
              >
                <span style={styles.modeTabTitle}>Use Template</span>
                <span style={styles.modeTabSubtitle}>Quick setup</span>
              </button>
              <button
                style={{
                  ...styles.modeTab,
                  ...(createMode === 'scratch' ? styles.modeTabActive : {}),
                }}
                onClick={() => setCreateMode('scratch')}
              >
                <span style={styles.modeTabTitle}>From Scratch</span>
                <span style={styles.modeTabSubtitle}>Custom job</span>
              </button>
            </div>

            <div style={styles.modalContent}>
              {createMode === 'template' ? (
                <>
                  {!selectedTemplate ? (
                    <>
                      {/* Template Search */}
                      <div style={styles.searchWrapper}>
                        <span style={styles.searchIcon}>🔍</span>
                        <input
                          type="text"
                          style={styles.searchInput}
                          placeholder="Search templates..."
                          value={templateSearch}
                          onChange={(e) => setTemplateSearch(e.target.value)}
                        />
                      </div>

                      {/* Template List */}
                      <div style={styles.templateList}>
                        {filteredTemplates.map((template) => (
                          <div
                            key={template.id}
                            style={styles.templateItem}
                            onClick={() => handleSelectTemplate(template)}
                          >
                            <div style={styles.templateInfo}>
                              <span style={styles.templateName}>{template.name}</span>
                              <div style={styles.templateMeta}>
                                <span style={styles.templateCustomer}>🏢 {template.customer}</span>
                                <span style={styles.templateRoute}>📍 {template.pickup} → {template.dropoff}</span>
                                <span style={styles.templateCommodity}>
                                  <span style={{...styles.smallDot, backgroundColor: template.commodityColor}} />
                                  {template.commodity}
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </>
                  ) : (
                    <>
                      {/* Selected template badge */}
                      <div style={styles.selectedTemplateBadge}>
                        <div style={styles.selectedTemplateInfo}>
                          <span style={styles.selectedTemplateLabel}>Using template</span>
                          <span style={styles.selectedTemplateName}>{selectedTemplate.name}</span>
                        </div>
                        <button style={styles.changeTemplateButton} onClick={handleClearTemplate}>
                          Change
                        </button>
                      </div>

                      {/* Full form - same as From Scratch but pre-filled */}
                      <div style={styles.formSection}>
                        <label style={styles.formLabel}>Customer *</label>
                        <select
                          style={styles.formSelect}
                          value={newJobForm.customer}
                          onChange={(e) => setNewJobForm({...newJobForm, customer: e.target.value})}
                        >
                          <option value="">Select customer...</option>
                          {customerOptions.map((c) => (
                            <option key={c} value={c}>{c}</option>
                          ))}
                        </select>
                      </div>

                      <div style={styles.formRow}>
                        <div style={styles.formSection}>
                          <label style={styles.formLabel}>Pick Location *</label>
                          <select
                            style={styles.formSelect}
                            value={newJobForm.pickup}
                            onChange={(e) => setNewJobForm({...newJobForm, pickup: e.target.value})}
                          >
                            <option value="">Pickup location...</option>
                            {locationOptions.map((loc) => (
                              <option key={loc} value={loc}>{loc}</option>
                            ))}
                          </select>
                        </div>
                        <div style={styles.formSection}>
                          <label style={styles.formLabel}>Drop Location</label>
                          <select
                            style={styles.formSelect}
                            value={newJobForm.dropoff}
                            onChange={(e) => setNewJobForm({...newJobForm, dropoff: e.target.value})}
                          >
                            <option value="">Drop-off location...</option>
                            {locationOptions.map((loc) => (
                              <option key={loc} value={loc}>{loc}</option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div style={styles.formSection}>
                        <label style={styles.formLabel}>Commodity *</label>
                        <select
                          style={styles.formSelect}
                          value={newJobForm.commodity}
                          onChange={(e) => {
                            const selected = commodityOptions.find(c => c.label === e.target.value);
                            setNewJobForm({
                              ...newJobForm,
                              commodity: e.target.value,
                              commodityColor: selected?.color || '#A0AEC0'
                            });
                          }}
                        >
                          <option value="">Select commodity...</option>
                          {commodityOptions.map((opt) => (
                            <option key={opt.label} value={opt.label}>{opt.emoji} {opt.label}</option>
                          ))}
                        </select>
                      </div>

                      <div style={styles.formSection}>
                        <label style={styles.formLabel}>Targets (optional)</label>
                        {newJobForm.targets.length > 0 && (
                          <div style={styles.newJobTargets}>
                            {newJobForm.targets.map((target) => {
                              const unitInfo = unitTypes.find(u => u.key === target.unit);
                              return (
                                <div key={target.unit} style={styles.newJobTargetRow}>
                                  <span>{unitInfo?.label}: {target.value} {unitInfo?.suffix}</span>
                                  <button
                                    style={styles.removeTargetButtonSmall}
                                    onClick={() => handleRemoveNewJobTarget(target.unit)}
                                  >
                                    ×
                                  </button>
                                </div>
                              );
                            })}
                          </div>
                        )}
                        {getAvailableUnitsForNewJob().length > 0 && (
                          <div style={styles.addTargetRow}>
                            <select
                              style={styles.unitSelectSmall}
                              value={newJobTargetUnit}
                              onChange={(e) => setNewJobTargetUnit(e.target.value)}
                            >
                              <option value="">Add target...</option>
                              {getAvailableUnitsForNewJob().map((unit) => (
                                <option key={unit.key} value={unit.key}>{unit.label}</option>
                              ))}
                            </select>
                            {newJobTargetUnit && (
                              <>
                                <input
                                  type="number"
                                  style={styles.targetValueInputSmall}
                                  placeholder="Value"
                                  value={newJobTargetValue}
                                  onChange={(e) => setNewJobTargetValue(e.target.value)}
                                />
                                <button
                                  style={styles.addTargetButtonSmall}
                                  onClick={handleAddNewJobTarget}
                                  disabled={!newJobTargetValue}
                                >
                                  Add
                                </button>
                              </>
                            )}
                          </div>
                        )}
                      </div>
                    </>
                  )}
                </>
              ) : (
                <>
                  {/* From Scratch Form */}
                  <div style={styles.formSection}>
                    <label style={styles.formLabel}>Customer *</label>
                    <select
                      style={styles.formSelect}
                      value={newJobForm.customer}
                      onChange={(e) => setNewJobForm({...newJobForm, customer: e.target.value})}
                    >
                      <option value="">Select customer...</option>
                      {customerOptions.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>

                  <div style={styles.formRow}>
                    <div style={styles.formSection}>
                      <label style={styles.formLabel}>Pick Location *</label>
                      <select
                        style={styles.formSelect}
                        value={newJobForm.pickup}
                        onChange={(e) => setNewJobForm({...newJobForm, pickup: e.target.value})}
                      >
                        <option value="">Pickup location...</option>
                        {locationOptions.map((loc) => (
                          <option key={loc} value={loc}>{loc}</option>
                        ))}
                      </select>
                    </div>
                    <div style={styles.formSection}>
                      <label style={styles.formLabel}>Drop Location</label>
                      <select
                        style={styles.formSelect}
                        value={newJobForm.dropoff}
                        onChange={(e) => setNewJobForm({...newJobForm, dropoff: e.target.value})}
                      >
                        <option value="">Drop-off location...</option>
                        {locationOptions.map((loc) => (
                          <option key={loc} value={loc}>{loc}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div style={styles.formSection}>
                    <label style={styles.formLabel}>Commodity *</label>
                    <select
                      style={styles.formSelect}
                      value={newJobForm.commodity}
                      onChange={(e) => {
                        const selected = commodityOptions.find(c => c.label === e.target.value);
                        setNewJobForm({
                          ...newJobForm,
                          commodity: e.target.value,
                          commodityColor: selected?.color || '#A0AEC0'
                        });
                      }}
                    >
                      <option value="">Select commodity...</option>
                      {commodityOptions.map((opt) => (
                        <option key={opt.label} value={opt.label}>{opt.emoji} {opt.label}</option>
                      ))}
                    </select>
                  </div>

                  <div style={styles.formSection}>
                    <label style={styles.formLabel}>Targets (optional)</label>
                    {newJobForm.targets.length > 0 && (
                      <div style={styles.newJobTargets}>
                        {newJobForm.targets.map((target) => {
                          const unitInfo = unitTypes.find(u => u.key === target.unit);
                          return (
                            <div key={target.unit} style={styles.newJobTargetRow}>
                              <span>{unitInfo?.label}: {target.value} {unitInfo?.suffix}</span>
                              <button
                                style={styles.removeTargetButtonSmall}
                                onClick={() => handleRemoveNewJobTarget(target.unit)}
                              >
                                ×
                              </button>
                            </div>
                          );
                        })}
                      </div>
                    )}
                    {getAvailableUnitsForNewJob().length > 0 && (
                      <div style={styles.addTargetRow}>
                        <select
                          style={styles.unitSelectSmall}
                          value={newJobTargetUnit}
                          onChange={(e) => setNewJobTargetUnit(e.target.value)}
                        >
                          <option value="">Add target...</option>
                          {getAvailableUnitsForNewJob().map((unit) => (
                            <option key={unit.key} value={unit.key}>{unit.label}</option>
                          ))}
                        </select>
                        {newJobTargetUnit && (
                          <>
                            <input
                              type="number"
                              style={styles.targetValueInputSmall}
                              placeholder="Value"
                              value={newJobTargetValue}
                              onChange={(e) => setNewJobTargetValue(e.target.value)}
                            />
                            <button
                              style={styles.addTargetButtonSmall}
                              onClick={handleAddNewJobTarget}
                              disabled={!newJobTargetValue}
                            >
                              Add
                            </button>
                          </>
                        )}
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>

            <div style={styles.modalFooter}>
              <button style={styles.cancelButton} onClick={handleCloseCreateModal}>Cancel</button>
              <button 
                style={{
                  ...styles.createButton,
                  ...(canCreateJob() ? {} : styles.createButtonDisabled),
                }}
                onClick={handleCreateJob}
                disabled={!canCreateJob()}
              >
                Create Job
              </button>
            </div>
          </div>
        </>
      )}

      {/* Assign Driver Modal */}
      {showAssignModal && (
        <>
          <div style={styles.overlay} onClick={handleCloseAssignModal} />
          <div style={styles.assignModal}>
            <div style={styles.assignModalHeader}>
              <h2 style={styles.modalTitle}>Assign Driver</h2>
              <button style={styles.closeButton} onClick={handleCloseAssignModal}>×</button>
            </div>

            <div style={styles.assignModalBody}>
              {/* Left panel - Driver list */}
              <div style={styles.driverListPanel}>
                <div style={styles.driverSearchWrapper}>
                  <span style={styles.searchIcon}>🔍</span>
                  <input
                    type="text"
                    style={styles.driverSearchInput}
                    placeholder="Search Drivers"
                    value={driverSearch}
                    onChange={(e) => setDriverSearch(e.target.value)}
                  />
                </div>

                <button style={styles.selectAllLink}>Select All</button>

                <div style={styles.driverFleetList}>
                  {Object.entries(getFilteredDriverPool()).map(([fleet, drivers]) => (
                    <div key={fleet} style={styles.fleetGroup}>
                      <button 
                        style={styles.fleetHeader}
                        onClick={() => toggleFleetExpanded(fleet)}
                      >
                        <span style={styles.fleetName}>{fleet}</span>
                        <span style={{
                          ...styles.fleetChevron,
                          transform: expandedFleets.includes(fleet) ? 'rotate(0deg)' : 'rotate(-90deg)',
                        }}>▾</span>
                      </button>
                      {expandedFleets.includes(fleet) && (
                        <div style={styles.fleetDrivers}>
                          {drivers.map((driver) => {
                            const isSelected = selectedDrivers.some(d => d.driverId === driver.id);
                            const schedule = getDriverDaySchedule(driver);
                            const hasNote = !!driver.note;
                            return (
                              <label 
                                key={driver.id} 
                                style={{
                                  ...styles.driverRow,
                                  ...(hasNote ? styles.driverRowWithNote : {}),
                                }}
                              >
                                <input
                                  type="checkbox"
                                  checked={isSelected}
                                  onChange={() => toggleDriverSelection(driver)}
                                  style={styles.driverCheckbox}
                                />
                                <div style={styles.driverInfo}>
                                  <div style={styles.driverNameRow}>
                                    <span style={styles.driverName}>{driver.name}</span>
                                    {hasNote && (
                                      <span style={styles.driverNoteBadge}>
                                        📝 {driver.note}
                                      </span>
                                    )}
                                  </div>
                                  {schedule.length === 0 ? (
                                    <span style={styles.driverUnassigned}>
                                      <span style={styles.truckIcon}>🚛</span>
                                      Unassigned
                                    </span>
                                  ) : (
                                    <div style={styles.driverSchedule}>
                                      {schedule.map((item, idx) => (
                                        <div key={idx} style={styles.scheduleItem}>
                                          <span style={{
                                            ...styles.scheduleIndex,
                                            backgroundColor: statusColors[item.status]?.bg || '#E2E8F0',
                                            color: statusColors[item.status]?.color || '#4A5568',
                                          }}>
                                            {idx + 1}
                                          </span>
                                          <span style={styles.scheduleJobName}>{item.jobName}</span>
                                          <span style={{
                                            ...styles.scheduleCommodityDot,
                                            backgroundColor: item.commodityColor,
                                          }} />
                                          <span style={styles.scheduleLoads}>{item.loads}L</span>
                                        </div>
                                      ))}
                                    </div>
                                  )}
                                </div>
                              </label>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Right panel - Selected drivers */}
              <div style={styles.selectedDriversPanel}>
                {selectedDrivers.length === 0 ? (
                  <div style={styles.noDriversSelected}>
                    <span style={styles.noDriversTitle}>No Drivers Selected</span>
                    <span style={styles.noDriversSubtitle}>
                      {jobs.find(j => j.id === assigningJobId)?.assignments.length > 0 
                        ? 'Click Done to clear all assignments, or select drivers on the left'
                        : 'Find and select drivers for this assignment'}
                    </span>
                  </div>
                ) : (
                  <>
                    <div style={styles.selectedDriversHeader}>
                      <span style={styles.selectedDriversLabel}>Driver</span>
                    </div>
                    <div style={styles.selectedDriversList}>
                      {selectedDrivers.map((driver) => (
                        <div key={driver.driverId} style={styles.selectedDriverCard}>
                          <div style={styles.selectedDriverInfo}>
                            <span style={styles.selectedDriverName}>{driver.name}</span>
                            <span style={styles.selectedDriverStatus}>
                              <span style={styles.truckIcon}>🚛</span>
                              {driver.truckId ? `Truck ${driver.truckId}` : 'Unassigned'}
                            </span>
                            <button 
                              style={styles.removeDriverButton}
                              onClick={() => removeSelectedDriver(driver.driverId)}
                            >
                              ×
                            </button>
                          </div>
                          <div style={styles.selectedDriverControls}>
                            <input
                              type="number"
                              min="1"
                              value={driver.loads}
                              onChange={(e) => updateDriverLoads(driver.driverId, e.target.value)}
                              style={styles.loadsInput}
                            />
                            <button
                              style={{
                                ...styles.recurringToggle,
                                ...(driver.recurring ? styles.recurringToggleActive : {}),
                              }}
                              onClick={() => toggleDriverRecurring(driver.driverId)}
                              title="Make flexible load group - drivers can add/remove loads"
                            >
                              ↻
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>

            <div style={styles.assignModalFooter}>
              <button style={styles.clearAllButton} onClick={clearAllDrivers}>Clear all</button>
              <button style={styles.cancelButton} onClick={handleCloseAssignModal}>Cancel</button>
              <button 
                style={styles.doneButton}
                onClick={handleAssignDrivers}
              >
                Done
              </button>
            </div>
          </div>
        </>
      )}

      {/* Copy Forward Modal */}
      {showCopyModal && (copyingJob || copyingJobs.length > 0) && (
        <>
          <div style={styles.overlay} onClick={handleCloseCopyModal} />
          <div style={styles.copyModal}>
            <div style={styles.modalHeader}>
              <h2 style={styles.modalTitle}>
                {copyingJobs.length > 0 
                  ? `Copy ${copyingJobs.length} Jobs Forward`
                  : 'Copy Job Forward'}
              </h2>
              <button style={styles.closeButton} onClick={handleCloseCopyModal}>×</button>
            </div>

            <div style={styles.copyModalContent}>
              {/* Job(s) being copied preview */}
              {copyingJob && (
                <div style={styles.copyJobPreview}>
                  <div style={styles.copyJobHeader}>
                    <span style={styles.copyJobCustomer}>{copyingJob.customer}</span>
                    <span style={{...styles.commodityBadgeSmall, backgroundColor: copyingJob.commodityColor}}>
                      {copyingJob.commodity}
                    </span>
                  </div>
                  <div style={styles.copyJobName}>{copyingJob.jobName}</div>
                </div>
              )}
              {copyingJobs.length > 0 && (
                <div style={styles.copyJobsPreview}>
                  {copyingJobs.slice(0, 3).map((job, i) => (
                    <div key={i} style={styles.copyJobPreviewItem}>
                      <span style={{...styles.commodityDotSmall, backgroundColor: job.commodityColor}} />
                      <span style={styles.copyJobPreviewName}>{job.jobName}</span>
                    </div>
                  ))}
                  {copyingJobs.length > 3 && (
                    <span style={styles.copyJobsMore}>+{copyingJobs.length - 3} more jobs</span>
                  )}
                </div>
              )}

              {/* When to copy */}
              <div style={styles.copySection}>
                <label style={styles.copySectionLabel}>Copy to</label>
                <div style={styles.copyModeOptions}>
                  <label style={styles.copyModeOption}>
                    <input
                      type="radio"
                      name="copyMode"
                      value="tomorrow"
                      checked={copyMode === 'tomorrow'}
                      onChange={() => setCopyMode('tomorrow')}
                      style={styles.copyRadio}
                    />
                    <div style={styles.copyModeContent}>
                      <span style={styles.copyModeTitle}>Tomorrow</span>
                      <span style={styles.copyModeDesc}>{formatDateShort(getTomorrowDate())}</span>
                    </div>
                  </label>
                  <label style={styles.copyModeOption}>
                    <input
                      type="radio"
                      name="copyMode"
                      value="range"
                      checked={copyMode === 'range'}
                      onChange={() => setCopyMode('range')}
                      style={styles.copyRadio}
                    />
                    <div style={styles.copyModeContent}>
                      <span style={styles.copyModeTitle}>Date range</span>
                      <span style={styles.copyModeDesc}>Multiple days</span>
                    </div>
                  </label>
                </div>

                {copyMode === 'range' && (
                  <div style={styles.dateRangeInputs}>
                    <div style={styles.dateInputGroup}>
                      <label style={styles.dateInputLabel}>Start date</label>
                      <input
                        type="date"
                        style={styles.dateInput}
                        value={copyStartDate}
                        onChange={(e) => setCopyStartDate(e.target.value)}
                      />
                    </div>
                    <span style={styles.dateRangeSeparator}>to</span>
                    <div style={styles.dateInputGroup}>
                      <label style={styles.dateInputLabel}>End date</label>
                      <input
                        type="date"
                        style={styles.dateInput}
                        value={copyEndDate}
                        onChange={(e) => setCopyEndDate(e.target.value)}
                      />
                    </div>
                    {getDaysInRange() > 0 && (
                      <span style={styles.daysCount}>{getDaysInRange()} day{getDaysInRange() !== 1 ? 's' : ''}</span>
                    )}
                  </div>
                )}
              </div>

              {/* Targets section - only for single job copy */}
              {copyingJob && (
                <div style={styles.copySection}>
                  <div style={styles.copySectionHeader}>
                    <label style={styles.copySectionLabel}>Targets for copied job</label>
                    <button
                      style={styles.clearTargetsButton}
                      onClick={() => setCopyTargets([])}
                    >
                      Clear all
                    </button>
                  </div>
                  
                  {copyTargets.length > 0 && (
                    <div style={styles.copyTargetsList}>
                      {copyTargets.map((target) => {
                        const unitInfo = unitTypes.find(u => u.key === target.unit);
                        return (
                          <div key={target.unit} style={styles.copyTargetRow}>
                            <span style={styles.copyTargetLabel}>{unitInfo?.label}</span>
                            <input
                              type="number"
                              style={styles.copyTargetInput}
                              value={target.value}
                              onChange={(e) => handleUpdateCopyTarget(target.unit, e.target.value)}
                            />
                            <span style={styles.copyTargetSuffix}>{unitInfo?.suffix}</span>
                            <button 
                              style={styles.copyTargetRemove}
                              onClick={() => handleRemoveCopyTarget(target.unit)}
                            >
                              ×
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {getAvailableCopyTargetUnits().length > 0 && (
                    <div style={styles.addCopyTargetRow}>
                      <select
                        style={styles.copyTargetSelect}
                        value={copyNewTargetUnit}
                        onChange={(e) => setCopyNewTargetUnit(e.target.value)}
                      >
                        <option value="">Add target...</option>
                        {getAvailableCopyTargetUnits().map((unit) => (
                          <option key={unit.key} value={unit.key}>{unit.label}</option>
                        ))}
                      </select>
                      {copyNewTargetUnit && (
                        <>
                          <input
                            type="number"
                            style={styles.copyTargetValueInput}
                            placeholder="Value"
                            value={copyNewTargetValue}
                            onChange={(e) => setCopyNewTargetValue(e.target.value)}
                          />
                          <button 
                            style={styles.addCopyTargetButton}
                            onClick={handleAddCopyTarget}
                            disabled={!copyNewTargetValue}
                          >
                            Add
                          </button>
                        </>
                      )}
                    </div>
                  )}

                  {copyTargets.length === 0 && (
                    <div style={styles.noTargetsHint}>
                      No targets set. Job will be copied without targets.
                    </div>
                  )}
                </div>
              )}

              {/* Driver assignments toggle */}
              <div style={styles.copySection}>
                <label style={styles.copySectionLabel}>Include in copy</label>
                <label style={styles.copyToggleOption}>
                  <div style={styles.copyToggleInfo}>
                    <span style={styles.copyToggleTitle}>Driver assignments</span>
                    <span style={styles.copyToggleDesc}>
                      {copyingJob 
                        ? (copyingJob.assignments.length > 0 
                          ? `${copyingJob.assignments.length} driver${copyingJob.assignments.length !== 1 ? 's' : ''} assigned`
                          : 'No drivers assigned')
                        : 'Keep existing driver assignments'}
                    </span>
                  </div>
                  <button
                    style={{
                      ...styles.toggleSwitch,
                      ...(copyIncludeDrivers ? styles.toggleSwitchOn : {}),
                    }}
                    onClick={() => setCopyIncludeDrivers(!copyIncludeDrivers)}
                  >
                    <span style={{
                      ...styles.toggleKnob,
                      ...(copyIncludeDrivers ? styles.toggleKnobOn : {}),
                    }} />
                  </button>
                </label>
                {copyIncludeDrivers && copyingJob && copyingJob.assignments.length > 0 && (
                  <div style={styles.driverPreviewList}>
                    {copyingJob.assignments.slice(0, 3).map((a, i) => (
                      <span key={i} style={styles.driverPreviewBadge}>
                        {a.driver} ({a.loads}L)
                      </span>
                    ))}
                    {copyingJob.assignments.length > 3 && (
                      <span style={styles.driverPreviewMore}>
                        +{copyingJob.assignments.length - 3} more
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>

            <div style={styles.modalFooter}>
              <button style={styles.cancelButton} onClick={handleCloseCopyModal}>Cancel</button>
              <button style={styles.copyButton} onClick={handleCopyForward}>
                {copyingJobs.length > 0 
                  ? `Copy ${copyingJobs.length} Jobs`
                  : (copyMode === 'range' && getDaysInRange() > 1 ? `Copy to ${getDaysInRange()} days` : 'Copy Forward')}
              </button>
            </div>
          </div>
        </>
      )}

      {/* Message Modal */}
      {showMessageModal && messagingJob && (
        <>
          <div style={styles.overlay} onClick={handleCloseMessageModal} />
          <div style={styles.messageModal}>
            <div style={styles.modalHeader}>
              <h2 style={styles.modalTitle}>Message Drivers</h2>
              <button style={styles.closeButton} onClick={handleCloseMessageModal}>×</button>
            </div>

            <div style={styles.messageModalContent}>
              {/* Job context */}
              <div style={styles.messageJobContext}>
                <span style={styles.messageJobName}>{messagingJob.jobName}</span>
                <span style={styles.messageDriverCount}>
                  {messagingJob.assignments.length} driver{messagingJob.assignments.length !== 1 ? 's' : ''}
                </span>
              </div>

              {/* Recipients */}
              <div style={styles.messageRecipients}>
                {messagingJob.assignments.map((a, i) => (
                  <span key={i} style={styles.recipientBadge}>
                    {a.driver}
                  </span>
                ))}
              </div>

              {/* Message input */}
              <div style={styles.messageInputSection}>
                <label style={styles.messageInputLabel}>Message</label>
                <textarea
                  style={styles.messageTextarea}
                  placeholder="Type your message to the drivers..."
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  rows={4}
                />
              </div>

              {/* Send mode */}
              <div style={styles.messageModeSection}>
                <label style={styles.messageModeLabel}>Send as</label>
                <div style={styles.messageModeOptions}>
                  <label style={{
                    ...styles.messageModeOption,
                    ...(messageMode === 'group' ? styles.messageModeOptionActive : {}),
                  }}>
                    <input
                      type="radio"
                      name="messageMode"
                      value="group"
                      checked={messageMode === 'group'}
                      onChange={() => setMessageMode('group')}
                      style={styles.messageModeRadio}
                    />
                    <div style={styles.messageModeContent}>
                      <span style={styles.messageModeIcon}>👥</span>
                      <div style={styles.messageModeText}>
                        <span style={styles.messageModeTitle}>Group message</span>
                        <span style={styles.messageModeDesc}>Everyone sees the same thread</span>
                      </div>
                    </div>
                  </label>
                  <label style={{
                    ...styles.messageModeOption,
                    ...(messageMode === 'individual' ? styles.messageModeOptionActive : {}),
                  }}>
                    <input
                      type="radio"
                      name="messageMode"
                      value="individual"
                      checked={messageMode === 'individual'}
                      onChange={() => setMessageMode('individual')}
                      style={styles.messageModeRadio}
                    />
                    <div style={styles.messageModeContent}>
                      <span style={styles.messageModeIcon}>👤</span>
                      <div style={styles.messageModeText}>
                        <span style={styles.messageModeTitle}>Individual messages</span>
                        <span style={styles.messageModeDesc}>Separate message to each driver</span>
                      </div>
                    </div>
                  </label>
                </div>
              </div>
            </div>

            <div style={styles.modalFooter}>
              <button style={styles.cancelButton} onClick={handleCloseMessageModal}>Cancel</button>
              <button 
                style={{
                  ...styles.sendMessageButton,
                  ...(messageText.trim() ? {} : styles.sendMessageButtonDisabled),
                }}
                onClick={handleSendMessage}
                disabled={!messageText.trim()}
              >
                Send Message
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

const styles = {
  container: {
    fontFamily: "'IBM Plex Sans', -apple-system, BlinkMacSystemFont, sans-serif",
    backgroundColor: '#FAFBFC',
    minHeight: '100vh',
    color: '#1A202C',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px 24px',
    backgroundColor: '#FFF',
    borderBottom: '1px solid #E2E8F0',
  },
  headerLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
  },
  dateTitle: {
    fontSize: '22px',
    fontWeight: '600',
    margin: 0,
    letterSpacing: '-0.02em',
  },
  navControls: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
  },
  navButton: {
    width: '32px',
    height: '32px',
    border: '1px solid #E2E8F0',
    borderRadius: '6px',
    backgroundColor: '#FFF',
    cursor: 'pointer',
    fontSize: '16px',
    color: '#4A5568',
  },
  todayButton: {
    padding: '6px 12px',
    border: '1px solid #E2E8F0',
    borderRadius: '6px',
    backgroundColor: '#FFF',
    cursor: 'pointer',
    fontSize: '13px',
    fontWeight: '500',
    color: '#4A5568',
  },
  customerFilterWrapper: {
    position: 'relative',
  },
  sortWrapper: {
    position: 'relative',
  },
  sortSelect: {
    padding: '6px 12px',
    border: '1px solid #E2E8F0',
    borderRadius: '6px',
    backgroundColor: '#FFF',
    cursor: 'pointer',
    fontSize: '13px',
    color: '#4A5568',
    outline: 'none',
  },
  customerFilterButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    padding: '6px 12px',
    border: '1px solid #E2E8F0',
    borderRadius: '6px',
    backgroundColor: '#FFF',
    cursor: 'pointer',
    fontSize: '13px',
    color: '#4A5568',
  },
  chevron: {
    fontSize: '10px',
    color: '#718096',
  },
  customerDropdown: {
    position: 'absolute',
    top: '100%',
    left: 0,
    marginTop: '4px',
    width: '280px',
    backgroundColor: '#FFF',
    borderRadius: '8px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
    border: '1px solid #E2E8F0',
    zIndex: 50,
  },
  customerDropdownHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px 14px',
    borderBottom: '1px solid #E2E8F0',
  },
  customerDropdownTitle: {
    fontSize: '12px',
    fontWeight: '500',
    color: '#718096',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  },
  clearFilterButton: {
    padding: '4px 8px',
    border: 'none',
    borderRadius: '4px',
    backgroundColor: 'transparent',
    color: '#3182CE',
    fontSize: '12px',
    fontWeight: '500',
    cursor: 'pointer',
  },
  customerDropdownList: {
    padding: '8px 0',
    maxHeight: '240px',
    overflowY: 'auto',
  },
  customerCheckboxLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '8px 14px',
    cursor: 'pointer',
    fontSize: '13px',
    color: '#1A202C',
    transition: 'background-color 0.1s ease',
  },
  customerCheckbox: {
    width: '16px',
    height: '16px',
    cursor: 'pointer',
  },
  searchWrapper: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#F7FAFC',
    border: '1px solid #E2E8F0',
    borderRadius: '8px',
    padding: '6px 12px',
    gap: '8px',
    flex: 1,
    maxWidth: '400px',
  },
  searchIcon: {
    fontSize: '14px',
    opacity: 0.5,
  },
  searchInput: {
    flex: 1,
    border: 'none',
    background: 'transparent',
    fontSize: '14px',
    outline: 'none',
    color: '#1A202C',
  },
  searchClearButton: {
    border: 'none',
    background: 'transparent',
    color: '#A0AEC0',
    fontSize: '18px',
    cursor: 'pointer',
    padding: '0 4px',
    lineHeight: 1,
  },
  headerRight: {
    display: 'flex',
    gap: '12px',
    alignItems: 'center',
  },
  viewToggle: {
    display: 'flex',
    backgroundColor: '#EDF2F7',
    borderRadius: '6px',
    padding: '2px',
  },
  viewToggleButton: {
    padding: '6px 14px',
    border: 'none',
    borderRadius: '4px',
    backgroundColor: 'transparent',
    color: '#718096',
    cursor: 'pointer',
    fontSize: '13px',
    fontWeight: '500',
    transition: 'all 0.15s ease',
  },
  viewToggleButtonActive: {
    backgroundColor: '#FFF',
    color: '#1A202C',
    boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
  },
  addJobButton: {
    padding: '8px 16px',
    border: 'none',
    borderRadius: '6px',
    backgroundColor: '#3182CE',
    color: '#FFF',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
  },
  configButton: {
    padding: '8px 12px',
    border: '1px solid #E2E8F0',
    borderRadius: '6px',
    backgroundColor: '#FFF',
    cursor: 'pointer',
    fontSize: '16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.15s ease',
  },
  configButtonActive: {
    backgroundColor: '#EBF8FF',
    borderColor: '#3182CE',
  },
  configPanel: {
    backgroundColor: '#FFF',
    borderBottom: '1px solid #E2E8F0',
    padding: '12px 24px',
    display: 'flex',
    alignItems: 'center',
    gap: '24px',
  },
  configPanelHeader: {
    display: 'flex',
    alignItems: 'center',
  },
  configPanelTitle: {
    fontSize: '13px',
    fontWeight: '600',
    color: '#4A5568',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  },
  configOptions: {
    display: 'flex',
    gap: '20px',
  },
  configOption: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    cursor: 'pointer',
  },
  configCheckbox: {
    width: '16px',
    height: '16px',
    cursor: 'pointer',
    accentColor: '#3182CE',
  },
  configLabel: {
    fontSize: '14px',
    color: '#4A5568',
  },
  tableWrapper: {
    overflowX: 'auto',
    padding: '0 16px',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    fontSize: '13px',
  },
  tableHeaderRow: {
    borderBottom: '1px solid #E2E8F0',
  },
  thCheckbox: {
    width: '40px',
    padding: '12px 8px',
    textAlign: 'left',
  },
  thWorkToDo: {
    padding: '12px 16px',
    textAlign: 'left',
    fontWeight: '500',
    fontSize: '11px',
    color: '#718096',
    letterSpacing: '0.05em',
    minWidth: '340px',
  },
  thNotes: {
    padding: '12px 16px',
    textAlign: 'left',
    fontWeight: '500',
    fontSize: '11px',
    color: '#718096',
    letterSpacing: '0.05em',
    minWidth: '160px',
    width: '15%',
  },
  thProgress: {
    padding: '12px 16px',
    textAlign: 'left',
    fontWeight: '500',
    fontSize: '11px',
    color: '#718096',
    letterSpacing: '0.05em',
    minWidth: '200px',
    width: '18%',
  },
  thAssignments: {
    padding: '12px 16px',
    textAlign: 'left',
    fontWeight: '500',
    fontSize: '11px',
    color: '#718096',
    letterSpacing: '0.05em',
    minWidth: '300px',
    width: '25%',
  },
  thActions: {
    padding: '12px 16px',
    width: '100px',
  },
  tableRow: {
    borderBottom: '1px solid #F1F5F9',
    cursor: 'pointer',
    transition: 'background-color 0.15s ease',
    backgroundColor: '#FFF',
    height: 'auto',
  },
  tdCheckbox: {
    padding: '10px 8px',
    verticalAlign: 'top',
  },
  checkbox: {
    width: '16px',
    height: '16px',
    cursor: 'pointer',
  },
  tdWorkToDo: {
    padding: '10px 12px',
    verticalAlign: 'top',
  },
  jobInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  },
  primaryInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: '3px',
  },
  secondaryInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    paddingTop: '4px',
    borderTop: '1px solid #F1F5F9',
    marginTop: '3px',
    opacity: 0.7,
  },
  jobNamePrimary: {
    fontSize: '13px',
    color: '#4A5568',
    fontWeight: '500',
  },
  jobNameSecondary: {
    fontSize: '12px',
    color: '#718096',
    flex: 1,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  secondaryBadges: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    flexShrink: 0,
  },
  customerRow: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '8px',
  },
  customerName: {
    fontWeight: '600',
    fontSize: '15px',
    color: '#1A202C',
  },
  startTimeBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '3px',
    padding: '2px 8px',
    borderRadius: '4px',
    fontSize: '11px',
    fontWeight: '600',
    backgroundColor: '#EBF8FF',
    color: '#2B6CB0',
    border: '1px solid #BEE3F8',
    whiteSpace: 'nowrap',
  },
  startTimeBadgeSecondary: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '3px',
    padding: '2px 6px',
    borderRadius: '3px',
    fontSize: '10px',
    fontWeight: '500',
    backgroundColor: '#F7FAFC',
    color: '#718096',
    border: '1px solid #E2E8F0',
    whiteSpace: 'nowrap',
  },
  startTimeBadgeRange: {
    backgroundColor: '#FEFCBF',
    color: '#975A16',
    border: '1px solid #F6E05E',
  },
  tagBadge: {
    padding: '2px 8px',
    borderRadius: '4px',
    fontSize: '10px',
    fontWeight: '600',
    backgroundColor: '#E9D8FD',
    color: '#6B46C1',
    textTransform: 'uppercase',
    letterSpacing: '0.03em',
  },
  tagBadgeSmall: {
    padding: '2px 6px',
    borderRadius: '3px',
    fontSize: '9px',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: '0.02em',
  },
  commodityBadge: {
    padding: '2px 8px',
    borderRadius: '4px',
    fontSize: '11px',
    fontWeight: '500',
    color: '#FFF',
  },
  refBadge: {
    padding: '2px 8px',
    borderRadius: '4px',
    fontSize: '11px',
    fontWeight: '400',
    backgroundColor: '#EDF2F7',
    color: '#4A5568',
    border: '1px solid #E2E8F0',
  },
  refBadgeSmall: {
    padding: '2px 6px',
    borderRadius: '3px',
    fontSize: '10px',
    fontWeight: '500',
    backgroundColor: '#EDF2F7',
    color: '#718096',
  },
  refBadgeType: {
    fontWeight: '600',
    color: '#718096',
  },
  jobName: {
    fontSize: '12px',
    color: '#718096',
  },
  routeRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    marginTop: '2px',
  },
  locationTag: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    fontSize: '13px',
    color: '#2D3748',
    fontWeight: '500',
  },
  pickupDot: {
    color: '#48BB78',
    fontSize: '10px',
  },
  dropoffDot: {
    color: '#F56565',
    fontSize: '10px',
  },
  routeArrow: {
    color: '#A0AEC0',
    fontSize: '12px',
  },
  chargesIcon: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '18px',
    height: '18px',
    borderRadius: '4px',
    fontSize: '11px',
    fontWeight: '700',
    cursor: 'help',
    whiteSpace: 'pre-line',
  },
  chargesIconSet: {
    backgroundColor: '#C6F6D5',
    color: '#276749',
  },
  chargesIconNotSet: {
    backgroundColor: '#FED7D7',
    color: '#C53030',
    opacity: 0.7,
  },
  tdNotes: {
    padding: '10px 12px',
    verticalAlign: 'top',
    minWidth: '180px',
  },
  notesTextarea: {
    width: '100%',
    padding: '8px 10px',
    border: '1px solid transparent',
    borderRadius: '6px',
    fontSize: '13px',
    backgroundColor: 'transparent',
    color: '#4A5568',
    transition: 'all 0.15s ease',
    outline: 'none',
    resize: 'none',
    lineHeight: '1.4',
    fontFamily: 'inherit',
  },
  tdProgress: {
    padding: '10px 12px',
    verticalAlign: 'top',
  },
  targetPills: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '6px',
    alignItems: 'flex-start',
  },
  targetPill: {
    display: 'inline-flex',
    alignItems: 'center',
    padding: '4px 10px',
    borderRadius: '12px',
    fontSize: '12px',
    fontWeight: '600',
    whiteSpace: 'nowrap',
  },
  noTargetState: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },
  noTargetTrucks: {
    fontSize: '13px',
    fontWeight: '500',
    color: '#4A5568',
  },
  noTargetHint: {
    fontSize: '11px',
    color: '#A0AEC0',
    fontStyle: 'italic',
  },
  tdAssignments: {
    padding: '10px 12px',
    verticalAlign: 'top',
  },
  assignmentsList: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    gap: '4px',
    alignItems: 'flex-start',
    alignContent: 'flex-start',
  },
  assignmentBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    padding: '3px 8px',
    borderRadius: '12px',
    fontSize: '11px',
    fontWeight: '500',
    whiteSpace: 'nowrap',
    lineHeight: '1.4',
    flexShrink: 0,
    flexGrow: 0,
    width: 'fit-content',
  },
  recurringIcon: {
    marginLeft: '2px',
    color: '#4299E1',
  },
  assignmentTime: {
    fontSize: '10px',
    fontWeight: '700',
    marginRight: '6px',
    padding: '1px 4px',
    backgroundColor: 'rgba(0,0,0,0.1)',
    borderRadius: '3px',
  },
  addAssignmentButton: {
    width: '24px',
    height: '24px',
    border: '2px dashed #CBD5E0',
    borderRadius: '12px',
    backgroundColor: 'transparent',
    color: '#A0AEC0',
    fontSize: '16px',
    cursor: 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.15s ease',
    flexShrink: 0,
    flexGrow: 0,
  },
  tdActions: {
    padding: '10px 12px',
    verticalAlign: 'middle',
  },
  actionButtons: {
    display: 'flex',
    gap: '8px',
    opacity: 0.6,
    transition: 'opacity 0.15s ease',
  },
  actionButton: {
    width: '34px',
    height: '34px',
    border: '2px solid #E2E8F0',
    borderRadius: '8px',
    backgroundColor: '#F7FAFC',
    cursor: 'pointer',
    fontSize: '15px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.15s ease',
  },
  actionButtonCopy: {
    borderColor: '#BEE3F8',
    backgroundColor: '#EBF8FF',
  },
  actionButtonMessage: {
    borderColor: '#C6F6D5',
    backgroundColor: '#F0FFF4',
  },
  actionButtonDanger: {
    borderColor: '#FED7D7',
    backgroundColor: '#FFF5F5',
  },
  // Edit Panel Styles
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    zIndex: 100,
  },
  editPanel: {
    position: 'fixed',
    top: 0,
    right: 0,
    width: '420px',
    height: '100vh',
    backgroundColor: '#FFF',
    boxShadow: '-4px 0 24px rgba(0, 0, 0, 0.12)',
    zIndex: 101,
    display: 'flex',
    flexDirection: 'column',
    animation: 'slideIn 0.2s ease-out',
  },
  panelHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px 24px',
    borderBottom: '1px solid #E2E8F0',
  },
  panelTitle: {
    fontSize: '18px',
    fontWeight: '600',
    margin: 0,
  },
  closeButton: {
    width: '32px',
    height: '32px',
    border: 'none',
    borderRadius: '6px',
    backgroundColor: '#F7FAFC',
    cursor: 'pointer',
    fontSize: '20px',
    color: '#718096',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  panelContent: {
    flex: 1,
    overflowY: 'auto',
    padding: '24px',
  },
  panelSection: {
    marginBottom: '20px',
  },
  customerDisplay: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },
  customerValue: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#1A202C',
  },
  label: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    fontSize: '13px',
    fontWeight: '500',
    color: '#4A5568',
    marginBottom: '8px',
  },
  labelSmall: {
    fontSize: '11px',
    fontWeight: '500',
    color: '#718096',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  },
  commoditySelectWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '2px',
    border: '1px solid #E2E8F0',
    borderRadius: '8px',
    backgroundColor: '#FFF',
  },
  commodityDot: {
    width: '12px',
    height: '12px',
    borderRadius: '50%',
    marginLeft: '10px',
    flexShrink: 0,
  },
  commoditySelect: {
    flex: 1,
    padding: '10px 12px 10px 0',
    border: 'none',
    fontSize: '14px',
    backgroundColor: 'transparent',
    cursor: 'pointer',
    color: '#1A202C',
    outline: 'none',
  },
  select: {
    width: '100%',
    padding: '10px 12px',
    border: '1px solid #E2E8F0',
    borderRadius: '8px',
    fontSize: '14px',
    backgroundColor: '#FFF',
    cursor: 'pointer',
    color: '#1A202C',
  },
  input: {
    width: '100%',
    padding: '10px 12px',
    border: '1px solid #E2E8F0',
    borderRadius: '8px',
    fontSize: '14px',
    backgroundColor: '#FFF',
    color: '#1A202C',
    outline: 'none',
    boxSizing: 'border-box',
  },
  divider: {
    height: '1px',
    backgroundColor: '#E2E8F0',
    margin: '24px 0',
  },
  sectionHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '12px',
  },
  panelSectionTitle: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#1A202C',
  },
  existingTargets: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    marginBottom: '12px',
  },
  targetRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '10px 12px',
    backgroundColor: '#F7FAFC',
    borderRadius: '8px',
    border: '1px solid #E2E8F0',
  },
  targetRowLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  targetUnitLabel: {
    fontSize: '13px',
    fontWeight: '500',
    color: '#4A5568',
    minWidth: '70px',
  },
  targetValueInput: {
    width: '80px',
    padding: '6px 10px',
    border: '1px solid #E2E8F0',
    borderRadius: '6px',
    fontSize: '14px',
    textAlign: 'right',
  },
  targetSuffix: {
    fontSize: '12px',
    color: '#718096',
  },
  removeTargetButton: {
    width: '28px',
    height: '28px',
    border: 'none',
    borderRadius: '4px',
    backgroundColor: 'transparent',
    color: '#A0AEC0',
    cursor: 'pointer',
    fontSize: '18px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addTargetSection: {
    marginTop: '8px',
  },
  addTargetRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  unitSelect: {
    flex: 1,
    padding: '10px 12px',
    border: '1px dashed #CBD5E0',
    borderRadius: '8px',
    fontSize: '13px',
    backgroundColor: '#FFF',
    cursor: 'pointer',
    color: '#718096',
  },
  newTargetValueInput: {
    width: '80px',
    padding: '10px 12px',
    border: '1px solid #E2E8F0',
    borderRadius: '8px',
    fontSize: '14px',
  },
  addTargetButton: {
    padding: '10px 16px',
    border: 'none',
    borderRadius: '8px',
    backgroundColor: '#3182CE',
    color: '#FFF',
    fontSize: '13px',
    fontWeight: '500',
    cursor: 'pointer',
  },
  targetHint: {
    fontSize: '12px',
    color: '#718096',
    lineHeight: '1.5',
    backgroundColor: '#F7FAFC',
    padding: '12px',
    borderRadius: '8px',
  },
  // Start time styles
  startTimeInputRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  startTimeInput: {
    flex: 1,
    padding: '10px 12px',
    border: '1px solid #E2E8F0',
    borderRadius: '8px',
    fontSize: '14px',
    maxWidth: '140px',
  },
  clearStartTimeButton: {
    padding: '8px 12px',
    border: 'none',
    borderRadius: '6px',
    backgroundColor: '#EDF2F7',
    color: '#718096',
    fontSize: '13px',
    cursor: 'pointer',
  },
  // Reference styles
  existingReferences: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    marginBottom: '12px',
  },
  referenceRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '10px 12px',
    backgroundColor: '#F7FAFC',
    borderRadius: '8px',
    border: '1px solid #E2E8F0',
  },
  referenceRowLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    flex: 1,
  },
  referenceTypeLabel: {
    fontSize: '13px',
    fontWeight: '500',
    color: '#4A5568',
    minWidth: '90px',
  },
  referenceValueInput: {
    flex: 1,
    padding: '6px 10px',
    border: '1px solid #E2E8F0',
    borderRadius: '6px',
    fontSize: '14px',
  },
  addReferenceSection: {
    marginTop: '8px',
  },
  addReferenceRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  refTypeSelect: {
    flex: 1,
    padding: '10px 12px',
    border: '1px dashed #CBD5E0',
    borderRadius: '8px',
    fontSize: '13px',
    backgroundColor: '#FFF',
    cursor: 'pointer',
    color: '#718096',
  },
  newRefValueInput: {
    flex: 1,
    padding: '10px 12px',
    border: '1px solid #E2E8F0',
    borderRadius: '8px',
    fontSize: '14px',
  },
  referenceHint: {
    fontSize: '12px',
    color: '#718096',
    lineHeight: '1.5',
    backgroundColor: '#F7FAFC',
    padding: '12px',
    borderRadius: '8px',
  },
  // Charges styles
  chargesStatusBadge: {
    padding: '2px 8px',
    borderRadius: '4px',
    fontSize: '11px',
    fontWeight: '600',
  },
  chargesStatusSet: {
    backgroundColor: '#C6F6D5',
    color: '#276749',
  },
  chargesStatusNotSet: {
    backgroundColor: '#FEFCBF',
    color: '#975A16',
  },
  rateScheduleRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '12px',
  },
  rateScheduleLabel: {
    fontSize: '13px',
    fontWeight: '500',
    color: '#4A5568',
  },
  rateScheduleSelector: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  rateScheduleSelect: {
    padding: '8px 12px',
    border: '1px solid #E2E8F0',
    borderRadius: '6px',
    fontSize: '13px',
    minWidth: '220px',
    cursor: 'pointer',
  },
  clearRateScheduleButton: {
    width: '24px',
    height: '24px',
    border: 'none',
    borderRadius: '4px',
    backgroundColor: '#EDF2F7',
    color: '#718096',
    fontSize: '16px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  chargesTable: {
    border: '1px solid #E2E8F0',
    borderRadius: '8px',
    overflow: 'hidden',
    marginBottom: '12px',
  },
  chargesHeader: {
    display: 'flex',
    padding: '10px 12px',
    backgroundColor: '#F7FAFC',
    borderBottom: '1px solid #E2E8F0',
    fontSize: '11px',
    fontWeight: '600',
    color: '#718096',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  },
  chargeRow: {
    display: 'flex',
    padding: '12px',
    borderBottom: '1px solid #F1F5F9',
    fontSize: '13px',
    alignItems: 'center',
  },
  chargesColType: {
    flex: 2,
    display: 'flex',
    flexDirection: 'column',
    gap: '2px',
  },
  chargeDesc: {
    fontSize: '11px',
    color: '#718096',
  },
  chargesColUnit: {
    flex: 1,
    color: '#718096',
  },
  chargesColRate: {
    flex: 1,
    textAlign: 'right',
    fontWeight: '600',
    fontFamily: 'monospace',
  },
  chargesHint: {
    fontSize: '12px',
    color: '#718096',
    lineHeight: '1.5',
    backgroundColor: '#F7FAFC',
    padding: '12px',
    borderRadius: '8px',
    marginBottom: '12px',
  },
  addChargeButton: {
    padding: '8px 14px',
    border: '2px dashed #CBD5E0',
    borderRadius: '6px',
    backgroundColor: 'transparent',
    color: '#4A5568',
    fontSize: '13px',
    fontWeight: '500',
    cursor: 'pointer',
    width: '100%',
  },
  actualsSummary: {
    display: 'flex',
    gap: '16px',
    marginTop: '12px',
    padding: '16px',
    backgroundColor: '#F7FAFC',
    borderRadius: '8px',
  },
  actualSummaryItem: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '4px',
  },
  actualSummaryValue: {
    fontSize: '20px',
    fontWeight: '600',
    color: '#1A202C',
  },
  actualSummaryLabel: {
    fontSize: '11px',
    color: '#718096',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  },
  panelFooter: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '12px',
    padding: '16px 24px',
    borderTop: '1px solid #E2E8F0',
    backgroundColor: '#FAFBFC',
  },
  cancelButton: {
    padding: '10px 20px',
    border: '1px solid #E2E8F0',
    borderRadius: '8px',
    backgroundColor: '#FFF',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500',
    color: '#4A5568',
  },
  saveButton: {
    padding: '10px 20px',
    border: 'none',
    borderRadius: '8px',
    backgroundColor: '#3182CE',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500',
    color: '#FFF',
  },
  // Create Modal Styles
  createModal: {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '560px',
    maxHeight: '85vh',
    backgroundColor: '#FFF',
    borderRadius: '12px',
    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.2)',
    zIndex: 101,
    display: 'flex',
    flexDirection: 'column',
    animation: 'fadeIn 0.2s ease-out',
  },
  modalHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px 24px 16px',
  },
  modalTitle: {
    fontSize: '18px',
    fontWeight: '600',
    margin: 0,
  },
  modeTabs: {
    display: 'flex',
    gap: '12px',
    padding: '0 24px 20px',
  },
  modeTab: {
    flex: 1,
    padding: '14px 16px',
    border: '2px solid #E2E8F0',
    borderRadius: '10px',
    backgroundColor: '#FFF',
    cursor: 'pointer',
    textAlign: 'center',
    transition: 'all 0.15s ease',
    display: 'flex',
    flexDirection: 'column',
    gap: '2px',
  },
  modeTabActive: {
    borderColor: '#3182CE',
    backgroundColor: '#EBF8FF',
  },
  modeTabTitle: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#1A202C',
  },
  modeTabSubtitle: {
    fontSize: '12px',
    color: '#718096',
  },
  modalContent: {
    flex: 1,
    overflowY: 'auto',
    padding: '0 24px 20px',
    maxHeight: '400px',
  },
  templateList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  templateItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: '14px 16px',
    border: '1px solid #E2E8F0',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.15s ease',
  },
  templateInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  },
  templateName: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#1A202C',
  },
  templateMeta: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '12px',
    fontSize: '12px',
    color: '#718096',
  },
  templateCustomer: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
  },
  templateRoute: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
  },
  templateCommodity: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
  },
  smallDot: {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
  },
  selectedTemplateBadge: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px 14px',
    backgroundColor: '#EBF8FF',
    borderRadius: '8px',
    border: '1px solid #90CDF4',
    marginBottom: '20px',
  },
  selectedTemplateInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2px',
  },
  selectedTemplateLabel: {
    fontSize: '11px',
    color: '#2B6CB0',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  },
  selectedTemplateName: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#1A202C',
  },
  changeTemplateButton: {
    padding: '6px 12px',
    border: '1px solid #90CDF4',
    borderRadius: '6px',
    backgroundColor: '#FFF',
    color: '#2B6CB0',
    fontSize: '12px',
    fontWeight: '500',
    cursor: 'pointer',
  },
  formSection: {
    marginBottom: '16px',
  },
  formRow: {
    display: 'flex',
    gap: '12px',
  },
  formLabel: {
    display: 'block',
    fontSize: '13px',
    fontWeight: '500',
    color: '#4A5568',
    marginBottom: '6px',
  },
  formSelect: {
    width: '100%',
    padding: '10px 12px',
    border: '1px solid #E2E8F0',
    borderRadius: '8px',
    fontSize: '14px',
    backgroundColor: '#FFF',
    cursor: 'pointer',
    color: '#1A202C',
  },
  newJobTargets: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
    marginBottom: '10px',
  },
  newJobTargetRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '8px 12px',
    backgroundColor: '#F7FAFC',
    borderRadius: '6px',
    fontSize: '13px',
  },
  removeTargetButtonSmall: {
    width: '24px',
    height: '24px',
    border: 'none',
    borderRadius: '4px',
    backgroundColor: 'transparent',
    color: '#A0AEC0',
    cursor: 'pointer',
    fontSize: '16px',
  },
  unitSelectSmall: {
    flex: 1,
    padding: '8px 10px',
    border: '1px dashed #CBD5E0',
    borderRadius: '6px',
    fontSize: '13px',
    backgroundColor: '#FFF',
    cursor: 'pointer',
    color: '#718096',
  },
  targetValueInputSmall: {
    width: '70px',
    padding: '8px 10px',
    border: '1px solid #E2E8F0',
    borderRadius: '6px',
    fontSize: '13px',
  },
  addTargetButtonSmall: {
    padding: '8px 14px',
    border: 'none',
    borderRadius: '6px',
    backgroundColor: '#3182CE',
    color: '#FFF',
    fontSize: '12px',
    fontWeight: '500',
    cursor: 'pointer',
  },
  modalFooter: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '12px',
    padding: '16px 24px',
    borderTop: '1px solid #E2E8F0',
    backgroundColor: '#FAFBFC',
    borderRadius: '0 0 12px 12px',
  },
  createButton: {
    padding: '10px 20px',
    border: 'none',
    borderRadius: '8px',
    backgroundColor: '#3182CE',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500',
    color: '#FFF',
  },
  createButtonDisabled: {
    backgroundColor: '#CBD5E0',
    cursor: 'not-allowed',
  },
  // Assign Driver Modal Styles
  assignModal: {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '800px',
    height: '600px',
    backgroundColor: '#FFF',
    borderRadius: '12px',
    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.2)',
    zIndex: 101,
    display: 'flex',
    flexDirection: 'column',
    animation: 'fadeIn 0.2s ease-out',
  },
  assignModalHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px 24px',
    borderBottom: '1px solid #E2E8F0',
  },
  assignModalBody: {
    display: 'flex',
    flex: 1,
    overflow: 'hidden',
  },
  driverListPanel: {
    width: '400px',
    borderRight: '1px solid #E2E8F0',
    display: 'flex',
    flexDirection: 'column',
    padding: '16px',
  },
  driverSearchWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '10px 14px',
    border: '1px solid #E2E8F0',
    borderRadius: '8px',
    marginBottom: '12px',
  },
  driverSearchInput: {
    flex: 1,
    border: 'none',
    outline: 'none',
    fontSize: '14px',
    backgroundColor: 'transparent',
  },
  selectAllLink: {
    alignSelf: 'flex-start',
    padding: '4px 0',
    border: 'none',
    backgroundColor: 'transparent',
    color: '#3182CE',
    fontSize: '13px',
    fontWeight: '500',
    cursor: 'pointer',
    marginBottom: '12px',
    textDecoration: 'underline',
  },
  driverFleetList: {
    flex: 1,
    overflowY: 'auto',
  },
  fleetGroup: {
    marginBottom: '8px',
  },
  fleetHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    padding: '10px 0',
    border: 'none',
    backgroundColor: 'transparent',
    cursor: 'pointer',
    fontSize: '12px',
    fontWeight: '600',
    color: '#1A202C',
    letterSpacing: '0.05em',
  },
  fleetName: {
    textTransform: 'uppercase',
  },
  fleetChevron: {
    fontSize: '12px',
    color: '#718096',
    transition: 'transform 0.15s ease',
  },
  fleetDrivers: {
    paddingLeft: '8px',
  },
  driverRow: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '12px',
    padding: '10px 8px',
    cursor: 'pointer',
    borderRadius: '6px',
    transition: 'background-color 0.1s ease',
  },
  driverRowUnavailable: {
    backgroundColor: '#FFF5F5',
    border: '1px solid #FED7D7',
  },
  driverRowWithNote: {
    backgroundColor: '#FFFBEB',
    border: '1px solid #FCD34D',
  },
  driverCheckbox: {
    width: '18px',
    height: '18px',
    marginTop: '2px',
    cursor: 'pointer',
    accentColor: '#3182CE',
  },
  driverInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2px',
  },
  driverNameRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    flexWrap: 'wrap',
  },
  driverName: {
    fontSize: '14px',
    fontWeight: '500',
    color: '#1A202C',
  },
  driverNameUnavailable: {
    color: '#9B2C2C',
  },
  driverNoteBadge: {
    fontSize: '11px',
    padding: '2px 8px',
    borderRadius: '4px',
    backgroundColor: '#FEF3C7',
    color: '#92400E',
    fontWeight: '500',
  },
  driverStatus: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    fontSize: '12px',
    color: '#718096',
  },
  driverUnassigned: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    fontSize: '12px',
    color: '#A0AEC0',
    fontStyle: 'italic',
  },
  driverSchedule: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
    marginTop: '4px',
  },
  scheduleItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    padding: '4px 8px',
    backgroundColor: '#F7FAFC',
    borderRadius: '4px',
    fontSize: '11px',
  },
  scheduleIndex: {
    width: '18px',
    height: '18px',
    borderRadius: '4px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '10px',
    fontWeight: '600',
  },
  scheduleJobName: {
    flex: 1,
    color: '#4A5568',
    fontWeight: '500',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    maxWidth: '140px',
  },
  scheduleCommodityDot: {
    width: '6px',
    height: '6px',
    borderRadius: '50%',
  },
  scheduleLoads: {
    color: '#718096',
    fontWeight: '500',
  },
  truckIcon: {
    fontSize: '12px',
  },
  selectedDriversPanel: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    padding: '16px',
  },
  noDriversSelected: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
  },
  noDriversTitle: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#718096',
  },
  noDriversSubtitle: {
    fontSize: '13px',
    color: '#A0AEC0',
  },
  selectedDriversHeader: {
    padding: '0 8px 12px',
    borderBottom: '1px solid #E2E8F0',
    marginBottom: '12px',
  },
  selectedDriversLabel: {
    fontSize: '12px',
    fontWeight: '500',
    color: '#718096',
  },
  selectedDriversList: {
    flex: 1,
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  selectedDriverCard: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '12px 14px',
    backgroundColor: '#EBF8FF',
    borderRadius: '8px',
    border: '1px solid #BEE3F8',
  },
  selectedDriverInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2px',
    position: 'relative',
    paddingRight: '24px',
  },
  selectedDriverName: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#1A202C',
  },
  selectedDriverStatus: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    fontSize: '12px',
    color: '#3182CE',
  },
  removeDriverButton: {
    position: 'absolute',
    top: '0',
    right: '0',
    width: '20px',
    height: '20px',
    border: 'none',
    borderRadius: '4px',
    backgroundColor: 'transparent',
    color: '#718096',
    fontSize: '16px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedDriverControls: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  loadsInput: {
    width: '50px',
    padding: '8px 10px',
    border: '1px solid #E2E8F0',
    borderRadius: '6px',
    fontSize: '14px',
    textAlign: 'center',
    backgroundColor: '#FFF',
  },
  recurringToggle: {
    width: '36px',
    height: '36px',
    border: '1px solid #E2E8F0',
    borderRadius: '6px',
    backgroundColor: '#FFF',
    color: '#718096',
    fontSize: '16px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.15s ease',
  },
  recurringToggleActive: {
    backgroundColor: '#3182CE',
    borderColor: '#3182CE',
    color: '#FFF',
  },
  assignModalFooter: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '12px',
    padding: '16px 24px',
    borderTop: '1px solid #E2E8F0',
    backgroundColor: '#FAFBFC',
    borderRadius: '0 0 12px 12px',
  },
  clearAllButton: {
    padding: '10px 20px',
    border: 'none',
    borderRadius: '8px',
    backgroundColor: 'transparent',
    color: '#3182CE',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
    marginRight: 'auto',
  },
  doneButton: {
    padding: '10px 24px',
    border: 'none',
    borderRadius: '8px',
    backgroundColor: '#3182CE',
    color: '#FFF',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
  },
  doneButtonDisabled: {
    backgroundColor: '#CBD5E0',
    cursor: 'not-allowed',
  },
  // Copy Modal Styles
  copyModal: {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '480px',
    backgroundColor: '#FFF',
    borderRadius: '12px',
    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.2)',
    zIndex: 101,
    display: 'flex',
    flexDirection: 'column',
    animation: 'fadeIn 0.2s ease-out',
  },
  copyModalContent: {
    padding: '0 24px 24px',
  },
  copyJobPreview: {
    padding: '16px',
    backgroundColor: '#F7FAFC',
    borderRadius: '8px',
    marginBottom: '20px',
  },
  copyJobHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginBottom: '4px',
  },
  copyJobCustomer: {
    fontSize: '12px',
    color: '#718096',
    fontWeight: '500',
  },
  commodityBadgeSmall: {
    padding: '2px 6px',
    borderRadius: '4px',
    fontSize: '10px',
    fontWeight: '500',
    color: '#FFF',
  },
  copyJobName: {
    fontSize: '15px',
    fontWeight: '600',
    color: '#1A202C',
  },
  copyJobTargets: {
    display: 'flex',
    gap: '8px',
    marginTop: '8px',
  },
  copyJobTarget: {
    fontSize: '12px',
    color: '#4A5568',
    backgroundColor: '#EDF2F7',
    padding: '2px 8px',
    borderRadius: '4px',
  },
  copySection: {
    marginBottom: '20px',
  },
  copySectionLabel: {
    display: 'block',
    fontSize: '13px',
    fontWeight: '600',
    color: '#4A5568',
    marginBottom: '10px',
  },
  copyModeOptions: {
    display: 'flex',
    gap: '12px',
  },
  copyModeOption: {
    flex: 1,
    display: 'flex',
    alignItems: 'flex-start',
    gap: '10px',
    padding: '14px',
    border: '2px solid #E2E8F0',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.15s ease',
  },
  copyRadio: {
    marginTop: '2px',
    accentColor: '#3182CE',
  },
  copyModeContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2px',
  },
  copyModeTitle: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#1A202C',
  },
  copyModeDesc: {
    fontSize: '12px',
    color: '#718096',
  },
  dateRangeInputs: {
    display: 'flex',
    alignItems: 'flex-end',
    gap: '12px',
    marginTop: '12px',
    padding: '12px',
    backgroundColor: '#F7FAFC',
    borderRadius: '8px',
  },
  dateInputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },
  dateInputLabel: {
    fontSize: '11px',
    fontWeight: '500',
    color: '#718096',
  },
  dateInput: {
    padding: '8px 10px',
    border: '1px solid #E2E8F0',
    borderRadius: '6px',
    fontSize: '13px',
    backgroundColor: '#FFF',
  },
  dateRangeSeparator: {
    fontSize: '13px',
    color: '#718096',
    paddingBottom: '8px',
  },
  daysCount: {
    fontSize: '13px',
    fontWeight: '500',
    color: '#3182CE',
    paddingBottom: '8px',
    marginLeft: 'auto',
  },
  copyToggleOption: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '14px 16px',
    border: '1px solid #E2E8F0',
    borderRadius: '8px',
    cursor: 'pointer',
  },
  copyToggleInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2px',
  },
  copyToggleTitle: {
    fontSize: '14px',
    fontWeight: '500',
    color: '#1A202C',
  },
  copyToggleDesc: {
    fontSize: '12px',
    color: '#718096',
  },
  toggleSwitch: {
    width: '44px',
    height: '24px',
    borderRadius: '12px',
    backgroundColor: '#CBD5E0',
    border: 'none',
    cursor: 'pointer',
    position: 'relative',
    transition: 'background-color 0.2s ease',
  },
  toggleSwitchOn: {
    backgroundColor: '#3182CE',
  },
  toggleKnob: {
    position: 'absolute',
    top: '2px',
    left: '2px',
    width: '20px',
    height: '20px',
    borderRadius: '50%',
    backgroundColor: '#FFF',
    boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
    transition: 'left 0.2s ease',
  },
  toggleKnobOn: {
    left: '22px',
  },
  driverPreviewList: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '6px',
    marginTop: '10px',
    padding: '10px 12px',
    backgroundColor: '#F7FAFC',
    borderRadius: '6px',
  },
  driverPreviewBadge: {
    padding: '4px 10px',
    backgroundColor: '#EBF8FF',
    border: '1px solid #BEE3F8',
    borderRadius: '4px',
    fontSize: '12px',
    color: '#2B6CB0',
    fontWeight: '500',
  },
  driverPreviewMore: {
    padding: '4px 10px',
    fontSize: '12px',
    color: '#718096',
  },
  copyButton: {
    padding: '10px 20px',
    border: 'none',
    borderRadius: '8px',
    backgroundColor: '#3182CE',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500',
    color: '#FFF',
  },
  // Message Modal Styles
  messageModal: {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '480px',
    backgroundColor: '#FFF',
    borderRadius: '12px',
    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.2)',
    zIndex: 101,
    display: 'flex',
    flexDirection: 'column',
    animation: 'fadeIn 0.2s ease-out',
  },
  messageModalContent: {
    padding: '0 24px 24px',
  },
  messageJobContext: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px 16px',
    backgroundColor: '#F7FAFC',
    borderRadius: '8px',
    marginBottom: '16px',
  },
  messageJobName: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#1A202C',
  },
  messageDriverCount: {
    fontSize: '13px',
    color: '#718096',
  },
  messageRecipients: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '6px',
    marginBottom: '16px',
  },
  recipientBadge: {
    padding: '4px 10px',
    backgroundColor: '#EDF2F7',
    borderRadius: '4px',
    fontSize: '13px',
    fontWeight: '500',
    color: '#4A5568',
  },
  messageInputSection: {
    marginBottom: '16px',
  },
  messageInputLabel: {
    display: 'block',
    fontSize: '13px',
    fontWeight: '600',
    color: '#4A5568',
    marginBottom: '8px',
  },
  messageTextarea: {
    width: '100%',
    padding: '12px',
    border: '1px solid #E2E8F0',
    borderRadius: '8px',
    fontSize: '14px',
    resize: 'none',
    fontFamily: 'inherit',
    lineHeight: '1.5',
  },
  messageModeSection: {
    marginBottom: '8px',
  },
  messageModeLabel: {
    display: 'block',
    fontSize: '13px',
    fontWeight: '600',
    color: '#4A5568',
    marginBottom: '10px',
  },
  messageModeOptions: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  messageModeOption: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '12px 14px',
    border: '2px solid #E2E8F0',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.15s ease',
  },
  messageModeOptionActive: {
    borderColor: '#48BB78',
    backgroundColor: '#F0FFF4',
  },
  messageModeRadio: {
    display: 'none',
  },
  messageModeContent: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  messageModeIcon: {
    fontSize: '20px',
  },
  messageModeText: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2px',
  },
  messageModeTitle: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#1A202C',
  },
  messageModeDesc: {
    fontSize: '12px',
    color: '#718096',
  },
  sendMessageButton: {
    padding: '10px 20px',
    border: 'none',
    borderRadius: '8px',
    backgroundColor: '#48BB78',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500',
    color: '#FFF',
  },
  sendMessageButtonDisabled: {
    backgroundColor: '#CBD5E0',
    cursor: 'not-allowed',
  },
  // Bulk Action Bar Styles
  bulkActionBar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px 24px',
    backgroundColor: '#EBF8FF',
    borderBottom: '1px solid #BEE3F8',
  },
  bulkActionLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
  },
  bulkSelectedCount: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#2B6CB0',
  },
  bulkSelectAllButton: {
    padding: '6px 12px',
    border: 'none',
    borderRadius: '6px',
    backgroundColor: 'transparent',
    color: '#3182CE',
    fontSize: '13px',
    fontWeight: '500',
    cursor: 'pointer',
    textDecoration: 'underline',
  },
  bulkClearButton: {
    padding: '6px 12px',
    border: 'none',
    borderRadius: '6px',
    backgroundColor: 'transparent',
    color: '#718096',
    fontSize: '13px',
    fontWeight: '500',
    cursor: 'pointer',
  },
  bulkActionRight: {
    display: 'flex',
    gap: '8px',
  },
  bulkBillingButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    padding: '8px 16px',
    border: 'none',
    borderRadius: '8px',
    backgroundColor: '#48BB78',
    color: '#FFF',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
  },
  bulkCopyButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    padding: '8px 16px',
    border: 'none',
    borderRadius: '8px',
    backgroundColor: '#3182CE',
    color: '#FFF',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
  },
  // Copy Target Styles
  copySectionHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '10px',
  },
  clearTargetsButton: {
    padding: '4px 10px',
    border: 'none',
    borderRadius: '4px',
    backgroundColor: 'transparent',
    color: '#718096',
    fontSize: '12px',
    cursor: 'pointer',
  },
  copyTargetsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    marginBottom: '12px',
  },
  copyTargetRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '10px 12px',
    backgroundColor: '#F7FAFC',
    borderRadius: '8px',
    border: '1px solid #E2E8F0',
  },
  copyTargetLabel: {
    width: '80px',
    fontSize: '13px',
    fontWeight: '500',
    color: '#4A5568',
  },
  copyTargetInput: {
    width: '80px',
    padding: '6px 10px',
    border: '1px solid #E2E8F0',
    borderRadius: '6px',
    fontSize: '14px',
    textAlign: 'center',
  },
  copyTargetSuffix: {
    fontSize: '12px',
    color: '#718096',
  },
  copyTargetRemove: {
    marginLeft: 'auto',
    width: '24px',
    height: '24px',
    border: 'none',
    borderRadius: '4px',
    backgroundColor: 'transparent',
    color: '#A0AEC0',
    fontSize: '16px',
    cursor: 'pointer',
  },
  addCopyTargetRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  copyTargetSelect: {
    flex: 1,
    padding: '10px 12px',
    border: '1px dashed #CBD5E0',
    borderRadius: '8px',
    fontSize: '13px',
    backgroundColor: '#FFF',
    cursor: 'pointer',
    color: '#718096',
  },
  copyTargetValueInput: {
    width: '80px',
    padding: '10px 12px',
    border: '1px solid #E2E8F0',
    borderRadius: '8px',
    fontSize: '14px',
    textAlign: 'center',
  },
  addCopyTargetButton: {
    padding: '10px 16px',
    border: 'none',
    borderRadius: '8px',
    backgroundColor: '#3182CE',
    color: '#FFF',
    fontSize: '13px',
    fontWeight: '500',
    cursor: 'pointer',
  },
  noTargetsHint: {
    fontSize: '12px',
    color: '#718096',
    padding: '12px',
    backgroundColor: '#F7FAFC',
    borderRadius: '8px',
    textAlign: 'center',
  },
  // Bulk copy preview styles
  copyJobsPreview: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
    padding: '12px',
    backgroundColor: '#F7FAFC',
    borderRadius: '8px',
    marginBottom: '20px',
  },
  copyJobPreviewItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '13px',
    color: '#4A5568',
  },
  commodityDotSmall: {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
  },
  copyJobPreviewName: {
    fontWeight: '500',
  },
  copyJobsMore: {
    fontSize: '12px',
    color: '#718096',
    marginTop: '4px',
  },
};

// Add hover effect via CSS-in-JS workaround
const styleSheet = document.createElement('style');
styleSheet.textContent = `
  @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600&display=swap');
  
  @keyframes slideIn {
    from { transform: translateX(100%); }
    to { transform: translateX(0); }
  }
  
  @keyframes fadeIn {
    from { opacity: 0; transform: translate(-50%, -48%); }
    to { opacity: 1; transform: translate(-50%, -50%); }
  }
  
  tr:hover {
    background-color: #EDF2F7 !important;
  }
  
  .customerCheckboxLabel:hover {
    background-color: #F7FAFC;
  }
  
  .templateItem:hover {
    border-color: #CBD5E0;
    background-color: #F7FAFC;
  }
  
  .addAssignmentButton:hover {
    border-color: #3182CE;
    color: #3182CE;
    background-color: #EBF8FF;
  }
  
  .driverRow:hover {
    background-color: #F7FAFC;
  }
  
  .notesInput:hover {
    border-color: #E2E8F0;
    background-color: #F7FAFC;
  }
  
  .notesInput:focus {
    border-color: #3182CE;
    background-color: #FFF;
    box-shadow: 0 0 0 3px rgba(49, 130, 206, 0.1);
  }
  
  tr:hover .actionButtons {
    opacity: 1;
  }
  
  .actionButton:hover {
    transform: scale(1.05);
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  }
  
  .actionButtonDanger:hover {
    background-color: #FED7D7;
    border-color: #FC8181;
  }
  
  .actionButton:disabled {
    opacity: 0.4;
    cursor: not-allowed;
    transform: none;
  }
  
  .removeTargetButton:hover {
    background-color: #FED7D7 !important;
    color: #C53030 !important;
  }
`;
document.head.appendChild(styleSheet);
