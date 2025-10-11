import DatePicker from '@/components/date-picker';
import FormControl from '@/components/form-control';
import MoneyInput from '@/components/money-input';
import SubmitButton from '@/components/submit-button';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Textarea } from '@/components/ui/textarea';
import { useIsMobile } from '@/hooks/use-mobile';
import { capitalizeWords, em } from '@/lib/utils';
import { FormPurpose } from '@/types';
import { Project } from '@/types/project';
import { Transaksi } from '@/types/transaksi';
import { useForm, usePage } from '@inertiajs/react';
import dayjs from 'dayjs';
import { X } from 'lucide-react';
import { FC, PropsWithChildren, useState } from 'react';
import { toast } from 'sonner';

type Props = PropsWithChildren & {
  transaksi?: Transaksi;
  purpose: FormPurpose;
};

const TransaksiFormSheet: FC<Props> = ({ children, transaksi, purpose }) => {
  const [open, setOpen] = useState(false);

  const { project } = usePage<{ project: Project }>().props;

  const mobile = useIsMobile();

  const { data, setData, put, post, reset, processing } = useForm({
    name: transaksi?.name ?? '',
    date: transaksi?.date ?? dayjs().format('YYYY-MM-DD'),
    type: transaksi?.type ?? 'pengeluaran',
    price: transaksi?.price ?? '',
    project_id: transaksi?.project_id ?? project.id ?? '',
    description: transaksi?.description ?? '',
  });

  const handleSubmit = () => {
    if (purpose === 'create' || purpose === 'duplicate') {
      post(route('transaksi.store'), {
        preserveScroll: true,
        onSuccess: () => {
          toast.success('Transaksi created successfully');
          reset();
          setOpen(false);
        },
        onError: (e) => toast.error(em(e)),
      });
    } else {
      put(route('transaksi.update', transaksi?.id), {
        preserveScroll: true,
        onSuccess: () => {
          toast.success('Transaksi updated successfully');
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
          <SheetTitle>{capitalizeWords(purpose)} data transaksi</SheetTitle>
          <SheetDescription>Form untuk {purpose} data transaksi</SheetDescription>
        </SheetHeader>
        <ScrollArea className="flex-1 overflow-y-auto">
          <div className="space-y-6 px-4">
            <FormControl label="Tanggal transaksi">
              <DatePicker
                value={data.date ? dayjs(data.date).toDate() : new Date()}
                onValueChange={(date) => setData('date', dayjs(date).format('YYYY-MM-DD'))}
              />
            </FormControl>

            <FormControl label="Jenis transaksi">
              <Select value={data.type} onValueChange={(val) => setData('type', val)}>
                <SelectTrigger>
                  <SelectValue placeholder="Pilih jenis transaksi" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pemasukan">Pemasukan</SelectItem>
                  <SelectItem value="pengeluaran">Pengeluaran</SelectItem>
                </SelectContent>
              </Select>
            </FormControl>
            <FormControl label="Nama transaksi">
              <Input type="text" placeholder="Name" value={data.name} onChange={(e) => setData('name', e.target.value)} />
            </FormControl>
            <FormControl label="Nominal transaksi">
              <MoneyInput value={Number(data.price)} onValueChange={(value) => setData('price', value)} />
            </FormControl>
            <FormControl label="Deskripsi transaksi">
              <Textarea placeholder="Deskripsi" value={data.description} onChange={(e) => setData('description', e.target.value)} />
            </FormControl>
          </div>
        </ScrollArea>
        <SheetFooter>
          <SubmitButton onClick={handleSubmit} label={`${capitalizeWords(purpose)} transaksi`} loading={processing} disabled={processing} />
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

export default TransaksiFormSheet;
