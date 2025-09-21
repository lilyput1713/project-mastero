import Image from 'next/image';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { type Project } from '@/lib/projects';
import { Edit, Trash, ExternalLink } from 'lucide-react';

type ProjectCardProps = {
  project: Project;
  onDelete: (id: string) => void;
};

export function ProjectCard({ project, onDelete }: ProjectCardProps) {
  return (
    <Card className="flex flex-col overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <CardHeader className="p-0">
        <div className="aspect-[3/2] relative">
          <Image
            src={project.imageUrl}
            alt={project.title}
            fill
            className="object-cover"
            data-ai-hint="project image"
          />
        </div>
      </CardHeader>
      <CardContent className="pt-6 flex-1 flex flex-col">
        <CardTitle className="font-headline text-2xl">{project.title}</CardTitle>
        <CardDescription className="mt-2 text-base flex-1">
          {project.description}
        </CardDescription>
        <p className="text-2xl font-bold text-primary mt-4">
          ${project.price.toFixed(2)}
        </p>
      </CardContent>
      <CardFooter className="grid grid-cols-3 gap-2">
        <Button asChild variant="outline">
          <Link href={project.demoLink} target="_blank">
            <ExternalLink />
            Demo
          </Link>
        </Button>
        <Button asChild>
          <Link href={`/edit/${project.id}`}>
            <Edit />
            Edit
          </Link>
        </Button>
        <Button variant="destructive" onClick={() => onDelete(project.id)}>
          <Trash />
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
}
