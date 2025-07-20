export interface LetterData {
  letterType: 'offer' | 'appointment' | 'termination' | 'promotion' | 'warning' | 'resignation' | 'experience' | 'recommendation';
  companyName: string;
  companyAddress: string;
  msmeNo: string;
  phone: string;
  email: string;
  website: string;
  logo: string;
  seal: string;
  letterNo: string;
  letterTitle: string;
  recipientName: string;
  recipientAddress: string;
  subject: string;
  salutation: string;
  body: string;
  closing: string;
  signatoryName: string;
  signatoryTitle: string;
  date: string;
  // Formatting options
  fontSize: number;
  lineHeight: number;
  fontWeight: 'normal' | 'bold';
  // Job role specific
  jobRole: string;
  department: string;
  responsibilities: string[];
  salary: string;
  startDate: string;
  reportingManager: string;
}

export const letterTypes = [
  { value: 'offer', label: 'Offer Letter' },
  { value: 'appointment', label: 'Appointment Letter' },
  { value: 'termination', label: 'Termination Letter' },
  { value: 'promotion', label: 'Promotion Letter' },
  { value: 'warning', label: 'Warning Letter' },
  { value: 'resignation', label: 'Resignation Acceptance' },
  { value: 'experience', label: 'Experience Certificate' },
  { value: 'recommendation', label: 'Recommendation Letter' },
];

