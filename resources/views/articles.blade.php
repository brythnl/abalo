<x-layout>
    <x-slot:title>Article Lists</x-slot>

        <x-navbar></x-navbar>
        <main>
            <div id="app">
            <label for="search_text" >search article name :</label>
            <input type="text" name="search" id="search" v-model="currentInput">

            <x-cart-overview :shoppingcartid="$shoppingcartid"/>
            <table>
                <tbody id="articletable_body">
                    <tr>
                        <th>images</th>
                        <th>name</th>
                        <th>price</th>
                        <th>description</th>
                    </tr>
                    <tr v-for="article in filteredArticles" v-bind:id="article.id">
                        <td class="article-picture"><img v-bind:src="article.picture" v-bind:alt="article.name"></td>
                        <td class="article-name">@{{ article.name }}</td>
                        <td class="article-price">@{{ article.price }}</td>
                        <td class="article-desc">@{{ article.description }}</td>
                        <td><a href=# class="add-to-cart-button" style="text-decoration: none; color: black;">+</a>
                        </td>
                        <td><a href=# class="remove-from-cart-button"
                               style="text-decoration: none; color: black;">-</a>
                        </td>

                    </tr>
                </tbody>
            </table>-
            </div>
            <script type="module" src="{{ asset('/js/articles.js') }}"></script>
        </main>
</x-layout>
