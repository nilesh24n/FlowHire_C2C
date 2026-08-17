import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  Building2, 
  User, 
  ChevronRight, 
  Calendar
} from 'lucide-react';
import * as api from '../services/api';

export const ApplicationKanban = () => {
  const { applications, setApplications, showToast } = useApp();

  const columns = [
    { id: 'Applied', title: 'Applied', color: 'var(--brand-orange)' },
    { id: 'Recruiter Screen', title: 'Recruiter Screen', color: 'var(--brand-yellow)' },
    { id: 'Client Interview', title: 'Client Interview', color: 'var(--accent-lime)' },
    { id: 'Offer', title: 'Offer Secured', color: 'var(--brand-green)' },
    { id: 'Rejected', title: 'Passed', color: 'var(--accent-rose)' }
  ];

  const handleStatusChange = async (appId, newStatus) => {
    try {
      const res = await api.updateApplicationStatus(appId, newStatus);
      if (res.success) {
        setApplications(prev => prev.map(a => a.id === appId ? { ...a, status: newStatus } : a));
        showToast(`Moved application status to ${newStatus}`, 'success');
      }
    } catch (err) {
      showToast('Failed to update status', 'error');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div className="glass-panel" style={{ padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '22px', fontWeight: 800 }}>C2C Vendor Application Pipeline</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>
            Track active Corp-to-Corp positions, hourly rates ($/hr), recruiter interviews, and offer status.
          </p>
        </div>

        <span className="badge badge-c2c" style={{ fontSize: '13px', padding: '6px 14px' }}>
          {applications.length} Active Candidates
        </span>
      </div>

      <div className="kanban-board">
        {columns.map((col) => {
          const colApps = applications.filter(a => (a.status || 'Applied') === col.id);
          return (
            <div key={col.id} className="kanban-col">
              <div className="kanban-header">
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: col.color }} />
                  <span className="kanban-title">{col.title}</span>
                </div>
                <span className="kanban-count">{colApps.length}</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {colApps.map((app) => (
                  <div key={app.id} className="glass-card" style={{ padding: '14px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <div style={{ fontWeight: 700, fontSize: '14px', color: '#f8fafc' }}>{app.jobTitle}</div>
                    
                    <div style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Building2 size={12} /> {app.company}
                    </div>

                    <div style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <User size={12} /> {app.recruiterName} ({app.recruiterEmail})
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '4px' }}>
                      <span className="badge badge-green">{app.rate || '$85/hr'}</span>
                      <span className="badge badge-yellow">{app.matchScore || 95}% Match</span>
                    </div>

                    {app.notes && (
                      <div style={{ fontSize: '11px', color: '#cbd5e1', background: 'rgba(9,14,24,0.85)', padding: '6px 8px', borderRadius: '6px', marginTop: '4px' }}>
                        {app.notes}
                      </div>
                    )}

                    {/* Status Mover Controls */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '8px', paddingTop: '8px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                      <div style={{ fontSize: '11px', color: 'var(--text-dim)' }}>
                        <Calendar size={11} /> {app.appliedDate || 'Today'}
                      </div>

                      <div style={{ display: 'flex', gap: '4px' }}>
                        {col.id === 'Applied' && (
                          <button onClick={() => handleStatusChange(app.id, 'Recruiter Screen')} className="btn-secondary" style={{ padding: '2px 6px', fontSize: '11px' }}>
                            Next <ChevronRight size={12} />
                          </button>
                        )}
                        {col.id === 'Recruiter Screen' && (
                          <button onClick={() => handleStatusChange(app.id, 'Client Interview')} className="btn-secondary" style={{ padding: '2px 6px', fontSize: '11px' }}>
                            Next <ChevronRight size={12} />
                          </button>
                        )}
                        {col.id === 'Client Interview' && (
                          <button onClick={() => handleStatusChange(app.id, 'Offer')} className="btn-primary" style={{ padding: '2px 6px', fontSize: '11px' }}>
                            Offer <ChevronRight size={12} />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
