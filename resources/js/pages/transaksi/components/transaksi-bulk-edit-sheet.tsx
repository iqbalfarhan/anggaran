import FormControl from '@/components/form-control';
import SubmitButton from '@/components/submit-button';
import TagsInput from '@/components/tags-input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { em } from '@/lib/utils';
import { SharedData } from '@/types';
import { Project } from '@/types/project';
import { Transaksi } from '@/types/transaksi';
import { useForm, usePage } from '@inertiajs/react';
import { Check, X } from 'lucide-react';
import { FC, PropsWithChildren, useEffect } from 'react';
import { toast } from 'sonner';

type Props = PropsWithChildren & {
  transaksiIds: Transaksi['id'][];
  onSuccess?: () => void;
};

const TransaksiBulkEditSheet: FC<Props> = ({ children, transaksiIds, onSuccess }) => {
  const { projects = [], project } = usePage<SharedData & { projects: Project[]; project: Project }>().props;

  const { data, setData, put, processing } = useForm({
    transaksi_ids: transaksiIds,
    project_id: project.id as Project['id'] | undefined,
    tags: [] as string[],
  });

  useEffect(() => {
    setData('transaksi_ids', transaksiIds);
  }, [transaksiIds, setData]);

  const handleSubmit = () => {
    put(route('transaksi.bulk.update'), {
      preserveScroll: true,
      onSuccess: () => {
        toast.success('Transaksi updated successfully');
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
          <SheetTitle>Ubah transaksi</SheetTitle>
          <SheetDescription>Ubah data {data.transaksi_ids.length} transaksi</SheetDescription>
        </SheetHeader>
        <div className="space-y-4 px-4">
          <FormControl label="Pindah ke project">
            <Select
              value={data.project_id?.toString() || ''}
              onValueChange={(val) => setData('project_id', val ? parseInt(val) : undefined)}
              disabled={processing}
            >
              <SelectTrigger>
                <SelectValue placeholder={'Pilih project'} />
              </SelectTrigger>
              <SelectContent>
                {projects.map((project) => (
                  <SelectItem key={project.id} value={project.id.toString()} onSelect={() => setData('project_id', project.id)}>
                    {project.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormControl>
          <FormControl label="Tags">
            <TagsInput value={data.tags} onValueChange={(value) => setData('tags', value)} />
          </FormControl>
        </div>
        <SheetFooter>
          <SubmitButton icon={Check} onClick={handleSubmit} label={`Simpan transaksi`} loading={processing} disabled={processing} />
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

export default TransaksiBulkEditSheet;
