<?php

namespace App\Http\Controllers;

use App\Models\Attendance;
use App\Models\Shift;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;

class AttendanceController extends Controller
{
    public function checkIn($id){

        $ongoingShift = Shift::where('ongoing', true)->first();

        $user = User::find($id);

        if($user->shift_id == $ongoingShift->id){
            $attendance = Attendance::where('user_id', $id)->where('session_id',$ongoingShift->ongoing_session)->first()->update([ 'start' => Carbon::now() ]);
        }else{
            return response('failed')->isNotFound();
        }

    }

    public function checkOut($id){
        $ongoingShift = Shift::where('ongoing', true)->first();

        $user = User::find($id);

        if($user->shift_id == $ongoingShift->id){
            $attendance = Attendance::where('user_id', $id)->where('session_id',$ongoingShift->ongoing_session)->first()->update([ 'end' => Carbon::now() ]);
        }else{
            return response('failed')->isNotFound();
        }
    }
}
