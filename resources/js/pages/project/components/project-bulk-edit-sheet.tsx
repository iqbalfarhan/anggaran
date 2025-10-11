import SubmitButton from '@/components/submit-button';
import { Button } from '@/components/ui/button';
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { em } from '@/lib/utils';
import { Project } from '@/types/project';
import { useForm } from '@inertiajs/react';
import { Check, X } from 'lucide-react';
import { FC, PropsWithChildren, useEffect } from 'react';
import { toast } from 'sonner';

type Props = PropsWithChildren & {
  projectIds: Project['id'][];
  onSuccess?: () => void;
};

const ProjectBulkEditSheet: FC<Props> = ({ children, projectIds, onSuccess }) => {
  const { data, setData, put, processing } = useForm({
    project_ids: projectIds,
  });

  useEffect(() => {
    setData('project_ids', projectIds);
  }, [projectIds, setData]);

  const handleSubmit = () => {
    put(route('project.bulk.update'), {
      preserveScroll: true,
      onSuccess: () => {
        toast.success('Project updated successfully');
        onSuccess?.();
      },
      onError: (e) => toast.error(em(e)),
    });
  };

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Ubah project</SheetTitle>
          <SheetDescription>Ubah data {data.project_ids.length} project</SheetDescription>
        </SheetHeader>
        <SheetFooter>
          <SubmitButton icon={Check} onClick={handleSubmit} label={`Simpan project`} loading={processing} disabled={processing} />
          <SheetClose asChild>
            <Button variant={'outline'}>
              <X /> Batalin
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default ProjectBulkEditSheet;
