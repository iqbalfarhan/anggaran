<?php

namespace App\Console\Commands;

use App\Models\Transaksi;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;

class MaxPengeluaranPerHari extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'transaksi:max-pengeluaran-harian {--limit=1 : Tampilkan N hari teratas}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Menemukan tanggal dengan total pengeluaran terbesar';

    /**
     * Execute the console command.
     */
    public function handle(): int
    {
        $limit = (int) $this->option('limit');
        if ($limit <= 0) {
            $limit = 1;
        }

        // Agregasi menggunakan query builder untuk efisiensi
        $rows = DB::table('transaksis')
            ->selectRaw('date, SUM(price) as total')
            ->where('type', 'pengeluaran')
            ->groupBy('date')
            ->orderByDesc('total')
            ->limit($limit)
            ->get();

        if ($rows->isEmpty()) {
            $this->info('Tidak ada data pengeluaran.');
            return self::SUCCESS;
        }

        $this->table(['Tanggal', 'Hari', 'Total Pengeluaran'], $rows->map(function ($row) {
            $date = \Carbon\Carbon::parse($row->date);
            return [
                $date->format('Y-m-d'),
                $date->translatedFormat('l'),
                number_format((int) $row->total, 0, ',', '.'),
            ];
        })->toArray());

        return self::SUCCESS;
    }
}


