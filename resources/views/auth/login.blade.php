@extends('layouts.app')

@section('content')
<div class="vh-100 d-flex flex-column flex-md-row align-items-center justify-content-around">
    <div id="login">
        <router-view :errors="{{ $errors }}" old="{{ json_encode(old()) }}"></router-view>
    </div>
</div>
@endsection
