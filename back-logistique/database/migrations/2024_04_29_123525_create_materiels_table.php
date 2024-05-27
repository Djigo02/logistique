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
        Schema::create('materiels', function (Blueprint $table) {
            $table->id();
            $table->string("description",255);
            $table->string("reference",50);
            $table->string("codeMateriel",25);
            $table->integer("prix");
            $table->integer("quantite");
            $table->integer("seuil");
            $table->date("amortissement");
            $table->date("dateEnregistrement");
            $table->string("etat");
            $table->string("image")->nullable();
            $table->foreignId("idTypeMateriel")->references("id")->on("type_materiels");
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('materiels');
    }
};
