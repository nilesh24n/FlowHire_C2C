const AiResumeService = require('../services/aiResumeService');
const { memoryStore } = require('../config/db');

// Master Resume default template
let masterResume = {
  id: 'master-resume-1',
  name: 'Alex Vance',
  title: 'Senior MERN & C2C Solutions Architect',
  email: 'alex.vance.c2c@gmail.com',
  phone: '+1 (415) 890-3412',
  location: 'Austin, TX (Open to Remote C2C)',
  linkedin: 'https://linkedin.com/in/alexvance-c2c',
  github: 'https://github.com/alexvance-dev',
  hourlyRate: '$85/hr C2C',
  summary: 'Experienced Senior Full Stack Developer & C2C Technical Consultant with 8+ years architecting cloud-native web applications using HTML5, CSS3, JavaScript, React, Node.js, Express, and MongoDB.',
  skills: ['JavaScript (ES6+)', 'React.js', 'Node.js', 'Express.js', 'MongoDB', 'HTML5 & CSS3', 'TypeScript', 'AWS (EC2/S3/Lambda)', 'REST APIs', 'Docker', 'Git', 'C2C Vendor Management'],
  experience: [
    {
      company: 'Apex Digital Systems (C2C Contract)',
      role: 'Lead Full Stack Engineer',
      duration: '2023 - Present',
      points: [
        'Architected high-throughput microservices using React, Node.js, and MongoDB handling 50k+ active web requests per minute.',
        'Engineered responsive user interfaces using vanilla CSS, modern flexbox/grid components, and custom hooks.',
        'Managed Corp-to-Corp (C2C) client deliverables, API integrations, and CI/CD automated deployments.'
      ]
    },
    {
      company: 'Vanguard Software Inc',
      role: 'Senior React / JavaScript Developer',
      duration: '2020 - 2023',
      points: [
        'Built enterprise analytics dashboards with real-time WebSocket data updates.',
        'Optimized frontend performance reducing initial bundle load times by 45%.'
      ]
    }
  ]
};

let tailoredResumes = [];

exports.getMasterResume = async (req, res) => {
  res.json({ success: true, data: masterResume });
};

exports.updateMasterResume = async (req, res) => {
  try {
    masterResume = { ...masterResume, ...req.body };
    res.json({ success: true, message: 'Master Resume updated successfully', data: masterResume });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.tailorResume = async (req, res) => {
  try {
    const { jobTitle, jobDescription, targetCompany } = req.body;
    
    if (!jobDescription) {
      return res.status(400).json({ success: false, message: 'Job description is required for AI resume customizer' });
    }

    const tailoredResult = await AiResumeService.tailorResume({
      masterResume,
      jobTitle: jobTitle || 'C2C Software Engineer',
      jobDescription,
      targetCompany: targetCompany || 'Client Partner'
    });

    const newTailoredEntry = {
      id: `tailored-${Date.now()}`,
      jobTitle: jobTitle || 'C2C Position',
      company: targetCompany || 'Target Recruiter',
      result: tailoredResult,
      createdAt: new Date().toISOString()
    };

    tailoredResumes.unshift(newTailoredEntry);

    res.json({
      success: true,
      data: newTailoredEntry
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.getTailoredResumes = async (req, res) => {
  res.json({ success: true, data: tailoredResumes });
};
