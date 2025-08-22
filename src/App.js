// src/App.js - Complete ImpactMojo with ALL components and enhanced AI Tools
import React, { useState, useEffect, createContext, useContext } from 'react';
import { 
  Menu, X, Sun, Moon, Search, Bookmark, Heart, MessageCircle, 
  Download, ExternalLink, Play, Pause, SkipForward, Volume2,
  User, LogOut, ChevronRight, Star, Clock, Users, Target,
  Gamepad2, BookOpen, Mail, Phone, Globe, Twitter, Linkedin,
  Github, Coffee, Zap, TrendingUp, Award, Filter, Calendar,
  FileText, BarChart, Settings, ArrowRight, CheckCircle,
  AlertCircle, Info, HelpCircle, Share2, PlayCircle, Scale,
  Lightbulb, Compare, Send, Edit3, Brain, PenTool, FolderOpen,
  Loader2, Copy, Sparkles, Wand2, Bot, Puzzle, Trophy, Shield
} from 'lucide-react';

// Firebase imports
import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signOut as firebaseSignOut, 
  onAuthStateChanged 
} from 'firebase/auth';
import { 
  getFirestore, 
  collection, 
  doc, 
  setDoc, 
  getDoc, 
  addDoc, 
  query, 
  where, 
  getDocs,
  deleteDoc 
} from 'firebase/firestore';

// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyDnF0eJsTULzOJUnBskybd44dG5w-f46vE",
  authDomain: "impactmojo.firebaseapp.com",
  projectId: "impactmojo",
  storageBucket: "impactmojo.firebasestorage.app",
  messagingSenderId: "529198336589",
  appId: "1:529198336589:web:1664b5344de5bfb31bea04",
  measurementId: "G-ZHPPXXMRGV"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();

// ✅ REAL COURSE DATA (37 Courses) - Updated from Project Files
const courseData = [
  {
    id: "C1",
    title: "Gender Studies 101",
    track: "Gender Studies",
    description: "Introduction to gender theory and its practical implications.",
    url: "https://101.www.impactmojo.in/gender-studies",
    level: "Beginner",
    duration: "2 hours",
    quote: '"Eye-opening exploration of gender norms."',
  },
  {
    id: "C2",
    title: "Women's Economic Empowerment 101",
    track: "Gender Studies",
    description: "Strategies and frameworks for women's economic participation.",
    url: "https://101.www.impactmojo.in/WEE",
    level: "Intermediate",
    duration: "2.5 hours",
    quote: '"Essential for inclusive development."',
  },
  {
    id: "C3",
    title: "LGBTQ+ Rights and Inclusion 101",
    track: "Gender Studies",
    description: "Understanding LGBTQ+ issues and building inclusive communities.",
    url: "https://101.www.impactmojo.in/LGBTQ",
    level: "Beginner",
    duration: "2 hours",
    quote: '"Building bridges through understanding."',
  },
  {
    id: "C4",
    title: "Masculinities and Development 101",
    track: "Gender Studies",
    description: "Exploring masculinities and their role in development.",
    url: "https://101.www.impactmojo.in/masculinities",
    level: "Intermediate",
    duration: "2.5 hours",
    quote: '"Critical perspective on gender roles."',
  },
  {
    id: "C5",
    title: "Gender-based Violence Prevention 101",
    track: "Gender Studies",
    description: "Strategies for preventing and responding to gender-based violence.",
    url: "https://101.www.impactmojo.in/GBV-prevention",
    level: "Intermediate",
    duration: "3 hours",
    quote: '"Life-saving knowledge and skills."',
  },
  {
    id: "C6",
    title: "Care Work and Gender 101",
    track: "Gender Studies",
    description: "Understanding unpaid care work and its gendered dimensions.",
    url: "https://101.www.impactmojo.in/care-work",
    level: "Beginner",
    duration: "2 hours",
    quote: '"Recognizing invisible contributions."',
  },
  {
    id: "C7",
    title: "Policy Analysis 101",
    track: "Policy Analysis",
    description: "Frameworks and tools for effective policy analysis.",
    url: "https://101.www.impactmojo.in/PolicyA",
    level: "Intermediate",
    duration: "3 hours",
    quote: '"Essential for evidence-based policy."',
  },
  {
    id: "C8",
    title: "Policy Design and Implementation 101",
    track: "Policy Analysis",
    description: "From policy design to effective implementation strategies.",
    url: "https://101.www.impactmojo.in/policy-design",
    level: "Advanced",
    duration: "3.5 hours",
    quote: '"Bridging theory and practice."',
  },
  {
    id: "C9",
    title: "Research Ethics 101",
    track: "Research Methods",
    description: "Ethical considerations in research and evaluation.",
    url: "https://101.www.impactmojo.in/ResearchEthics",
    level: "Beginner", 
    duration: "2 hours",
    quote: '"Foundation for responsible research."',
  },
  {
    id: "C10",
    title: "Behaviour Change Communication Programming 101",
    track: "Research Methods",
    description: "Designing effective behavior change interventions.",
    url: "https://101.www.impactmojo.in/BCCP",
    level: "Intermediate",
    duration: "3 hours",
    quote: '"Practical guide to behavior change."',
  },
  {
    id: "C12",
    title: "Monitoring, Evaluation, Accountability and Learning 101",
    track: "Research Methods",
    description: "MEAL frameworks and implementation strategies.",
    url: "https://101.www.impactmojo.in/MEAL",
    level: "Intermediate",
    duration: "4 hours",
    quote: '"Critical for program accountability."',
  },
  {
    id: "C13",
    title: "Visual Ethnography 101",
    track: "Research Methods",
    description: "Using visual methods in ethnographic research.",
    url: "https://101.www.impactmojo.in/VEthno",
    level: "Intermediate",
    duration: "3 hours",
    quote: '"Innovative approach to research."',
  },
  {
    id: "C14",
    title: "Development Economics 101",
    track: "Policy Analysis",
    description: "Core principles of development economics and their applications.",
    url: "https://101.www.impactmojo.in/DevEcon",
    level: "Intermediate",
    duration: "3.5 hours",
    quote: '"Foundation for economic analysis."',
  },
  {
    id: "C15",
    title: "Public Health 101",
    track: "Policy Analysis",
    description: "Fundamentals of public health systems and interventions.",
    url: "https://101.www.impactmojo.in/public-health",
    level: "Beginner",
    duration: "2.5 hours",
    quote: '"Health as a human right."',
  },
  {
    id: "C16",
    title: "Climate Change 101",
    track: "Policy Analysis",
    description: "Understanding climate science and policy responses.",
    url: "https://101.www.impactmojo.in/climate",
    level: "Beginner",
    duration: "2.5 hours",
    quote: '"Urgent knowledge for our times."',
  },
  {
    id: "C17",
    title: "Human Rights 101",
    track: "Policy Analysis",
    description: "International human rights frameworks and applications.",
    url: "https://101.www.impactmojo.in/HumanRights",
    level: "Beginner",
    duration: "2.5 hours",
    quote: '"Universal principles for dignity."',
  },
  {
    id: "C18",
    title: "Education Policy and Access 101",
    track: "Policy Analysis",
    description: "Educational systems, access, and policy frameworks.",
    url: "https://101.www.impactmojo.in/education-policy",
    level: "Intermediate",
    duration: "3 hours",
    quote: '"Education as empowerment."',
  },
  {
    id: "C19",
    title: "Econometrics 101",
    track: "Data Analysis",
    description: "Statistical methods for economic analysis.",
    url: "https://101.www.impactmojo.in/econometrics",
    level: "Advanced",
    duration: "4 hours",
    quote: '"Essential for economic research."',
  },
  {
    id: "C20",
    title: "Law and Constitution 101",
    track: "Policy Analysis",
    description: "Understanding legal frameworks and constitutional principles.",
    url: "https://101.www.impactmojo.in/law-constitution",
    level: "Intermediate",
    duration: "3 hours",
    quote: '"Rule of law foundations."',
  },
  {
    id: "C21",
    title: "Livelihoods and Sustainable Development 101",
    track: "Policy Analysis",
    description: "Understanding sustainable livelihood approaches and frameworks.",
    url: "https://101.www.impactmojo.in/livelihoods",
    level: "Intermediate",
    duration: "2.5 hours",
    quote: '"Pathways out of poverty."',
  },
  {
    id: "C22",
    title: "Community Development 101",
    track: "Research Methods", 
    description: "Participatory approaches to community-led development.",
    url: "https://101.www.impactmojo.in/community-dev",
    level: "Beginner",
    duration: "2 hours",
    quote: '"Essential for grassroots work."',
  },
  {
    id: "C23",
    title: "Data Literacy 101",
    track: "Data Analysis",
    description: "Essential skills for understanding and using data effectively.",
    url: "https://101.www.impactmojo.in/data-lit",
    level: "Beginner",
    duration: "2 hours",
    quote: '"Foundation for data-driven work."',
  },
  {
    id: "C24",
    title: "Understanding Inequality 101",
    track: "Policy Analysis",
    description: "Roots and manifestations of inequality in societies.",
    url: "https://101.www.impactmojo.in/inequality",
    level: "Intermediate",
    duration: "2.5 hours",
    quote: '"Critical for social justice."',
  },
  {
    id: "C25",
    title: "Financial Inclusion 101",
    track: "Policy Analysis",
    description: "Expanding access to financial services for development.",
    url: "https://101.www.impactmojo.in/financial-inclusion",
    level: "Intermediate",
    duration: "2.5 hours",
    quote: '"Banking the unbanked."',
  },
  {
    id: "C26",
    title: "Social Protection 101",
    track: "Policy Analysis",
    description: "Social safety nets and protection systems.",
    url: "https://101.www.impactmojo.in/social-protection",
    level: "Intermediate",
    duration: "3 hours",
    quote: '"Security for vulnerable populations."',
  },
  {
    id: "C27",
    title: "Qualitative Research Methods 101",
    track: "Research Methods",
    description: "Comprehensive guide to qualitative research approaches.",
    url: "https://101.www.impactmojo.in/QualR",
    level: "Intermediate",
    duration: "4 hours",
    quote: '"Deep dive into qualitative methods."',
  },
  {
    id: "C28",
    title: "Exploratory Data Analysis for Household Surveys 101",
    track: "Data Analysis",
    description: "Statistical analysis techniques for household survey data.",
    url: "https://101.www.impactmojo.in/HH-EDA",
    level: "Intermediate",
    duration: "3.5 hours",
    quote: '"Practical guide to survey analysis."',
  },
  {
    id: "C29",
    title: "Bivariate Analysis 101",
    track: "Data Analysis",
    description: "Statistical techniques for analyzing relationships between variables.",
    url: "https://101.www.impactmojo.in/bivariateA",
    level: "Intermediate",
    duration: "3 hours",
    quote: '"Essential for correlation analysis."',
  },
  {
    id: "C30",
    title: "Multivariate Analysis 101",
    track: "Data Analysis",
    description: "Advanced statistical methods for complex data analysis.",
    url: "https://101.www.impactmojo.in/MultivariateA",
    level: "Advanced",
    duration: "4 hours",
    quote: '"Advanced statistical techniques."',
  },
  {
    id: "C31",
    title: "Digital Ethics 101",
    track: "Research Methods",
    description: "Ethical considerations in digital technology and data use.",
    url: "https://101.www.impactmojo.in/DigitalEthics",
    level: "Intermediate",
    duration: "2.5 hours",
    quote: '"Critical for digital age research."',
  },
  {
    id: "C32",
    title: "Conflict, Peace and Security 101",
    track: "Policy Analysis",
    description: "Understanding conflict dynamics and peacebuilding approaches.",
    url: "https://101.www.impactmojo.in/conflict-peace",
    level: "Advanced",
    duration: "3.5 hours",
    quote: '"Building sustainable peace."',
  },
  {
    id: "C33",
    title: "Urban Studies 101",
    track: "Policy Analysis",
    description: "Urban development challenges and sustainable city planning.",
    url: "https://101.www.impactmojo.in/urban-studies",
    level: "Intermediate",
    duration: "3 hours",
    quote: '"Cities as engines of change."',
  },
  {
    id: "C34",
    title: "Agriculture and Food Security 101",
    track: "Policy Analysis",
    description: "Agricultural systems, food security, and rural development.",
    url: "https://101.www.impactmojo.in/agriculture",
    level: "Intermediate",
    duration: "3 hours",
    quote: '"Feeding the world sustainably."',
  },

  // Premium Courses
  {
    id: "C35",
    title: "Observation to Insight 101",
    track: "Research Methods",
    description: "Transforming observational data into actionable insights.",
    url: "https://101.www.impactmojo.in/obs2insight",
    level: "Advanced",
    duration: "3.5 hours",
    isPremium: true,
    password: "OBS2025",
    quote: '"Premium methodology for researchers."',
  },
  {
    id: "C36",
    title: "Item Response Theory 101",
    track: "Data Analysis",
    description: "Advanced psychometric theory for test and survey development.",
    url: "https://101.www.impactmojo.in/IRT",
    level: "Advanced",
    duration: "4 hours",
    isPremium: true,
    password: "IRT2025",
    quote: '"Advanced psychometric methods."',
  },
  {
    id: "C37",
    title: "Social Emotional Learning 101",
    track: "Research Methods",
    description: "SEL frameworks and implementation in educational contexts.",
    url: "https://101.www.impactmojo.in/SEL",
    level: "Intermediate",
    duration: "3 hours",
    isPremium: true,
    password: "SEL2025",
    quote: '"Cutting-edge educational approach."',
  },
];