export const jobRoleTemplates = {
  // Engineering Roles
  'Software Developer': {
    department: 'Engineering',
    responsibilities: [
      'Develop and maintain web applications using modern technologies',
      'Collaborate with cross-functional teams to define and implement new features',
      'Write clean, maintainable, and efficient code',
      'Participate in code reviews and maintain coding standards',
      'Debug and resolve technical issues',
      'Stay updated with latest technology trends and best practices'
    ]
  },
  'Senior Software Developer': {
    department: 'Engineering',
    responsibilities: [
      'Lead development of complex software solutions',
      'Mentor junior developers and provide technical guidance',
      'Architect scalable and maintainable software systems',
      'Conduct technical interviews and code reviews',
      'Collaborate with product managers to define technical requirements',
      'Drive adoption of best practices and new technologies'
    ]
  },
  'Frontend Developer': {
    department: 'Engineering',
    responsibilities: [
      'Develop responsive and interactive user interfaces',
      'Implement designs using HTML, CSS, and JavaScript frameworks',
      'Optimize applications for maximum speed and scalability',
      'Ensure cross-browser compatibility and accessibility',
      'Collaborate with UX/UI designers and backend developers',
      'Maintain and improve existing frontend codebase'
    ]
  },
  'Backend Developer': {
    department: 'Engineering',
    responsibilities: [
      'Design and develop server-side applications and APIs',
      'Implement database schemas and optimize queries',
      'Ensure application security and data protection',
      'Integrate third-party services and APIs',
      'Monitor application performance and troubleshoot issues',
      'Implement automated testing and deployment processes'
    ]
  },
  'Full Stack Developer': {
    department: 'Engineering',
    responsibilities: [
      'Develop both frontend and backend components of applications',
      'Design and implement complete web solutions',
      'Work with databases, servers, and client-side technologies',
      'Ensure seamless integration between frontend and backend',
      'Participate in the entire software development lifecycle',
      'Troubleshoot and debug applications across the full stack'
    ]
  },
  'DevOps Engineer': {
    department: 'Engineering',
    responsibilities: [
      'Design and implement CI/CD pipelines',
      'Manage cloud infrastructure and deployment processes',
      'Monitor system performance and ensure high availability',
      'Implement security best practices and compliance measures',
      'Automate operational tasks and improve development workflows',
      'Collaborate with development teams to optimize deployment processes'
    ]
  },
  'QA Engineer': {
    department: 'Quality Assurance',
    responsibilities: [
      'Design and execute comprehensive test plans and test cases',
      'Perform manual and automated testing of software applications',
      'Identify, document, and track software defects',
      'Collaborate with development teams to ensure quality standards',
      'Implement test automation frameworks and tools',
      'Participate in requirement analysis and design reviews'
    ]
  },
  
  // AI & Machine Learning Roles
  'AI/ML Engineer': {
    department: 'Artificial Intelligence',
    responsibilities: [
      'Design and develop machine learning models and algorithms',
      'Implement AI solutions for business problems',
      'Work with large datasets and perform data preprocessing',
      'Deploy ML models to production environments',
      'Optimize model performance and accuracy',
      'Collaborate with data scientists and software engineers',
      'Stay updated with latest AI/ML research and technologies'
    ]
  },
  'Data Scientist': {
    department: 'Data Science',
    responsibilities: [
      'Analyze complex datasets to extract meaningful insights',
      'Build predictive models and statistical analyses',
      'Create data visualizations and reports for stakeholders',
      'Design and conduct A/B tests and experiments',
      'Collaborate with business teams to identify data-driven opportunities',
      'Develop and maintain data pipelines and workflows',
      'Present findings and recommendations to management'
    ]
  },
  'Machine Learning Engineer': {
    department: 'Artificial Intelligence',
    responsibilities: [
      'Build and deploy scalable machine learning systems',
      'Optimize ML algorithms for production environments',
      'Implement MLOps practices and model monitoring',
      'Work with cloud platforms and containerization technologies',
      'Collaborate with data scientists to productionize models',
      'Ensure model reliability, scalability, and performance',
      'Maintain and update existing ML infrastructure'
    ]
  },
  'Deep Learning Engineer': {
    department: 'Artificial Intelligence',
    responsibilities: [
      'Design and implement deep neural network architectures',
      'Work with computer vision and natural language processing',
      'Optimize deep learning models for performance and accuracy',
      'Implement state-of-the-art research papers and techniques',
      'Work with GPU computing and distributed training',
      'Collaborate on AI research and development projects',
      'Mentor junior team members on deep learning concepts'
    ]
  },
  'Computer Vision Engineer': {
    department: 'Artificial Intelligence',
    responsibilities: [
      'Develop computer vision algorithms and applications',
      'Work with image and video processing techniques',
      'Implement object detection, recognition, and tracking systems',
      'Optimize vision models for real-time applications',
      'Collaborate with hardware teams for edge deployment',
      'Research and implement latest computer vision techniques',
      'Build and maintain computer vision pipelines'
    ]
  },
  'NLP Engineer': {
    department: 'Artificial Intelligence',
    responsibilities: [
      'Develop natural language processing solutions',
      'Build chatbots, text analysis, and language understanding systems',
      'Work with large language models and transformer architectures',
      'Implement text preprocessing and feature extraction pipelines',
      'Develop sentiment analysis and text classification models',
      'Optimize NLP models for production deployment',
      'Stay updated with latest NLP research and techniques'
    ]
  },
  'AI Research Scientist': {
    department: 'Research & Development',
    responsibilities: [
      'Conduct cutting-edge research in artificial intelligence',
      'Publish research papers in top-tier conferences and journals',
      'Develop novel algorithms and methodologies',
      'Collaborate with academic institutions and research labs',
      'Lead research projects and mentor research teams',
      'Present research findings at conferences and workshops',
      'Transfer research outcomes to product development teams'
    ]
  },
  
  // Sales & Business Development Roles
  'Sales Executive': {
    department: 'Sales',
    responsibilities: [
      'Generate new business opportunities and leads',
      'Build and maintain relationships with clients',
      'Present product demonstrations and proposals',
      'Negotiate contracts and close deals',
      'Meet and exceed monthly and quarterly sales targets',
      'Collaborate with marketing team on lead generation',
      'Maintain accurate records in CRM system'
    ]
  },
  'Senior Sales Manager': {
    department: 'Sales',
    responsibilities: [
      'Lead and manage sales team to achieve revenue targets',
      'Develop sales strategies and go-to-market plans',
      'Build relationships with key enterprise clients',
      'Negotiate high-value contracts and partnerships',
      'Analyze sales metrics and performance data',
      'Mentor and train junior sales team members',
      'Collaborate with executive team on business strategy'
    ]
  },
  'Business Development Manager': {
    department: 'Business Development',
    responsibilities: [
      'Identify and pursue new business opportunities',
      'Develop strategic partnerships and alliances',
      'Conduct market research and competitive analysis',
      'Create business proposals and partnership agreements',
      'Represent company at industry events and conferences',
      'Collaborate with product and engineering teams',
      'Build long-term relationships with key stakeholders'
    ]
  },
  'Account Manager': {
    department: 'Sales',
    responsibilities: [
      'Manage and grow existing client accounts',
      'Ensure client satisfaction and retention',
      'Identify upselling and cross-selling opportunities',
      'Coordinate with internal teams to deliver client solutions',
      'Conduct regular client meetings and reviews',
      'Resolve client issues and concerns promptly',
      'Maintain detailed account records and reports'
    ]
  },
  'Sales Operations Analyst': {
    department: 'Sales Operations',
    responsibilities: [
      'Analyze sales data and generate performance reports',
      'Optimize sales processes and workflows',
      'Manage CRM system and data quality',
      'Support sales forecasting and planning activities',
      'Create sales dashboards and analytics tools',
      'Collaborate with sales team on process improvements',
      'Provide training on sales tools and systems'
    ]
  },
  
  // Digital Marketing Roles
  'Digital Marketing Manager': {
    department: 'Marketing',
    responsibilities: [
      'Develop and execute comprehensive digital marketing strategies',
      'Manage multi-channel marketing campaigns across platforms',
      'Analyze campaign performance and optimize for ROI',
      'Lead social media marketing and content strategy',
      'Manage marketing budget and resource allocation',
      'Collaborate with design and content teams',
      'Stay updated with latest digital marketing trends'
    ]
  },
  'SEO Specialist': {
    department: 'Marketing',
    responsibilities: [
      'Optimize website content and structure for search engines',
      'Conduct keyword research and competitive analysis',
      'Implement on-page and off-page SEO strategies',
      'Monitor and report on SEO performance metrics',
      'Collaborate with content team on SEO-friendly content',
      'Stay updated with search engine algorithm changes',
      'Manage technical SEO audits and improvements'
    ]
  },
  'Content Marketing Specialist': {
    department: 'Marketing',
    responsibilities: [
      'Create engaging content for blogs, social media, and websites',
      'Develop content marketing strategies and calendars',
      'Write compelling copy for marketing campaigns',
      'Collaborate with design team on visual content',
      'Analyze content performance and engagement metrics',
      'Manage content distribution across multiple channels',
      'Optimize content for SEO and user engagement'
    ]
  },
  'Social Media Manager': {
    department: 'Marketing',
    responsibilities: [
      'Manage company social media presence across platforms',
      'Create and curate engaging social media content',
      'Develop social media marketing strategies and campaigns',
      'Monitor social media metrics and engagement',
      'Respond to customer inquiries and comments',
      'Collaborate with influencers and brand partners',
      'Stay updated with social media trends and best practices'
    ]
  },
  'PPC Specialist': {
    department: 'Marketing',
    responsibilities: [
      'Manage Google Ads, Facebook Ads, and other PPC campaigns',
      'Conduct keyword research and audience targeting',
      'Create and optimize ad copy and landing pages',
      'Monitor campaign performance and adjust bidding strategies',
      'Analyze ROI and conversion metrics',
      'A/B test ad creatives and campaign elements',
      'Provide regular performance reports and insights'
    ]
  },
  'Email Marketing Specialist': {
    department: 'Marketing',
    responsibilities: [
      'Design and execute email marketing campaigns',
      'Segment email lists and personalize messaging',
      'Create compelling email templates and content',
      'Monitor email deliverability and engagement metrics',
      'Implement marketing automation workflows',
      'Conduct A/B tests on subject lines and content',
      'Ensure compliance with email marketing regulations'
    ]
  },
  'Marketing Analytics Manager': {
    department: 'Marketing',
    responsibilities: [
      'Analyze marketing data and campaign performance',
      'Create comprehensive marketing dashboards and reports',
      'Track customer acquisition and retention metrics',
      'Implement marketing attribution models',
      'Provide data-driven insights and recommendations',
      'Collaborate with marketing teams on strategy optimization',
      'Manage marketing technology stack and integrations'
    ]
  },
  
  // Management & Leadership Roles
  'Project Manager': {
    department: 'Project Management',
    responsibilities: [
      'Plan, execute, and deliver projects within scope, time, and budget',
      'Coordinate cross-functional teams and stakeholders',
      'Manage project risks, issues, and dependencies',
      'Facilitate communication between technical and business teams',
      'Track project progress and provide regular status updates',
      'Ensure adherence to project management methodologies'
    ]
  },
  'Business Analyst': {
    department: 'Business Analysis',
    responsibilities: [
      'Analyze business requirements and translate them into technical specifications',
      'Facilitate communication between business stakeholders and development teams',
      'Create detailed documentation including user stories and acceptance criteria',
      'Conduct gap analysis and recommend process improvements',
      'Support user acceptance testing and training activities',
      'Monitor and evaluate business processes for optimization opportunities'
    ]
  },
  'UI/UX Designer': {
    department: 'Design',
    responsibilities: [
      'Create user-centered design solutions for web and mobile applications',
      'Conduct user research and usability testing',
      'Develop wireframes, prototypes, and high-fidelity designs',
      'Collaborate with developers to ensure design implementation',
      'Maintain design systems and style guides',
      'Stay updated with latest design trends and best practices'
    ]
  },
  
  // Internship Roles
  'Software Development Intern': {
    department: 'Engineering',
    responsibilities: [
      'Assist in developing web applications under senior developer guidance',
      'Learn and apply programming best practices and coding standards',
      'Participate in code reviews and team meetings',
      'Work on assigned features and bug fixes',
      'Document code and create technical documentation',
      'Collaborate with team members on project deliverables',
      'Attend training sessions and skill development workshops'
    ]
  },
  'AI/ML Intern': {
    department: 'Artificial Intelligence',
    responsibilities: [
      'Assist in developing machine learning models and algorithms',
      'Learn data preprocessing and feature engineering techniques',
      'Work on AI research projects under mentor supervision',
      'Participate in model training and evaluation processes',
      'Document research findings and experimental results',
      'Attend AI/ML workshops and training sessions',
      'Collaborate with data science team on assigned projects'
    ]
  },
  'Data Science Intern': {
    department: 'Data Science',
    responsibilities: [
      'Assist in data analysis and statistical modeling projects',
      'Learn data visualization and reporting techniques',
      'Work with datasets to extract insights and patterns',
      'Support senior data scientists in research activities',
      'Create presentations and reports for stakeholders',
      'Participate in data science methodology training',
      'Collaborate on data pipeline development and maintenance'
    ]
  },
  'Digital Marketing Intern': {
    department: 'Marketing',
    responsibilities: [
      'Assist in creating content for social media and marketing campaigns',
      'Learn digital marketing tools and analytics platforms',
      'Support SEO research and content optimization activities',
      'Help manage social media accounts and engagement',
      'Participate in marketing campaign planning and execution',
      'Analyze marketing metrics and prepare reports',
      'Attend marketing workshops and industry events'
    ]
  },
  'Sales Intern': {
    department: 'Sales',
    responsibilities: [
      'Assist sales team in lead generation and prospecting activities',
      'Learn CRM systems and sales processes',
      'Support preparation of sales presentations and proposals',
      'Participate in client meetings and sales calls',
      'Help maintain customer databases and records',
      'Attend sales training and product knowledge sessions',
      'Collaborate with marketing team on lead qualification'
    ]
  },
  'Business Development Intern': {
    department: 'Business Development',
    responsibilities: [
      'Assist in market research and competitive analysis',
      'Support business proposal development and presentation',
      'Learn partnership development and relationship management',
      'Help identify new business opportunities and leads',
      'Participate in client meetings and networking events',
      'Create business reports and market analysis documents',
      'Collaborate with senior team members on strategic initiatives'
    ]
  },
  'UI/UX Design Intern': {
    department: 'Design',
    responsibilities: [
      'Assist in creating wireframes, mockups, and prototypes',
      'Learn user research and usability testing methodologies',
      'Support design system development and maintenance',
      'Participate in design reviews and feedback sessions',
      'Help create visual assets and design documentation',
      'Collaborate with development team on design implementation',
      'Attend design workshops and skill development sessions'
    ]
  },
  'QA Testing Intern': {
    department: 'Quality Assurance',
    responsibilities: [
      'Assist in manual testing of web and mobile applications',
      'Learn test case creation and execution processes',
      'Support bug reporting and tracking activities',
      'Participate in test planning and strategy discussions',
      'Help with test automation script development',
      'Collaborate with development team on quality improvements',
      'Attend QA training and best practices workshops'
    ]
  },
  'DevOps Intern': {
    department: 'Engineering',
    responsibilities: [
      'Assist in CI/CD pipeline setup and maintenance',
      'Learn cloud platforms and infrastructure management',
      'Support deployment and monitoring activities',
      'Help with automation script development',
      'Participate in infrastructure planning and optimization',
      'Collaborate with development teams on deployment processes',
      'Attend DevOps training and certification programs'
    ]
  },
  'Content Writing Intern': {
    department: 'Marketing',
    responsibilities: [
      'Assist in creating blog posts, articles, and marketing content',
      'Learn SEO writing and content optimization techniques',
      'Support social media content creation and curation',
      'Help with proofreading and editing activities',
      'Participate in content strategy planning sessions',
      'Research industry trends and topics for content creation',
      'Collaborate with marketing team on content campaigns'
    ]
  },
  'HR Intern': {
    department: 'Human Resources',
    responsibilities: [
      'Assist in recruitment and candidate screening processes',
      'Learn HR policies and employee management systems',
      'Support employee onboarding and training activities',
      'Help with HR documentation and record maintenance',
      'Participate in employee engagement and culture initiatives',
      'Assist in organizing company events and team building activities',
      'Collaborate with HR team on process improvements'
    ]
  }
};

