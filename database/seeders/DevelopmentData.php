<?php

namespace Database\Seeders;

use App\Models\AbUser;
use App\Models\AbArticle;
use App\Models\AbArticleCategory;
use DateTime;
use Illuminate\Database\Seeder;

class DevelopmentData extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // ab_users table seeder

        $csv = fopen(base_path("database/data/user.csv"), "r");
        $firstline = true;
        while (($data = fgetcsv($csv, 2000, ";")) !== FALSE) {
            if (!$firstline) {
                AbUser::create([
                    'id' => (int) $data[0],
                    'ab_name' => $data[1],
                    'ab_password' => $data[2],
                    'ab_mail' => $data[3],
                ]);
            }
            $firstline = false;
        }
        fclose($csv);

        // ab_articles table seeder

        $csv = fopen(base_path("database/data/articles.csv"), "r");

        $firstline = true;
        while (($data = fgetcsv($csv, 2000, ";")) !== FALSE) {
            if (!$firstline) {
                AbArticle::create([
                    'id' => (int) $data[0],
                    'ab_name' => $data[1],
                    'ab_price' => (int) $data[2],
                    'ab_description' => $data[3],
                    'ab_creator_id' => (int) $data[4],
                    'ab_create_date' => DateTime::createFromFormat('d.m.y H:i', $data[5])
                                            ->format('Y-m-d H:i:s'),
                ]);
            }
            $firstline = false;
        }
        fclose($csv);

        // ab_articlecategories table seeder

        $csv = fopen(base_path("database/data/articlecategory.csv"), "r");

        $firstline = true;
        while (($data = fgetcsv($csv, 2000, ";")) !== FALSE) {
            if (!$firstline) {
                AbArticleCategory::create([
                    'id' => (int) $data[0],
                    'ab_name' => $data[1],
                    'ab_parent' => $data[2] === 'NULL' ? NULL : (int) $data[2],
                ]);
            }
            $firstline = false;
        }
        fclose($csv);
    }
}
