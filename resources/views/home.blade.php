@extends('layouts.app')

@section('content')
    <div class="container-fluid h-100 pt-4">
        <div id="home" class="mt-5">
            <index-home :user="{{ Auth::user() }}"></index-home>
        </div>
    </div>
@endsection
