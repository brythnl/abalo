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
        Schema::create('ab_shoppingcart_items', function (Blueprint $table) {
            $table->id();
            $table->unsignedTinyInteger('ab_shoppingcart_id')->nullable(false)
                ->comment('Referenz auf den Warenkorb');
            $table->unsignedTinyInteger('ab_article_id')->nullable(false)
                ->comment('Referenz auf den Artikel');
            $table->timestamp('ab_create_date')->nullable(false)
                ->comment('Zeitpunkt der Erstellung');

            $table->foreign('ab_shoppingcart_id')->references('id')->on('ab_shoppingcarts');
            $table->foreign('ab_article_id')->references('id')->on('ab_articles')
                ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ab_shoppingcart_items');
    }
};
