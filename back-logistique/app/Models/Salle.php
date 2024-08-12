<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Salle extends Model
{
    use HasFactory;

    protected $fillable = ['nomSalle','capacite','idCampus','etat'];

    public function campuses()
    {
        return $this->belongsTo(Campus::class, 'idCampus'); // Assurez-vous que 'id_candidat' est le nom correct de la clé étrangère
    }

}
