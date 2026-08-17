const { memoryStore } = require('../config/db');

exports.getSettings = async (req, res) => {
  res.json({ success: true, data: memoryStore.settings });
};

exports.updateSettings = async (req, res) => {
  try {
    memoryStore.settings = { ...memoryStore.settings, ...req.body };
    res.json({
      success: true,
      message: 'System settings & API credentials updated successfully',
      data: memoryStore.settings
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
