'use client';

import { useState } from 'react';
import { ProjectCard } from '@/components/app/ProjectCard';
import { projects as initialProjects, type Project } from '@/lib/projects';

export default function Home() {
  const [projects, setProjects] = useState<Project[]>(initialProjects);

  const handleDelete = (id: string) => {
    setProjects((prevProjects) => prevProjects.filter((p) => p.id !== id));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center font-headline">
        Projects Dashboard
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
}
