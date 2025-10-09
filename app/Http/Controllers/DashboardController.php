<?php

namespace App\Http\Controllers;

use App\Models\Transaksi;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        return Inertia::render('dashboard/index', [
            'counts' => [
                'pemasukan' => Transaksi::pemasukan()->sum('price'),
                'pengeluaran' => Transaksi::pengeluaran()->sum('price'),
                'sisa' => Transaksi::pemasukan()->sum('price') - Transaksi::pengeluaran()->sum('price'),
            ],
        ]);
    }

    public function documentation()
    {
        return Inertia::render('dashboard/documentation', [
            'title' => 'App documentation',
            'content' => file_get_contents(base_path('README.md')),
        ]);
    }
}
