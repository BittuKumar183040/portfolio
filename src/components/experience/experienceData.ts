import type { Experience } from './types';

const experiences: Experience[] = [
  {
    id: 'rexcrux',
    period: 'March 2024 — Present',
    role: 'Full Stack Developer',
    company: 'Rexcrux',
    logo: '/dist/images/rexcrux.png',
    logoAlt: 'Rexcrux logo',
    employmentType: 'Freelance',
    highlights: [
      'Built landing pages and revamped the product experience for QPhase, FoldShield and Omega Signal, along with their respective SaaS platforms.',
      'Worked independently across projects and consistently earned positive feedback from stakeholders on every engagement.',
      'Re-architected a monolithic codebase into a microservice-based platform, improving performance and preparing it for real-world users.',
    ],
    technologies: [
      {
        title: 'Frontend',
        stack:
          'Next.js, TypeScript, Three.js, PDB Rendering, Figma, Prototyping, Visualization, UI/UX',
      },
      {
        title: 'Backend',
        stack:
          'Node.js, Python, FastAPI, Streamlit, Microservices, Architectural Design',
      },
      {
        title: 'DevOps',
        stack: 'Vercel, Git, GitHub, Domain Management',
      },
      {
        title: 'Process',
        stack:
          'Communication, Product Requirements, Information Gathering, Deadline Management, Agile Delivery',
      },
    ],
  },
  {
    id: 'bosonq-psi',
    period: 'January 2023 — Present',
    role: 'Full Stack Developer',
    company: 'BosonQ Psi Pvt. Ltd.',
    logo: '/dist/images/bqp.png',
    logoAlt: 'BosonQ Psi logo',
    summary:
      "With 2 years of experience at this company, I play a key role in the software team, handling both frontend and backend development for Beta 2.0. I work with technologies like React JS, FastAPI, and Spring Boot, and manage deployment to the Dev environment. I've also developed multiple POCs and led development of an in-house 3D model visualization tool to display simulation results and uploaded CAD files.",
    technologies: [
      {
        title: 'Frontend',
        stack:
          'React js, Redux, Three.js, React Three Fiber, CSS, SCSS, Responsive Design, Styled-components, Tailwind, API Handling',
      },
      {
        title: 'Backend',
        stack:
          'Python, Django, FastAPI, JSON, SQLAlchemy, Data Processing, Celery, Socket.IO',
      },
      { title: 'Databases', stack: 'MySQL, Postgres, MongoDB' },
      { title: 'DevOps', stack: 'AWS, S3, ECR, Docker, Lens, Docker Compose' },
      {
        title: 'UI/UX',
        stack: 'Figma, Blender 3D, Fig-jam Board, Photoshop, Miro',
      },
    ],
  },
];

export default experiences;
