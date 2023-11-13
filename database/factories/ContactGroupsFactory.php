<?php

namespace Database\Factories;

use App\Models\ContactGroups;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class ContactGroupsFactory extends Factory
{
    protected $model = ContactGroups::class;

    public function definition()
    {
        return [
            'name' => $this->faker->unique()->word,
            'description' => $this->faker->sentence,
            'noofcontacts' => $this->faker->numberBetween(5, 20),
        ];
    }
}
