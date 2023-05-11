<?php

namespace App\Http\Controllers;

use App\Models\AbArticle;
use App\Models\AbShoppingcart;
use App\Models\AbShoppingcartItem;

class ShoppingcartController extends Controller
{
    public function addToCart_api($shoppingcartid, $articleid)
    {
        $shoppingCart = AbShoppingcart::find($shoppingcartid);

        $article = AbArticle::find($articleid);
        // Check if article exists
        if (!isset($article)) {
            return response('Article not found');
        }

        $item = AbShoppingcartItem::where('ab_shoppingcart_id', $shoppingcartid)
            ->where('ab_article_id', $articleid)
            ->first();
        // Check if article is not yet in cart
        if (!isset($item)) {
            // Create cart item (add article to cart)
            $shoppingCart->createNewItem($articleid);
        } else {
            return response('Article already in cart!');
        }
    }

    public function getCartItems_api($shoppingcartid)
    {
        $cartItems = AbShoppingcartItem::with('AbArticle')
            ->where('ab_shoppingcart_id', $shoppingcartid)
            ->get()
            ->pluck('abArticle');

        return response()->json(
            $cartItems->toArray()
        );
    }

    public function removeFromCart_api($shoppingcartid, $articleid)
    {
        $article = AbArticle::find($articleid);
        // Check if article exists
        if (!isset($article)) {
            return response('Article not found');
        }

        $item = AbShoppingcartItem::where('ab_article_id', $articleid)
            ->where('ab_shoppingcart_id', $shoppingcartid)
            ->first();
        // Check if article is already in cart
        if (isset($item)) {
            // Remove cart item
            $item->delete();
        } else {
            return response('Article not in cart!');
        }
    }
}
