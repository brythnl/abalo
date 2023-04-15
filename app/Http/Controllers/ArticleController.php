<?php

namespace App\Http\Controllers;
use App\Models\AbArticle;
use App\Models\AbUser;
use Illuminate\Http\Request;

class ArticleController extends Controller
{
    public function getProductList() {
        $filter = isset($_GET['search'])?$_GET['search']:'';
        $dir = array();
        $result = AbArticle::query()->where(('ab_name'),'ILIKE','%'.strtolower($filter).'%')->get()->toArray();
        foreach ($result as $item) {
            if(file_exists("./images/articles/$item[id].jpg")){
                $dir[$item['id']]="./images/articles/$item[id].jpg";
            }else{
                $dir[$item['id']]="./images/articles/$item[id].png";
            }
        }
        return view('articles',['result'=>$result,'dir'=>$dir]);
    }

    public function storeNewArticle(Request $request) {
        $name = trim($request->input("name") ?? NULL);
        $price = trim($request->input("price") ?? NULL);
        $desc = trim($request->input("desc") ?? NULL);

        if (strlen($name) < 3) { $fehler = "Minimal name length is 3 characters"; }
        if ($price <= 0) { $fehler = "Minimum price is 0.01"; }

        if (isset($fehler)) {
            echo $fehler;
        } else {
            $article = new AbArticle;
            $article->ab_name = $name;
            $article->ab_price = $price;
            $article->ab_description = $desc;
            $article->ab_creator_id = AbUser::firstWhere("ab_name", $request->session()->get("abalo_user"))->id;
            $article->ab_create_date = date("Y-m-d H:i:s");
            $article->save();

            return back()->with(['successMessage' => "Article successfully saved."]);
        }
    }
}
