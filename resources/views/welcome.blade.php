<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Wordville</title>

        <link rel="stylesheet" href="{{ asset('css/app.css') }}">
        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&display=swap" rel="stylesheet">

        <style>
            * {
                font-family: 'Quicksand', sans-serif;
            }
        </style>
    </head>
    <body class="vh-100" style="background: url({{ asset('assest/watercolor-4116932.png') }})">
        <div class="d-flex flex-row justify-content-end px-3">
            <div class="w-100 d-flex flex-row justify-content-around p-2 border">
                @auth
                    <a href="{{ url('/home') }}" class="btn">
                        <h5 class="m-0">Home</h5>
                    </a>
                @else
                    <a href="{{ route('login') }}" class="ms-sm-2 p-sm-2 border rounded-3 text-decoration-none text-dark"  style="background: #9792E3">
                        <h5 class="m-0 fw-bold">Log in</h5>
                    </a>

                    @if (Route::has('register'))
                        <a href="{{ route('register') }}" class="ms-sm-2 p-sm-2 rounded-3 text-decoration-none text-dark" style="background: #9792E3">
                            <h5 class="m-0 fw-bold">Register</h5>
                        </a>
                    @endif
                @endauth
            </div>
        </div>
        <div class="h-75 d-flex flex-column justify-content-center align-items-center">
            <span class="display-3 fw-bold text-capitalize">wordville</span>
        </div>
            {{-- @if (Route::has('login'))
                <div class="hidden fixed top-0 right-0 px-6 py-4 sm:block">
                    @auth
                        <a href="{{ url('/home') }}" class="text-sm text-gray-700 dark:text-gray-500 underline">Home</a>
                    @else
                        <a href="{{ route('login') }}" class="text-sm text-gray-700 dark:text-gray-500 underline">Log in</a>

                        @if (Route::has('register'))
                            <a href="{{ route('register') }}" class="ml-4 text-sm text-gray-700 dark:text-gray-500 underline">Register</a>
                        @endif
                    @endauth
                </div>
            @endif --}}

            
    </body>
</html>
