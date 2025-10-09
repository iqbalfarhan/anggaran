import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
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
          <CardTitle>{ transaksi.name }</CardTitle>
          <CardDescription>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio, quo impedit cupiditate voluptas culpa magnam itaque distinctio at ullam,
            beatae perferendis doloremque facilis mollitia, quod corporis. Autem voluptatum ipsum placeat.
          </CardDescription>
        </CardHeader>
      </Card>
    </AppLayout>
  );
};

export default ShowTransaksi;
