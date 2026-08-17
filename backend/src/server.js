const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { connectDB } = require('./config/db');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Connect to Database
connectDB();

// API Routes
app.use('/api/jobs', require('./routes/jobRoutes'));
app.use('/api/resumes', require('./routes/resumeRoutes'));
app.use('/api/applications', require('./routes/applicationRoutes'));
app.use('/api/email', require('./routes/emailRoutes'));
app.use('/api/settings', require('./routes/settingsRoutes'));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    system: 'FlowHire C2C Automation API Engine',
    timestamp: new Date().toISOString()
  });
});

app.listen(PORT, () => {
  console.log(`=======================================================`);
  console.log(`🚀 FlowHire Express Server running on http://localhost:${PORT}`);
  console.log(`📊 MERN Backend Engine Ready for LinkedIn C2C Jobs & Gmail`);
  console.log(`=======================================================`);
});
