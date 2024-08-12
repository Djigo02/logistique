<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class Role extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $roles = [
            ['libelle' => 'Responsable campus'],
            ['libelle' => 'Responsable technique'],
            ['libelle' => 'Personnel'],
            ['libelle' => 'Controller'],
        ];

        DB::table('roles')->insert($roles);
    }
}
