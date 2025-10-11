import MarkdownReader from '@/components/markdown-reader';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from '@/components/ui/context-menu';
import AppLayout from '@/layouts/app-layout';
import { dateDFY, em, formatRupiah, handlePasteScreenshot } from '@/lib/utils';
import { Media } from '@/types';
import { Transaksi } from '@/types/transaksi';
import { router } from '@inertiajs/react';
import { FC, useEffect } from 'react';
import { toast } from 'sonner';

type Props = {
  transaksi: Transaksi;
};

const ShowTransaksi: FC<Props> = ({ transaksi }) => {
  useEffect(() => {
    const cleanup = handlePasteScreenshot((file) => {
      router.post(
        route('transaksi.upload-media', transaksi.id),
        {
          file,
        },
        {
          preserveScroll: true,
          onSuccess: () => toast.success('upload completed'),
          onError: (e) => toast.error(em(e)),
        },
      );
    });

    return cleanup;
  }, [transaksi.id]);

  const handleDeleteMedia = (media: Media) => {
    // if (!confirm('Are you sure?')) return;
    router.delete(route('doc.destroy', media.id), {
      preserveScroll: true,
      onSuccess: () => toast.success('media deleted'),
      onError: (e) => toast.error(em(e)),
    });
  };

  return (
    <AppLayout title="Detail Transaksi" description="Detail transaksi">
      <Card>
        <CardHeader>
          <CardTitle>{transaksi.name}</CardTitle>
          <CardDescription>Tanggal : {dateDFY(transaksi.date)}</CardDescription>
        </CardHeader>
        <CardContent>
          <div>
            <MarkdownReader content={transaksi.description || '_Tidak ada deskripsi_'} className="prose-sm" />
          </div>
        </CardContent>
        <CardFooter className="flex items-center justify-between">
          <Badge>{transaksi.type}</Badge>
          <span>{formatRupiah(transaksi.price)}</span>
        </CardFooter>
      </Card>

      <div className="masonry">
        {transaksi.media?.map((media) => (
          <ContextMenu>
            <ContextMenuTrigger asChild>
              <img key={media.id} src={media.original_url} alt={media.name} className="w-full object-cover" />
            </ContextMenuTrigger>
            <ContextMenuContent>
              <ContextMenuItem onClick={() => handleDeleteMedia(media)}>Delete</ContextMenuItem>
            </ContextMenuContent>
          </ContextMenu>
        ))}
      </div>
    </AppLayout>
  );
};

export default ShowTransaksi;
