import React, { createContext, useContext, useState, useEffect } from 'react';
import * as api from '../services/api';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [jobs, setJobs] = useState([]);
  const [masterResume, setMasterResume] = useState(null);
  const [tailoredResumes, setTailoredResumes] = useState([]);
  const [applications, setApplications] = useState([]);
  const [emailLogs, setEmailLogs] = useState([]);
  const [settings, setSettings] = useState({});
  const [loading, setLoading] = useState(false);
  const [scanning, setScanning] = useState(false);
  const [toast, setToast] = useState(null);
  const [selectedJob, setSelectedJob] = useState(null);
  const [activeTailored, setActiveTailored] = useState(null);

  // Show Toast notification
  const showToast = (message, type = 'info') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  // Initial Data Load
  const loadInitialData = async () => {
    setLoading(true);
    try {
      const [jobsRes, resumeRes, appsRes, logsRes, settingsRes] = await Promise.all([
        api.fetchJobs(),
        api.fetchMasterResume(),
        api.fetchApplications(),
        api.fetchEmailLogs(),
        api.fetchSettings()
      ]);

      if (jobsRes.success) setJobs(jobsRes.data);
      if (resumeRes.success) setMasterResume(resumeRes.data);
      if (appsRes.success) setApplications(appsRes.data);
      if (logsRes.success) setEmailLogs(logsRes.data);
      if (settingsRes.success) setSettings(settingsRes.data);
    } catch (err) {
      console.error('Error initializing HireFlow state:', err);
      showToast('Backend API connecting...', 'warning');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadInitialData();
  }, []);

  // Action: Trigger LinkedIn Scraper
  const handleScanJobs = async (searchParams = {}) => {
    setScanning(true);
    showToast('Scanning LinkedIn for C2C positions...', 'info');
    try {
      const res = await api.scanLinkedinJobs({
        keyword: searchParams.keyword || settings.searchKeywords || 'C2C',
        location: searchParams.location || 'Remote',
        minRate: searchParams.minRate || settings.minPayRate || 60
      });
      if (res.success) {
        setJobs(res.data);
        showToast(res.message, 'success');
      }
    } catch (err) {
      showToast('LinkedIn scan failed: ' + err.message, 'error');
    } finally {
      setScanning(false);
    }
  };

  // Action: Tailor Resume with AI
  const handleTailorResume = async (job) => {
    setSelectedJob(job);
    setLoading(true);
    showToast(`AI Customizing resume for ${job.title}...`, 'info');
    try {
      const res = await api.tailorResumeAI({
        jobTitle: job.title,
        jobDescription: job.description,
        targetCompany: job.company
      });
      if (res.success) {
        setActiveTailored(res.data);
        setTailoredResumes(prev => [res.data, ...prev]);
        showToast('AI Resume & Cover Letter successfully tailored!', 'success');
        setActiveTab('resume');
      }
    } catch (err) {
      showToast('AI Resume Customization failed: ' + err.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  // Action: Send Email via Gmail
  const handleSendEmail = async (emailPayload) => {
    setLoading(true);
    showToast(`Sending Gmail application to ${emailPayload.to}...`, 'info');
    try {
      const res = await api.sendEmailApplication(emailPayload);
      if (res.success) {
        showToast(res.message, 'success');
        
        // Log & update application state
        setEmailLogs(prev => [res.data, ...prev]);
        
        // Add to Applications Kanban
        const newApp = {
          jobTitle: emailPayload.jobTitle,
          company: emailPayload.targetCompany || 'C2C Client',
          recruiterName: emailPayload.recruiterName,
          recruiterEmail: emailPayload.to,
          rate: emailPayload.rate || '$85/hr',
          matchScore: emailPayload.matchScore || 95,
          notes: 'Dispatched via Gmail SMTP'
        };
        const appRes = await api.createApplication(newApp);
        if (appRes.success) {
          setApplications(prev => [appRes.data, ...prev]);
        }
      }
    } catch (err) {
      showToast('Email dispatch failed: ' + err.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppContext.Provider value={{
      activeTab,
      setActiveTab,
      jobs,
      masterResume,
      setMasterResume,
      tailoredResumes,
      activeTailored,
      setActiveTailored,
      applications,
      setApplications,
      emailLogs,
      settings,
      setSettings,
      loading,
      scanning,
      toast,
      showToast,
      selectedJob,
      setSelectedJob,
      handleScanJobs,
      handleTailorResume,
      handleSendEmail,
      reload: loadInitialData
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
