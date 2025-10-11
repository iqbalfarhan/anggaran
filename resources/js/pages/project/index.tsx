import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useViewMode } from '@/hooks/use-view-mode';
import AppLayout from '@/layouts/app-layout';
import { capitalizeWords } from '@/lib/utils';
import { SharedData } from '@/types';
import { Project } from '@/types/project';
import { Link, usePage } from '@inertiajs/react';
import { Edit, Filter, Folder, FolderArchive, Plus, TableIcon, Trash2 } from 'lucide-react';
import { FC, useState } from 'react';
import ProjectBulkDeleteDialog from './components/project-bulk-delete-dialog';
import ProjectBulkEditSheet from './components/project-bulk-edit-sheet';
import ProjectDeleteDialog from './components/project-delete-dialog';
import ProjectFilterSheet from './components/project-filter-sheet';
import ProjectFormSheet from './components/project-form-sheet';
import ProjectItemCard from './components/project-item-card';

type Props = {
  projects: Project[];
  query: { [key: string]: string };
};

const ProjectList: FC<Props> = ({ projects, query }) => {
  const { mode, toggle } = useViewMode();
  const [ids, setIds] = useState<number[]>([]);
  const [cari, setCari] = useState('');

  const { permissions } = usePage<SharedData>().props;

  return (
    <AppLayout
      title="Projects"
      description="Manage your projects"
      actions={
        <>
          {permissions?.canAdd && (
            <ProjectFormSheet purpose="create">
              <Button>
                <Plus />
                Create new project
              </Button>
            </ProjectFormSheet>
          )}
          <Button variant={'destructive'} asChild>
            <Link href={route('project.archived')}>
              <FolderArchive />
              Archived
            </Link>
          </Button>
        </>
      }
    >
      <div className="flex gap-2">
        <Input placeholder="Search projects..." value={cari} onChange={(e) => setCari(e.target.value)} />
        <ProjectFilterSheet query={query}>
          <Button>
            <Filter />
            Filter data
            {Object.values(query).filter((val) => val && val !== '').length > 0 && (
              <Badge variant="secondary">{Object.values(query).filter((val) => val && val !== '').length}</Badge>
            )}
          </Button>
        </ProjectFilterSheet>
        {ids.length > 0 && (
          <>
            <Button variant={'ghost'} disabled>
              {ids.length} item selected
            </Button>
            <ProjectBulkEditSheet projectIds={ids} onSuccess={() => setIds([])}>
              <Button>
                <Edit /> Edit selected
              </Button>
            </ProjectBulkEditSheet>
            <ProjectBulkDeleteDialog projectIds={ids} onSuccess={() => setIds([])}>
              <Button variant={'destructive'}>
                <Trash2 /> Delete selected
              </Button>
            </ProjectBulkDeleteDialog>
          </>
        )}
        <Button onClick={toggle}>
          <TableIcon />
          {capitalizeWords(mode)}
        </Button>
      </div>
      {mode === 'table' ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                <Button variant={'ghost'} size={'icon'} asChild>
                  <Label>
                    <Checkbox
                      checked={ids.length === projects.length}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setIds(projects.map((project) => project.id));
                        } else {
                          setIds([]);
                        }
                      }}
                    />
                  </Label>
                </Button>
              </TableHead>
              <TableHead>Owner</TableHead>
              <TableHead>Project name</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {projects
              .filter((project) => JSON.stringify(project).toLowerCase().includes(cari.toLowerCase()))
              .map((project) => (
                <TableRow key={project.id}>
                  <TableCell>
                    <Button variant={'ghost'} size={'icon'} asChild>
                      <Label>
                        <Checkbox
                          checked={ids.includes(project.id)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setIds([...ids, project.id]);
                            } else {
                              setIds(ids.filter((id) => id !== project.id));
                            }
                          }}
                        />
                      </Label>
                    </Button>
                  </TableCell>
                  <TableCell>{project.user.name}</TableCell>
                  <TableCell>{project.name}</TableCell>
                  <TableCell>
                    {permissions?.canShow && (
                      <Button variant={'ghost'} size={'icon'}>
                        <Link href={route('project.show', project.id)}>
                          <Folder />
                        </Link>
                      </Button>
                    )}
                    {permissions?.canUpdate && (
                      <>
                        <ProjectFormSheet purpose="edit" project={project}>
                          <Button variant={'ghost'} size={'icon'}>
                            <Edit />
                          </Button>
                        </ProjectFormSheet>
                      </>
                    )}
                    {permissions?.canDelete && (
                      <ProjectDeleteDialog project={project}>
                        <Button variant={'ghost'} size={'icon'}>
                          <Trash2 />
                        </Button>
                      </ProjectDeleteDialog>
                    )}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      ) : (
        <div className="grid-responsive grid gap-4">
          {projects
            .filter((project) => JSON.stringify(project).toLowerCase().includes(cari.toLowerCase()))
            .map((project) => (
              <ProjectItemCard key={project.id} project={project} />
            ))}
        </div>
      )}
    </AppLayout>
  );
};

export default ProjectList;
