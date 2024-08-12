<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {


        $users = [
            [
                'prenom' => 'Samba',
                'nom' => 'SOUARE',
                'email' => 'ssouare@groupeisi.com',
                'password'=> 'passer123',
                'telephone' => '77889090',
                'adresse'=> 'tabat',
                'idRole' => 2
            ],[
                'prenom' => 'Pape',
                'nom' => 'SAMB',
                'email' => 'psamb@groupeisi.com',
                'password'=> 'passer123',
                'telephone' => '76889099',
                'adresse'=> 'digiri',
                'idRole' => 1
            ],[
                'prenom' => 'Madjiguenne',
                'nom' => 'LEYE',
                'email' => 'mleye@groupeisi.com',
                'password'=> 'passer123',
                'telephone' => '775555532',
                'adresse'=> 'pikine',
                'idRole' => 1
            ],
        ];

        DB::table('users')->insert($users);
    }
}
