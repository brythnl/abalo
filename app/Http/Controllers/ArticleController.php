<?php

namespace App\Http\Controllers;
use App\Models\AbArticle;

class ArticleController extends Controller
{
    public function getProductList(){
        $filter = isset($_GET['search'])?$_GET['search']:'';
        $result = AbArticle::query()->where('ab_name','LIKE','$'.$filter.'$')->get();
        return view('/articles',['result'=>$result]);
    }
}
