import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { SharedData, type BreadcrumbItem } from '@/types';
import { Project } from '@/types/project';
import { usePage } from '@inertiajs/react';
import { Plus } from 'lucide-react';
import { FC } from 'react';
import ProjectFormSheet from '../project/components/project-form-sheet';
import ProjectItemCard from '../project/components/project-item-card';
import DateTimeWidget from './widget/date-time-widget';
import UserInfoWidget from './widget/user-info-widget';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Dashboard',
    href: '/dashboard',
  },
];

type Props = {
  projects?: Project[];
};

const Dashboard: FC<Props> = ({ projects = [] }) => {
  const {
    auth: { roles },
  } = usePage<SharedData>().props;

  return (
    <AppLayout
      title="Dashboard"
      description={`Selamat datang, kamu masuk sebagai ${roles.join(', ')}`}
      breadcrumbs={breadcrumbs}
      actions={
        <ProjectFormSheet purpose="create">
          <Button>
            <Plus />
            Buat Project
          </Button>
        </ProjectFormSheet>
      }
    >
      <div className="grid gap-6 lg:grid-cols-2">
        <UserInfoWidget />
        <DateTimeWidget />
      </div>
      <div className="grid-responsive grid gap-6">
        {projects?.map((project) => (
          <ProjectItemCard key={project.id} project={project} />
        ))}
      </div>
    </AppLayout>
  );
};

export default Dashboard;
