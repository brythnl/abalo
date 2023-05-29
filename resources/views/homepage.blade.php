<x-layout>
    <div id="app">
        <site-header></site-header>
        <site-body :show-impressum="showImpressum"></site-body>
        <site-footer @toggle-impressum="toggleImpressum"></site-footer>
    </div>

    <script type="module" src="{{ asset('/js/vue/app.js') }}"></script>
</x-layout>
