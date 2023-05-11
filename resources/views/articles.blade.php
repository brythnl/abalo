<x-layout>
    <x-slot:title>Article Lists</x-slot>

        <x-navbar></x-navbar>
        <main>
            <form method="GET" action="">
                <label for="search_text" @if($filter != null) value="{{$filter}}" @else placeholder="Search Text" @endif>search article name :</label>
                <input type="search" name="search" id="search">
                <input type="submit" id="submit_search" value="submit" onclick="sendData()">
            </form>
            <x-cart-overview :shoppingcartid="$shoppingcartid"/>
            <table>
                <tbody id="articletable_body">
                    <tr>
                        <th>images</th>
                        <th>name</th>
                        <th>price</th>
                        <th>description</th>
                    </tr>
                    @foreach ($result as $table)
                        <tr id="{{ $table['id'] }}">
                            <td><img alt="{{ $table['name'] }}" src={{ $table['picture'] }}></td>
                            <td class="article-name">{{ $table['name'] }}</td>
                            <td class="article-price">{{ $table['price'] }}</td>
                            <td class="article-desc">{{ $table['description'] }}</td>
                            <td><a href=# class="add-to-cart-button" style="text-decoration: none; color: black;">+</a>
                            </td>
                            <td><a href=# class="remove-from-cart-button"
                                   style="text-decoration: none; color: black;">-</a>
                            </td>
                        </tr>
                    @endforeach
                </tbody>
            </table>
            <script src="{{ asset('/js/articles.js') }}"></script>
        </main>
</x-layout>
