<?php

namespace App\Models;

use App\Traits\Uuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Session extends Model
{
    use HasFactory, Uuids;

    protected $fillable = ['shift_id', 'name', 'start', 'end'];

    protected $dates = [
        'start',
        'end'
    ];
    public function shift(){
        return $this->hasOne(Shift::class);
    }
}
