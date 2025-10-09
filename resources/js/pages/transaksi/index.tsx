import MarkdownReader from '@/components/markdown-reader';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useViewMode } from '@/hooks/use-view-mode';
import AppLayout from '@/layouts/app-layout';
import { capitalizeWords, dateDFY, formatRupiah, groupBy, strLimit } from '@/lib/utils';
import { SharedData } from '@/types';
import { Transaksi } from '@/types/transaksi';
import { Link, usePage } from '@inertiajs/react';
import dayjs from 'dayjs';
import { Copy, Edit, Folder, Image, Plus, TableIcon, Trash2 } from 'lucide-react';
import { FC, useState } from 'react';
import TransaksiBulkDeleteDialog from './components/transaksi-bulk-delete-dialog';
import TransaksiBulkEditSheet from './components/transaksi-bulk-edit-sheet';
import TransaksiDeleteDialog from './components/transaksi-delete-dialog';
import TransaksiFormSheet from './components/transaksi-form-sheet';
import TransaksiItemCard from './components/transaksi-item-card';
import TransaksiStatWidget from './components/transaksi-stat-widget';
import TransaksiUploadMediaSheet from './components/transaksi-upload-sheet';

type Props = {
  transaksis: Transaksi[];
  query: { [key: string]: string };
};

const TransaksiList: FC<Props> = ({ transaksis }) => {
  const { mode, toggle } = useViewMode();
  const [ids, setIds] = useState<number[]>([]);
  const [cari, setCari] = useState('');

  const { permissions } = usePage<SharedData>().props;

  const grouped = groupBy(transaksis, 'date');

  return (
    <AppLayout
      title="Transaksis"
      description="Manage your transaksis"
      actions={
        <>
          {permissions?.canAdd && (
            <TransaksiFormSheet purpose="create">
              <Button>
                <Plus />
                Create new transaksi
              </Button>
            </TransaksiFormSheet>
          )}
        </>
      }
    >
      <TransaksiStatWidget />
      <div className="flex gap-2">
        <Input placeholder="Search transaksis..." value={cari} onChange={(e) => setCari(e.target.value)} />
        {/* <TransaksiFilterSheet query={query}>
          <Button>
            <Filter />
            Filter data
            {Object.values(query).filter((val) => val && val !== '').length > 0 && (
              <Badge variant="secondary">{Object.values(query).filter((val) => val && val !== '').length}</Badge>
            )}
          </Button>
        </TransaksiFilterSheet> */}
        {ids.length > 0 && (
          <>
            <Button variant={'ghost'} disabled>
              {ids.length} item selected
            </Button>
            <TransaksiBulkEditSheet transaksiIds={ids} onSuccess={() => setIds([])}>
              <Button>
                <Edit /> Edit selected
              </Button>
            </TransaksiBulkEditSheet>
            <TransaksiBulkDeleteDialog transaksiIds={ids} onSuccess={() => setIds([])}>
              <Button variant={'destructive'}>
                <Trash2 /> Delete selected
              </Button>
            </TransaksiBulkDeleteDialog>
          </>
        )}
        <Button onClick={toggle}>
          <TableIcon />
          {capitalizeWords(mode)}
        </Button>
      </div>
      {mode == 'table' ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                <Button variant={'ghost'} size={'icon'} asChild>
                  <Label>
                    <Checkbox
                      checked={ids.length === transaksis.length}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setIds(transaksis.map((transaksi) => transaksi.id));
                        } else {
                          setIds([]);
                        }
                      }}
                    />
                  </Label>
                </Button>
              </TableHead>
              <TableHead>Tanggal</TableHead>
              <TableHead>Kegiatan</TableHead>
              <TableHead>Nominal</TableHead>
              <TableHead className="text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Object.entries(grouped).map(([date, items]) => {
              return (
                <>
                  <TableRow key={date} className="bg-muted/50">
                    <TableCell colSpan={5} className="text-center opacity-50">
                      {dayjs(date).format('dddd, DD MMMM YYYY')}
                    </TableCell>
                  </TableRow>
                  {items
                    .filter((transaksi) => JSON.stringify(transaksi).toLowerCase().includes(cari.toLowerCase()))
                    .map((transaksi) => (
                      <TableRow key={transaksi.id}>
                        <TableCell>
                          <Button variant={'ghost'} size={'icon'} asChild>
                            <Label>
                              <Checkbox
                                checked={ids.includes(transaksi.id)}
                                onCheckedChange={(checked) => {
                                  if (checked) {
                                    setIds([...ids, transaksi.id]);
                                  } else {
                                    setIds(ids.filter((id) => id !== transaksi.id));
                                  }
                                }}
                              />
                            </Label>
                          </Button>
                        </TableCell>
                        <TableCell>{dateDFY(transaksi.date)}</TableCell>
                        <TableCell>
                          <Popover>
                            <PopoverTrigger>{strLimit(transaksi.name)}</PopoverTrigger>
                            <PopoverContent>
                              <MarkdownReader content={transaksi.description} className="prose-sm" />
                            </PopoverContent>
                          </Popover>
                        </TableCell>
                        <TableCell>{formatRupiah(transaksi.price)}</TableCell>
                        <TableCell className="text-center">
                          {permissions?.canShow && (
                            <Button variant={'ghost'} size={'icon'}>
                              <Link href={route('transaksi.show', transaksi.id)}>
                                <Folder />
                              </Link>
                            </Button>
                          )}
                          {permissions?.canUpdate && (
                            <>
                              <TransaksiUploadMediaSheet transaksi={transaksi}>
                                <Button variant={'ghost'} size={'icon'}>
                                  <Image />
                                </Button>
                              </TransaksiUploadMediaSheet>
                              <TransaksiFormSheet purpose="duplicate" transaksi={transaksi}>
                                <Button variant={'ghost'} size={'icon'}>
                                  <Copy />
                                </Button>
                              </TransaksiFormSheet>
                              <TransaksiFormSheet purpose="edit" transaksi={transaksi}>
                                <Button variant={'ghost'} size={'icon'}>
                                  <Edit />
                                </Button>
                              </TransaksiFormSheet>
                            </>
                          )}
                          {permissions?.canDelete && (
                            <TransaksiDeleteDialog transaksi={transaksi}>
                              <Button variant={'ghost'} size={'icon'}>
                                <Trash2 />
                              </Button>
                            </TransaksiDeleteDialog>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                </>
              );
            })}
          </TableBody>
        </Table>
      ) : (
        <div className="space-y-10">
          {Object.entries(grouped).map(([date, items]) => {
            return (
              <div className="space-y-4">
                <p className="font-bold">{dayjs(date).format('dddd, DD MMMM YYYY')}</p>
                <div className="grid-responsive grid gap-6">
                  {items
                    .filter((transaksi) => JSON.stringify(transaksi).toLowerCase().includes(cari.toLowerCase()))
                    .map((transaksi) => (
                      <TransaksiItemCard key={transaksi.id} transaksi={transaksi} />
                    ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </AppLayout>
  );
};

export default TransaksiList;
