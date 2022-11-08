<?php

namespace App\Models;

use App\Traits\Uuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Attendance extends Model
{
    use HasFactory, Uuids;

    protected $fillable = ['user_id', 'session_id', 'start', 'end'];

    protected $dates = [ 'start', 'end' ];
    
    public function user(){
        return $this->hasOne(User::class);
    }
}
