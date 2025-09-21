import { projects } from '@/lib/projects';
import EditProjectForm from '@/components/app/EditProjectForm';
import { notFound } from 'next/navigation';

export default function EditProjectPage({ params }: { params: { id: string } }) {
  const project = projects.find((p) => p.id === params.id);

  if (!project) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center font-headline">
        Edit Project
      </h1>
      <EditProjectForm project={project} />
    </div>
  );
}
