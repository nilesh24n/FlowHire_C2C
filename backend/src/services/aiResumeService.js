const https = require('https');

class AiResumeService {
  /**
   * Tailor master resume based on job description & title
   */
  static async tailorResume({ masterResume, jobTitle, jobDescription, targetCompany, apiKey = '' }) {
    console.log(`[AI Engine] Tailoring resume for role: "${jobTitle}" at "${targetCompany || 'Client'}"`);

    // Extract core skills present in job description
    const extractedSkills = this.extractKeywords(jobDescription);
    const resumeSkills = masterResume.skills || ['JavaScript', 'React', 'Node.js', 'Express', 'MongoDB', 'HTML5', 'CSS3', 'REST API', 'Git'];

    // Compute skill match score
    const matches = extractedSkills.filter(skill => 
      resumeSkills.some(rs => rs.toLowerCase().includes(skill.toLowerCase()) || skill.toLowerCase().includes(rs.toLowerCase()))
    );

    const matchScore = Math.min(98, Math.max(72, Math.round((matches.length / Math.max(extractedSkills.length, 1)) * 100) + 15));

    // Tailor Professional Summary
    const tailoredSummary = `Results-driven Senior Full Stack & C2C Consultant with over 7+ years of hands-on expertise specializing in ${jobTitle}. Proven track record architecting scalable web solutions, optimizing cloud microservices, and leading MERN / JavaScript enterprise deployments. Highly proficient in aligning key technical requirements for ${targetCompany || 'enterprise clients'}, including ${matches.slice(0, 4).join(', ')}. Immediately available for Corp-to-Corp (C2C) engagement.`;

    // Tailor Highlighted Technical Skills
    const optimizedSkills = Array.from(new Set([...matches, ...resumeSkills, 'C2C Vendor Ready']));

    // Generate Tailored Professional Experience Bullets
    const tailoredBullets = [
      `Architected and delivered high-performance web applications tailored for ${jobTitle} requirements using ${matches.slice(0, 3).join(', ')}.`,
      `Engineered RESTful APIs and database schemas (MongoDB/PostgreSQL) with 99.9% uptime, serving 100k+ active concurrent users.`,
      `Leveraged modern HTML5, Vanilla CSS / Tailwind, and React/Node microservices to improve application response times by 40%.`,
      `Collaborated closely with cross-functional teams, product managers, and enterprise C2C vendors to ensure rapid sprint delivery and code quality.`,
      `Implemented automated test suites, CI/CD pipelines (GitHub Actions/AWS), and AI-driven automation workflows.`
    ];

    // Generate Tailored Cover Letter / Recruiter Outreach Pitch
    const coverLetter = `Dear Hiring Team / Recruiter,

I am writing to express my strong interest in the ${jobTitle} position at ${targetCompany || 'your esteemed client'}. As a Senior Consultant with extensive Corp-to-Corp (C2C) engagement experience, I specialize in building robust, scalable applications with ${matches.slice(0, 4).join(', ')}.

Key highlights of my background include:
• Expertise in MERN / Full Stack architecture, state management, and modern Web performance.
• Solid hands-on experience delivering enterprise-grade projects under strict C2C contract guidelines.
• Immediate availability for full-time C2C contract assignments with clear vendor authorization.

Attached is my updated resume customized specifically for this role. I would welcome the opportunity to discuss how my skill set aligns with your team's immediate needs.

Best regards,
${masterResume.name || 'Senior C2C Consultant'}
${masterResume.phone || '+1 (555) 019-2831'} | ${masterResume.email || 'consultant@hireflow.io'}
Corp-to-Corp (C2C) Vendor Entity Ready`;

    return {
      matchScore,
      tailoredSummary,
      optimizedSkills,
      tailoredBullets,
      coverLetter,
      originalResumeId: masterResume.id || 'master-1',
      generatedAt: new Date().toISOString()
    };
  }

  /**
   * Extract technical key terms from job description
   */
  static extractKeywords(text = '') {
    const techDict = [
      'Java', 'Spring Boot', 'React', 'Node.js', 'Express', 'MongoDB', 'JavaScript', 
      'TypeScript', 'HTML5', 'CSS3', 'AWS', 'Docker', 'Kubernetes', 'Kafka', 
      'DevOps', 'Python', 'FastAPI', 'Microservices', 'GraphQL', 'REST API',
      'SQL', 'PostgreSQL', 'Tailwind', 'Redux', 'C2C', 'CI/CD', 'Git'
    ];
    const lower = text.toLowerCase();
    const found = techDict.filter(tech => lower.includes(tech.toLowerCase()));
    return found.length > 0 ? found : ['React', 'Node.js', 'JavaScript', 'MongoDB', 'HTML5'];
  }
}

module.exports = AiResumeService;
