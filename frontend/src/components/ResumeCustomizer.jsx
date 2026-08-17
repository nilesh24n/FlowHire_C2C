import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  FileText, 
  Sparkles, 
  CheckCircle2, 
  Copy, 
  Send, 
  User
} from 'lucide-react';

export const ResumeCustomizer = () => {
  const { 
    masterResume, 
    activeTailored, 
    selectedJob, 
    handleTailorResume, 
    handleSendEmail, 
    setActiveTab,
    showToast 
  } = useApp();

  const [customJobDesc, setCustomJobDesc] = useState('');
  const [customJobTitle, setCustomJobTitle] = useState('Senior C2C Consultant');
  const [activeView, setActiveView] = useState('tailored');

  const onManualTailor = (e) => {
    e.preventDefault();
    if (!customJobDesc) return showToast('Please enter a job description', 'warning');
    handleTailorResume({
      title: customJobTitle,
      company: 'Client Vendor',
      description: customJobDesc
    });
  };

  const currentResult = activeTailored ? activeTailored.result : null;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Top Header Controls */}
      <div className="glass-panel" style={{ padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h2 style={{ fontSize: '22px', fontWeight: 800 }}>Bespoke Resume Studio</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>
            Customize your resume for target C2C jobs, optimize technical keywords, and craft recruiter outreach pitches.
          </p>
        </div>

        <div className="nav-tabs" style={{ padding: '4px' }}>
          <button 
            onClick={() => setActiveView('tailored')}
            className={`tab-btn ${activeView === 'tailored' ? 'active' : ''}`}
          >
            <Sparkles size={15} /> Tailored Resume Output
          </button>
          <button 
            onClick={() => setActiveView('master')}
            className={`tab-btn ${activeView === 'master' ? 'active' : ''}`}
          >
            <User size={15} /> Master Resume Baseline
          </button>
        </div>
      </div>

      {activeView === 'tailored' ? (
        currentResult ? (
          <div className="grid-2">
            {/* Left: Customized Resume Details */}
            <div className="glass-panel" style={{ padding: '28px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', paddingBottom: '16px', borderBottom: '1px solid var(--border-color)' }}>
                <div>
                  <span className="badge badge-c2c" style={{ marginBottom: '6px' }}>Tailored Version</span>
                  <h3 style={{ fontSize: '20px', fontWeight: 700 }}>{activeTailored.jobTitle}</h3>
                  <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Target: {activeTailored.company}</div>
                </div>

                <div style={{ textAlign: 'center', background: 'rgba(245, 158, 11, 0.15)', padding: '10px 16px', borderRadius: '12px', border: '1px solid rgba(245, 158, 11, 0.35)' }}>
                  <div style={{ fontSize: '11px', color: 'var(--brand-yellow-light)', fontWeight: 700, textTransform: 'uppercase' }}>Match Score</div>
                  <div style={{ fontSize: '24px', fontWeight: 800, color: 'var(--brand-yellow-light)' }}>{currentResult.matchScore}%</div>
                </div>
              </div>

              {/* Tailored Professional Summary */}
              <div style={{ marginBottom: '20px' }}>
                <h4 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--brand-orange)', marginBottom: '8px' }}>OPTIMIZED PROFESSIONAL SUMMARY</h4>
                <p style={{ fontSize: '14px', color: '#cbd5e1', lineHeight: '1.6', background: 'rgba(9, 14, 24, 0.7)', padding: '14px', borderRadius: '8px', borderLeft: '3px solid var(--brand-orange)' }}>
                  {currentResult.tailoredSummary}
                </p>
              </div>

              {/* Optimized Keywords */}
              <div style={{ marginBottom: '20px' }}>
                <h4 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--brand-green)', marginBottom: '8px' }}>KEYWORD MATCH ALIGNMENT</h4>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {currentResult.optimizedSkills.map((skill, idx) => (
                    <span key={idx} className="badge badge-green" style={{ fontSize: '12px', padding: '4px 10px' }}>
                      <CheckCircle2 size={12} /> {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Tailored Experience Bullets */}
              <div style={{ marginBottom: '24px' }}>
                <h4 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--brand-yellow-light)', marginBottom: '10px' }}>HIGHLIGHTED EXPERIENCE BULLETS</h4>
                <ul style={{ paddingLeft: '20px', color: '#cbd5e1', fontSize: '14px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {currentResult.tailoredBullets.map((bullet, idx) => (
                    <li key={idx}>{bullet}</li>
                  ))}
                </ul>
              </div>

              <div style={{ display: 'flex', gap: '12px' }}>
                <button 
                  onClick={() => {
                    navigator.clipboard.writeText(JSON.stringify(currentResult, null, 2));
                    showToast('Tailored resume copied to clipboard!', 'success');
                  }}
                  className="btn-secondary"
                  style={{ flex: 1 }}
                >
                  <Copy size={16} /> Copy Resume Text
                </button>
              </div>
            </div>

            {/* Right: Cover Letter & Direct Gmail Dispatch */}
            <div className="glass-panel" style={{ padding: '28px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#f8fafc' }}>Generated Recruiter Cover Letter</h3>
                  <span className="badge badge-c2c">Gmail Ready</span>
                </div>

                <div style={{ whiteSpace: 'pre-wrap', background: '#070c14', padding: '18px', borderRadius: '10px', border: '1px solid var(--border-color)', color: '#e2e8f0', fontSize: '13px', lineHeight: '1.6', marginBottom: '20px' }}>
                  {currentResult.coverLetter}
                </div>
              </div>

              <div style={{ background: 'rgba(249, 115, 22, 0.1)', padding: '18px', borderRadius: '12px', border: '1px solid rgba(249, 115, 22, 0.3)' }}>
                <div style={{ fontWeight: 700, fontSize: '15px', marginBottom: '4px' }}>Ready to Apply via Gmail?</div>
                <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '16px' }}>
                  Dispatch this tailored resume and pitch directly to {selectedJob ? selectedJob.recruiterEmail || 'the recruiter' : 'the recruiter'}.
                </p>

                <button
                  onClick={() => {
                    handleSendEmail({
                      to: selectedJob ? selectedJob.recruiterEmail : 'recruiter@apextechsol.com',
                      recruiterName: selectedJob ? selectedJob.recruiterName : 'Hiring Recruiter',
                      jobTitle: activeTailored.jobTitle,
                      targetCompany: activeTailored.company,
                      body: currentResult.coverLetter,
                      resumeContent: `${currentResult.tailoredSummary}\n\nKey Skills:\n${currentResult.optimizedSkills.join(', ')}`,
                      matchScore: currentResult.matchScore
                    });
                    setActiveTab('email');
                  }}
                  className="btn-primary"
                  style={{ width: '100%', padding: '12px' }}
                >
                  <Send size={18} /> Send Application via Gmail
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* Custom Job Input Generator */
          <div className="glass-panel" style={{ padding: '36px', textAlign: 'center' }}>
            <Sparkles size={48} style={{ color: 'var(--brand-orange)', marginBottom: '16px' }} />
            <h3 style={{ fontSize: '22px', fontWeight: 800, marginBottom: '8px' }}>No Tailored Resume Selected</h3>
            <p style={{ color: 'var(--text-muted)', maxWidth: '550px', margin: '0 auto 24px auto' }}>
              Select a job posting from the C2C Job Finder tab or paste any job description below to tailor your master resume.
            </p>

            <form onSubmit={onManualTailor} style={{ maxWidth: '650px', margin: '0 auto', textAlign: 'left' }}>
              <div className="form-group">
                <label className="form-label">Job Title</label>
                <input
                  type="text"
                  value={customJobTitle}
                  onChange={(e) => setCustomJobTitle(e.target.value)}
                  className="form-input"
                  placeholder="e.g. Senior React & C2C Consultant"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Paste Job Description</label>
                <textarea
                  value={customJobDesc}
                  onChange={(e) => setCustomJobDesc(e.target.value)}
                  className="form-textarea"
                  placeholder="Paste LinkedIn or Vendor C2C job description here..."
                  style={{ minHeight: '140px' }}
                />
              </div>

              <button type="submit" className="btn-primary" style={{ width: '100%', padding: '12px' }}>
                <Sparkles size={18} /> Tailor Resume & Generate Cover Pitch
              </button>
            </form>
          </div>
        )
      ) : (
        /* Master Resume View */
        <div className="glass-panel" style={{ padding: '28px' }}>
          <h3 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '16px' }}>Master Resume Baseline Template</h3>
          
          {masterResume && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ background: 'rgba(9, 14, 24, 0.85)', padding: '18px', borderRadius: '10px', border: '1px solid var(--border-color)' }}>
                <div style={{ fontWeight: 800, fontSize: '20px' }}>{masterResume.name}</div>
                <div style={{ color: 'var(--brand-orange)', fontWeight: 600, fontSize: '15px' }}>{masterResume.title}</div>
                <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '4px' }}>
                  {masterResume.email} | {masterResume.phone} | Rate: {masterResume.hourlyRate}
                </div>
              </div>

              <div>
                <h4 style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: '6px' }}>Master Summary</h4>
                <p style={{ fontSize: '14px', color: '#cbd5e1' }}>{masterResume.summary}</p>
              </div>

              <div>
                <h4 style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: '6px' }}>Core Skillset</h4>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {masterResume.skills && masterResume.skills.map((s, i) => (
                    <span key={i} className="badge badge-c2c">{s}</span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
