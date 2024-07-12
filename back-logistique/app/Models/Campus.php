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
    public function affectations()
    {
        return $this->morphMany(Affectation::class, 'concerne');
    }
}
