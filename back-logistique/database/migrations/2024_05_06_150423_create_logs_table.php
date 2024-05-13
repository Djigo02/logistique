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
        Schema::create('logs', function (Blueprint $table) {
            $table->id();
            $table->string('class',50);
            $table->string('controller',100);
            $table->string('methode',50);
<<<<<<< HEAD
            $table->string('message',250);
=======
            $table->string('message',50);
>>>>>>> fb82c66763f79e6510ab9e83048d90ef1bfc4120
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('logs');
    }
};
