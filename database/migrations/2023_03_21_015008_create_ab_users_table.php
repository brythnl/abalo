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
        Schema::create('ab_users', function (Blueprint $table) {
            $table->id()->comment('Primärschlüssel');
            $table->string('ab_user')->nullable(false)->unique()->comment('Name');
            $table->string('ab_password')->nullable(false)->comment('Passwort');
            $table->string('ab_mail')->nullable(false)->unique()->comment('E-Mail-Adresse');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ab_users');
    }
};
