<x-layout>
    <div id="app">
        <nav-bar></nav-bar>
        @if(isset($_SESSION['abalo_user']))
            <input type="hidden" id="user-name" name="user-name" value="{{session('abalo_user')}}">
        @else
            <input type="hidden" id="user-name" name="user-name" value="0">
        @endif
        <site-header></site-header>
        <site-footer @toggle-impressum="toggleImpressum"></site-footer>
    </div>

    @vite('resources/js/app.js')
</x-layout>
