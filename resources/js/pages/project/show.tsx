import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { Project } from '@/types/project';
import { FC } from 'react';

type Props = {
  project: Project;
};

const ShowProject: FC<Props> = ({ project }) => {
  return (
    <AppLayout title="Detail Project" description="Detail project">
      <Card>
        <CardHeader>
          <CardTitle>{ project.name }</CardTitle>
          <CardDescription>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio, quo impedit cupiditate voluptas culpa magnam itaque distinctio at ullam,
            beatae perferendis doloremque facilis mollitia, quod corporis. Autem voluptatum ipsum placeat.
          </CardDescription>
        </CardHeader>
      </Card>
    </AppLayout>
  );
};

export default ShowProject;
