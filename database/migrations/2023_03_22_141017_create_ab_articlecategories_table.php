<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('ab_articlecategories', function (Blueprint $table) {
            $table->id()
                ->comment('Primärschlüssel');
            $table->string('ab_name')->nullable(false)->unique()
                ->comment('Name');
            $table->string('ab_description')->nullable()
                ->comment('Beschreibung');
            $table->unsignedTinyInteger('ab_parent')->nullable()
                ->comment('Referenz auf die mögliche Elternkategorie. Artikelkategorien sind hierarchisch organisiert.
                    Eine Kategorie kann beliebig viele Kind Kategorien haben. Eine Kategorie kann nur eine Elternkategorie besitzen.
                    NULL, falls es keine Elternkategorie gibt und es sich um eine Wurzelkategorie handelt.');

            // add reference for ab_parent here
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ab_articlecategories');
    }
};
