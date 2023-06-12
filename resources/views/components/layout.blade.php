<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
    <script src="{{ asset('/js/cookiecheck.js') }}" defer></script>
    @vite(['resources/css/app.scss'])

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Roboto&display=swap" rel="stylesheet">

    <title>{{ $title ?? 'Abalo' }}</title>
</head>
<body>
    {{ $slot }}

    <div id="cookie-banner">
        <p>This website uses cookies.</p>
        <button id="accept-cookie-button">I accept</button>
        <button id="refuse-cookie-button">I refuse</button>
    </div>
</body>
</html>
