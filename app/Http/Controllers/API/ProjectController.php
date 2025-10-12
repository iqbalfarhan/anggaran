<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Project;
use Illuminate\Http\Request;

class ProjectController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response(Project::with(['transaksis'])->owned()->get(), 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required',
            'description' => 'nullable|string',
        ]);

        $data['user_id'] = $this->user->id;
        return response(Project::create($data), 200);
    }

    /**
     * Display the specified resource.
     */
    public function show(Project $project)
    {
        return response($project, 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Project $project)
    {
        $data = $request->validate([
            'name' => 'nullable',
            'description' => 'nullable',
        ]);

        $project->update($data);

        return response($project, 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Project $project)
    {
        $project->delete();
        return response(null, 200);
    }
}
