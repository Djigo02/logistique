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
            $table->string("libelle");
            $table->string("sku");
            $table->string("codeMateriel");
            $table->string("marque");
            $table->string("description");
            $table->integer("prix");
            $table->integer("quantite");
            $table->integer("seuil");
            $table->date("amortissement");
            $table->integer("etat");
            $table->integer("archive");
            $table->string("image");
            $table->foreignId("idTypeMateriel")->references("id")->on("type_materiels");
            $table->timestamps();
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
