import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { DashboardStats } from './components/DashboardStats';
import { JobFinder } from './components/JobFinder';
import { ResumeCustomizer } from './components/ResumeCustomizer';
import { EmailDispatcher } from './components/EmailDispatcher';
import { ApplicationKanban } from './components/ApplicationKanban';
import { SettingsModal } from './components/SettingsModal';
import { AlertCircle, CheckCircle2, Info, AlertTriangle } from 'lucide-react';

const MainContent = () => {
  const { activeTab, toast } = useApp();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const getToastIcon = (type) => {
    switch (type) {
      case 'success': return <CheckCircle2 size={16} color="#34d399" />;
      case 'error': return <AlertCircle size={16} color="#f43f5e" />;
      case 'warning': return <AlertTriangle size={16} color="#fbbf24" />;
      default: return <Info size={16} color="#818cf8" />;
    }
  };

  return (
    <div className="app-container">
      {/* Toast Alert Banner */}
      {toast && (
        <div style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          zIndex: 2000,
          background: 'rgba(15, 23, 42, 0.95)',
          border: `1px solid ${toast.type === 'success' ? '#10b981' : toast.type === 'error' ? '#f43f5e' : '#6366f1'}`,
          borderRadius: '12px',
          padding: '14px 20px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.6)',
          backdropFilter: 'blur(12px)',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          color: '#f8fafc',
          fontSize: '14px',
          fontWeight: 500,
          animation: 'fadeIn 0.3s ease'
        }}>
          {getToastIcon(toast.type)}
          <span>{toast.message}</span>
        </div>
      )}

      {/* Main Navbar */}
      <Navbar onOpenSettings={() => setIsSettingsOpen(true)} />

      {/* Active Tab Container */}
      <main style={{ marginTop: '24px' }}>
        {activeTab === 'dashboard' && <DashboardStats />}
        {activeTab === 'jobs' && <JobFinder />}
        {activeTab === 'resume' && <ResumeCustomizer />}
        {activeTab === 'email' && <EmailDispatcher />}
        {activeTab === 'kanban' && <ApplicationKanban />}
      </main>

      {/* Settings Modal */}
      <SettingsModal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}
