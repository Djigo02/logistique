<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TypeMaterielSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $types = [
            ['libelle' => 'Televiseurs'],
            ['libelle' => 'Ordinateur portable'],
            ['libelle' => 'iMac'],
            ['libelle' => 'Chaise de bureau'],
            ['libelle' => 'Chaise standard'],
            ['libelle' => 'Table de bureau'],
            ['libelle' => 'Table standard'],
        ];

        DB::table('type_materiels')->insert($types);
    }
}
