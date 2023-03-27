<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\AbUser;

class DevelopmentData extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $userCsv = fopen(base_path("database/data/user.csv"), "r");

        $firstline = true;
        while (($data = fgetcsv($userCsv, 2000, ",")) !== FALSE) {
            if (!$firstline) {
                AbUser::create([
                    'id' => $data[0],
                    'ab_name' => $data[1],
                    // 'ab_password' => $data['2']
                    'ab_mail' => $data[2],
                ]);
            }
            $firstline = false;
        }
        fclose($userCsv);
    }
}