// ✅ REAL LAB DATA (10 Interactive Labs) - Updated from Project Files
const labsData = [
  {
    id: "L1",
    title: "Risk Assessment and Mitigation Lab",
    description: "Interactive tools for assessing and managing project risks.",
    url: "https://impactrisk-mitigation.netlify.app/",
    icon: "shield",
    category: "Risk Management",
    difficulty: "Intermediate",
    duration: 60,
    status: "Available"
  },
  {
    id: "L2", 
    title: "Resource Mobilisation and Sustainability Lab",
    description: "Strategies for sustainable resource mobilization.",
    url: "https://rm-sustainability4impact.netlify.app/",
    icon: "dollar-sign",
    category: "Financial Planning",
    difficulty: "Advanced",
    duration: 75,
    status: "Available"
  },
  {
    id: "L3",
    title: "Policy and Advocacy Lab",
    description: "Tools for effective policy advocacy and engagement.",
    url: "https://pol-advocacy4impact.netlify.app/",
    icon: "megaphone",
    category: "Policy Analysis", 
    difficulty: "Intermediate",
    duration: 65,
    status: "Available"
  },
  {
    id: "L4",
    title: "Partnership and Collaboration Lab",
    description: "Framework for building effective partnerships.",
    url: "https://impact-partnerships.netlify.app/",
    icon: "handshake",
    category: "Stakeholder Engagement",
    difficulty: "Intermediate",
    duration: 55,
    status: "Available"
  },
  {
    id: "L5",
    title: "MLE Framework Workbench",
    description: "Monitoring, Learning and Evaluation framework design.",
    url: "https://mle-frameworkdesign.netlify.app/",
    icon: "wrench",
    category: "Monitoring & Evaluation",
    difficulty: "Advanced",
    duration: 90,
    status: "Available"
  },
  {
    id: "L6",
    title: "MLE Framework Builder Lab", 
    description: "Build comprehensive MLE frameworks for your projects.",
    url: "https://mle-plan-lab.netlify.app/",
    icon: "build", 
    category: "Monitoring & Evaluation",
    difficulty: "Advanced",
    duration: 85,
    status: "Available"
  },
  {
    id: "L7",
    title: "Community Engagement Lab",
    description: "Tools for meaningful community engagement and participation.",
    url: "https://community-engagement.netlify.app/",
    icon: "users",
    category: "Community Development",
    difficulty: "Intermediate", 
    duration: 60,
    status: "Available"
  },
  {
    id: "L8",
    title: "Impact Storytelling Lab",
    description: "Craft compelling narratives about your impact work.",
    url: "https://impact-storytelling.netlify.app/",
    icon: "book-open",
    category: "Communications",
    difficulty: "Beginner",
    duration: 45,
    status: "Available"
  },
  {
    id: "L9",
    title: "Innovation and Design Thinking Lab",
    description: "Apply design thinking to development challenges.",
    url: "https://impactdesign-thinking.netlify.app/",
    icon: "lightbulb",
    category: "Innovation",
    difficulty: "Intermediate",
    duration: 70,
    status: "Available"
  },
  {
    id: "L10",
    title: "TOC Workbench",
    description: "Theory of Change development and visualization tools.",
    url: "https://toc-workbench.netlify.app/",
    icon: "target",
    category: "Strategic Planning",
    difficulty: "Advanced",
    duration: 80,
    status: "Available"
  },
];

