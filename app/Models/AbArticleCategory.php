<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AbArticleCategory extends Model
{
    use HasFactory;

    protected $table = 'ab_articlecategories';

    public $timestamps = false;

    protected $guarded = [];

    public function abArticle()
    {
        return $this->hasMany(AbArticle::class);
    }
}
