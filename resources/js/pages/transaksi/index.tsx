import HeadingSmall from '@/components/heading-small';
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
import { Project } from '@/types/project';
import { Transaksi } from '@/types/transaksi';
import { Link, usePage } from '@inertiajs/react';
import dayjs from 'dayjs';
import { Copy, Edit, Folder, Image, Plus, TableIcon, Trash2 } from 'lucide-react';
import { FC, useState } from 'react';
import ProjectFormSheet from '../project/components/project-form-sheet';
import TransaksiBulkDeleteDialog from './components/transaksi-bulk-delete-dialog';
import TransaksiBulkEditSheet from './components/transaksi-bulk-edit-sheet';
import TransaksiDeleteDialog from './components/transaksi-delete-dialog';
import TransaksiFormSheet from './components/transaksi-form-sheet';
import TransaksiItemCard from './components/transaksi-item-card';
import TransaksiStatWidget from './components/transaksi-stat-widget';
import TransaksiUploadMediaSheet from './components/transaksi-upload-sheet';

type Props = {
  transaksis: Transaksi[];
  project: Project;
  query: { [key: string]: string };
};

const TransaksiList: FC<Props> = ({ transaksis, project }) => {
  const { mode, toggle } = useViewMode();
  const [ids, setIds] = useState<number[]>([]);
  const [cari, setCari] = useState('');

  const { permissions } = usePage<SharedData>().props;

  const grouped = groupBy(transaksis, 'date');

  return (
    <AppLayout
      title={`Transaksi ${project ? `- ${project.name}` : ''}`}
      description="Manage your transaksis"
      actions={
        <>
          {permissions?.canUpdateProject && (
            <ProjectFormSheet purpose="edit" project={project}>
              <Button>
                <Edit /> Edit project
              </Button>
            </ProjectFormSheet>
          )}
          <Button onClick={toggle}>
            <TableIcon />
            {capitalizeWords(mode)}
          </Button>
        </>
      }
    >
      <TransaksiStatWidget />
      <div className="flex flex-col gap-2 md:flex-row">
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
        {permissions?.canAdd && (
          <TransaksiFormSheet purpose="create">
            <Button>
              <Plus />
              Transaksi baru
            </Button>
          </TransaksiFormSheet>
        )}
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
              return (() => {
                const filteredItems = items.filter((transaksi) => JSON.stringify(transaksi).toLowerCase().includes(cari.toLowerCase()));
                const totalPerDay = filteredItems.reduce((sum, transaksi) => sum + (transaksi.price ?? 0), 0);
                return (
                  <>
                    <TableRow key={date} className="bg-muted/50">
                      <TableCell colSpan={5} className="text-center opacity-50">
                        {dayjs(date).format('dddd, DD MMMM YYYY')}
                      </TableCell>
                    </TableRow>
                    {filteredItems.map((transaksi) => (
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
                    {filteredItems.length > 0 && (
                      <TableRow className="bg-muted/30">
                        <TableCell colSpan={3} />
                        <TableCell className="font-semibold">{formatRupiah(totalPerDay)}</TableCell>
                        <TableCell className="text-center opacity-70">Total pengeluaran hari ini</TableCell>
                      </TableRow>
                    )}
                  </>
                );
              })();
            })}
          </TableBody>
        </Table>
      ) : (
        <div className="space-y-10">
          {Object.entries(grouped).map(([date, items]) => {
            const filteredItems = items.filter((transaksi) => JSON.stringify(transaksi).toLowerCase().includes(cari.toLowerCase()));
            const totalPerDay = filteredItems.reduce((sum, transaksi) => sum + (transaksi.price ?? 0), 0);
            return (
              <div className="space-y-4">
                <HeadingSmall
                  title={dayjs(date).format('dddd, DD MMMM YYYY')}
                  description={filteredItems.length > 0 ? `Total pengeluaran: ${formatRupiah(totalPerDay)}` : undefined}
                />

                <div className="grid-responsive grid gap-4">
                  {filteredItems.map((transaksi) => (
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
