import { Card, CardContent } from '@/components/ui/card';
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
    <AppLayout title="Dashboard" description={`Selamat datang, kamu masuk sebagai ${roles.join(', ')}`} breadcrumbs={breadcrumbs}>
      <div className="grid gap-6 lg:grid-cols-2">
        <UserInfoWidget />
        <DateTimeWidget />
      </div>
      <div className="grid-responsive grid gap-6">
        {projects?.map((project) => (
          <ProjectItemCard key={project.id} project={project} />
        ))}
        <ProjectFormSheet purpose="create">
          <Card className="cursor-pointer border-4 border-dashed opacity-70 hover:opacity-100">
            <CardContent className="flex h-full flex-col items-center justify-center gap-1.5">
              <Plus />
              Buat project baru
            </CardContent>
          </Card>
        </ProjectFormSheet>
      </div>
    </AppLayout>
  );
};

export default Dashboard;