// 🤖 ENHANCED AI Tools Data - Complete 16 tools with detailed instructions and prompts
const aiToolsData = [
  // Enhanced existing 8 tools
  { 
    id: 'AI1', 
    name: 'Policy Brief Generator', 
    description: 'Generate structured policy briefs from your research data and analysis', 
    category: 'Writing',
    instructions: 'Enter your policy topic, target audience, key findings, and main recommendations. The tool will create a professional policy brief with executive summary, background, analysis, and recommendations.',
    howToUse: 'Steps: 1) Enter policy topic (e.g., "Climate Change Adaptation in Urban Areas") 2) Specify target audience (e.g., "City Mayors and Urban Planners") 3) Add 3-5 key findings 4) List main recommendations 5) Generate professional brief',
    promptTemplate: `Create a comprehensive policy brief on: {topic}

Target Audience: {audience}
Key Findings: {findings}
Recommendations: {recommendations}

Please structure as:
1. Executive Summary (200 words)
2. Background & Context (300 words)
3. Analysis of Key Issues (400 words)
4. Policy Recommendations (300 words)
5. Implementation Steps (200 words)

Use professional policy language and include specific, actionable recommendations.`,
    systemMessage: 'You are a senior policy analyst with expertise in public policy and government relations. Create professional, evidence-based policy documents with clear recommendations and implementation strategies.',
    exampleInput: `Topic: Digital Skills Training for Rural Communities
Audience: Regional Development Officers
Key Findings: 
- 67% lack basic digital literacy
- Limited internet infrastructure 
- Youth migration to cities due to lack of opportunities
Recommendations:
- Mobile training units
- Public-private partnerships
- Subsidized internet access`,
    icon: FileText,
    color: 'blue'
  },
  { 
    id: 'AI2', 
    name: 'Research Question Refiner', 
    description: 'Refine and improve your research questions for better focus and clarity', 
    category: 'Research',
    instructions: 'Paste your draft research question(s) and specify your field of study, methodology preference, and scope. The tool will analyze and suggest improvements for clarity, feasibility, and academic rigor.',
    howToUse: 'Steps: 1) Enter your draft research question 2) Specify academic field 3) Indicate preferred methodology (qualitative/quantitative/mixed) 4) Set scope (local/national/global) 5) Get refined suggestions with rationale',
    promptTemplate: `Refine and improve this research question: "{question}"

Research Field: {field}
Methodology: {methodology}
Scope: {scope}
Current Academic Level: {level}

Please provide:
1. Analysis of the current question (strengths/weaknesses)
2. 3 refined alternative versions
3. Explanation of improvements made
4. Feasibility assessment
5. Suggested sub-questions if applicable

Focus on making questions more specific, measurable, and academically rigorous.`,
    systemMessage: 'You are a research methodology expert with expertise in academic research design across multiple disciplines. Help refine research questions for clarity, feasibility, and academic rigor.',
    exampleInput: `Question: How does social media affect young people?
Field: Digital Sociology
Methodology: Mixed Methods
Scope: National (teenagers aged 13-18)
Level: Graduate thesis`,
    icon: Search,
    color: 'green'
  },
  { 
    id: 'AI3', 
    name: 'Data Story Creator', 
    description: 'Turn data insights into compelling narratives and visualizations', 
    category: 'Analysis',
    instructions: 'Describe your data, key findings, and target audience. The tool creates narrative structures with suggested visualizations, compelling storylines, and clear takeaway messages.',
    howToUse: 'Steps: 1) Describe your data/findings 2) Specify target audience 3) Choose narrative style (analytical/persuasive/educational) 4) Set complexity level 5) Generate story structure with visualization suggestions',
    promptTemplate: `Create a compelling data story from: {data}

Key Findings: {findings}
Target Audience: {audience}
Narrative Style: {style}
Complexity Level: {complexity}

Please provide:
1. Executive summary (key message in 50 words)
2. Story structure with 5-7 main points
3. Suggested visualizations for each point
4. Compelling opening and closing
5. Call-to-action recommendations
6. Data presentation tips

Make it engaging and accessible to the target audience.`,
    systemMessage: 'You are a data storytelling expert who transforms complex data into engaging narratives. You understand visualization best practices and how to communicate insights effectively to different audiences.',
    exampleInput: `Data: Survey of 1,200 remote workers across 15 countries
Findings: 
- 78% report higher productivity at home
- 65% struggle with work-life balance
- 43% feel disconnected from colleagues
Audience: HR Directors and Team Managers
Style: Persuasive (for policy change)`,
    icon: BarChart,
    color: 'purple'
  },
  { 
    id: 'AI4', 
    name: 'Grant Proposal Assistant', 
    description: 'Help structure and improve grant proposals with proven frameworks', 
    category: 'Writing',
    instructions: 'Provide your project concept, target funder type, budget range, and timeline. The tool creates structured proposals with compelling problem statements, clear methodologies, and realistic budgets.',
    howToUse: 'Steps: 1) Describe project concept clearly 2) Specify funder type (government/foundation/corporate) 3) Enter budget range 4) Set project timeline 5) Generate complete proposal framework',
    promptTemplate: `Create a grant proposal framework for: {project}

Funder Type: {funder}
Budget Range: {budget}
Timeline: {timeline}
Target Population: {population}
Expected Impact: {impact}

Please structure as:
1. Executive Summary (250 words)
2. Problem Statement with evidence (400 words)
3. Project Description & Methodology (500 words)
4. Goals, Objectives & Outcomes (300 words)
5. Budget Justification outline (200 words)
6. Sustainability Plan (200 words)
7. Evaluation Framework (200 words)

Include specific metrics and evidence-based justifications.`,
    systemMessage: 'You are a grant writing specialist with 15+ years experience securing funding from government agencies, foundations, and corporate sponsors. You understand funder priorities and write compelling, evidence-based proposals.',
    exampleInput: `Project: Mobile Health Clinic for Rural Maternal Care
Funder: Private Foundation (health focus)
Budget: $150,000 - $300,000
Timeline: 2 years
Population: Pregnant women in remote areas (500+ beneficiaries)
Impact: Reduce maternal mortality by 40%`,
    icon: TrendingUp,
    color: 'blue'
  },
  { 
    id: 'AI5', 
    name: 'Impact Measurement Framework', 
    description: 'Design comprehensive frameworks to measure and evaluate social impact', 
    category: 'Analysis',
    instructions: 'Define your program goals, activities, target beneficiaries, and timeframe. The tool creates logic models, identifies key indicators, and suggests measurement approaches.',
    howToUse: 'Steps: 1) Enter program objectives clearly 2) List main activities/interventions 3) Define target beneficiaries 4) Specify measurement timeframe 5) Generate complete M&E framework with indicators',
    promptTemplate: `Create an impact measurement framework for: {program}

Program Goals: {goals}
Main Activities: {activities}
Target Beneficiaries: {beneficiaries}
Timeframe: {timeframe}
Budget for M&E: {budget}

Please provide:
1. Logic Model (inputs → activities → outputs → outcomes → impact)
2. Key Performance Indicators (KPIs) for each level
3. Data collection methods and timeline
4. Baseline and target metrics
5. Evaluation questions for each outcome
6. Reporting framework and frequency
7. Risk assumptions and mitigation

Include both quantitative and qualitative indicators.`,
    systemMessage: 'You are a monitoring and evaluation specialist with expertise in social impact measurement. You design rigorous frameworks that capture both quantitative outcomes and qualitative changes in complex social programs.',
    exampleInput: `Program: Digital Literacy Training for Senior Citizens
Goals: Improve digital inclusion and reduce social isolation
Activities: Weekly computer classes, one-on-one support, peer mentoring
Beneficiaries: 200 seniors (65+) in rural communities
Timeframe: 12 months
Budget: $25,000 for M&E activities`,
    icon: Target,
    color: 'red'
  },
  { 
    id: 'AI6', 
    name: 'Stakeholder Mapping Tool', 
    description: 'Identify and map project stakeholders with influence and interest analysis', 
    category: 'Planning',
    instructions: 'Describe your project, sector, and geographic scope. The tool identifies relevant stakeholders, analyzes their influence/interest levels, and suggests engagement strategies.',
    howToUse: 'Steps: 1) Describe project scope and objectives 2) Specify sector and location 3) List known stakeholders 4) Define project phase (planning/implementation/evaluation) 5) Generate comprehensive stakeholder map',
    promptTemplate: `Create a stakeholder mapping for: {project}

Project Scope: {scope}
Sector: {sector}
Location: {location}
Project Phase: {phase}
Known Stakeholders: {known}

Please provide:
1. Comprehensive stakeholder list by category:
   - Primary stakeholders (directly affected)
   - Secondary stakeholders (indirectly affected)
   - Key stakeholders (decision makers)
2. Influence vs Interest matrix mapping
3. Engagement strategy for each stakeholder type
4. Communication plan recommendations
5. Potential risks and mitigation strategies
6. Timeline for stakeholder engagement

Include both supportive and potentially resistant stakeholders.`,
    systemMessage: 'You are a stakeholder engagement specialist with expertise in complex multi-stakeholder projects. You understand power dynamics, influence mapping, and effective engagement strategies across different sectors.',
    exampleInput: `Project: Community Solar Energy Installation
Scope: 500-household renewable energy project
Sector: Clean Energy/Rural Development
Location: Rural county in Kenya
Phase: Planning and feasibility
Known: Local chief, utility company, environmental NGO`,
    icon: Users,
    color: 'green'
  },
  { 
    id: 'AI7', 
    name: 'Literature Review Helper', 
    description: 'Organize and synthesize academic literature with thematic analysis', 
    category: 'Research',
    instructions: 'Enter your research topic, key papers/abstracts, and review scope. The tool organizes sources by themes, identifies gaps, and creates synthesis summaries.',
    howToUse: 'Steps: 1) Enter research topic/question 2) Paste abstracts or paper summaries 3) Specify review scope (systematic/narrative) 4) Choose organization method 5) Generate thematic synthesis',
    promptTemplate: `Organize and synthesize literature on: {topic}

Research Question: {question}
Key Papers/Abstracts: {papers}
Review Type: {type}
Time Period: {period}
Scope: {scope}

Please provide:
1. Thematic organization of literature
2. Key themes and sub-themes identified
3. Summary of main findings by theme
4. Identification of research gaps
5. Methodological patterns observed
6. Conflicting findings and debates
7. Future research directions
8. Suggested outline for literature review section

Include proper academic synthesis, not just summaries.`,
    systemMessage: 'You are an academic researcher with expertise in literature reviews and systematic analysis. You help organize complex literature into coherent themes and identify patterns, gaps, and synthesis opportunities.',
    exampleInput: `Topic: Impact of Microfinance on Women's Empowerment
Question: How does access to microfinance affect women's decision-making power in developing countries?
Papers: [paste 5-10 abstracts]
Type: Systematic review
Period: 2015-2023
Scope: Developing countries, randomized controlled trials`,
    icon: BookOpen,
    color: 'indigo'
  },
  { 
    id: 'AI8', 
    name: 'Workshop Facilitator', 
    description: 'Plan and structure effective workshop sessions with activities and timelines', 
    category: 'Planning',
    instructions: 'Specify workshop objectives, duration, participant type, and preferred format. The tool creates detailed agendas with activities, timing, materials, and facilitation tips.',
    howToUse: 'Steps: 1) Define clear workshop goals 2) Set duration and participant count 3) Choose participant type/level 4) Specify format (in-person/virtual/hybrid) 5) Generate complete facilitation guide',
    promptTemplate: `Design a workshop on: {topic}

Objectives: {objectives}
Duration: {duration}
Participants: {participants} ({count} people)
Format: {format}
Experience Level: {level}
Desired Outcomes: {outcomes}

Please provide:
1. Detailed agenda with time allocations
2. Learning objectives for each session
3. Interactive activities and exercises
4. Materials and resources needed
5. Facilitation tips and techniques
6. Engagement strategies for different learning styles
7. Assessment/feedback methods
8. Follow-up recommendations

Include specific instructions for facilitator and participant handouts.`,
    systemMessage: 'You are an experienced workshop facilitator and adult learning specialist. You design engaging, interactive sessions that achieve clear learning outcomes through proven facilitation techniques and adult learning principles.',
    exampleInput: `Topic: Design Thinking for Social Innovation
Objectives: Teach human-centered design methods to nonprofit leaders
Duration: 6 hours (full day)
Participants: NGO program managers and directors (20 people)
Format: In-person
Level: Beginner to intermediate
Outcomes: Participants can apply design thinking to their programs`,
    icon: Users,
    color: 'orange'
  },

  // New 8 tools with enhanced prompts
  { 
    id: 'AI9', 
    name: 'Worksheet Generator', 
    description: 'Generate educational worksheets with various question types on any topic', 
    category: 'Teaching',
    instructions: 'Specify your subject, topic, grade level, and question types. Include learning objectives and desired difficulty. The tool creates ready-to-print worksheets with answer keys.',
    howToUse: 'Steps: 1) Enter subject and specific topic 2) Select grade level 3) Choose question types (multiple choice, short answer, etc.) 4) Set number of questions 5) Generate printable worksheet with answer key',
    promptTemplate: `Create an educational worksheet on: {topic}

Subject: {subject}
Grade Level: {grade}
Number of Questions: {questions}
Question Types: {types}
Learning Objectives: {objectives}
Difficulty Level: {difficulty}

Please create:
1. Worksheet title and clear instructions
2. {questions} questions in specified formats
3. Appropriate difficulty progression
4. Clear formatting for printing
5. Complete answer key with explanations
6. Extension activities for advanced students
7. Modification suggestions for struggling learners

Format for easy printing and classroom use. Include engaging, age-appropriate content.`,
    systemMessage: 'You are an experienced educational content creator who designs engaging worksheets aligned with curriculum standards. You understand different learning styles and create age-appropriate, pedagogically sound materials.',
    exampleInput: `Topic: Photosynthesis Process
Subject: Biology
Grade: 9th grade (14-15 years)
Questions: 15 questions
Types: Multiple choice (5), Short answer (5), Diagram labeling (5)
Objectives: Students understand inputs/outputs of photosynthesis
Difficulty: Intermediate`,
    icon: FileText,
    color: 'blue'
  },
  { 
    id: 'AI10', 
    name: 'Choice Board Generator', 
    description: 'Create activity choice boards for differentiated learning with multiple options', 
    category: 'Teaching',
    instructions: 'Enter your learning topic, objectives, and grade level. The tool creates a grid of diverse activities for different learning styles (visual, auditory, kinesthetic, reading/writing).',
    howToUse: 'Steps: 1) Enter learning topic and unit 2) Define 2-3 key learning objectives 3) Choose grade level 4) Select board size (3x3 or 4x4) 5) Generate choice board with varied activities',
    promptTemplate: `Create a choice board for: {topic}

Learning Unit: {unit}
Grade Level: {grade}
Learning Objectives: {objectives}
Board Size: {size}
Subject Area: {subject}
Duration: {duration}

Create a {size} choice board with activities covering:
1. Visual learners (diagrams, infographics, videos)
2. Auditory learners (presentations, podcasts, discussions)
3. Kinesthetic learners (hands-on, movement, building)
4. Reading/Writing learners (essays, reports, creative writing)

Each activity should:
- Align with learning objectives
- Be age-appropriate and engaging
- Include clear instructions and success criteria
- Offer different difficulty levels
- Be completable in specified timeframe

Include one required center activity and varied optional activities.`,
    systemMessage: 'You are a differentiated instruction specialist who creates engaging choice boards that accommodate multiple learning styles while maintaining academic rigor and clear learning objectives.',
    exampleInput: `Topic: Ancient Egypt Civilization
Unit: Ancient Civilizations - Egypt chapter
Grade: 6th grade (11-12 years)
Objectives: 1) Understand Egyptian social structure 2) Explain mummification process 3) Analyze pyramid construction
Size: 3x3 grid (9 activities)
Subject: Social Studies
Duration: 2-week unit`,
    icon: Gamepad2,
    color: 'purple'
  },
  { 
    id: 'AI11', 
    name: 'Multiple Choice Assessment Generator', 
    description: 'Generate comprehensive MCQ assessments from content with answer keys', 
    category: 'Assessment',
    instructions: 'Paste content text or enter key topics to assess. Specify question count, difficulty, and cognitive levels (remember, understand, apply, analyze). Creates balanced assessments with detailed answer explanations.',
    howToUse: 'Steps: 1) Paste source content or list key concepts 2) Set number of questions (10-50) 3) Choose difficulty distribution 4) Select cognitive levels to assess 5) Generate MCQ test with detailed answer key',
    promptTemplate: `Create a multiple-choice assessment from: {content}

Key Topics to Assess: {topics}
Number of Questions: {questions}
Grade Level: {grade}
Cognitive Levels: {cognitive}
Difficulty Distribution: {difficulty}

Create {questions} multiple-choice questions that:
1. Cover all key topics proportionally
2. Include 4 plausible answer choices each
3. Test different cognitive levels (remember, understand, apply, analyze)
4. Avoid trick questions or ambiguous wording
5. Include variety in question formats
6. Progress from easier to more challenging

Provide:
- Complete question set with A/B/C/D choices
- Answer key with correct letters
- Detailed explanations for correct answers
- Rationale for why other options are incorrect
- Alignment to specific learning objectives`,
    systemMessage: 'You are an assessment design expert who creates fair, valid, and reliable multiple-choice tests. You understand cognitive taxonomies and write clear questions that accurately measure student learning.',
    exampleInput: `Content: [Paste chapter text on Cellular Respiration]
Topics: Glycolysis, Citric Acid Cycle, Electron Transport Chain, ATP production
Questions: 20 questions
Grade: 11th grade Biology
Cognitive: 30% remember, 40% understand, 20% apply, 10% analyze
Difficulty: 25% easy, 50% medium, 25% challenging`,
    icon: CheckCircle,
    color: 'green'
  },
  { 
    id: 'AI12', 
    name: 'Writing Feedback Tool', 
    description: 'Provide detailed AI-powered feedback on student writing with improvement suggestions', 
    category: 'Assessment',
    instructions: 'Paste student writing sample and specify writing type, grade level, and feedback focus areas. The tool analyzes content, structure, grammar, and style with specific improvement suggestions.',
    howToUse: 'Steps: 1) Paste student writing sample 2) Select writing type (essay, report, creative, etc.) 3) Choose grade level 4) Set feedback focus (content, organization, mechanics) 5) Generate detailed feedback with suggestions',
    promptTemplate: `Provide detailed feedback on this student writing:

{writing}

Writing Type: {type}
Grade Level: {grade}
Assignment Requirements: {requirements}
Focus Areas: {focus}
Feedback Style: {style}

Please provide:
1. Overall impression and strengths (positive feedback first)
2. Content and Ideas Analysis:
   - Clarity of main idea/thesis
   - Supporting evidence and examples
   - Depth of analysis
3. Organization and Structure:
   - Introduction effectiveness
   - Paragraph structure and transitions
   - Conclusion strength
4. Language and Style:
   - Sentence variety and flow
   - Word choice and vocabulary
   - Voice and tone appropriateness
5. Mechanics and Grammar:
   - Grammar and punctuation errors
   - Spelling and capitalization
6. Specific Improvement Suggestions:
   - 3-5 concrete next steps
   - Examples of better alternatives
7. Grade-appropriate learning goals for revision

Keep feedback constructive, specific, and encouraging.`,
    systemMessage: 'You are an experienced writing teacher who provides constructive, specific feedback that helps students improve. You balance encouragement with clear guidance for improvement, adapting your feedback style to the student\'s grade level.',
    exampleInput: `Writing: [Paste 250-word student essay on "The Importance of Recycling"]
Type: Persuasive essay
Grade: 8th grade
Requirements: 5-paragraph structure, 3 supporting arguments, MLA format
Focus: Content development and organization
Style: Encouraging but thorough`,
    icon: Edit3,
    color: 'blue'
  },
  { 
    id: 'AI13', 
    name: 'Text Proofreader', 
    description: 'Advanced grammar, spelling, and style checking for any text content', 
    category: 'Writing',
    instructions: 'Paste any text needing proofreading. The tool corrects grammar, spelling, punctuation, and improves clarity while maintaining original meaning and tone.',
    howToUse: 'Steps: 1) Paste text to proofread 2) Select text type (academic, business, creative) 3) Choose correction level (light/thorough) 4) Specify tone to maintain 5) Get corrected version with explanations',
    promptTemplate: `Proofread and improve this text:

{text}

Text Type: {type}
Correction Level: {level}
Maintain Tone: {tone}
Target Audience: {audience}
Specific Concerns: {concerns}

Please provide:
1. Corrected version with all improvements
2. Summary of changes made:
   - Grammar corrections
   - Spelling fixes
   - Punctuation improvements
   - Clarity enhancements
   - Style adjustments
3. Explanation of major corrections
4. Suggestions for further improvement
5. Original meaning preservation confirmation

Focus on clarity, correctness, and readability while maintaining the author's voice and intent.`,
    systemMessage: 'You are a professional editor and proofreader with expertise in grammar, style, and clarity. You improve text while preserving the author\'s voice and intent, providing clear explanations for your corrections.',
    exampleInput: `Text: [Paste email, essay, or document to proofread]
Type: Professional business email
Level: Thorough correction
Tone: Professional but friendly
Audience: Company executives
Concerns: Grammar errors and unclear sentences`,
    icon: Shield,
    color: 'red'
  },
  { 
    id: 'AI14', 
    name: 'Sentence Starter Generator', 
    description: 'Generate engaging opening sentences and writing prompts to overcome writer\'s block', 
    category: 'Writing',
    instructions: 'Enter writing topic, type, and target audience. The tool generates multiple engaging sentence starters and prompts suitable for essays, creative writing, or academic assignments.',
    howToUse: 'Steps: 1) Enter topic or theme 2) Choose writing type (narrative, persuasive, expository, creative) 3) Select grade/audience level 4) Set number of starters needed 5) Generate varied sentence starters',
    promptTemplate: `Generate sentence starters for: {topic}

Writing Type: {type}
Audience/Grade Level: {audience}
Purpose: {purpose}
Number of Starters: {count}
Style Preference: {style}

Create {count} engaging sentence starters that:
1. Hook the reader immediately
2. Match the writing type and purpose
3. Are appropriate for the audience level
4. Offer different approaches (question, statistic, anecdote, bold statement, etc.)
5. Inspire creative thinking
6. Are specific enough to provide direction

Include variety in:
- Question starters
- Statistical openers
- Anecdotal beginnings
- Bold statement openers
- Descriptive scene setters
- Thought-provoking scenarios

Each starter should be followed by a brief explanation of why it's effective and what direction the writing could take.`,
    systemMessage: 'You are a creative writing coach who helps writers overcome blocks with engaging, inspiring prompts. You understand different writing genres and create starters that spark creativity while meeting academic or professional requirements.',
    exampleInput: `Topic: Environmental Conservation
Type: Persuasive essay
Audience: High school students (grades 9-12)
Purpose: Convince peers to adopt eco-friendly habits
Count: 8 sentence starters
Style: Engaging and relatable to teenagers`,
    icon: PenTool,
    color: 'green'
  },
  { 
    id: 'AI15', 
    name: 'Jeopardy Review Game', 
    description: 'Create Jeopardy-style quiz games with categories and point values for classroom review', 
    category: 'Games',
    instructions: 'Enter review topic and preferred categories. The tool creates a complete Jeopardy game with 5 questions per category, increasing in difficulty from $100-$500.',
    howToUse: 'Steps: 1) Enter main topic/unit 2) Choose 4-6 categories 3) Set difficulty range 4) Specify grade level 5) Generate complete Jeopardy game with questions and answers',
    promptTemplate: `Create a Jeopardy review game for: {topic}

Main Subject/Unit: {unit}
Categories: {categories}
Grade Level: {grade}
Point Values: {points}
Total Questions: {total}

Create a complete Jeopardy game with:
1. 5 categories related to {topic}
2. 5 questions per category ($100 to $500)
3. Questions that increase in difficulty with point value
4. Answers in proper Jeopardy format ("What is..." or "Who is...")
5. Clear, unambiguous questions appropriate for grade level
6. Good mix of factual recall and application questions

Format each category as:
**CATEGORY NAME**
$100: [Question] 
Answer: [Response in Jeopardy format]
$200: [Question]
Answer: [Response]
[Continue through $500]

Include instructions for gameplay and any needed materials.`,
    systemMessage: 'You are a game-based learning specialist who creates engaging educational games. You understand how to balance fun with learning objectives and create questions that are challenging but fair for the target grade level.',
    exampleInput: `Topic: American Civil War
Unit: Civil War causes, battles, and consequences
Categories: Key Battles, Important Figures, Causes of War, Technology, Reconstruction
Grade: 8th grade History
Points: $100, $200, $300, $400, $500
Total: 25 questions (5 categories × 5 questions)`,
    icon: Trophy,
    color: 'yellow'
  },
  { 
    id: 'AI16', 
    name: 'Escape Room Generator', 
    description: 'Design educational escape room experiences with interconnected puzzles and storylines', 
    category: 'Games',
    instructions: 'Provide educational topic and learning objectives. The tool creates an immersive storyline with 5-7 interconnected puzzles that teach key concepts while engaging students.',
    howToUse: 'Steps: 1) Enter educational topic 2) Define 3-4 key learning objectives 3) Choose theme/storyline 4) Set difficulty and time limit 5) Generate complete escape room with puzzle solutions',
    promptTemplate: `Design an educational escape room for: {topic}

Learning Objectives: {objectives}
Theme/Storyline: {theme}
Grade Level: {grade}
Time Limit: {time}
Group Size: {size}
Available Technology: {tech}

Create an immersive escape room experience with:

1. **Engaging Storyline**:
   - Clear mission/scenario that motivates students
   - Connection between theme and educational content
   - Sense of urgency and purpose

2. **5-7 Interconnected Puzzles**:
   - Each puzzle teaches/reinforces learning objectives
   - Increasing difficulty progression
   - Variety of puzzle types (codes, riddles, physical, digital)
   - Clear connection between puzzles
   - Final challenge that synthesizes all learning

3. **Complete Implementation Guide**:
   - Room setup instructions and materials list
   - Detailed puzzle instructions and solutions
   - Facilitator guide with hints system
   - Student handouts and clue sheets
   - Assessment rubric for learning objectives
   - Alternative versions for different ability levels

4. **Learning Integration**:
   - Clear connections between each puzzle and curriculum
   - Debrief questions to reinforce learning
   - Extension activities for early finishers

Ensure all puzzles are solvable, age-appropriate, and directly tied to learning goals.`,
    systemMessage: 'You are an immersive learning experience designer who creates educational escape rooms. You understand game mechanics, puzzle design, and how to seamlessly integrate curriculum content into engaging storylines that promote deep learning.',
    exampleInput: `Topic: Chemical Bonding and Molecular Structure
Objectives: 1) Identify ionic vs covalent bonds 2) Predict molecular shapes 3) Understand electronegativity 4) Apply bonding theory to real compounds
Theme: Secret laboratory - students are chemists who must prevent a dangerous reaction
Grade: 10th grade Chemistry
Time: 45 minutes
Size: Groups of 4-5 students
Tech: Tablets available for digital clues/simulations`,
    icon: Puzzle,
    color: 'purple'
  }
];

