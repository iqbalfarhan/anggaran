import { Badge } from '@/components/ui/badge';
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { formatRupiah } from '@/lib/utils';
import { Transaksi } from '@/types/transaksi';
import { FC } from 'react';

type Props = {
  transaksi: Transaksi;
};

const ShowTransaksi: FC<Props> = ({ transaksi }) => {
  return (
    <AppLayout title="Detail Transaksi" description="Detail transaksi">
      <Card>
        <CardHeader>
          <CardTitle>{transaksi.name}</CardTitle>
          <CardDescription>{transaksi.description}</CardDescription>
        </CardHeader>
        <CardFooter className="flex items-center justify-between">
          <Badge>{transaksi.type}</Badge>
          <span>{formatRupiah(transaksi.price)}</span>
        </CardFooter>
      </Card>

      <div className="masonry">
        {transaksi.media?.map((media) => (
          <img key={media.id} src={media.preview_url} alt={media.name} className="w-full object-cover" />
        ))}
      </div>
    </AppLayout>
  );
};

export default ShowTransaksi;
