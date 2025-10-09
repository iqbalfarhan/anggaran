import { Card, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { formatRupiah } from '@/lib/utils';
import { Transaksi } from '@/types/transaksi';
import { router } from '@inertiajs/react';
import { FC } from 'react';

type Props = {
  transaksi: Transaksi;
  className?: string;
};

const TransaksiItemCard: FC<Props> = ({ transaksi, className }) => {
  return (
    <Card className={className} onClick={() => router.visit(route('transaksi.show', transaksi.id))}>
      <CardHeader>
        <CardTitle className="leading-normal">{transaksi.name}</CardTitle>
      </CardHeader>
      <CardFooter>
        <p className="font-mono">{formatRupiah(transaksi.price)}</p>
      </CardFooter>
    </Card>
  );
};

export default TransaksiItemCard;
