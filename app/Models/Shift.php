<?php

namespace App\Models;

use App\Traits\Uuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Shift extends Model
{
    use HasFactory, Uuids;

    protected $fillable = ['name', 'ongoing', 'ongoing_session'];

    public function session(){
        return $this->hasOne(Session::class,'id', 'ongoing_session');
    }

    public function sessions(){
        return $this->hasMany(Session::class);
    }

    public function users(){
        return $this->hasMany(User::class);
    }
}
