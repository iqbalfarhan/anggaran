import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
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
        <CardDescription className="line-clamp-1">{transaksi.description}</CardDescription>
      </CardHeader>
      <CardFooter className="flex items-center justify-between">
        <p className="font-mono font-bold">{formatRupiah(transaksi.price)}</p>
        <div className="flex -space-x-1.5">
          {transaksi.media.map((m) => (
            <Avatar className="size-7" key={m.id}>
              <AvatarImage src={m.preview_url} />
            </Avatar>
          ))}
        </div>
      </CardFooter>
    </Card>
  );
};

export default TransaksiItemCard;
