const LinkedinScraperService = require('../services/linkedinScraperService');
const { memoryStore } = require('../config/db');

// In-memory jobs list initialized with seed data
let storedJobs = [
  ...require('../services/linkedinScraperService').MOCK_C2C_JOBS || []
];

exports.getJobs = async (req, res) => {
  try {
    const { keyword, location, minRate } = req.query;
    if (keyword || location || minRate) {
      const filtered = await LinkedinScraperService.searchJobs({ keyword, location, minRate });
      return res.json({ success: true, count: filtered.length, data: filtered });
    }
    return res.json({ success: true, count: storedJobs.length, data: storedJobs });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.scanLinkedinJobs = async (req, res) => {
  try {
    const { keyword = 'C2C', location = 'Remote', minRate = 60 } = req.body;
    console.log(`[Job Controller] Triggering LinkedIn Scraper scan for: ${keyword}`);
    
    const newScraped = await LinkedinScraperService.searchJobs({ keyword, location, minRate });
    
    // Add unique scanned jobs to store
    newScraped.forEach(job => {
      if (!storedJobs.some(j => j.id === job.id)) {
        storedJobs.unshift(job);
      }
    });

    return res.json({
      success: true,
      message: `Scanned ${newScraped.length} C2C jobs from LinkedIn matching "${keyword}"`,
      data: storedJobs
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.createJob = async (req, res) => {
  try {
    const jobData = {
      id: `c2c-custom-${Date.now()}`,
      postedDate: 'Just now',
      status: 'New',
      ...req.body
    };
    storedJobs.unshift(jobData);
    res.status(201).json({ success: true, data: jobData });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.deleteJob = async (req, res) => {
  try {
    const { id } = req.params;
    storedJobs = storedJobs.filter(j => j.id !== id);
    res.json({ success: true, message: 'Job posting removed' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
