<x-layout>
    <div id="app">
        <nav-bar></nav-bar>
        <site-header></site-header>
        <site-body :show-impressum="showImpressum"></site-body>
        <site-footer @toggle-impressum="toggleImpressum"></site-footer>
        <vue-scroll-up
          tag="div"
          custom-class="vue-scroll-up"
          :scroll-duration="1000"
          :scroll-y="250"
          :always-show="true">
        ^
        </vue-scroll-up>
    </div>

    @vite('resources/js/app.js')
</x-layout>
