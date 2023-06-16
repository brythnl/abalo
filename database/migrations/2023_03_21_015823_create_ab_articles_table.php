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
        Schema::create('ab_articles', function (Blueprint $table) {
            $table->id()->from(31) // specify starting id (here does not include seed data)
                ->comment('Primärschlüssel');
            $table->string('ab_name')->nullable(false)->unique()
                ->comment('Name');
            $table->integer('ab_price')->nullable(false)
                ->comment('Preis in Cent');
            $table->string('ab_description')->nullable(false)
                ->comment('Beschreibung, die die Güte oder die Beschaffenheit näher darstellt. Wird durch den "Ersteller" (ab_user) gepflegt');
            $table->unsignedTinyInteger('ab_creator_id')->nullable(false)
                ->comment('Referenz auf den/die Nutzer:in, der den Artikel erstellt hat und verkaufen möchte');
            $table->timestamp('ab_create_date')->nullable(false)
                ->comment('Zeitpunkt der Erstellung des Artikels');

            $table->foreign('ab_creator_id')->references('id')->on('ab_users');
            $table->boolean('ab_offer_status')->default(false);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ab_articles');
    }
};
