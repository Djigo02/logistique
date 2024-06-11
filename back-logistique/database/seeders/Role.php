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
            ['libelle' => 'DSI'],
            ['libelle' => 'Personnel'],
            ['libelle' => 'Controller'],
            ['libelle' => 'Fournisseur']
        ];

        DB::table('roles')->insert($roles);
    }
}
