<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Paciente extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'email',
        'cpf',
        'telefone'
    ];

    public function agendamentos()
    {
        return $this->hasMany(Agendamento::class);
    }
}
