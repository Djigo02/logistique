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
        Schema::create('affectations', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('concerne_id')->nullable();
            $table->string('nomTable')->nullable(); // 'campuses' ou 'salles' ou 'users'
            $table->integer("quantite");
            $table->unsignedBigInteger('idMateriel')->nullable();
            $table->foreign("idMateriel")->references("id")->on("materiels")->onDelete("cascade");
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('affectations');
    }
};
