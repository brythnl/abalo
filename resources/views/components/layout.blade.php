<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ $title ?? 'Abalo' }}</title>
</head>
<body>
    {{ $slot }}
</body>
</html>
