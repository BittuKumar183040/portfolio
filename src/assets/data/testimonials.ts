export interface Testimonial {
  quote: string;
  name: string;
  designation: string;
  src: string;
}

export const testimonials: Testimonial[] = [
  {
    quote:
      'Bittu was an integral member of the BQP software team, and worked on product development from January 2025 onwards. Here, he developed user interfaces, backend architecture and visualization capabilities for the BQP SaaS platform. In particular, he learnt and developed a space visualization with satellites orbiting the earth, illustrating the coverage of various targets as part of a mission scheduling application. He is very bright and quick to learn new technologies, and has a strong drive to develop his capabilities.',
    name: 'Roopesh Mathur',
    designation:
      'Product Management | Product Development | Technology Leadership | Mentorship and Talent Development | Product Team Leadership | Quantum Computing | Simulation Software',
    src: '',
  },
  {
    quote:
      "I had the opportunity to work closely with Bittu on a quantum-inspired SaaS product at BQP, and I can confidently say he is one of the most versatile engineers I've worked with; equally strong in graphics and full-stack development.\n\nHe owned the product end-to-end, from design through deployment, and continuously improved it through thoughtful iteration. His professionalism in accepting constructive feedback and continuously iterating across multiple versions to significantly enhance the user experience is commendable.\n\nOn the backend, he contributed to Java and Python services, SDK development, and testing with a solid understanding of scalable architecture and clean engineering practices.\n\nWhat truly sets Bittu apart is his graphics expertise. He demonstrated exceptional skill in OpenGL/WebGL by building a high-performance, browser-based CAE model viewer. He also designed and delivered sophisticated 3D visualizations for complex optimization problems like satellite constellation design and supply chain systems, making deeply technical outputs intuitive and interactive.\n\nBittu brings rare depth across the stack, combined with strong execution and ownership. I highly recommend him for roles that demand both advanced visualization and full-stack engineering excellence.",
    name: 'Dr. Ferdin Sagai Don Bosco',
    designation: 'Principal Computational Scientist',
    src: '',
  },
];
