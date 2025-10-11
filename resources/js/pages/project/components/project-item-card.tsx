import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { formatRupiah } from '@/lib/utils';
import { Project } from '@/types/project';
import { router } from '@inertiajs/react';
import { FC } from 'react';

type Props = {
  project: Project;
  className?: string;
};

const ProjectItemCard: FC<Props> = ({ project, className }) => {
  return (
    <Card className={className} onClick={() => router.visit(route('project.show', project.id))} role="button">
      <CardHeader className="flex-1">
        <CardTitle className="leading-normal">{project.name}</CardTitle>
        <CardDescription>{formatRupiah(project.counts.pemasukan ?? 0)}</CardDescription>
      </CardHeader>
      <CardFooter className="flex items-center justify-between">
        <Avatar className="size-6">
          <AvatarFallback className="bg-primary text-primary-foreground">{project.user.name.charAt(0).toUpperCase()}</AvatarFallback>
          <AvatarImage src={project.user.avatar} alt={project.user.name} />
        </Avatar>
        <CardDescription className="text-right font-mono">{formatRupiah(project.counts.sisa ?? 0)}</CardDescription>
      </CardFooter>
    </Card>
  );
};

export default ProjectItemCard;
