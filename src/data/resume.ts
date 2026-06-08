// ============================================================
// resume.ts — single source of truth for all CV content
// Nguyen Thanh Trung (ttrungn)
// ============================================================

export interface ContactInfo {
  email: string
  phone: string
  github: string
  githubUrl: string
  linkedin: string
  linkedinUrl: string
  location: string
}

export interface ExperienceItem {
  role: string
  company: string
  location: string
  period: string
  highlights: string[]
  tech: string[]
}

export interface ProjectItem {
  id: string
  name: string
  tagline: string
  url?: string
  role: string
  period: string
  description: string[]
  tech: string[]
}

export interface EducationItem {
  degree: string
  school: string
  location: string
  period: string
  details: string[]
}

export interface SkillGroup {
  label: string
  items: string[]
}

export interface SkillBar {
  label: string
  level: number // 0-100
}

export const profile = {
  name: 'Nguyen Thanh Trung',
  handle: 'ttrungn',
  title: 'Software Engineer // .NET ecosystem',
  summary:
    'Software Engineer specializing in the .NET ecosystem, with experience building production microservices for large-scale enterprise platforms. Strong background in RESTful API design, Clean Architecture, DDD, and CI/CD with Azure DevOps. Comfortable across the stack with React and TypeScript. Focused on writing maintainable, testable code and continuously improving engineering practices.',
}

export const contact: ContactInfo = {
  email: 'trungnguyen0803forwork@gmail.com',
  phone: '(+84) 909470316',
  github: 'ttrungn',
  githubUrl: 'https://github.com/ttrungn',
  linkedin: 'trungn83',
  linkedinUrl: 'https://www.linkedin.com/in/trungn83',
  location: 'Vietnam',
}

export const experience: ExperienceItem[] = [
  {
    role: 'Software Engineer',
    company: 'iTechwx Company Limited',
    location: 'Vietnam',
    period: 'Sep 2025 — Present',
    highlights: [
      'Develop and maintain a large enterprise knowledge-management and content-authoring platform built on .NET microservices and a React-based SPA portal that publishes content to multiple downstream CMS targets.',
      'Migrate legacy CMS features and authoring workflows into the new platform, redesigning data models, APIs, and publishing flows while preserving content continuity.',
      'Design and implement an asynchronous, queue-backed sequential publishing pipeline on Azure Service Bus — idempotent handlers, retries with back-off, dead-letter-queue replay, and large-payload handling.',
      'Build an event-driven automation flow modeled as a state machine across publishing stages with metadata enrichment and recovery from partial failures.',
      'Build authoring views, document management, and rich-text editing; integrate backend APIs; handle file uploads, large payloads, and optimistic concurrency.',
      'Set up CI/CD with Azure DevOps YAML pipelines: builds, unit and integration tests, security scans, and multi-environment deployments.',
      'Apply an LLM-wiki pattern to build a structured project knowledge base and contribute to internal AI agent frameworks (custom agents, skills, prompts, instructions).',
    ],
    tech: [
      'C#', '.NET 8', 'ASP.NET Core', 'EF Core', 'Azure Service Bus', 'Azure Functions',
      'Azure Blob Storage', 'Entra ID / MSAL', 'React 18', 'TypeScript', 'Fluent UI',
      'Azure DevOps', '1ES Pipelines', 'Microservices', 'DDD', 'Clean Architecture', 'CQRS',
    ],
  },
  {
    role: 'Remote Software Engineer (Part-time / Contract)',
    company: 'Omnitech Inc',
    location: 'Canada',
    period: 'Jan 2025 — Apr 2026',
    highlights: [
      'Built admin and customer-facing applications and FastAPI endpoints with Keycloak-based authentication and role-based access control across multiple user roles.',
      'Automated container builds and deployments to AWS via GitHub Actions, cutting release time from hours to minutes.',
    ],
    tech: ['React.js', 'Python', 'FastAPI', 'PostgreSQL', 'Docker', 'AWS (EC2, S3, ECS)', 'Keycloak', 'GitHub Actions'],
  },
  {
    role: 'Software Engineer Intern',
    company: 'FPT Software',
    location: 'Vietnam',
    period: 'Oct 2024 — Mar 2025',
    highlights: [
      'Triaged and fixed backend bugs across multiple services; supported root-cause investigation and improved production stability.',
      'Monitored AWS workloads and integrated backend with MySQL and Elasticsearch; set up alerts to catch incidents before user impact.',
    ],
    tech: ['FastAPI', 'React.js', 'AWS (EC2, S3, ECS)', 'MySQL', 'Elasticsearch'],
  },
]

