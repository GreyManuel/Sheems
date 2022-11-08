<?php

namespace App\Http\Middleware;

use App\Models\User;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class UserisWriter
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next)
    {
        $user_role = User::where('id',Auth::user()->id)->pluck('role')->first();
        if ($user_role == 2){
            return $next($request);

        }else{
            return response([
                'error' => False,
                'message' => 'UnAuthorized User',
            ], Response::HTTP_UNAUTHORIZED);
        }
    }
}
