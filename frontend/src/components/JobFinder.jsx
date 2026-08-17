import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Search, 
  MapPin, 
  DollarSign, 
  Sparkles, 
  ExternalLink, 
  X
} from 'lucide-react';

export const JobFinder = () => {
  const { jobs, scanning, handleScanJobs, handleTailorResume } = useApp();
  const [keyword, setKeyword] = useState('C2C');
  const [location, setLocation] = useState('Remote');
  const [minRate, setMinRate] = useState(60);
  const [previewJob, setPreviewJob] = useState(null);

  const onSearchSubmit = (e) => {
    e.preventDefault();
    handleScanJobs({ keyword, location, minRate });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Search & Filter Bar */}
      <div className="glass-panel" style={{ padding: '20px' }}>
        <form onSubmit={onSearchSubmit} style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'flex-end' }}>
          <div className="form-group" style={{ flex: 2, minWidth: '220px', marginBottom: 0 }}>
            <label className="form-label">LinkedIn Search Keywords</label>
            <div style={{ position: 'relative' }}>
              <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="e.g. C2C Java, React Corp-to-Corp, 1099 DevOps..."
                className="form-input"
                style={{ paddingLeft: '38px', width: '100%' }}
              />
            </div>
          </div>

          <div className="form-group" style={{ flex: 1, minWidth: '150px', marginBottom: 0 }}>
            <label className="form-label">Location / Work Type</label>
            <div style={{ position: 'relative' }}>
              <MapPin size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Remote / NY / CA"
                className="form-input"
                style={{ paddingLeft: '38px', width: '100%' }}
              />
            </div>
          </div>

          <div className="form-group" style={{ flex: 1, minWidth: '140px', marginBottom: 0 }}>
            <label className="form-label">Min Pay Rate ($/hr)</label>
            <div style={{ position: 'relative' }}>
              <DollarSign size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input
                type="number"
                value={minRate}
                onChange={(e) => setMinRate(e.target.value)}
                className="form-input"
                style={{ paddingLeft: '38px', width: '100%' }}
              />
            </div>
          </div>

          <button type="submit" disabled={scanning} className="btn-primary" style={{ padding: '10px 24px', height: '42px' }}>
            <Search size={16} /> {scanning ? 'Scanning...' : 'Search LinkedIn'}
          </button>
        </form>
      </div>

      {/* Jobs List Grid */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 700 }}>
            Available C2C Positions ({jobs.length})
          </h2>
          <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Filtered specifically for Corp-to-Corp (C2C) & 1099 terms</span>
        </div>

        {jobs.map((job) => (
          <div key={job.id} className="glass-panel" style={{ padding: '24px', display: 'flex', justifyContent: 'space-between', gap: '20px', flexWrap: 'wrap' }}>
            <div style={{ flex: 1, minWidth: '300px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#f8fafc' }}>{job.title}</h3>
                <span className="badge badge-c2c">{job.taxTerm}</span>
                <span className="badge badge-green">{job.rateText || `$${job.hourlyRate}/hr`}</span>
              </div>

              <div style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: '12px' }}>
                <strong style={{ color: 'var(--text-main)' }}>{job.company}</strong> • {job.location} • <span style={{ color: 'var(--brand-yellow-light)' }}>Posted {job.postedDate}</span>
              </div>

              <p style={{ fontSize: '14px', color: '#cbd5e1', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', marginBottom: '14px' }}>
                {job.description}
              </p>

              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {job.skillsRequired && job.skillsRequired.map((skill, idx) => (
                  <span key={idx} style={{ background: 'rgba(255,255,255,0.06)', padding: '4px 10px', borderRadius: '6px', fontSize: '12px', color: '#94a3b8' }}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'space-between', minWidth: '180px' }}>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '4px' }}>Skill Match</div>
                <div style={{ fontSize: '24px', fontWeight: 800, color: 'var(--brand-yellow)' }}>{job.matchedScore}%</div>
              </div>

              <div style={{ display: 'flex', gap: '10px', marginTop: '16px' }}>
                <button
                  onClick={() => setPreviewJob(job)}
                  className="btn-secondary"
                  style={{ fontSize: '13px', padding: '8px 14px' }}
                >
                  View Details
                </button>
                
                <button
                  onClick={() => handleTailorResume(job)}
                  className="btn-primary"
                  style={{ fontSize: '13px', padding: '8px 16px' }}
                >
                  <Sparkles size={15} /> Tailor Resume & Apply
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Detailed Job Modal */}
      {previewJob && (
        <div className="modal-overlay" onClick={() => setPreviewJob(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ padding: '28px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
              <div>
                <span className="badge badge-c2c" style={{ marginBottom: '8px' }}>{previewJob.taxTerm}</span>
                <h2 style={{ fontSize: '22px', fontWeight: 800 }}>{previewJob.title}</h2>
                <div style={{ color: 'var(--text-muted)', fontSize: '14px', marginTop: '4px' }}>
                  {previewJob.company} • {previewJob.location} • Rate: {previewJob.rateText}
                </div>
              </div>
              <button onClick={() => setPreviewJob(null)} className="btn-secondary" style={{ padding: '6px' }}>
                <X size={20} />
              </button>
            </div>

            <div style={{ background: 'rgba(9, 14, 24, 0.85)', padding: '16px', borderRadius: '10px', border: '1px solid var(--border-color)', marginBottom: '20px' }}>
              <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--brand-green)', marginBottom: '6px' }}>RECRUITER CONTACT DETAILS</div>
              <div style={{ fontSize: '14px' }}>
                <strong>Recruiter:</strong> {previewJob.recruiterName} ({previewJob.recruiterEmail})
              </div>
            </div>

            <h4 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '10px' }}>Job Requirement Details</h4>
            <div style={{ whiteSpace: 'pre-wrap', color: '#cbd5e1', fontSize: '14px', lineHeight: '1.7', marginBottom: '24px' }}>
              {previewJob.description}
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
              <a href={previewJob.linkedinUrl} target="_blank" rel="noopener noreferrer" className="btn-secondary">
                Open LinkedIn <ExternalLink size={14} />
              </a>
              <button onClick={() => { handleTailorResume(previewJob); setPreviewJob(null); }} className="btn-primary">
                <Sparkles size={16} /> Tailor Resume & Apply via Gmail
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
