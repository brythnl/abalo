<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AbShoppingcart extends Model
{
    use HasFactory;

    protected $table = 'ab_shoppingcarts';

    public $timestamps = false;

    protected $guarded = [];

    public static function createNewCart($creator_id)
    {
        $shoppingCart = new AbShoppingcart();
        $shoppingCart->ab_creator_id = $creator_id;
        $shoppingCart->ab_create_date = date("Y-m-d H:i:s");
        $shoppingCart->save();

        return $shoppingCart;
    }

    public function createNewItem($articleid)
    {
        $item = new AbShoppingcartItem();
        $item->ab_shoppingcart_id = $this->id;
        $item->ab_article_id = $articleid;
        $item->ab_create_date = date("Y-m-d H:i:s");
        $item->save();
        dd($item);
    }
}
