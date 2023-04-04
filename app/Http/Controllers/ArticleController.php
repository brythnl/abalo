<?php

namespace App\Http\Controllers;
use App\Models\AbArticle;

class ArticleController extends Controller
{
    public function getProductList(){
        $filter = isset($_GET['search'])?pg_escape_string($_GET['search']):'';
        $result = AbArticle::query()->where(('ab_name'),'ILIKE','%'.strtolower($filter).'%')->get()->toArray();
        return view('/articles',['result'=>$result]);
    }
}
