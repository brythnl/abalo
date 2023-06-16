<x-layout>
    <div id="app">
        <nav-bar></nav-bar>
        @if(session('abalo_user') !== null)
            <input type="hidden" id="user-name" name="user-name" value="{{session('abalo_user')}}">
        @else
            <input type="hidden" id="user-name" name="user-name" value="0">
        @endif
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

    <script>
        window.session = {
            userId: @php echo json_encode(session('user_id')); @endphp
        };
    </script>
    @vite('resources/js/app.js')
</x-layout>
