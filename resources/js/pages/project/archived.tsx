import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { em } from '@/lib/utils';
import { Project } from '@/types/project';
import { Link, router } from '@inertiajs/react';
import { ArrowLeft, Trash2, Undo2 } from 'lucide-react';
import { FC, useState } from 'react';
import { toast } from 'sonner';

type Props = {
  projects: Project[];
};

const ArchivedProjectList: FC<Props> = ({ projects }) => {
  const [ids, setIds] = useState<number[]>([]);
  const [cari, setCari] = useState('');

  const handleRestore = (id: Project['id']) => {
    router.put(
      route('project.restore', id),
      {},
      {
        preserveScroll: true,
        onSuccess: () => toast.success('Data berhasil di restore!'),
        onError: (e) => toast.error(em(e)),
      },
    );
  };

  const handleForceDelete = (id: Project['id']) => {
    router.delete(route('project.force-delete', id), {
      preserveScroll: true,
      onSuccess: () => toast.success('Data berhasil di hapus permanen!'),
      onError: (e) => toast.error(em(e)),
    });
  };

  return (
    <AppLayout
      title="Projects"
      description="Manage your projects"
      actions={
        <Button variant={'secondary'} asChild>
          <Link href={route('project.index')}>
            <ArrowLeft />
            Kembali ke list
          </Link>
        </Button>
      }
    >
      <div className="flex gap-2">
        <Input placeholder="Search projects..." value={cari} onChange={(e) => setCari(e.target.value)} />
        {ids.length > 0 && (
          <>
            <Button variant={'ghost'} disabled>
              {ids.length} item selected
            </Button>
          </>
        )}
      </div>
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
            <TableHead>Name</TableHead>
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
                <TableCell>{project.name}</TableCell>
                <TableCell>
                  <Button variant={'ghost'} size={'icon'} onClick={() => handleRestore(project.id)}>
                    <Undo2 />
                  </Button>
                  <Button variant={'ghost'} size={'icon'} onClick={() => handleForceDelete(project.id)}>
                    <Trash2 />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </AppLayout>
  );
};

export default ArchivedProjectList;