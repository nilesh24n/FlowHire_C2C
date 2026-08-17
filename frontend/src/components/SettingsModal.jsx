import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { 
  X, 
  Key, 
  Mail, 
  Search, 
  Save
} from 'lucide-react';
import * as api from '../services/api';

export const SettingsModal = ({ isOpen, onClose }) => {
  const { settings, setSettings, showToast } = useApp();
  
  const [formData, setFormData] = useState({
    openaiApiKey: '',
    geminiApiKey: '',
    gmailEmail: '',
    gmailAppPassword: '',
    searchKeywords: 'C2C, Corp-to-Corp, 1099, Java, React, Node, DevOps',
    minPayRate: 60
  });

  useEffect(() => {
    if (settings) {
      setFormData({
        openaiApiKey: settings.openaiApiKey || '',
        geminiApiKey: settings.geminiApiKey || '',
        gmailEmail: settings.gmailEmail || '',
        gmailAppPassword: settings.gmailAppPassword || '',
        searchKeywords: settings.searchKeywords || 'C2C, Corp-to-Corp, 1099, Java, React, Node, DevOps',
        minPayRate: settings.minPayRate || 60
      });
    }
  }, [settings]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.updateSettings(formData);
      if (res.success) {
        setSettings(res.data);
        showToast('System settings & Gmail credentials updated!', 'success');
        onClose();
      }
    } catch (err) {
      showToast('Failed to save settings', 'error');
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ padding: '28px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <div>
            <h2 style={{ fontSize: '22px', fontWeight: 800 }}>FlowHire Platform Configuration</h2>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Configure AI model keys, Gmail SMTP credentials, and search defaults.</p>
          </div>
          <button onClick={onClose} className="btn-secondary" style={{ padding: '6px' }}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {/* AI Settings Section */}
          <div style={{ background: 'rgba(9,14,24,0.85)', padding: '18px', borderRadius: '12px', border: '1px solid var(--border-color)', marginBottom: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 700, fontSize: '15px', color: 'var(--brand-orange)', marginBottom: '14px' }}>
              <Key size={18} /> AI Model Integration Keys (OpenAI / Gemini)
            </div>

            <div className="form-group">
              <label className="form-label">OpenAI API Key (Optional)</label>
              <input
                type="password"
                value={formData.openaiApiKey}
                onChange={(e) => setFormData({ ...formData, openaiApiKey: e.target.value })}
                className="form-input"
                placeholder="sk-..."
              />
            </div>

            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Google Gemini API Key (Optional)</label>
              <input
                type="password"
                value={formData.geminiApiKey}
                onChange={(e) => setFormData({ ...formData, geminiApiKey: e.target.value })}
                className="form-input"
                placeholder="AIzaSy..."
              />
            </div>
          </div>

          {/* Gmail Settings Section */}
          <div style={{ background: 'rgba(9,14,24,0.85)', padding: '18px', borderRadius: '12px', border: '1px solid var(--border-color)', marginBottom: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 700, fontSize: '15px', color: 'var(--brand-green)', marginBottom: '14px' }}>
              <Mail size={18} /> Gmail SMTP Credentials
            </div>

            <div className="form-group">
              <label className="form-label">Gmail Address</label>
              <input
                type="email"
                value={formData.gmailEmail}
                onChange={(e) => setFormData({ ...formData, gmailEmail: e.target.value })}
                className="form-input"
                placeholder="your.email@gmail.com"
              />
            </div>

            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Gmail App Password (16-character passcode)</label>
              <input
                type="password"
                value={formData.gmailAppPassword}
                onChange={(e) => setFormData({ ...formData, gmailAppPassword: e.target.value })}
                className="form-input"
                placeholder="xxxx xxxx xxxx xxxx"
              />
              <span style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px' }}>
                Generated via Google Account -&gt; Security -&gt; 2-Step Verification -&gt; App Passwords.
              </span>
            </div>
          </div>

          {/* Search Preferences Section */}
          <div style={{ background: 'rgba(9,14,24,0.85)', padding: '18px', borderRadius: '12px', border: '1px solid var(--border-color)', marginBottom: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 700, fontSize: '15px', color: 'var(--brand-yellow)', marginBottom: '14px' }}>
              <Search size={18} /> LinkedIn Search Default Parameters
            </div>

            <div className="form-group">
              <label className="form-label">Target Search Keywords</label>
              <input
                type="text"
                value={formData.searchKeywords}
                onChange={(e) => setFormData({ ...formData, searchKeywords: e.target.value })}
                className="form-input"
              />
            </div>

            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Minimum Hourly Rate Filter ($/hr)</label>
              <input
                type="number"
                value={formData.minPayRate}
                onChange={(e) => setFormData({ ...formData, minPayRate: e.target.value })}
                className="form-input"
              />
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
            <button type="button" onClick={onClose} className="btn-secondary">
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              <Save size={16} /> Save Settings
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
