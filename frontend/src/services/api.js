const API_BASE = '/api';

export const fetchJobs = async (filters = {}) => {
  const query = new URLSearchParams(filters).toString();
  const res = await fetch(`${API_BASE}/jobs?${query}`);
  return res.json();
};

export const scanLinkedinJobs = async (searchParams) => {
  const res = await fetch(`${API_BASE}/jobs/scan`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(searchParams)
  });
  return res.json();
};

export const fetchMasterResume = async () => {
  const res = await fetch(`${API_BASE}/resumes/master`);
  return res.json();
};

export const updateMasterResume = async (resumeData) => {
  const res = await fetch(`${API_BASE}/resumes/master`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(resumeData)
  });
  return res.json();
};

export const tailorResumeAI = async (jobDetails) => {
  const res = await fetch(`${API_BASE}/resumes/tailor`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(jobDetails)
  });
  return res.json();
};

export const fetchApplications = async () => {
  const res = await fetch(`${API_BASE}/applications`);
  return res.json();
};

export const createApplication = async (appData) => {
  const res = await fetch(`${API_BASE}/applications`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(appData)
  });
  return res.json();
};

export const updateApplicationStatus = async (id, status, notes) => {
  const res = await fetch(`${API_BASE}/applications/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status, notes })
  });
  return res.json();
};

export const sendEmailApplication = async (emailPayload) => {
  const res = await fetch(`${API_BASE}/email/send`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(emailPayload)
  });
  return res.json();
};

export const fetchEmailLogs = async () => {
  const res = await fetch(`${API_BASE}/email/logs`);
  return res.json();
};

export const fetchSettings = async () => {
  const res = await fetch(`${API_BASE}/settings`);
  return res.json();
};

export const updateSettings = async (settingsData) => {
  const res = await fetch(`${API_BASE}/settings`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(settingsData)
  });
  return res.json();
};
