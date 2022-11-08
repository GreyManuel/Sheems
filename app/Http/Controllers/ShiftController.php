<?php

namespace App\Http\Controllers;

use App\Models\Attendance;
use App\Models\Session;
use App\Models\Shift;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Str;

class ShiftController extends Controller
{
    /**
     * All shifts
     */
    public function index(){
        $shifts = Shift::with('session')->get();
        return response($shifts, 200);
    }

    /**
     * Store A new shift
     */
    public function store(Request $request){
        return Shift::create([
            'name' => $request->input('name')
        ]);
    }
    /**
     * Return all shift's sessions
     */
    public function show($id){
        $shifts = Shift::with('sessions', 'users.attendances')->find($id);

        return response($shifts, 200);
    }
    /**
     * Start a shift
     */
    public function start($id){

        $shift = Shift::find($id);

        $session = Session::create([
            'shift_id' => $id,
            'name' => $shift->name . ' - ' . Str::random(3),
            'start' => Carbon::now()
        ]);

        $shift->update([
            'ongoing' => true,
            'ongoing_session' => $session->id
        ]);

        //Create Attendances

        $users = User::where('shift_id', $shift->id)->get();

        collect($users)->each(function ($user) use($session){
            $this->createAttendances($user->id, $session->id);
        });

        return response($session, 200);
    }
    public function createAttendances($user_id, $session_id){
        return Attendance::create([
            'user_id' => $user_id,
            'session_id' => $session_id
        ]);
    }

    /**
     * End shift
     */
    public function end($id){
        $shift = Shift::find($id);

        //End session
        $endingSession = Session::find($shift->ongoing_session);

        $endingSession->update([
            'end' => Carbon::now()
        ]);

        $shift->update([
            'ongoing' => false,
            'ongoing_session' => null
        ]);

        return response($shift, 200);
    }
    /**
     * End and Begin next shift
     */
    public function goToNext($id, $next){
        //End shift
        $this->end($id);

        //Start next shift
        return $this->start($next);
    }


}
