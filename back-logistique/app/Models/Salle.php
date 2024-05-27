<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Salle extends Model
{
    use HasFactory;

    protected $fillable = ['nomSalle','capacite','idCampus','etat'];
    public function campus(): BelongsTo{
        return $this->belongsTo(Campus::class);
    }
}
