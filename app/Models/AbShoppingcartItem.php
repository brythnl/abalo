<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AbShoppingcartItem extends Model
{
    use HasFactory;

    protected $table = 'ab_shoppingcart_items';

    public $timestamps = false;

    protected $guarded = [];

    public function abArticle()
    {
        return $this->belongsTo(AbArticle::class);
    }
}
