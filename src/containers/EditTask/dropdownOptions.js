const trackerList = [{
    name: 'Feature',
    id: 2
  },
  {
    name: 'Bug',
    id: 1
  },
  {
    name: 'Support',
    id: 3
  },
  {
    name: 'Task',
    id: 4
  },
  {
    name: 'User story',
    id: 16
  },
  {
    name: 'Build',
    id: 14
  },
  {
    name: 'Release',
    id: 12
  }
];

const statussesList = {
  '1': [
    { id: 1, name: 'New' },
    { id: 2, name: 'In Progress' },
    { id: 4, name: 'Feedback' },
    { id: 6, name: 'Rejected' }
  ],
  '2': [
    { id: 1, name: 'New' },
    { id: 2, name: 'In Progress' },
    { id: 3, name: 'Resolved' },
    { id: 4, name: 'Feedback' },
    { id: 7, name: 'QA' },
    { id: 6, name: 'Rejected' }
  ],
  '3': [
    { id: 2, name: 'In Progress' },
    { id: 3, name: 'Resolved' },
    { id: 4, name: 'Feedback' },
    { id: 6, name: 'Rejected' }
  ],
  '4': [
    { id: 1, name: 'New' },
    { id: 2, name: 'In Progress' },
    { id: 4, name: 'Feedback' },
    { id: 7, name: 'QA' },
    { id: 6, name: 'Rejected' }
  ],
  '6': [
    { id: 1, name: 'New' },
    { id: 6, name: 'Rejected' },
    { id: 5, name: 'Closed' }
  ],
  '7': [
    { id: 1, name: 'New' },
    { id: 4, name: 'Feedback' },
    { id: 7, name: 'QA' },
    { id: 8, name: 'Cancelled' },
    { id: 5, name: 'Closed' }
  ],
  '8': [
    { id: 8, name: 'Cancelled' },
    { id: 7, name: 'Closed' }
  ]
};

const priorityList = [{
    name: 'Low',
    id: 1
  },
  {
    name: 'Normal',
    id: 2
  },
  {
    name: 'High',
    id: 3
  },
  {
    name: 'Urgent',
    id: 4
  }
];

const severityList = ['Moderate', 'Minor', 'Major', 'Critical'];

export {
  trackerList,
  statussesList,
  priorityList,
  severityList
};