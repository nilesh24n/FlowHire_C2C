const MailerService = require('../services/mailerService');
const { memoryStore } = require('../config/db');

let emailLogs = [];

exports.sendApplicationEmail = async (req, res) => {
  try {
    const { to, subject, body, recruiterName, jobTitle, resumeContent } = req.body;

    if (!to) {
      return res.status(400).json({ success: false, message: 'Recruiter email address (to) is required' });
    }

    const dispatchResult = await MailerService.sendApplicationEmail({
      to,
      subject,
      body,
      recruiterName: recruiterName || 'Recruiter',
      jobTitle: jobTitle || 'C2C Opportunity',
      resumeContent,
      settings: memoryStore.settings
    });

    const logEntry = {
      id: `email-log-${Date.now()}`,
      to,
      jobTitle: jobTitle || 'C2C Role',
      recruiterName: recruiterName || 'Recruiter',
      subject: subject || `C2C Application: ${jobTitle}`,
      status: dispatchResult.success ? 'Sent' : 'Failed',
      mode: dispatchResult.mode,
      messageId: dispatchResult.messageId,
      timestamp: new Date().toISOString()
    };

    emailLogs.unshift(logEntry);

    res.json({
      success: true,
      message: `Application email successfully sent to ${to}`,
      data: logEntry
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.getEmailLogs = async (req, res) => {
  res.json({ success: true, count: emailLogs.length, data: emailLogs });
};