// Authentication Context
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      if (user) {
        // Load user bookmarks
        try {
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          if (userDoc.exists()) {
            setBookmarks(userDoc.data().bookmarks || []);
          }
        } catch (error) {
          console.error('Error loading bookmarks:', error);
        }
      } else {
        setBookmarks([]);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      
      // Create or update user document
      await setDoc(doc(db, 'users', user.uid), {
        name: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        lastLogin: new Date()
      }, { merge: true });
      
      return user;
    } catch (error) {
      console.error('Error signing in:', error);
      throw error;
    }
  };

  const signOut = async () => {
    try {
      await firebaseSignOut(auth);
    } catch (error) {
      console.error('Error signing out:', error);
      throw error;
    }
  };

  const toggleBookmark = async (itemId) => {
    if (!user) return;
    
    try {
      const newBookmarks = bookmarks.includes(itemId)
        ? bookmarks.filter(id => id !== itemId)
        : [...bookmarks, itemId];
      
      setBookmarks(newBookmarks);
      
      await setDoc(doc(db, 'users', user.uid), {
        bookmarks: newBookmarks
      }, { merge: true });
    } catch (error) {
      console.error('Error updating bookmarks:', error);
    }
  };

  const value = {
    user,
    loading,
    signInWithGoogle,
    signOut,
    bookmarks,
    toggleBookmark
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Course Card Component
const CourseCard = ({ course, isBookmarked, onBookmark }) => {
  const { user } = useAuth();

  const handleCourseAccess = () => {
    if (course.isPremium) {
      const password = prompt(`This is a premium course. Please enter the access password:`);
      if (password === course.password) {
        window.open(course.url, '_blank');
      } else if (password !== null) {
        alert('Incorrect password. Please contact support for access.');
      }
    } else {
      window.open(course.url, '_blank');
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <span className="text-sm font-bold text-blue-600 dark:text-blue-400">
            {course.id}
          </span>
          <div className="flex items-center space-x-2">
            {course.isPremium && (
              <span className="px-2 py-1 text-xs bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200 rounded font-medium">
                Premium
              </span>
            )}
            {user && (
              <button
                onClick={() => onBookmark(course.id)}
                className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
              >
                <Bookmark 
                  className={`w-5 h-5 ${isBookmarked ? 'fill-yellow-400 text-yellow-400' : 'text-gray-400'}`} 
                />
              </button>
            )}
          </div>
        </div>
        
        <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
          {course.title}
        </h3>
        
        <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
          {course.description}
        </p>
        
        {course.quote && (
          <blockquote className="text-sm italic text-blue-600 dark:text-blue-400 mb-4 border-l-2 border-blue-200 pl-3">
            {course.quote}
          </blockquote>
        )}
        
        <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
          <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded">
            {course.track}
          </span>
          <span className="flex items-center">
            <Clock className="w-4 h-4 mr-1" />
            {course.duration}
          </span>
        </div>
        
        <button
          onClick={handleCourseAccess}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2"
        >
          <ExternalLink className="w-4 h-4" />
          <span>Start Course</span>
        </button>
      </div>
    </div>
  );
};

// 🎨 ENHANCED AI Tool Card Component
const AIToolCard = ({ tool, isSelected, onSelect }) => {
  const IconComponent = tool.icon;
  
  const getCategoryColor = (category) => {
    switch (category) {
      case 'Writing': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'Research': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'Analysis': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      case 'Planning': return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
      case 'Teaching': return 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200';
      case 'Assessment': return 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200';
      case 'Games': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const getColorClass = (color) => {
    switch (color) {
      case 'blue': return 'text-blue-600 dark:text-blue-400';
      case 'green': return 'text-green-600 dark:text-green-400';
      case 'purple': return 'text-purple-600 dark:text-purple-400';
      case 'red': return 'text-red-600 dark:text-red-400';
      case 'orange': return 'text-orange-600 dark:text-orange-400';
      case 'indigo': return 'text-indigo-600 dark:text-indigo-400';
      case 'yellow': return 'text-yellow-600 dark:text-yellow-400';
      default: return 'text-gray-600 dark:text-gray-400';
    }
  };

  return (
    <div 
      className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 cursor-pointer border-2 ${
        isSelected ? 'border-blue-500 dark:border-blue-400' : 'border-transparent'
      }`}
      onClick={() => onSelect(tool)}
    >
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <span className="text-sm font-bold text-purple-600 dark:text-purple-400">
            {tool.id}
          </span>
          <div className={`p-2 rounded-lg bg-gray-100 dark:bg-gray-700 ${getColorClass(tool.color)}`}>
            <IconComponent className="w-5 h-5" />
          </div>
        </div>
        
        <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
          {tool.name}
        </h3>
        
        <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
          {tool.description}
        </p>
        
        <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
          <span className={`px-2 py-1 rounded font-medium ${getCategoryColor(tool.category)}`}>
            {tool.category}
          </span>
          <div className="flex items-center space-x-1">
            <Sparkles className="w-4 h-4 text-purple-500" />
            <span className="text-purple-600 dark:text-purple-400 font-medium">AI Powered</span>
          </div>
        </div>
        
        <div className={`text-center py-2 px-4 rounded-lg border-2 border-dashed transition-colors ${
          isSelected 
            ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300' 
            : 'border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400 hover:border-blue-300 hover:text-blue-600'
        }`}>
          {isSelected ? 'Selected - Ready to Use!' : 'Click to Select'}
        </div>
      </div>
    </div>
  );
};

// HomePage Component
const HomePage = ({ setCurrentPage }) => {
  const { user } = useAuth();
  
  const featuredCourses = courseData.slice(0, 6);
  const tracks = [
    { name: 'Gender Studies', color: 'purple', courses: courseData.filter(c => c.track === 'Gender Studies').length },
    { name: 'Policy Analysis', color: 'blue', courses: courseData.filter(c => c.track === 'Policy Analysis').length },
    { name: 'Research Methods', color: 'green', courses: courseData.filter(c => c.track === 'Research Methods').length },
    { name: 'Data Analysis', color: 'red', courses: courseData.filter(c => c.track === 'Data Analysis').length }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-8">
            <Zap className="w-16 h-16 mx-auto mb-4 text-yellow-300" />
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              ImpactMojo
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              101 Knowledge Series for Social Impact
            </p>
            <p className="text-lg mb-8 max-w-3xl mx-auto text-blue-100">
              A curated library exploring justice, equity, and development in South Asia. 
              Learn from 37 courses, 10 interactive labs, and comprehensive handouts.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => setCurrentPage('courses')}
              className="bg-white text-blue-600 font-bold py-3 px-8 rounded-lg hover:bg-blue-50 transition-colors flex items-center justify-center space-x-2"
            >
              <BookOpen className="w-5 h-5" />
              <span>Browse Courses</span>
            </button>
            {user ? (
              <button
                onClick={() => setCurrentPage('dashboard')}
                className="bg-transparent border-2 border-white text-white font-bold py-3 px-8 rounded-lg hover:bg-white hover:text-blue-600 transition-colors"
              >
                Go to Dashboard
              </button>
            ) : (
              <button
                onClick={() => setCurrentPage('about')}
                className="bg-transparent border-2 border-white text-white font-bold py-3 px-8 rounded-lg hover:bg-white hover:text-blue-600 transition-colors"
              >
                Learn More
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">37</div>
              <div className="text-gray-600 dark:text-gray-300">Courses</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">10</div>
              <div className="text-gray-600 dark:text-gray-300">Interactive Labs</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-orange-600 dark:text-orange-400 mb-2">100+</div>
              <div className="text-gray-600 dark:text-gray-300">Handouts</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-red-600 dark:text-red-400 mb-2">Free</div>
              <div className="text-gray-600 dark:text-gray-300">Open Source</div>
            </div>
          </div>
        </div>
      </section>

      {/* Learning Tracks */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
            Learning Tracks
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {tracks.map(track => (
              <div key={track.name} className="bg-white dark:bg-gray-800 rounded-lg p-6 hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">{track.name}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">{track.courses} courses available</p>
                <button
                  onClick={() => setCurrentPage('courses')}
                  className="text-blue-600 dark:text-blue-400 font-medium hover:underline"
                >
                  Explore Track →
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
            Featured Courses
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredCourses.map(course => (
              <CourseCard 
                key={course.id} 
                course={course} 
                isBookmarked={false}
                onBookmark={() => {}}
              />
            ))}
          </div>
          <div className="text-center mt-8">
            <button
              onClick={() => setCurrentPage('courses')}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition-colors"
            >
              View All Courses
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

// Courses Page Component
const CoursesPage = () => {
  const { user, bookmarks, toggleBookmark } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTrack, setSelectedTrack] = useState('all');
  const [selectedLevel, setSelectedLevel] = useState('all');

  const filteredCourses = courseData.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTrack = selectedTrack === 'all' || course.track === selectedTrack;
    const matchesLevel = selectedLevel === 'all' || course.level === selectedLevel;
    return matchesSearch && matchesTrack && matchesLevel;
  });

  const uniqueTracks = [...new Set(courseData.map(course => course.track))];
  const uniqueLevels = [...new Set(courseData.map(course => course.level))];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Course Catalog
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Explore our comprehensive collection of 37 development courses
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 mb-8">
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Search</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search courses..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Track</label>
              <select
                value={selectedTrack}
                onChange={(e) => setSelectedTrack(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="all">All Tracks</option>
                {uniqueTracks.map(track => (
                  <option key={track} value={track}>{track}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Level</label>
              <select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="all">All Levels</option>
                {uniqueLevels.map(level => (
                  <option key={level} value={level}>{level}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Course Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses.map(course => (
            <CourseCard
              key={course.id}
              course={course}
              isBookmarked={bookmarks.includes(course.id)}
              onBookmark={toggleBookmark}
            />
          ))}
        </div>

        {filteredCourses.length === 0 && (
          <div className="text-center py-12">
            <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              No courses found
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Try adjusting your search criteria
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

// Labs Page Component
const LabsPage = () => {
  const handleLabAccess = (lab) => {
    if (lab.status === 'Available') {
      window.open(lab.url, '_blank');
    } else {
      alert(`${lab.title} - Coming Soon!`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Interactive Labs
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            10 hands-on labs for real-world practice and skill development
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {labsData.map(lab => (
            <div key={lab.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <span className="text-sm font-bold text-green-600 dark:text-green-400">
                    {lab.id}
                  </span>
                  <span className={`px-2 py-1 rounded-lg text-xs font-medium ${
                    lab.status === 'Available' 
                      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                      : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                  }`}>
                    {lab.status}
                  </span>
                </div>
                
                <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                  {lab.title}
                </h3>
                
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {lab.description}
                </p>
                
                <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
                  <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded">
                    {lab.category}
                  </span>
                  <span className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {lab.duration} min
                  </span>
                </div>
                
                <div className="mb-4">
                  <span className={`text-xs px-2 py-1 rounded ${
                    lab.difficulty === 'Beginner' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                    lab.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                    'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                  }`}>
                    {lab.difficulty}
                  </span>
                </div>
                
                <button
                  onClick={() => handleLabAccess(lab)}
                  disabled={lab.status !== 'Available'}
                  className={`w-full font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2 ${
                    lab.status === 'Available'
                      ? 'bg-green-600 hover:bg-green-700 text-white'
                      : 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                  }`}
                >
                  <PlayCircle className="w-4 h-4" />
                  <span>{lab.status === 'Available' ? 'Launch Lab' : 'Coming Soon'}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// NEW HandoutsPage Component - Based on your index.html
const HandoutsPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Header */}
        <div className="bg-white/95 backdrop-blur-md rounded-xl p-8 mb-8 shadow-2xl">
          <div className="mb-6">
            <button
              onClick={() => window.history.back()}
              className="text-blue-600 hover:text-blue-800 font-medium text-sm mb-4"
            >
              ← Back to ImpactMojo
            </button>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Educational Handouts
          </h1>
          <div className="text-xl text-gray-600 mb-6">
            Structured Learning Pathways for Development Education
          </div>
          
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-xl border-l-4 border-blue-500 mb-6">
            <p className="text-gray-700 leading-relaxed">
              <strong>Curriculum-ready teaching materials</strong> organized into progressive learning pathways for educators working in development studies, public policy, and social research across South Asian contexts. Each pathway builds systematically from foundational concepts to advanced applications.
            </p>
          </div>
          
          {/* Stats Banner */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white/80 p-4 rounded-lg text-center shadow-md">
              <span className="text-3xl font-bold text-blue-600 block">4</span>
              <div className="text-gray-600 text-sm mt-2">Core Learning Tracks</div>
            </div>
            <div className="bg-white/80 p-4 rounded-lg text-center shadow-md">
              <span className="text-3xl font-bold text-purple-600 block">8</span>
              <div className="text-gray-600 text-sm mt-2">Thematic Areas</div>
            </div>
            <div className="bg-white/80 p-4 rounded-lg text-center shadow-md">
              <span className="text-3xl font-bold text-green-600 block">100+</span>
              <div className="text-gray-600 text-sm mt-2">Workshop Materials</div>
            </div>
            <div className="bg-white/80 p-4 rounded-lg text-center shadow-md">
              <span className="text-3xl font-bold text-red-600 block">75-90</span>
              <div className="text-gray-600 text-sm mt-2">Minute Sessions</div>
            </div>
          </div>
        </div>
        
        {/* Learning Pathways Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          
          {/* Data Analysis Track */}
          <div className="bg-white/95 backdrop-blur-md rounded-xl p-8 shadow-2xl border border-white/20 hover:transform hover:-translate-y-2 transition-all duration-300">
            <div className="flex items-center mb-6">
              <div className="text-4xl mr-4">📊</div>
              <h2 className="text-2xl font-bold text-gray-900">Data Analysis Track</h2>
            </div>
            <div className="text-gray-600 mb-6 leading-relaxed">
              Master quantitative research skills from basic data literacy through advanced econometric modeling. Perfect for building comprehensive data analysis capabilities.
            </div>
            <div className="flex flex-wrap gap-2 mb-6">
              <span className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium">Beginner</span>
              <span className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium">Intermediate</span>
              <span className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium">Advanced</span>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                📈 Learning Progression:
              </h4>
              <ul className="text-gray-700 space-y-2 text-sm">
                <li className="flex items-center"><span className="text-blue-500 mr-2">📁</span> Data Literacy</li>
                <li className="flex items-center"><span className="text-blue-500 mr-2">📁</span> EDA (Exploratory Data Analysis)</li>
                <li className="flex items-center"><span className="text-blue-500 mr-2">📁</span> Bivariate Analysis</li>
                <li className="flex items-center"><span className="text-blue-500 mr-2">📁</span> Multivariate Analysis</li>
                <li className="flex items-center"><span className="text-blue-500 mr-2">📁</span> Econometrics</li>
                <li className="flex items-center"><span className="text-blue-500 mr-2">📁</span> Data Analysis - Examples and Templates</li>
              </ul>
            </div>
          </div>
          
          {/* Gender Studies Pathway */}
          <div className="bg-white/95 backdrop-blur-md rounded-xl p-8 shadow-2xl border border-white/20 hover:transform hover:-translate-y-2 transition-all duration-300">
            <div className="flex items-center mb-6">
              <div className="text-4xl mr-4">⚡</div>
              <h2 className="text-2xl font-bold text-gray-900">Gender Studies Pathway</h2>
            </div>
            <div className="text-gray-600 mb-6 leading-relaxed">
              Comprehensive understanding of gender in development work, from foundational theory through applied economic empowerment and intersectional analysis.
            </div>
            <div className="flex flex-wrap gap-2 mb-6">
              <span className="bg-gradient-to-r from-purple-500 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-medium">Theory</span>
              <span className="bg-gradient-to-r from-purple-500 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-medium">Analysis</span>
              <span className="bg-gradient-to-r from-purple-500 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-medium">Application</span>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                🎯 Pathway Components:
              </h4>
              <ul className="text-gray-700 space-y-2 text-sm">
                <li className="flex items-center"><span className="text-purple-500 mr-2">📁</span> Gender Studies</li>
                <li className="flex items-center"><span className="text-purple-500 mr-2">📁</span> Data Feminism</li>
                <li className="flex items-center"><span className="text-purple-500 mr-2">📁</span> Care Economy</li>
                <li className="flex items-center"><span className="text-purple-500 mr-2">📁</span> Women's Economic Empowerment</li>
                <li className="flex items-center"><span className="text-purple-500 mr-2">📁</span> Marginalised Identities</li>
              </ul>
            </div>
          </div>
          
          {/* Policy & Economics Track */}
          <div className="bg-white/95 backdrop-blur-md rounded-xl p-8 shadow-2xl border border-white/20 hover:transform hover:-translate-y-2 transition-all duration-300">
            <div className="flex items-center mb-6">
              <div className="text-4xl mr-4">🏛️</div>
              <h2 className="text-2xl font-bold text-gray-900">Policy & Economics Track</h2>
            </div>
            <div className="text-gray-600 mb-6 leading-relaxed">
              From foundational economic theory to policy analysis and implementation. Covers development economics through social protection systems.
            </div>
            <div className="flex flex-wrap gap-2 mb-6">
              <span className="bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-2 rounded-full text-sm font-medium">Economics</span>
              <span className="bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-2 rounded-full text-sm font-medium">Policy</span>
              <span className="bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-2 rounded-full text-sm font-medium">Implementation</span>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                💼 Track Components:
              </h4>
              <ul className="text-gray-700 space-y-2 text-sm">
                <li className="flex items-center"><span className="text-green-500 mr-2">📁</span> Development Economics</li>
                <li className="flex items-center"><span className="text-green-500 mr-2">📁</span> Political Economy</li>
                <li className="flex items-center"><span className="text-green-500 mr-2">📁</span> Poverty and Inequality</li>
                <li className="flex items-center"><span className="text-green-500 mr-2">📁</span> Social Safety Nets</li>
                <li className="flex items-center"><span className="text-green-500 mr-2">📁</span> Livelihoods</li>
                <li className="flex items-center"><span className="text-green-500 mr-2">📁</span> Policy Tracking</li>
              </ul>
            </div>
          </div>
          
          {/* Research Methods Journey */}
          <div className="bg-white/95 backdrop-blur-md rounded-xl p-8 shadow-2xl border border-white/20 hover:transform hover:-translate-y-2 transition-all duration-300">
            <div className="flex items-center mb-6">
              <div className="text-4xl mr-4">🔬</div>
              <h2 className="text-2xl font-bold text-gray-900">Research Methods Journey</h2>
            </div>
            <div className="text-gray-600 mb-6 leading-relaxed">
              Complete research toolkit covering ethics, qualitative methods, monitoring & evaluation, and research design principles for development work.
            </div>
            <div className="flex flex-wrap gap-2 mb-6">
              <span className="bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-full text-sm font-medium">Ethics</span>
              <span className="bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-full text-sm font-medium">Methods</span>
              <span className="bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-full text-sm font-medium">Evaluation</span>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                🔍 Research Components:
              </h4>
              <ul className="text-gray-700 space-y-2 text-sm">
                <li className="flex items-center"><span className="text-red-500 mr-2">📁</span> Research Ethics</li>
                <li className="flex items-center"><span className="text-red-500 mr-2">📁</span> Qualitative Research</li>
                <li className="flex items-center"><span className="text-red-500 mr-2">📁</span> MLE (Monitoring, Learning & Evaluation)</li>
                <li className="flex items-center"><span className="text-red-500 mr-2">📁</span> Assumptions Checklist</li>
                <li className="flex items-center"><span className="text-red-500 mr-2">📁</span> Research Design - Resources</li>
              </ul>
            </div>
          </div>
        </div>
        
        {/* Additional Resources Section */}
        <div className="bg-white/95 backdrop-blur-md rounded-xl p-8 shadow-2xl">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Additional Resources & Thematic Areas</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-blue-500 hover:bg-gray-100 transition-colors">
              <h3 className="font-bold text-gray-900 mb-2 flex items-center">
                🌍 Thematic Areas
              </h3>
              <div className="text-gray-600 text-sm leading-relaxed">
                Specialized topic collections including Digital Development Ethics, Health & Wellbeing, Justice & Governance, and Regional & Applications.
              </div>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-green-500 hover:bg-gray-100 transition-colors">
              <h3 className="font-bold text-gray-900 mb-2 flex items-center">
                💚 Health & Wellbeing
              </h3>
              <div className="text-gray-600 text-sm leading-relaxed">
                Public health fundamentals, CDC materials, sexual and reproductive health resources.
              </div>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-purple-500 hover:bg-gray-100 transition-colors">
              <h3 className="font-bold text-gray-900 mb-2 flex items-center">
                ⚖️ Justice & Governance
              </h3>
              <div className="text-gray-600 text-sm leading-relaxed">
                Community led development, decent work standards, decolonising development practices.
              </div>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-orange-500 hover:bg-gray-100 transition-colors">
              <h3 className="font-bold text-gray-900 mb-2 flex items-center">
                🗺️ South Asia Region
              </h3>
              <div className="text-gray-600 text-sm leading-relaxed">
                Regional historical timelines, policy dashboards, and contextual development resources.
              </div>
            </div>
          </div>
        </div>
        
        {/* Learning Tracks */}
        <div className="bg-white/95 backdrop-blur-md rounded-xl p-8 shadow-2xl">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Learning Tracks & Resources</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md border hover:shadow-lg transition-shadow">
              <h3 className="font-bold text-gray-900 mb-3 flex items-center">
                📊 Data Analysis Track
              </h3>
              <div className="text-gray-600 text-sm leading-relaxed mb-4">
                Comprehensive resources covering bivariate analysis, data literacy, econometrics, EDA, and multivariate analysis techniques.
              </div>
              <div className="text-xs text-blue-600 font-medium">
                Includes: Templates, Examples, Statistical Methods
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md border hover:shadow-lg transition-shadow">
              <h3 className="font-bold text-gray-900 mb-3 flex items-center">
                🎨 Gender Studies Track
              </h3>
              <div className="text-gray-600 text-sm leading-relaxed mb-4">
                Focus areas include care economy, data feminism, gender studies fundamentals, and women's economic empowerment.
              </div>
              <div className="text-xs text-purple-600 font-medium">
                Includes: Research Tools, Policy Frameworks
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md border hover:shadow-lg transition-shadow">
              <h3 className="font-bold text-gray-900 mb-3 flex items-center">
                📈 Policy and Economics Track
              </h3>
              <div className="text-gray-600 text-sm leading-relaxed mb-4">
                Development economics, livelihoods, marginalized identities, policy tracking, political economy, and social safety nets.
              </div>
              <div className="text-xs text-green-600 font-medium">
                Includes: Policy Analysis, Economic Models
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md border hover:shadow-lg transition-shadow">
              <h3 className="font-bold text-gray-900 mb-3 flex items-center">
                🔬 Research Methods Track
              </h3>
              <div className="text-gray-600 text-sm leading-relaxed mb-4">
                Assumptions checklist, MLE techniques, qualitative research methods, research design resources, and research ethics.
              </div>
              <div className="text-xs text-orange-600 font-medium">
                Includes: Methodological Guides, Ethics Frameworks
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md border hover:shadow-lg transition-shadow">
              <h3 className="font-bold text-gray-900 mb-3 flex items-center">
                📚 Education & Pedagogy
              </h3>
              <div className="text-gray-600 text-sm leading-relaxed mb-4">
                Specialized resources for educators focusing on learning theory, curriculum design, and effective teaching practices.
              </div>
              <div className="text-xs text-indigo-600 font-medium">
                Perfect for printing and desk reference
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md border hover:shadow-lg transition-shadow">
              <h3 className="font-bold text-gray-900 mb-3 flex items-center">
                🔗 Cross Cutting Resources
              </h3>
              <div className="text-gray-600 text-sm leading-relaxed mb-4">
                Case studies, communications guides, local application worksheets, and software tools for development work.
              </div>
              <div className="text-xs text-red-600 font-medium">
                Includes: Practical Tools, Templates
              </div>
            </div>
          </div>
        </div>
        
        {/* Quick Reference Section */}
        <div className="bg-white/95 backdrop-blur-md rounded-xl p-8 shadow-2xl">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">📋 Quick Reference Cards</h2>
          <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-6 rounded-xl border-l-4 border-yellow-500">
            <p className="text-gray-700 leading-relaxed mb-4">
              Concise, printable reference materials for quick consultation during research, fieldwork, or teaching.
            </p>
            <div className="text-sm text-yellow-700 font-medium">
              Ready-to-print format • Field-tested content • Easy navigation
            </div>
          </div>
        </div>
        
        {/* Footer Information */}
        <div className="bg-white/95 backdrop-blur-md rounded-xl p-8 shadow-2xl text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Open Educational Resources</h3>
          <p className="text-gray-600 mb-4">
            All materials are licensed under CC BY-NC-SA 4.0 and available for adaptation.
          </p>
          <p className="text-gray-600 mb-4">
            Perfect for university instructors, training coordinators, and workshop facilitators.
          </p>
          <p className="text-sm text-gray-500 italic mb-6">
            ImpactMojo is provided completely free through the generous support of Pinpoint Ventures.
          </p>
          
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <p className="text-sm text-gray-700">
              <strong>How to Use:</strong> Click any pathway or resource to explore materials. 
              Use your browser's print function (Ctrl+P or Cmd+P) to save handouts as PDFs.
            </p>
          </div>
        </div>
        
      </div>
    </div>
                );
                };
                
                // Resources Page Component (replaced with HandoutsPage above)
                const ResourcesPage = () => {
                return <HandoutsPage />;
                };
                
                // Dashboard Page Component
                const DashboardPage = () => {
                const { user, bookmarks, notes, addNote, updateNote, deleteNote } = useAuth();
                const [activeTab, setActiveTab] = useState('overview');
                const [noteContent, setNoteContent] = useState('');
                const [selectedCourse, setSelectedCourse] = useState('');
                const [editingNote, setEditingNote] = useState(null);
                
                if (!user) {
                return (
                <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
                  <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                      Please sign in to access your dashboard
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300">
                      Sign in to track your progress, save bookmarks, and access personalized features.
                    </p>
                  </div>
                </div>
                );
                }
                
                const handleAddNote = async () => {
                if (noteContent.trim() && selectedCourse) {
                await addNote(selectedCourse, noteContent);
                setNoteContent('');
                setSelectedCourse('');
                }
                };
                
                const handleEditNote = (note) => {
                setEditingNote(note);
                setNoteContent(note.content);
                setSelectedCourse(note.courseId);
                };
                
                const handleUpdateNote = async () => {
                if (editingNote && noteContent.trim()) {
                await updateNote(editingNote.id, noteContent);
                setEditingNote(null);
                setNoteContent('');
                setSelectedCourse('');
                }
                };
                
                const tabContent = {
                overview: (
                <div className="space-y-6">
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg">
                      <h3 className="text-lg font-semibold mb-2">Bookmarked Courses</h3>
                      <div className="text-2xl font-bold text-blue-600">{bookmarks.length}</div>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg">
                      <h3 className="text-lg font-semibold mb-2">My Notes</h3>
                      <div className="text-2xl font-bold text-green-600">{notes.length}</div>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg">
                      <h3 className="text-lg font-semibold mb-2">Progress</h3>
                      <div className="text-2xl font-bold text-purple-600">
                        {Math.round((bookmarks.length / courseData.length) * 100)}%
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
                    <h3 className="text-xl font-bold mb-4">Recent Activity</h3>
                    <div className="space-y-3">
                      {bookmarks.slice(0, 5).map(courseId => {
                      const course = courseData.find(c => c.id === courseId);
                      return course ? (
                      <div key={courseId} className="flex items-center space-x-3 py-2">
                        <Bookmark className="w-4 h-4 text-blue-600" />
                        <span className="text-gray-700 dark:text-gray-300">{course.title}</span>
                      </div>
                      ) : null;
                      })}
                    </div>
                  </div>
                </div>
                ),
                
                bookmarks: (
                <div className="space-y-6">
                  <h3 className="text-xl font-bold">Your Bookmarked Courses</h3>
                  {bookmarks.length === 0 ? (
                  <p className="text-gray-600 dark:text-gray-300">No bookmarked courses yet.</p>
                  ) : (
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {bookmarks.map(courseId => {
                    const course = courseData.find(c => c.id === courseId);
                    return course ? (
                    <CourseCard key={courseId} course={course} />
                    ) : null;
                    })}
                  </div>
                  )}
                </div>
                ),
                
                notes: (
                <div className="space-y-6">
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
                    <h3 className="text-xl font-bold mb-4">
                      {editingNote ? 'Edit Note' : 'Add New Note'}
                    </h3>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Course</label>
                        <select
                          value={selectedCourse}
                          onChange={(e) => setSelectedCourse(e.target.value)}
                          className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                          >
                          <option value="">Select a course</option>
                          {courseData.map(course => (
                          <option key={course.id} value={course.id}>{course.title}</option>
                          ))}
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-2">Note Content</label>
                        <textarea
                          value={noteContent}
                          onChange={(e) => setNoteContent(e.target.value)}
                          placeholder="Write your notes here..."
                          className="w-full p-3 border rounded-lg h-32 dark:bg-gray-700 dark:border-gray-600"
                          />
                          </div>
                          
                          <div className="flex space-x-2">
                            <button
                              onClick={editingNote ? handleUpdateNote : handleAddNote}
                              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
                            >
                              {editingNote ? 'Update Note' : 'Add Note'}
                            </button>
                            {editingNote && (
                            <button
                              onClick={() => {
                              setEditingNote(null);
                              setNoteContent('');
                              setSelectedCourse('');
                              }}
                              className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg"
                              >
                              Cancel
                            </button>
                            )}
                          </div>
                          </div>
                          </div>
                          
                          <div className="space-y-4">
                            <h4 className="text-lg font-semibold">Your Notes</h4>
                            {notes.length === 0 ? (
                            <p className="text-gray-600 dark:text-gray-300">No notes yet.</p>
                            ) : (
                            notes.map(note => {
                            const course = courseData.find(c => c.id === note.courseId);
                            return (
                            <div key={note.id} className="bg-white dark:bg-gray-800 p-4 rounded-lg">
                              <div className="flex justify-between items-start mb-2">
                                <h5 className="font-medium text-blue-600">
                                  {course ? course.title : 'Unknown Course'}
                                </h5>
                                <div className="flex space-x-2">
                                  <button
                                    onClick={() => handleEditNote(note)}
                                    className="text-gray-600 hover:text-blue-600"
                                    >
                                    <Edit3 className="w-4 h-4" />
                                  </button>
                                  <button
                                    onClick={() => deleteNote(note.id)}
                                    className="text-gray-600 hover:text-red-600"
                                    >
                                    <X className="w-4 h-4" />
                                  </button>
                                </div>
                              </div>
                              <p className="text-gray-700 dark:text-gray-300 text-sm">{note.content}</p>
                              <p className="text-xs text-gray-500 mt-2">
                                {new Date(note.createdAt).toLocaleDateString()}
                              </p>
                            </div>
                            );
                            })
                            )}
                          </div>
                          </div>
                          )
                          };
                          
                          return (
                          <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
                            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                              <div className="mb-8">
                                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                                  Dashboard
                                </h1>
                                <p className="text-xl text-gray-600 dark:text-gray-300">
                                  Welcome back, {user.displayName || user.email}!
                                </p>
                              </div>
                              
                              {/* Tab Navigation */}
                              <div className="flex space-x-1 mb-8 bg-gray-200 dark:bg-gray-700 rounded-lg p-1">
                                {[
                                { id: 'overview', label: 'Overview', icon: BarChart },
                                { id: 'bookmarks', label: 'Bookmarks', icon: Bookmark },
                                { id: 'notes', label: 'Notes', icon: FileText }
                                ].map(tab => {
                                const IconComponent = tab.icon;
                                return (
                                <button
                                  key={tab.id}
                                  onClick={() => setActiveTab(tab.id)}
                                  className={`flex items-center space-x-2 px-4 py-2 rounded-md font-medium transition-colors ${
                                  activeTab === tab.id
                                  ? 'bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 shadow-sm'
                                  : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                                  }`}
                                  >
                                  <IconComponent className="w-4 h-4" />
                                  <span>{tab.label}</span>
                                </button>
                                );
                                })}
                              </div>
                              
                              {/* Tab Content */}
                              {tabContent[activeTab]}
                            </div>
                          </div>
                          );
                          };
                          
                          // Contact Page Component
                          const ContactPage = () => {
                          const [formData, setFormData] = useState({
                          name: '',
                          email: '',
                          subject: '',
                          message: ''
                          });
                          const [isSubmitting, setIsSubmitting] = useState(false);
                          const [submitMessage, setSubmitMessage] = useState('');
                          
                          const handleChange = (e) => {
                          setFormData({
                          ...formData,
                          [e.target.name]: e.target.value
                          });
                          };
                          
                          const handleSubmit = async (e) => {
                          e.preventDefault();
                          setIsSubmitting(true);
                          
                          try {
                          const response = await fetch('https://formspree.io/f/xpwdvgzp', {
                          method: 'POST',
                          headers: {
                          'Content-Type': 'application/json',
                          },
                          body: JSON.stringify(formData),
                          });
                          
                          if (response.ok) {
                          setSubmitMessage('Thank you! Your message has been sent successfully.');
                          setFormData({ name: '', email: '', subject: '', message: '' });
                          } else {
                          setSubmitMessage('There was an error sending your message. Please try again.');
                          }
                          } catch (error) {
                          setSubmitMessage('There was an error sending your message. Please try again.');
                          }
                          
                          setIsSubmitting(false);
                          };
                          
                          return (
                          <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
                            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                              <div className="mb-8 text-center">
                                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                                  Get in Touch
                                </h1>
                                <p className="text-xl text-gray-600 dark:text-gray-300">
                                  Have questions, suggestions, or feedback? We'd love to hear from you.
                                </p>
                              </div>
                              
                              <div className="grid md:grid-cols-2 gap-8">
                                {/* Contact Form */}
                                <div className="bg-white dark:bg-gray-800 rounded-lg p-8">
                                  <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Send us a message</h2>
                                  
                                  <form onSubmit={handleSubmit} className="space-y-6">
                                    <div>
                                      <label htmlFor="name" className="block text-sm font-medium mb-2">Name</label>
                                      <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
                                      />
                                    </div>
                                    
                                    <div>
                                      <label htmlFor="email" className="block text-sm font-medium mb-2">Email</label>
                                      <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
                                      />
                                    </div>
                                    
                                    <div>
                                      <label htmlFor="subject" className="block text-sm font-medium mb-2">Subject</label>
                                      <input
                                        type="text"
                                        id="subject"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        required
                                        className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
                                      />
                                    </div>
                                    
                                    <div>
                                      <label htmlFor="message" className="block text-sm font-medium mb-2">Message</label>
                                      <textarea
                                        id="message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                        rows="6"
                                        className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
                                      ></textarea>
                                    </div>
                                    
                                    <button
                                      type="submit"
                                      disabled={isSubmitting}
                                      className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-medium py-3 px-6 rounded-lg transition-colors flex items-center justify-center space-x-2"
                                    >
                                      {isSubmitting ? (
                                      <>
                                      <Loader2 className="w-4 h-4 animate-spin" />
                                      <span>Sending...</span>
                                      </>
                                      ) : (
                                      <>
                                      <Send className="w-4 h-4" />
                                      <span>Send Message</span>
                                      </>
                                      )}
                                    </button>
                                    
                                    {submitMessage && (
                                    <div className={`p-3 rounded-lg ${
                                      submitMessage.includes('success') 
                                      ? 'bg-green-100 text-green-700' 
                                      : 'bg-red-100 text-red-700'
                                    }`}>
                                      {submitMessage}
                                    </div>
                                    )}
                                  </form>
                                </div>
                                
                                {/* Contact Information */}
                                <div className="space-y-6">
                                  <div className="bg-white dark:bg-gray-800 rounded-lg p-8">
                                    <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Connect with us</h2>
                                    
                                    <div className="space-y-4">
                                      <div className="flex items-center space-x-3">
                                        <Mail className="w-5 h-5 text-blue-600" />
                                        <div>
                                          <div className="font-medium">Email</div>
                                          <div className="text-gray-600 dark:text-gray-300">hello@impactmojo.in</div>
                                        </div>
                                      </div>
                                      
                                      <div className="flex items-center space-x-3">
                                        <Globe className="w-5 h-5 text-blue-600" />
                                        <div>
                                          <div className="font-medium">Website</div>
                                          <div className="text-gray-600 dark:text-gray-300">www.impactmojo.in</div>
                                        </div>
                                      </div>
                                      
                                      <div className="flex items-center space-x-3">
                                        <Github className="w-5 h-5 text-blue-600" />
                                        <div>
                                          <div className="font-medium">GitHub</div>
                                          <div className="text-gray-600 dark:text-gray-300">github.com/Varnasr/ImpactMojo</div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  
                                  <div className="bg-white dark:bg-gray-800 rounded-lg p-8">
                                    <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Open Source</h3>
                                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                                      ImpactMojo is an open-source project. We believe in the power of open collaboration 
                                      to improve education and welcome contributions from the community.
                                    </p>
                                    <a
                                      href="https://github.com/Varnasr/ImpactMojo"
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="inline-flex items-center space-x-2 text-blue-600 dark:text-blue-400 hover:underline mt-4"
                                    >
                                      <Github className="w-5 h-5" />
                                      <span>View Source Code</span>
                                    </a>
                                  </div>
                                  
                                  <div className="bg-white dark:bg-gray-800 rounded-lg p-8">
                                    <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Disclaimer</h3>
                                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                                      ImpactMojo is an educational resource and does not provide official certifications or endorsements. 
                                      The content is designed for learning purposes and should be supplemented with formal education and 
                                      professional development as appropriate for your goals.
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          );
                          };
                          
                          // About Page Component
                          const AboutPage = () => {
                          return (
                          <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
                            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                              <div className="mb-8 text-center">
                                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                                  About ImpactMojo
                                </h1>
                                <p className="text-xl text-gray-600 dark:text-gray-300">
                                  Democratizing development education through open-source learning
                                </p>
                              </div>
                              
                              <div className="space-y-8">
                                <div className="bg-white dark:bg-gray-800 rounded-lg p-8">
                                  <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Our Mission</h2>
                                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                                    ImpactMojo is a 101 Knowledge Series for Social Impact, providing curated educational 
                                    resources on justice, equity, and development with a focus on South Asian contexts. 
                                    We believe that high-quality development education should be accessible to everyone, 
                                    regardless of their economic background or geographical location.
                                  </p>
                                </div>
                                
                                <div className="bg-white dark:bg-gray-800 rounded-lg p-8">
                                  <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">What We Offer</h2>
                                  <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                      <h3 className="text-lg font-semibold mb-2 text-blue-600 dark:text-blue-400">
                                        Comprehensive Courses
                                      </h3>
                                      <p className="text-gray-600 dark:text-gray-300 text-sm">
                                        37 carefully curated courses covering gender studies, data analysis, policy, 
                                        and research methods tailored for development professionals.
                                      </p>
                                    </div>
                                    
                                    <div>
                                      <h3 className="text-lg font-semibold mb-2 text-green-600 dark:text-green-400">
                                        Interactive Labs
                                      </h3>
                                      <p className="text-gray-600 dark:text-gray-300 text-sm">
                                        Hands-on learning experiences and practical tools to apply theoretical 
                                        knowledge in real-world scenarios.
                                      </p>
                                    </div>
                                    
                                    <div>
                                      <h3 className="text-lg font-semibold mb-2 text-purple-600 dark:text-purple-400">
                                        Educational Handouts
                                      </h3>
                                      <p className="text-gray-600 dark:text-gray-300 text-sm">
                                        Printable resources, templates, and reference materials perfect for 
                                        classroom use and workshop facilitation.
                                      </p>
                                    </div>
                                    
                                    <div>
                                      <h3 className="text-lg font-semibold mb-2 text-orange-600 dark:text-orange-400">
                                        AI-Powered Tools
                                      </h3>
                                      <p className="text-gray-600 dark:text-gray-300 text-sm">
                                        Cutting-edge AI tools to support research, writing, analysis, and 
                                        planning for development professionals.
                                      </p>
                                    </div>
                                  </div>
                                </div>
                                
                                <div className="bg-white dark:bg-gray-800 rounded-lg p-8">
                                  <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Open Source Commitment</h2>
                                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                                    ImpactMojo is completely open source under the MIT license. Our code, content, and 
                                    educational materials are freely available for anyone to use, modify, and distribute. 
                                    We believe that transparency and collaboration are essential for creating truly 
                                    impactful educational resources.
                                  </p>
                                  <div className="flex flex-wrap gap-4">
                                    <a
                                      href="https://github.com/Varnasr/ImpactMojo"
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="inline-flex items-center space-x-2 bg-gray-900 hover:bg-gray-800 text-white px-4 py-2 rounded-lg transition-colors"
                                    >
                                      <Github className="w-4 h-4" />
                                      <span>View on GitHub</span>
                                    </a>
                                    <div className="inline-flex items-center space-x-2 bg-green-100 text-green-800 px-4 py-2 rounded-lg">
                                      <Shield className="w-4 h-4" />
                                      <span>MIT Licensed</span>
                                    </div>
                                  </div>
                                </div>
                                
                                <div className="bg-white dark:bg-gray-800 rounded-lg p-8">
                                  <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Support & Acknowledgments</h2>
                                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                                    ImpactMojo is made possible through the generous support of Pinpoint Ventures. 
                                    This support allows us to keep all our educational content completely free and 
                                    accessible to learners worldwide.
                                  </p>
                                  <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                                    <p className="text-blue-800 dark:text-blue-200 text-sm">
                                      <strong>Note:</strong> ImpactMojo does not provide official certifications or endorsements. 
                                      Our content is designed for educational purposes and should complement formal education 
                                      and professional development.
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          );
                          };
                          
                          // Navigation Component
                          const Navigation = ({ darkMode, setDarkMode, currentPage, setCurrentPage }) => {
                          const { user, signIn, signOut } = useAuth();
                          const [isMenuOpen, setIsMenuOpen] = useState(false);
                          
                          const menuItems = [
                          { id: 'home', label: 'Home', icon: Target },
                          { id: 'courses', label: 'Courses', icon: BookOpen },
                          { id: 'labs', label: 'Labs', icon: Gamepad2 },
                          { id: 'handouts', label: 'Handouts', icon: FileText },
                          { id: 'ai-tools', label: 'AI Tools', icon: Bot },
                          { id: 'contact', label: 'Contact', icon: Mail },
                          { id: 'about', label: 'About', icon: Info }
                          ];
                          
                          return (
                          <nav className="bg-white dark:bg-gray-800 shadow-lg sticky top-0 z-50">
                            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                              <div className="flex justify-between items-center py-4">
                                {/* Logo */}
                                <div 
                                  className="flex items-center space-x-2 cursor-pointer"
                                  onClick={() => setCurrentPage('home')}
                                  >
                                  <Target className="w-8 h-8 text-blue-600" />
                                  <span className="text-xl font-bold text-gray-900 dark:text-white">ImpactMojo</span>
                                </div>
                                
                                {/* Desktop Menu */}
                                <div className="hidden md:flex items-center space-x-6">
                                  {menuItems.map(item => {
                                  const IconComponent = item.icon;
                                  return (
                                  <button
                                    key={item.id}
                                    onClick={() => setCurrentPage(item.id)}
                                    className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                                    currentPage === item.id
                                    ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200'
                                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                                    }`}
                                    >
                                    <IconComponent className="w-4 h-4" />
                                    <span>{item.label}</span>
                                  </button>
                                  );
                                  })}
                                </div>
                                
                                {/* User Actions */}
                                <div className="flex items-center space-x-3">
                                  <button
                                    onClick={() => setDarkMode(!darkMode)}
                                    className="p-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                                    >
                                    {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                                  </button>
                                  
                                  {user ? (
                                  <div className="flex items-center space-x-3">
                                    <button
                                      onClick={() => setCurrentPage('dashboard')}
                                      className="flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                                      >
                                      <User className="w-4 h-4" />
                                      <span className="hidden sm:inline">Dashboard</span>
                                    </button>
                                    <button
                                      onClick={signOut}
                                      className="flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                                    >
                                      <LogOut className="w-4 h-4" />
                                      <span className="hidden sm:inline">Sign Out</span>
                                    </button>
                                  </div>
                                  ) : (
                                  <button
                                    onClick={signIn}
                                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                                  >
                                    Sign In
                                  </button>
                                  )}
                                  
                                  {/* Mobile Menu Button */}
                                  <button
                                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                                    className="md:hidden p-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                                    >
                                    {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                                      </button>
                                      </div>
                                      </div>
                                      
                                      {/* Mobile Menu */}
                                      {isMenuOpen && (
                                      <div className="md:hidden pb-4">
                                        <div className="space-y-1">
                                          {menuItems.map(item => {
                                          const IconComponent = item.icon;
                                          return (
                                          <button
                                            key={item.id}
                                            onClick={() => {
                                            setCurrentPage(item.id);
                                            setIsMenuOpen(false);
                                            }}
                                            className={`w-full flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                                            currentPage === item.id
                                            ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200'
                                            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                                            }`}
                                            >
                                            <IconComponent className="w-4 h-4" />
                                            <span>{item.label}</span>
                                          </button>
                                          );
                                          })}
                                        </div>
                                      </div>
                                      )}
                                      </div>
                                      </nav>
                                      );
                                      };
                                      
                                      // Main App Component
                                      function App() {
                                      const [darkMode, setDarkMode] = useState(false);
                                      const [currentPage, setCurrentPage] = useState('home');
                                      const [showCookieConsent, setShowCookieConsent] = useState(true);
                                      
                                      useEffect(() => {
                                      const savedDarkMode = localStorage.getItem('darkMode');
                                      if (savedDarkMode) {
                                      setDarkMode(JSON.parse(savedDarkMode));
                                      }
                                      }, []);
                                      
                                      useEffect(() => {
                                      localStorage.setItem('darkMode', JSON.stringify(darkMode));
                                      if (darkMode) {
                                      document.documentElement.classList.add('dark');
                                      } else {
                                      document.documentElement.classList.remove('dark');
                                      }
                                      }, [darkMode]);
                                      
                                      const handleCookieAccept = () => {
                                      setShowCookieConsent(false);
                                      localStorage.setItem('cookieConsent', 'true');
                                      };
                                      
                                      useEffect(() => {
                                      const cookieConsent = localStorage.getItem('cookieConsent');
                                      if (cookieConsent) {
                                      setShowCookieConsent(false);
                                      }
                                      }, []);
                                      
                                      return (
                                      <AuthProvider>
                                        <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
                                          <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors">
                                            <Navigation 
                                              darkMode={darkMode}
                                              setDarkMode={setDarkMode}
                                              currentPage={currentPage}
                                              setCurrentPage={setCurrentPage}
                                            />
                                            
                                            <main className="pt-0">
                                              {currentPage === 'home' && <HomePage setCurrentPage={setCurrentPage} />}
                                              {currentPage === 'courses' && <CoursesPage />}
                                              {currentPage === 'labs' && <LabsPage />}
                                              {currentPage === 'handouts' && <HandoutsPage />}
                                              {currentPage === 'dashboard' && <DashboardPage />}
                                              {currentPage === 'ai-tools' && <AIToolsPage />}
                                              {currentPage === 'contact' && <ContactPage />}
                                              {currentPage === 'about' && <AboutPage />}
                                            </main>
                                            
                                            {/* Cookie Consent */}
                                            {showCookieConsent && (
                                            <div className="fixed bottom-0 left-0 right-0 bg-gray-800 text-white p-4 z-50">
                                              <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0">
                                                <div className="flex-1">
                                                  <p className="text-sm">
                                                    We use cookies and privacy-friendly analytics to improve your experience. 
                                                    By continuing to use this site, you agree to our use of cookies.
                                                  </p>
                                                </div>
                                                <div className="flex space-x-4">
                                                  <button
                                                    onClick={handleCookieAccept}
                                                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm transition-colors"
                                                  >
                                                    Accept
                                                  </button>
                                                </div>
                                              </div>
                                            </div>
                                            )}
                                            
                                            {/* Footer */}
                                            <footer className="bg-gray-100 dark:bg-gray-800 py-8 mt-16">
                                              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                                                <p className="text-gray-600 dark:text-gray-400 mb-4">
                                                  ImpactMojo is an open-source project. No endorsements or certificates are provided.
                                                </p>
                                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                                  © 2025 ImpactMojo. Released under MIT License.
                                                </p>
                                              </div>
                                            </footer>
                                          </div>
                                        </div>
                                      </AuthProvider>
                                      );
                                      }
                                      
                                      export default App;
