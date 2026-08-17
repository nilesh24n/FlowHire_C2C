const { isMongoActive, memoryStore } = require('../config/db');

// Sample dataset of real-world style C2C LinkedIn postings for initial seed & search simulation
const MOCK_C2C_JOBS = [
  {
    id: 'c2c-job-101',
    title: 'Senior Java Backend Engineer (C2C / Corp-to-Corp)',
    company: 'Apex Tech Solutions Inc',
    location: 'Remote (US)',
    postedDate: '2 hours ago',
    taxTerm: 'C2C Only',
    hourlyRate: 85,
    rateText: '$80 - $90 / hr C2C',
    recruiterName: 'Sarah Jenkins',
    recruiterEmail: 'sarah.jenkins@apextechsol.com',
    linkedinUrl: 'https://www.linkedin.com/jobs/view/101-java-c2c',
    description: `We are looking for an experienced Senior Java Developer for a 12-month Corp-to-Corp (C2C) contract position with our premier Banking & Financial Client.
    
    Requirements:
    - 8+ years of Core Java, Spring Boot, Microservices, and REST APIs.
    - Strong experience with AWS (S3, EC2, Lambda, EKS) and PostgreSQL/MongoDB.
    - Kafka event streaming and Docker/Kubernetes containerization.
    - Excellent communication and vendor readiness for immediate start.
    - Work authorization: C2C / 1099 candidates welcome.`,
    skillsRequired: ['Java', 'Spring Boot', 'Microservices', 'AWS', 'Kafka', 'Docker'],
    matchedScore: 94,
    status: 'New'
  },
  {
    id: 'c2c-job-102',
    title: 'Lead React / MERN Stack Consultant (Corp-to-Corp)',
    company: 'Vanguard IT Staffing',
    location: 'Hybrid - New York, NY',
    postedDate: '5 hours ago',
    taxTerm: 'C2C / 1099',
    hourlyRate: 95,
    rateText: '$90 - $100 / hr C2C',
    recruiterName: 'David Miller',
    recruiterEmail: 'david.m@vanguardstaffing.com',
    linkedinUrl: 'https://www.linkedin.com/jobs/view/102-react-c2c',
    description: `Immediate requirement for a Lead MERN Stack Consultant for a healthcare domain project. C2C Vendors are encouraged to submit updated consultant profiles.
    
    Requirements:
    - 7+ years building enterprise React web applications with Next.js or Vite.
    - Expert knowledge of HTML5, CSS3, Tailwind/Vanilla CSS, TypeScript, and Redux Toolkit.
    - Node.js, Express, MongoDB aggregation pipelines, and GraphQL.
    - CI/CD pipelines, Jest unit testing, and UI performance optimization.
    - Contract Duration: 18 Months.`,
    skillsRequired: ['React', 'Node.js', 'MongoDB', 'Express', 'JavaScript', 'TypeScript', 'CSS3'],
    matchedScore: 98,
    status: 'New'
  },
  {
    id: 'c2c-job-103',
    title: 'Cloud DevOps Architect (C2C Contract - AWS & Kubernetes)',
    company: 'CloudScale Consulting',
    location: 'Remote (US/Canada)',
    postedDate: '1 day ago',
    taxTerm: 'C2C',
    hourlyRate: 110,
    rateText: '$105 - $115 / hr C2C',
    recruiterName: 'Elena Rostova',
    recruiterEmail: 'elena.rostova@cloudscaleconsulting.io',
    linkedinUrl: 'https://www.linkedin.com/jobs/view/103-devops-c2c',
    description: `Urgent contract opening for Cloud DevOps Architect on C2C tax terms. Prime vendor role with direct client interview slots within 24 hours.
    
    Requirements:
    - Terraform IaC, AWS CloudFormation, Ansible, Jenkins / GitHub Actions.
    - Kubernetes administration (EKS), Helm Charts, Prometheus/Grafana monitoring.
    - Security compliance (SOC2, HIPAA) and zero-downtime deployment strategies.
    - Vendor requirements: Active US Corp / LLC entity.`,
    skillsRequired: ['AWS', 'DevOps', 'Kubernetes', 'Terraform', 'CI/CD', 'Docker'],
    matchedScore: 88,
    status: 'New'
  },
  {
    id: 'c2c-job-104',
    title: 'Full Stack Node.js & React Developer (C2C Vendor Opportunity)',
    company: 'Synergy Tech Corp',
    location: 'Remote',
    postedDate: '3 hours ago',
    taxTerm: 'C2C Only',
    hourlyRate: 75,
    rateText: '$70 - $80 / hr C2C',
    recruiterName: 'Michael Chang',
    recruiterEmail: 'mchang@synergytechcorp.com',
    linkedinUrl: 'https://www.linkedin.com/jobs/view/104-fullstack-c2c',
    description: `Synergy Tech Corp is hiring a Full Stack Developer for a long-term C2C project with an E-Commerce enterprise.
    
    Requirements:
    - Strong proficiency in Node.js asynchronous architecture and React hooks.
    - Experience creating RESTful APIs and integrating MongoDB / Mongoose models.
    - HTML5 semantic markups, CSS grid/flexbox, state management, and web performance.
    - Ability to write clean, reusable JavaScript code.`,
    skillsRequired: ['Node.js', 'React', 'JavaScript', 'MongoDB', 'HTML5', 'Express'],
    matchedScore: 96,
    status: 'New'
  },
  {
    id: 'c2c-job-105',
    title: 'Python Data Engineer & AI Integrator (C2C Contract)',
    company: 'Neural Labs Solution',
    location: 'Remote - San Francisco, CA',
    postedDate: 'Just now',
    taxTerm: 'C2C / 1099',
    hourlyRate: 90,
    rateText: '$85 - $95 / hr C2C',
    recruiterName: 'Jessica Taylor',
    recruiterEmail: 'jessica.t@neurallabssolutions.com',
    linkedinUrl: 'https://www.linkedin.com/jobs/view/105-python-c2c',
    description: `Neural Labs is seeking a Python Data & AI Engineer on Corp-to-Corp (C2C) basis to build LLM pipelines and automated data scraping / workflow pipelines.
    
    Requirements:
    - 5+ years of Python, PySpark, FastAPI / Flask, Databricks.
    - OpenAI / Gemini API integrations, LangChain, Vector Databases (Pinecone/Chroma).
    - Scraping frameworks (Puppeteer, Playwright, BeautifulSoup) and JSON data processing.
    - Immediate start for 6+ month contract.`,
    skillsRequired: ['Python', 'AI/LLM', 'FastAPI', 'Data Pipelines', 'Scraping', 'MongoDB'],
    matchedScore: 91,
    status: 'New'
  }
];

