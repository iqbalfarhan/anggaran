import FormControl from '@/components/form-control';
import SubmitButton from '@/components/submit-button';
import TagsInput from '@/components/tags-input';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Textarea } from '@/components/ui/textarea';
import { useIsMobile } from '@/hooks/use-mobile';
import { capitalizeWords, em } from '@/lib/utils';
import { FormPurpose } from '@/types';
import { Project } from '@/types/project';
import { useForm } from '@inertiajs/react';
import { X } from 'lucide-react';
import { FC, PropsWithChildren, useState } from 'react';
import { toast } from 'sonner';

type Props = PropsWithChildren & {
  project?: Project;
  purpose: FormPurpose;
};

const ProjectFormSheet: FC<Props> = ({ children, project, purpose }) => {
  const [open, setOpen] = useState(false);

  const mobile = useIsMobile();

  const { data, setData, put, post, reset, processing } = useForm({
    name: project?.name ?? '',
    description: project?.description ?? '',
    categories: project?.categories ?? ([] as string[]),
  });

  const handleSubmit = () => {
    if (purpose === 'create' || purpose === 'duplicate') {
      post(route('project.store'), {
        preserveScroll: true,
        onSuccess: () => {
          toast.success('Project created successfully');
          reset();
          setOpen(false);
        },
        onError: (e) => toast.error(em(e)),
      });
    } else {
      put(route('project.update', project?.id), {
        preserveScroll: true,
        onSuccess: () => {
          toast.success('Project updated successfully');
          setOpen(false);
        },
        onError: (e) => toast.error(em(e)),
      });
    }
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent side={mobile ? 'bottom' : 'right'}>
        <SheetHeader>
          <SheetTitle>{capitalizeWords(purpose)} data project</SheetTitle>
          <SheetDescription>Form untuk {purpose} data project</SheetDescription>
        </SheetHeader>
        <ScrollArea className="flex-1 overflow-y-auto">
          <form
            className="space-y-6 px-4"
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            <FormControl label="Nama project">
              <Input type="text" placeholder="Name" value={data.name} onChange={(e) => setData('name', e.target.value)} />
            </FormControl>
            <FormControl label="Deskripsi">
              <Textarea placeholder="Description" value={data.description} onChange={(e) => setData('description', e.target.value)} />
            </FormControl>
            <FormControl label="Deskripsi">
              <TagsInput value={data.categories} onValueChange={(data) => setData('categories', data)} />
            </FormControl>
          </form>
        </ScrollArea>
        <SheetFooter>
          <SubmitButton onClick={handleSubmit} label={`${capitalizeWords(purpose)} project`} loading={processing} disabled={processing} />
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

export default ProjectFormSheet;
