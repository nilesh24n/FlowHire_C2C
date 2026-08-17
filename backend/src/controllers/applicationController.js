let applications = [
  {
    id: 'app-201',
    jobTitle: 'Senior Java Backend Engineer (C2C)',
    company: 'Apex Tech Solutions Inc',
    recruiterName: 'Sarah Jenkins',
    recruiterEmail: 'sarah.jenkins@apextechsol.com',
    rate: '$85/hr',
    matchScore: 94,
    status: 'Applied',
    appliedDate: '2026-08-17',
    notes: 'Submitted customized resume via Gmail. Awaiting initial recruiter phone screen.'
  },
  {
    id: 'app-202',
    jobTitle: 'Lead React / MERN Stack Consultant',
    company: 'Vanguard IT Staffing',
    recruiterName: 'David Miller',
    recruiterEmail: 'david.m@vanguardstaffing.com',
    rate: '$95/hr',
    matchScore: 98,
    status: 'Recruiter Screen',
    appliedDate: '2026-08-16',
    notes: 'Recruiter confirmed rate $95/hr C2C. Right to Represent (RTR) signed.'
  },
  {
    id: 'app-203',
    jobTitle: 'Full Stack Node.js Developer',
    company: 'Synergy Tech Corp',
    recruiterName: 'Michael Chang',
    recruiterEmail: 'mchang@synergytechcorp.com',
    rate: '$75/hr',
    matchScore: 96,
    status: 'Client Interview',
    appliedDate: '2026-08-14',
    notes: 'Technical round scheduled with End Client Lead Architect.'
  }
];

exports.getApplications = async (req, res) => {
  res.json({ success: true, count: applications.length, data: applications });
};

exports.createApplication = async (req, res) => {
  try {
    const newApp = {
      id: `app-${Date.now()}`,
      appliedDate: new Date().toISOString().split('T')[0],
      status: 'Applied',
      ...req.body
    };
    applications.unshift(newApp);
    res.status(201).json({ success: true, data: newApp });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.updateApplicationStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, notes } = req.body;
    
    const app = applications.find(a => a.id === id);
    if (!app) {
      return res.status(404).json({ success: false, message: 'Application not found' });
    }

    if (status) app.status = status;
    if (notes) app.notes = notes;

    res.json({ success: true, data: app });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.deleteApplication = async (req, res) => {
  try {
    const { id } = req.params;
    applications = applications.filter(a => a.id !== id);
    res.json({ success: true, message: 'Application record deleted' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
