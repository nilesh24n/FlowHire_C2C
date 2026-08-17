import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  Briefcase, 
  FileText, 
  Mail, 
  Kanban, 
  LayoutDashboard, 
  Settings, 
  Compass,
  RefreshCw
} from 'lucide-react';

export const Navbar = ({ onOpenSettings }) => {
  const { activeTab, setActiveTab, scanning, handleScanJobs } = useApp();

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'jobs', label: 'C2C Job Finder', icon: Briefcase },
    { id: 'resume', label: 'Bespoke Resume Studio', icon: FileText },
    { id: 'email', label: 'Gmail Dispatcher', icon: Mail },
    { id: 'kanban', label: 'Application Board', icon: Kanban },
  ];

  return (
    <header className="glass-panel header-bar">
      <div className="logo-group">
        <div className="logo-icon">
          <Compass size={24} />
        </div>
        <div>
          <div className="logo-title">FlowHire</div>
          <div className="logo-subtitle">C2C Job & Application Engine</div>
        </div>
      </div>

      <nav className="nav-tabs">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
            >
              <Icon size={16} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </nav>

      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', width: 'auto' }}>
        <button 
          onClick={() => handleScanJobs()}
          disabled={scanning}
          className="btn-primary"
          style={{ fontSize: '13px', padding: '8px 14px', flex: 1 }}
        >
          <RefreshCw size={14} className={scanning ? 'spin' : ''} />
          <span>{scanning ? 'Scanning...' : 'Scan Jobs'}</span>
        </button>

        <button
          onClick={onOpenSettings}
          className="btn-secondary"
          style={{ padding: '8px 12px', flexShrink: 0 }}
          title="System Settings & Gmail Credentials"
        >
          <Settings size={18} />
        </button>
      </div>
    </header>
  );
};
