<x-layout>
    <x-slot:title>Article Lists</x-slot>

        <x-navbar></x-navbar>
        <main>
            <form method="GET" action="/articles">
                <label for="search_text">search article name :</label>
                <input type="search" name="search_text" id="search_text">
                <input type="submit" value="submit" id="submit_search">
            </form
            <x-cart-overview></x-cart-overview>
            <table>
                <tbody id="articletable_body">
                    <tr>
                        <th>images</th>
                        <th>name</th>
                        <th>price</th>
                        <th>description</th>
                    </tr>
                </tbody>
            </table>
            <script src="{{ asset('/js/articles.js') }}"></script>
        </main>
</x-layout>
