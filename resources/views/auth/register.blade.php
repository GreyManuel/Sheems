@extends('layouts.app')

@section('content')
<div class="h-100 mt-5 d-flex flex-row align-items-center justify-content-center mb-4">
    <div id="register" class="mt-4">
        <router-view :errors="{{ $errors }}" old="{{ json_encode(old()) }}"></router-view>
    </div>
    
    {{-- <div class="p-2 w-50">
        <p class="display-5 text-justify"><i class="fa-duotone fa-quote-left fa-2x"></i>
            We write well-tailored content, with an unrivaled focus on matching your needs
            to a handpicked team of content creators that care.
        </p>
    </div> --}}
    
</div>
@endsection
