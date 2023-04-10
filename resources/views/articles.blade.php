<x-layout>
    <x-slot:title>Article Lists</x-slot>

    <form method="GET" action="/article">
        <label for="search">search article name :</label>
        <input type="search" name="search" id="search">
        <input type="submit" value="submit">
    </form>
    <table>
        <tbody>
        <tr>
            <th>images</th>
            <th>name</th>
            <th>price</th>
            <th>description</th>
        </tr>
        @foreach($result as $table)
            <?php
                $dir="./images/articles/$table[id].jpg";
                if(!file_exists($dir)){
                    $dir="./images/articles/$table[id].png";
                }
                ?>
            <tr>
                <td><img alt="{{$table['ab_name']}}" src={{$dir}}></td>
                <td>{{$table['ab_name']}}</td>
                <td>{{$table['ab_price']}}</td>
                <td>{{$table['ab_description']}}</td>
                <td><a href=# class="add-to-cart-button">+</a></td>
            </tr>
        @endforeach
        </tbody>
    </table>
</x-layout>
