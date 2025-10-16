<?php

namespace App\Http\Controllers;

use App\Http\Requests\BulkDeleteTransaksiRequest;
use App\Http\Requests\BulkUpdateTransaksiRequest;
use App\Http\Requests\StoreTransaksiRequest;
use App\Http\Requests\UpdateTransaksiRequest;
use App\Http\Requests\UploadTransaksiMediaRequest;
use App\Models\Project;
use App\Models\Transaksi;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TransaksiController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request, Project $project)
    {
        $this->pass('index transaksi');

        $data = Transaksi::query()
            ->with(['media', 'project'])
            // ->orderBy('date', 'desc')
            ->where('project_id', $project->id)
            ->latest()
            ->when($request->type, function ($q, $v) {
                return $v == 'pemasukan' ? $q->pemasukan() : $q->pengeluaran();
            }, function ($q) {
                $q->pengeluaran();
            });

        return Inertia::render('transaksi/index', [
            'transaksis' => $data->get(),
            'query' => $request->input(),
            'projects' => Project::get(),
            'project' => $project,
            'counts' => $project->counts,
            'permissions' => [
                'canAdd' => $this->user->can('create transaksi'),
                'canShow' => $this->user->can('show transaksi'),
                'canUpdate' => $this->user->can('update transaksi'),
                'canUpdateProject' => $this->user->can('update project'),
                'canDelete' => $this->user->can('delete transaksi'),
            ],
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTransaksiRequest $request)
    {
        $this->pass('create transaksi');

        $data = $request->validated();
        Transaksi::create($data);
    }

    /**
     * Display the specified resource.
     */
    public function show(Transaksi $transaksi)
    {
        $this->pass('show transaksi');

        return Inertia::render('transaksi/show', [
            'transaksi' => $transaksi->load(['media']),
            'projects' => $transaksi->project,
            'permissions' => [
                'canUpdate' => $this->user->can('update transaksi'),
                'canDelete' => $this->user->can('delete transaksi'),
            ],
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTransaksiRequest $request, Transaksi $transaksi)
    {
        $this->pass('update transaksi');

        $data = $request->validated();
        $transaksi->update($data);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Transaksi $transaksi)
    {
        $this->pass('delete transaksi');

        $transaksi->delete();
    }

    /**
     * BulkUpdate the specified resource from storage.
     */
    public function bulkUpdate(BulkUpdateTransaksiRequest $request)
    {
        $this->pass('update transaksi');

        $data = $request->validated();
        $ids = $data['transaksi_ids'];
        unset($data['transaksi_ids']);

        Transaksi::whereIn('id', $ids)->update($data);
    }

    /**
     * BulkDelete the specified resource from storage.
     */
    public function bulkDelete(BulkDeleteTransaksiRequest $request)
    {
        $this->pass('delete transaksi');

        $data = $request->validated();
        Transaksi::whereIn('id', $data['transaksi_ids'])->delete();
    }

    /**
     * Register media conversions.
     */
    public function uploadMedia(UploadTransaksiMediaRequest $request, Transaksi $transaksi)
    {
        $this->pass('update transaksi');

        $data = $request->validated();
        $transaksi->addMedia($data['file'])->toMediaCollection();
    }

    public function raw(Transaksi $transaksi)
    {
        return $transaksi->load(['media']);
    }
}
