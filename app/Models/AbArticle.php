<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AbArticle extends Model
{
    use HasFactory;

    protected $table = 'ab_articles';

    public $timestamps = false;

    protected $guarded = [];

    public function abArticleCategory()
    {
        return $this->belongsTo(AbArticleCategory::class);
    }
}
