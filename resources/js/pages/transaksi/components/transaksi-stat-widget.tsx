import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import { useIsMobile } from '@/hooks/use-mobile';
import { formatRupiah } from '@/lib/utils';
import { SharedData } from '@/types';
import { router, usePage } from '@inertiajs/react';

const TransaksiStatWidget = () => {
  const mobile = useIsMobile();

  const { counts } = usePage<SharedData>().props;
  const filterType = (type: string) => {
    router.get('', { type });
  };

  if (mobile) {
    return (
      <Carousel>
        <CarouselContent>
          <CarouselItem>
            <Card onClick={() => filterType('pemasukan')} className="cursor-pointer">
              <CardHeader>
                <CardDescription>Anggaran</CardDescription>
                <CardTitle>{formatRupiah(counts?.pemasukan ?? 0)}</CardTitle>
              </CardHeader>
            </Card>
          </CarouselItem>
          <CarouselItem>
            <Card onClick={() => filterType('pengeluaran')} className="cursor-pointer">
              <CardHeader>
                <CardDescription>Pengeluaran</CardDescription>
                <CardTitle>{formatRupiah(counts?.pengeluaran ?? 0)}</CardTitle>
              </CardHeader>
            </Card>
          </CarouselItem>
          <CarouselItem>
            <Card>
              <CardHeader>
                <CardDescription>Sisa</CardDescription>
                <CardTitle>{formatRupiah(counts?.sisa ?? 0)}</CardTitle>
              </CardHeader>
            </Card>
          </CarouselItem>
        </CarouselContent>
      </Carousel>
    );
  }

  return (
    <div className="grid-responsive grid gap-6">
      <Card onClick={() => filterType('pemasukan')} className="cursor-pointer">
        <CardHeader>
          <CardDescription>Anggaran</CardDescription>
          <CardTitle>{formatRupiah(counts?.pemasukan ?? 0)}</CardTitle>
        </CardHeader>
      </Card>
      <Card onClick={() => filterType('pengeluaran')} className="cursor-pointer">
        <CardHeader>
          <CardDescription>Pengeluaran</CardDescription>
          <CardTitle>{formatRupiah(counts?.pengeluaran ?? 0)}</CardTitle>
        </CardHeader>
      </Card>
      <Card>
        <CardHeader>
          <CardDescription>Sisa</CardDescription>
          <CardTitle>{formatRupiah(counts?.sisa ?? 0)}</CardTitle>
        </CardHeader>
      </Card>
    </div>
  );
};

export default TransaksiStatWidget;
