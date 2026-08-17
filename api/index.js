const express = require('express');
const cors = require('cors');
const { connectDB } = require('../backend/src/config/db');

const app = express();

app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

connectDB();

app.use('/api/jobs', require('../backend/src/routes/jobRoutes'));
app.use('/api/resumes', require('../backend/src/routes/resumeRoutes'));
app.use('/api/applications', require('../backend/src/routes/applicationRoutes'));
app.use('/api/email', require('../backend/src/routes/emailRoutes'));
app.use('/api/settings', require('../backend/src/routes/settingsRoutes'));

app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    system: 'FlowHire C2C Automation API Engine',
    timestamp: new Date().toISOString()
  });
});

module.exports = app;
