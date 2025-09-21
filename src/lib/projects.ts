export type Project = {
  id: string;
  title: string;
  description: string;
  price: number;
  demoLink: string;
  features: string;
  imageUrl: string;
};

export const projects: Project[] = [
  {
    id: '1',
    title: 'QuantumLeap CRM',
    description:
      'A revolutionary CRM platform that leverages AI to predict customer behavior and automate sales workflows.',
    price: 49.99,
    demoLink: '#',
    features: `- AI-Powered Predictive Analytics
- Automated Sales Funnel
- Real-time Customer Insights
- Customizable Dashboards`,
    imageUrl: 'https://picsum.photos/seed/1/600/400',
  },
  {
    id: '2',
    title: 'NovaWrite Editor',
    description:
      'A sleek, distraction-free writing application with built-in grammar correction and style suggestions.',
    price: 19.99,
    demoLink: '#',
    features: `- Minimalist User Interface
- Advanced Grammar and Style Checking
- Cloud Synchronization
- Export to Multiple Formats`,
    imageUrl: 'https://picsum.photos/seed/2/600/400',
  },
  {
    id: '3',
    title: 'SynthWave Analytics',
    description:
      'A data visualization tool that transforms complex datasets into beautiful, interactive musical patterns.',
    price: 29.99,
    demoLink: '#',
    features: `- Data-to-Music Sonification
- Interactive Visual Dashboards
- Support for Large Datasets
- Collaborative Project Spaces`,
    imageUrl: 'https://picsum.photos/seed/3/600/400',
  },
];
