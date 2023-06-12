<x-layout>
    <div id="app">
        <dock-menu></dock-menu>
        <nav-bar></nav-bar>
        <site-header></site-header>
        <site-body :show-impressum="showImpressum"></site-body>
        <site-footer @toggle-impressum="toggleImpressum"></site-footer>
    </div>

    @vite('resources/js/app.js')
</x-layout>
