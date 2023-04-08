<x-layout>
    <x-slot:title>New Article</x-slot>

    @if (session('successMessage'))
        <p>{{ session('successMessage') }}</p>
    @endif

    <div id="article-form-container">

    </div>

    <script src="{{ asset('/js/newarticle.js') }}"></script>
</x-layout>