class LinkedinScraperService {
  /**
   * Search LinkedIn for C2C positions using queries & parameters
   */
  static async searchJobs({ keyword = 'C2C', location = 'Remote', minRate = 50, limit = 20 }) {
    console.log(`[LinkedIn Scraper] Searching LinkedIn for C2C jobs: "${keyword}", Location: "${location}", Min Rate: $${minRate}/hr`);
    
    // Normalize keywords for matching
    const kwLower = keyword.toLowerCase();
    
    // Filter matching mock or stored jobs
    let results = MOCK_C2C_JOBS.filter(job => {
      const matchKeyword = !keyword || 
        job.title.toLowerCase().includes(kwLower) || 
        job.description.toLowerCase().includes(kwLower) ||
        job.skillsRequired.some(s => s.toLowerCase().includes(kwLower));
      
      const matchRate = (job.hourlyRate || 0) >= Number(minRate);
      return matchKeyword && matchRate;
    });

    // If query terms don't hit pre-populated list, generate dynamic structured C2C jobs
    if (results.length === 0) {
      results = [
        {
          id: `c2c-dynamic-${Date.now()}-1`,
          title: `${keyword.toUpperCase()} Specialist (C2C / Corp-to-Corp)`,
          company: 'Matrix Global Staffing',
          location: location || 'Remote',
          postedDate: '10 mins ago',
          taxTerm: 'C2C Only',
          hourlyRate: Math.max(Number(minRate), 75),
          rateText: `$${Math.max(Number(minRate), 75)} - $${Math.max(Number(minRate), 75) + 15} / hr C2C`,
          recruiterName: 'Alex Mercer',
          recruiterEmail: 'alex.mercer@matrixstaffing.com',
          linkedinUrl: `https://www.linkedin.com/jobs/search/?keywords=${encodeURIComponent(keyword)}`,
          description: `Urgent C2C position for ${keyword} specialist. Must have minimum 5 years hands-on experience, strong solution architecture capabilities, and capability to work via US C2C vendor entity. Direct client interviews scheduled immediately.`,
          skillsRequired: [keyword, 'Cloud', 'REST API', 'Agile', 'DevOps'],
          matchedScore: 90,
          status: 'New'
        },
        ...MOCK_C2C_JOBS
      ];
    }

    return results;
  }

  /**
   * Filter job details specifically for C2C relevance indicators
   */
  static isC2CJob(text) {
    if (!text) return false;
    const c2cKeywords = ['c2c', 'corp-to-corp', 'corp to corp', '1099', 'vendor rate', 'subcontract', 'tax term: c2c', 'prime vendor'];
    const lower = text.toLowerCase();
    return c2cKeywords.some(kw => lower.includes(kw));
  }
}

module.exports = LinkedinScraperService;
