import { Button } from '@/components/ui/button';
import SubmitButton from '@/components/submit-button';
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { em } from '@/lib/utils';
import { Transaksi } from '@/types/transaksi';
import { useForm } from '@inertiajs/react';
import { Check, X } from 'lucide-react';
import { FC, PropsWithChildren, useEffect } from 'react';
import { toast } from 'sonner';

type Props = PropsWithChildren & {
  transaksiIds: Transaksi['id'][];
  onSuccess?: () => void;
};

const TransaksiBulkEditSheet: FC<Props> = ({ children, transaksiIds, onSuccess }) => {
  const { data, setData, put, processing } = useForm({
    transaksi_ids: transaksiIds,
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
