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
        Schema::create('salas', function (Blueprint $table) {
            $table->id();
            $table->string("sala")->nullable();
            $table->string("provincia")->nullable();
            $table->string("municipio")->nullable();
            $table->string("api_code")->nullable();
            $table->string("direccion")->nullable();
            $table->string("telefono")->nullable();
            $table->string("email")->nullable();
            $table->string("web")->nullable();
            $table->string("genero")->nullable();
            $table->string("aforo")->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('salas');
    }
};
