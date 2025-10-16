<?php

namespace Database\Factories;

use App\Models\Project;
use App\Models\Transaksi;
use Illuminate\Database\Eloquent\Factories\Factory;

class TransaksiFactory extends Factory
{
    protected $model = Transaksi::class;

    public function definition(): array
    {
        $project = Project::inRandomOrder()->first();
        return [
            'name' => fake()->sentence(),
            'date' => fake()->date(),
            'type' => fake()->randomElement(Transaksi::$types),
            'price' => fake()->randomNumber(),
            'project_id' => $project->id,
            'tags' => [fake()->randomElement($project->categories)],
            'description' => fake()->paragraph(),
        ];
    }
}
