<?php

namespace Database\Factories;

use App\Models\Transaksi;
use Illuminate\Database\Eloquent\Factories\Factory;

class TransaksiFactory extends Factory
{
    protected $model = Transaksi::class;

    public function definition(): array
    {
        return [
            'name' => fake()->sentence(),
            'date' => fake()->date(),
            'type' => fake()->randomElement(Transaksi::$types),
            'price' => fake()->randomNumber(),
            'description' => fake()->paragraph(),
        ];
    }
}
