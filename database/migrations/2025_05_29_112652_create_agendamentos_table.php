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
        Schema::create('agendamentos', function (Blueprint $table) {
            $table->id();
            $table->foreignId('medico_id')->constrained('users');
            $table->foreignId('paciente_id')->constrained('pacientes');
            $table->dateTime('data_hora');
            $table->text('observacoes')->nullable();
            $table->string('status')->default('agendado'); // agendado, cancelado, realizado
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('agendamentos');
    }
};