export const projects: ProjectItem[] = [
  {
    id: 'proj_001',
    name: 'Duora',
    tagline: 'Online Escrow Platform',
    url: 'https://duora.vn',
    role: 'Founder · Full Stack Developer · DevOps (team size: 1)',
    period: 'Jan 2026 — Present',
    description: [
      'Escrow platform that protects buyers and sellers by holding payments until both sides complete the transaction — covering marketplace, freelance, digital-product, and peer-to-peer use cases.',
      'Implemented transaction, dispute, evidence-submission, and reviewer-decision workflows. Designed the data model on PostgreSQL with Marten event sourcing.',
    ],
    tech: ['.NET 8', 'ASP.NET Core', 'PostgreSQL', 'Marten', 'Supabase Auth', 'React', 'TypeScript', 'Vite', 'React Query', 'Zustand', 'Tailwind CSS', 'Clean Architecture', 'DDD', 'Event-Driven'],
  },
  {
    id: 'proj_002',
    name: 'HyperDataLab SRPM',
    tagline: 'Scientific Research Project Management System',
    url: 'https://hyperdatalab.site',
    role: 'Team Lead · Full Stack Developer · DevOps (team size: 4)',
    period: 'Jan 2026 — May 2026',
    description: [
      'Web platform for managing research projects, papers, datasets, references, and team collaboration for a research lab.',
      'Implemented AI and RAG workflows for paper summaries, question answering, key-information extraction, study comparison, and citation suggestions.',
    ],
    tech: ['.NET 8', 'ASP.NET Core', 'PostgreSQL', 'Marten', 'Keycloak', 'React', 'TypeScript', 'Vite', 'React Query', 'Zustand', 'Tailwind CSS', 'Microservices', 'Clean Architecture', 'DDD'],
  },
]

export const education: EducationItem[] = [
  {
    degree: 'Bachelor of Software Engineering',
    school: 'FPT University',
    location: 'Vietnam',
    period: 'Sep 2022 — May 2026',
    details: [
      'GPA: 3.4 / 4.00',
      '50% University Scholarship',
      'Top 100 Software Engineering Students of the Semester, 2024',
    ],
  },
]

export const skillGroups: SkillGroup[] = [
  {
    label: 'Primary',
    items: ['C#', 'ASP.NET Core', 'EF Core', 'React', 'TypeScript', 'SQL Server', 'Azure Services', 'Azure DevOps'],
  },
  {
    label: 'Secondary',
    items: ['Python', 'FastAPI', 'PostgreSQL', 'MongoDB', 'Redis', 'AWS', 'Docker', 'GitHub Actions'],
  },
  {
    label: 'Practices',
    items: ['MVC', 'Microservices', 'DDD', 'Clean Architecture', 'CQRS', 'Event-Driven', 'System Design', 'RESTful APIs', 'OOP', 'SOLID', 'Unit & Integration Testing', 'CI/CD', 'Agile/Scrum'],
  },
  {
    label: 'AI & Agentic Workflows',
    items: ['GitHub Copilot', 'Claude', 'Prompt Design', 'Custom Agents', 'Skills & Instructions', 'LLM-wiki', '.github multi-agent system'],
  },
]

export const skillBars: SkillBar[] = [
  { label: 'C# / .NET / ASP.NET Core', level: 95 },
  { label: 'React / TypeScript', level: 90 },
  { label: 'Azure Services / DevOps', level: 85 },
  { label: 'SQL / EF Core / PostgreSQL', level: 85 },
  { label: 'Python / FastAPI', level: 75 },
  { label: 'AI & Agentic Workflows', level: 80 },
]

export const languages = ['English — B2']
