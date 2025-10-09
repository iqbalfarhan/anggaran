import { Card, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { formatRupiah } from '@/lib/utils';
import { Transaksi } from '@/types/transaksi';
import { FC } from 'react';

type Props = {
  transaksi: Transaksi;
  className?: string;
};

const TransaksiItemCard: FC<Props> = ({ transaksi, className }) => {
  return (
    <Card className={className}>
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
