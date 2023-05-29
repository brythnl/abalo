<x-layout>
    <script src="{{ asset('/js/newarticle.js') }}" defer></script>
    <x-slot:title>New Article</x-slot>

    @if (session('successMessage'))
        <p>{{ session('successMessage') }}</p>
    @endif
    <div id="article-form-container">
        <input type="hidden" id="user-name" name="user-name" value="{{session('abalo_user')}}">
    </div>
        <p id="returntext">
        </p>

</x-layout>
