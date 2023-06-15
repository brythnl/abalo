<x-layout>
    <div id="app">
        <nav-bar></nav-bar>
        @if(session('abalo_user') !== null)
            <input type="hidden" id="user-name" name="user-name" value="{{session('abalo_user')}}">
        @else
            <input type="hidden" id="user-name" name="user-name" value="0">
        @endif
        <site-header></site-header>
        <my-article></my-article>
        <site-footer @toggle-impressum="toggleImpressum"></site-footer>
    </div>

    @vite('resources/js/app.js')
</x-layout>
