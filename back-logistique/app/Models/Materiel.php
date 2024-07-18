<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Materiel extends Model
{
    use HasFactory;
    protected $fillable=[
        'reference',
        'codeMateriel',
        'description',
        'prix',
        'quantite',
        'seuil',
        'amortissement',
        'dateEnregistrement',
        'etat',
        'image',
        'idTypeMateriel'
    ];
    public function typeMateriel()
    {
        return $this->belongsTo(TypeMateriel::class, 'idTypeMateriel');
    }
}
