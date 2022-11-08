<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" class="h-100">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'Laravel') }}</title>

    <!-- Scripts -->
    <script src="{{ asset('js/app.js') }}" defer></script>

    <!-- Fonts -->
    <link rel="dns-prefetch" href="//fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css?family=Nunito" rel="stylesheet">

    <!-- Fonts -->

    <!-- Styles -->
    <link href="{{ asset('css/app.css') }}" rel="stylesheet">
    <link href="https://unpkg.com/primevue/resources/themes/saga-blue/theme.css " rel="stylesheet">
    <link href="https://unpkg.com/primevue/resources/primevue.min.css " rel="stylesheet">
    <link href="https://unpkg.com/primeicons/primeicons.css " rel="stylesheet">

    <!-- Fontawesome -->
    <script src="https://kit.fontawesome.com/12f153c9d9.js" crossorigin="anonymous"></script>

    <style>
        * {
            font-family: 'Nunito', cursive;
        }
    </style>
    @yield('css');
</head>
<body style="position: relative">
<div class="d-flex flex-row justify-content-between position-fixed w-100 bg-white shadow-sm align-items-center"
     style="top:0; z-index: 100;">
    <!-- Start -->
    <div>
        <a href="{{ url('/') }}" class="nav-link text-dark p-0 m-2 d-flex flex-row align-items-center">
            <img src="{{ asset('android-chrome-192x192.png') }}" alt="Sheems logo" class="img-fluid rounded-circle m-1"
                 style="height: 50px; filter: contrast(120%);">
        </a>
    </div>
    <!-- Start -->

    <div id="header">
        <index-header></index-header>
    </div>
</div>
<div id="app" class="h-100">
    <main class="h-100 p-2">
        @yield('content')
    </main>
</div>
<script>
    window.Laravel = {!! json_encode([
            'csrfToken' => csrf_token(),
            'status' => Auth::check() ? 1 : 0
        ]) !!};
</script>
</body>
</html>
