<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Sala extends Model
{
    use HasFactory;

    public function usuarios(){
        return $this->belongsToMany(User::class, "favoritos","sala_id","user_id");

    }

    protected $fillable = [
        'sala',
        'provincia',
        'provincia_code',
        'municipio',
        'municipio_code',
        'direccion',
        'telefono',
        'email',
        'web',
        'genero',
        'aforo'
    ];
}
