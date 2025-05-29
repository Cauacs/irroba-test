<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Agendamento extends Model
{
    use HasFactory;

    protected $fillable = [
        'medico_id',
        'paciente_id',
        'data_hora',
        'observacoes',
        'status',
    ];

    protected $dates = ['data_hora'];

    public function medico()
    {
        return $this->belongsTo(User::class, 'medico_id');
    }

    public function paciente()
    {
        return $this->belongsTo(Paciente::class, 'paciente_id');
    }
}