export const letterTemplates = {
  offer: {
    title: 'OFFER LETTER',
    subject: 'Offer of Employment - [Job Role]',
    body: `We are pleased to offer you the position of **[Job Role]** at F24tech Softwares. This offer is contingent upon successful completion of background verification and reference checks.

**Position Details:**
Position: [Job Role]
Department: [Department]
Location: Gurgaon, Haryana
Start Date: [Start Date]
Reporting Manager: [Reporting Manager]
Salary: INR [Salary] per annum
Benefits: Health Insurance, Paid Time Off, Professional Development

**Key Responsibilities:**
[Responsibilities will be listed here]

**Terms and Conditions:**
• This offer is valid for 7 days from the date of this letter
• Employment is subject to satisfactory background verification
• Probation period of 6 months will be applicable
• Notice period of 30 days will be required for resignation

We believe your skills and experience will be a valuable addition to our team. Please confirm your acceptance of this offer by signing and returning this letter.

We look forward to welcoming you to the F24tech Softwares family.`,
  },
  appointment: {
    title: 'APPOINTMENT LETTER',
    subject: 'Letter of Appointment - [Job Role]',
    body: `We are pleased to formally appoint you as **[Job Role]** at F24tech Softwares effective from [Start Date].

**Employment Details:**
Position: [Job Role]
Department: [Department]
Employee ID: [Employee ID]
Reporting Manager: [Reporting Manager]
Salary: INR [Salary] per annum
Working Hours: 9:00 AM to 6:00 PM (Monday to Friday)
Probation Period: 6 months

**Key Responsibilities:**
[Responsibilities will be listed here]

**Terms of Employment:**
• You will be governed by the company's policies and procedures
• Confidentiality and non-disclosure agreements are applicable
• Performance reviews will be conducted annually
• Notice period of 30 days is required for resignation

This appointment is subject to the terms and conditions outlined in your employment contract. Please report to the HR department on your first day.

We are confident that you will make a valuable contribution to our organization.`,
  },
  termination: {
    title: 'TERMINATION LETTER',
    subject: 'Termination of Employment',
    body: `This letter serves as formal notification that your employment with F24tech Softwares will be terminated effective **[Date]**.

**Termination Details:**
Employee ID: [Employee ID]
Position: [Job Role]
Department: [Department]
Reason for Termination: [Reason]
Last Working Day: [Date]

**Final Settlement:**
• Final salary will be processed as per company policy
• Pending leave encashment will be included in final settlement
• Provident fund and gratuity will be processed as applicable
• Final settlement will be completed within 45 days

**Return of Company Property:**
Please ensure all company property including laptop, ID card, access cards, and any confidential documents are returned to the HR department.

We wish you all the best for your future endeavors.`,
  },
  promotion: {
    title: 'PROMOTION LETTER',
    subject: 'Promotion Notification - [New Position]',
    body: `We are pleased to inform you that you have been promoted to the position of **[Job Role]** effective from [Start Date].

**Promotion Details:**
Current Position: [Current Position]
New Position: [Job Role]
Department: [Department]
New Salary: INR [Salary] per annum
Effective Date: [Start Date]
Reporting Manager: [Reporting Manager]

**Updated Responsibilities:**
[Responsibilities will be listed here]

**Additional Benefits:**
• Revised compensation package as per new role
• Enhanced benefits and allowances
• Increased annual leave entitlement
• Professional development opportunities

This promotion is in recognition of your excellent performance, dedication, and valuable contributions to the company. We look forward to your continued success in your new role.

Congratulations on your well-deserved promotion!`,
  },
  warning: {
    title: 'WARNING LETTER',
    subject: 'Disciplinary Action - Warning',
    body: `This letter serves as a formal warning regarding your conduct/performance issues.

**Details of the Issue:**
[Please specify the detailed description of the issue, including dates, times, and specific incidents]

**Company Policy Violation:**
Your actions constitute a violation of company policy as outlined in the employee handbook, specifically:
[Policy reference and description]

**Expected Improvement:**
You are required to:
• Demonstrate immediate improvement in conduct/performance
• Adhere to all company policies and procedures
• Meet performance standards within 30 days
• Maintain professional behavior at all times

**Consequences:**
Failure to demonstrate immediate and sustained improvement may result in further disciplinary action, including suspension or termination of employment.

**Support Available:**
The company is committed to helping you succeed. Please reach out to HR or your manager for any support or clarification needed.

We expect immediate improvement in your conduct/performance. Please acknowledge receipt of this letter by signing and returning a copy.`,
  },
  resignation: {
    title: 'RESIGNATION ACCEPTANCE',
    subject: 'Acceptance of Resignation',
    body: `We acknowledge receipt of your resignation letter and accept your resignation from the position of **[Job Role]** at F24tech Softwares.

**Resignation Details:**
Employee ID: [Employee ID]
Position: [Job Role]
Department: [Department]
Resignation Date: [Date]
Last Working Day: [Date]
Notice Period: 30 days (as per company policy)

**Exit Formalities:**
Please ensure completion of the following before your last working day:
• Handover of all ongoing projects and responsibilities
• Return of company property (laptop, ID card, access cards, etc.)
• Completion of exit interview with HR
• Settlement of any pending dues or advances

**Final Settlement:**
Your final settlement including salary, leave encashment, and other dues will be processed within 45 days of your last working day.

We thank you for your valuable contributions to F24tech Softwares during your tenure. Your dedication and hard work have been appreciated.

We wish you success and happiness in your future endeavors.`,
  },
  experience: {
    title: 'EXPERIENCE CERTIFICATE',
    subject: 'Experience Certificate',
    body: `This is to certify that **[Recipient Name]** was employed with F24tech Softwares from [Start Date] to [End Date].

**Employment Details:**
Employee ID: [Employee ID]
Position: [Job Role]
Department: [Department]
Reporting Manager: [Reporting Manager]
Employment Duration: [Duration]

**Job Responsibilities:**
During the tenure, the employee was responsible for:
[Responsibilities will be listed here]

**Performance and Conduct:**
The employee has been found to be sincere, hardworking, and dedicated to their responsibilities. Their conduct and behavior have been satisfactory throughout the employment period.

**Skills and Achievements:**
The employee demonstrated proficiency in various technical and professional skills relevant to their role.

They successfully contributed to various projects and initiatives during their tenure with us.

We wish them all the best for future endeavors.`,
  },
  recommendation: {
    title: 'RECOMMENDATION LETTER',
    subject: 'Letter of Recommendation',
    body: `I am pleased to recommend **[Recipient Name]** for any position they may be seeking. [Recipient Name] worked under my supervision as **[Job Role]** at F24tech Softwares from [Start Date] to [End Date].

**Professional Qualities:**
During this time, they demonstrated exceptional skills and qualities including:
• Strong technical expertise in their field
• Excellent problem-solving and analytical abilities
• Outstanding communication and teamwork skills
• Reliability and commitment to meeting deadlines
• Leadership potential and mentoring capabilities

**Key Achievements:**
Their notable achievements include:
• Successfully completed assigned projects within deadlines
• Demonstrated strong technical competency
• Contributed positively to team dynamics

**Work Performance:**
[Recipient Name] consistently delivered high-quality work and exceeded expectations. They were instrumental in various projects and demonstrated the ability to work effectively both independently and as part of a team.

**Personal Attributes:**
They are a person of integrity, with a positive attitude and strong work ethic. Their ability to adapt to new challenges and learn quickly made them a valuable team member.

[Recipient Name] would be a valuable addition to any organization. I highly recommend them without reservation and am confident that they will excel in their future endeavors.`,
  },
};