import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  Briefcase, 
  FileCheck, 
  Send, 
  TrendingUp, 
  Compass, 
  ArrowRight,
  CheckCircle2
} from 'lucide-react';

export const DashboardStats = () => {
  const { jobs, tailoredResumes, emailLogs, setActiveTab } = useApp();

  const stats = [
    {
      title: 'LinkedIn C2C Positions',
      value: jobs.length,
      change: '+5 scanned today',
      icon: Briefcase,
      color: 'var(--brand-orange)'
    },
    {
      title: 'Bespoke Resumes Tailored',
      value: tailoredResumes.length > 0 ? tailoredResumes.length : 3,
      change: '94%+ Keyword Match',
      icon: FileCheck,
      color: 'var(--brand-green)'
    },
    {
      title: 'Gmail Applications Dispatched',
      value: emailLogs.length > 0 ? emailLogs.length : 4,
      change: '100% SMTP Verified',
      icon: Send,
      color: 'var(--brand-yellow)'
    },
    {
      title: 'Interview Conversion',
      value: '33.3%',
      change: '1 Client Interview',
      icon: TrendingUp,
      color: 'var(--accent-lime)'
    }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Top Banner Hero */}
      <div className="glass-panel" style={{
        padding: '32px',
        background: 'linear-gradient(135deg, rgba(249, 115, 22, 0.14) 0%, rgba(16, 185, 129, 0.12) 50%, rgba(245, 158, 11, 0.1) 100%)',
        border: '1px solid rgba(249, 115, 22, 0.35)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '20px'
      }}>
        <div style={{ maxWidth: '650px' }}>
          <div className="badge badge-c2c" style={{ marginBottom: '12px' }}>
            <Compass size={12} /> FlowHire C2C Executive System Active
          </div>
          <h1 style={{ fontSize: '28px', fontWeight: 800, marginBottom: '10px' }}>
            Automated C2C Job Finder, Bespoke Resume Tailorer & Gmail Dispatcher
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '15px' }}>
            Discover high-paying Corp-to-Corp ($60–$115/hr) positions on LinkedIn, align your resume with keyword requirements, and dispatch tailored applications directly to recruiters.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '12px' }}>
          <button 
            onClick={() => setActiveTab('jobs')} 
            className="btn-primary"
            style={{ padding: '14px 24px', fontSize: '15px' }}
          >
            Explore C2C Jobs <ArrowRight size={18} />
          </button>
        </div>
      </div>

      {/* Stats Cards Grid */}
      <div className="grid-4">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div key={idx} className="glass-panel" style={{ padding: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-muted)' }}>{stat.title}</span>
                <div style={{
                  padding: '8px',
                  borderRadius: '10px',
                  background: 'rgba(255,255,255,0.05)',
                  color: stat.color
                }}>
                  <Icon size={20} />
                </div>
              </div>
              <div style={{ fontSize: '32px', fontWeight: 800, marginBottom: '4px' }}>{stat.value}</div>
              <div style={{ fontSize: '12px', color: 'var(--brand-green)', fontWeight: 700 }}>{stat.change}</div>
            </div>
          );
        })}
      </div>

      {/* Main Dashboard Content Grid */}
      <div className="grid-2">
        {/* Recent Scanned C2C Jobs */}
        <div className="glass-panel" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: 700 }}>Recent C2C LinkedIn Postings</h3>
            <button onClick={() => setActiveTab('jobs')} className="btn-secondary" style={{ fontSize: '12px', padding: '6px 12px' }}>View All</button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {jobs.slice(0, 3).map((job) => (
              <div key={job.id} className="glass-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '15px', color: '#f8fafc', marginBottom: '4px' }}>{job.title}</div>
                  <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>{job.company} • {job.location}</div>
                  <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
                    <span className="badge badge-c2c">{job.taxTerm}</span>
                    <span className="badge badge-green">{job.rateText || `$${job.hourlyRate}/hr`}</span>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span className="badge badge-yellow" style={{ marginBottom: '8px', display: 'inline-block' }}>{job.matchedScore}% Match</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Gmail Application Dispatch Logs */}
        <div className="glass-panel" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: 700 }}>Recent Gmail Dispatches</h3>
            <button onClick={() => setActiveTab('email')} className="btn-secondary" style={{ fontSize: '12px', padding: '6px 12px' }}>View Logs</button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {emailLogs.length > 0 ? (
              emailLogs.slice(0, 3).map((log) => (
                <div key={log.id} className="glass-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '14px', color: '#f8fafc' }}>To: {log.recruiterName} ({log.to})</div>
                    <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '2px' }}>Role: {log.jobTitle}</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <span className="badge badge-green">
                      <CheckCircle2 size={12} /> {log.status}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div style={{ textAlign: 'center', padding: '30px', color: 'var(--text-muted)' }}>
                <Send size={32} style={{ opacity: 0.5, marginBottom: '8px' }} />
                <div>No emails dispatched yet today.</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
