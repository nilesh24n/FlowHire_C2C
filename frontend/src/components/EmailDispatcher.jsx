import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Mail, 
  Send, 
  CheckCircle2, 
  Paperclip, 
  Clock, 
  ShieldCheck
} from 'lucide-react';

export const EmailDispatcher = () => {
  const { emailLogs, handleSendEmail, settings, loading, showToast } = useApp();

  const [to, setTo] = useState('sarah.jenkins@apextechsol.com');
  const [recruiterName, setRecruiterName] = useState('Sarah Jenkins');
  const [jobTitle, setJobTitle] = useState('Senior Java Backend Engineer (C2C)');
  const [subject, setSubject] = useState('C2C Candidate Profile Submission - Senior Java Developer');
  const [body, setBody] = useState(`Hello Sarah,

I am submitting my candidate profile for the Senior Java Backend Engineer (C2C) position. I bring over 8+ years of hands-on expertise specializing in Core Java, Spring Boot microservices, Kafka, AWS, and MongoDB.

I am immediately available for Corp-to-Corp (C2C) contract engagements with active vendor authorization.

Customized C2C consultant resume is attached. I look forward to connecting!

Best regards,
Alex Vance
Senior C2C Solutions Architect`);

  const onSubmitEmail = (e) => {
    e.preventDefault();
    if (!to) return showToast('Please provide a recruiter email address', 'warning');
    handleSendEmail({
      to,
      recruiterName,
      jobTitle,
      subject,
      body,
      resumeContent: 'Tailored Resume Content attached.'
    });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* SMTP Connection Card */}
      <div className="glass-panel" style={{ padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{ padding: '12px', borderRadius: '12px', background: 'rgba(16, 185, 129, 0.15)', color: 'var(--brand-green)' }}>
            <ShieldCheck size={24} />
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: '16px' }}>Gmail Dispatch Engine Active</div>
            <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
              Connected Sender: <span style={{ color: 'var(--text-main)', fontWeight: 600 }}>{settings.gmailEmail || 'alex.vance.c2c@gmail.com'}</span>
            </div>
          </div>
        </div>

        <div className="badge badge-green" style={{ fontSize: '13px', padding: '6px 14px' }}>
          <CheckCircle2 size={14} /> Nodemailer SMTP Verified
        </div>
      </div>

      <div className="grid-2">
        {/* Email Composer */}
        <div className="glass-panel" style={{ padding: '28px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: 700 }}>Gmail Application Dispatcher</h3>
            <span className="badge badge-c2c">Resume Attached</span>
          </div>

          <form onSubmit={onSubmitEmail}>
            <div className="form-group">
              <label className="form-label">Recruiter Email Address (To)</label>
              <input
                type="email"
                value={to}
                onChange={(e) => setTo(e.target.value)}
                className="form-input"
                required
              />
            </div>

            <div className="grid-2">
              <div className="form-group">
                <label className="form-label">Recruiter Name</label>
                <input
                  type="text"
                  value={recruiterName}
                  onChange={(e) => setRecruiterName(e.target.value)}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Target Job Title</label>
                <input
                  type="text"
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  className="form-input"
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Email Subject Line</label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Application Cover Letter & Pitch</label>
              <textarea
                value={body}
                onChange={(e) => setBody(e.target.value)}
                className="form-textarea"
                style={{ minHeight: '160px' }}
              />
            </div>

            <div style={{ background: 'rgba(9, 14, 24, 0.85)', padding: '12px 16px', borderRadius: '8px', border: '1px solid var(--border-color)', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Paperclip size={16} style={{ color: 'var(--brand-orange)' }} />
              <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
                Attachment: <strong style={{ color: 'var(--text-main)' }}>Resume_{jobTitle.replace(/[^a-zA-Z0-9]/g, '_')}.txt</strong>
              </span>
            </div>

            <button type="submit" disabled={loading} className="btn-primary" style={{ width: '100%', padding: '12px' }}>
              <Send size={18} /> {loading ? 'Dispatching Email...' : 'Dispatch Application via Gmail'}
            </button>
          </form>
        </div>

        {/* Email Logs History Table */}
        <div className="glass-panel" style={{ padding: '28px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '16px' }}>Gmail Dispatch Audit Logs</h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxHeight: '520px', overflowY: 'auto' }}>
            {emailLogs.length > 0 ? (
              emailLogs.map((log) => (
                <div key={log.id} className="glass-card" style={{ padding: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '6px' }}>
                    <div style={{ fontWeight: 700, fontSize: '14px' }}>{log.to}</div>
                    <span className="badge badge-green" style={{ fontSize: '11px' }}>
                      <CheckCircle2 size={12} /> {log.status}
                    </span>
                  </div>

                  <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '4px' }}>
                    Role: {log.jobTitle} • Recruiter: {log.recruiterName}
                  </div>

                  <div style={{ fontSize: '11px', color: 'var(--brand-yellow-light)', display: 'flex', justifyContent: 'space-between', marginTop: '8px' }}>
                    <span>MessageId: {log.messageId || 'N/A'}</span>
                    <span>{new Date(log.timestamp).toLocaleTimeString()}</span>
                  </div>
                </div>
              ))
            ) : (
              <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>
                <Clock size={36} style={{ opacity: 0.4, marginBottom: '10px' }} />
                <div>No email logs yet. Dispatched applications will log here.</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
