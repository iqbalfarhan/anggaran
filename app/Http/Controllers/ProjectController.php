<?php

namespace App\Http\Controllers;

use App\Http\Requests\BulkDeleteProjectRequest;
use App\Http\Requests\BulkUpdateProjectRequest;
use App\Http\Requests\StoreProjectRequest;
use App\Http\Requests\UpdateProjectRequest;
use App\Models\Project;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProjectController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $this->pass('index project');

        $data = Project::query()
            ->with(['user'])
            ->when($request->name, function ($q, $v) {
                $q->where('name', $v);
            });

        return Inertia::render('project/index', [
            'projects' => $data->get(),
            'query' => $request->input(),
            'permissions' => [
                'canAdd' => $this->user->can('create project'),
                'canShow' => $this->user->can('show project'),
                'canUpdate' => $this->user->can('update project'),
                'canDelete' => $this->user->can('delete project'),
            ],
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProjectRequest $request)
    {
        $this->pass('create project');

        $data = $request->validated();
        Project::create($data);
    }

    /**
     * Display the specified resource.
     */
    public function show(Project $project)
    {
        $this->pass('show project');

        return Inertia::render('project/show', [
            'project' => $project,
            'permissions' => [
                'canUpdate' => $this->user->can('update project'),
                'canDelete' => $this->user->can('delete project'),
            ],
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProjectRequest $request, Project $project)
    {
        $this->pass('update project');

        $data = $request->validated();
        $project->update($data);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Project $project)
    {
        $this->pass('delete project');

        $project->delete();
    }

    /**
     * BulkUpdate the specified resource from storage.
     */
    public function bulkUpdate(BulkUpdateProjectRequest $request)
    {
        $this->pass('update project');

        $data = $request->validated();
        $ids = $data['project_ids'];
        unset($data['project_ids']);

        Project::whereIn('id', $ids)->update($data);
    }

    /**
     * BulkDelete the specified resource from storage.
     */
    public function bulkDelete(BulkDeleteProjectRequest $request)
    {
        $this->pass('delete project');

        $data = $request->validated();
        Project::whereIn('id', $data['project_ids'])->delete();
    }

    /**
     * View archived resource from storage.
     */
    public function archived()
    {
        $this->pass('archived project');

        return Inertia::render('project/archived', [
            'projects' => Project::onlyTrashed()->get(),
        ]);
    }

    /**
     * Restore the specified resource from storage.
     */
    public function restore($id)
    {
        $this->pass('restore project');

        $model = Project::onlyTrashed()->findOrFail($id);
        $model->restore();
    }

    /**
     * Force delete the specified resource from storage.
     */
    public function forceDelete($id)
    {
        $this->pass('force delete project');

        $model = Project::onlyTrashed()->findOrFail($id);
        $model->forceDelete();
    }
}
