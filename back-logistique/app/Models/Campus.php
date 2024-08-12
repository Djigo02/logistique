<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Campus extends Model
{
    protected $table = "campuses";
    protected $guarded = [];
    protected $fillable = ['libelle','telephone','adresse', 'idUser','etat'];
    use HasFactory;
    public function users(): BelongsTo{
        return $this->belongsTo(User::class);
    }
    public function salles()
    {
        return $this->hasMany(Salle::class, 'idCampus'); // Assurez-vous que 'id_candidat' est le nom correct de la clé étrangère
    }
}
