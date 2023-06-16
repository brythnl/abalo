<x-layout>
    <div id="app">
        <nav-bar></nav-bar>
        <site-header></site-header>
        @if(session('abalo_user') !== null)
            <input type="hidden" id="user-name" name="user-name" value="{{session('abalo_user')}}">
        @else
            <input type="hidden" id="user-name" name="user-name" value="0">
        @endif
        <new-article></new-article>
        <site-footer @toggle-impressum="toggleImpressum"></site-footer>
    </div>

    @vite('resources/js/app.js')
</x-layout>

