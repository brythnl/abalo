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
        Schema::create('ab_shoppingcarts', function (Blueprint $table) {
            $table->id();
            $table->unsignedTinyInteger('ab_creator_id')->nullable(false)
                ->comment('Referenz auf den/die Benutzer:in, dem der Warenkorb gehört');
            $table->timestamp('ab_create_date')->nullable(false)
                ->comment('Zeitpunkt der Erstellung');

            $table->foreign('ab_creator_id')->references('id')->on('ab_users');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ab_shoppingcarts');
    }
};
