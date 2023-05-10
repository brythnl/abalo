<?php

namespace App\Http\Controllers;
use App\Models\AbArticle;
use App\Models\AbUser;
use Illuminate\Http\Request;

class ArticleController extends Controller
{
    public function getProductList() {
        /*$filter = isset($_GET['search_text'])?$_GET['search_text']:'';
        $result = AbArticle::query()->where(('ab_name'),'ILIKE','%'.strtolower($filter).'%')->get()->toArray();
        $list = array();
        foreach ($result as $item) {
            if(file_exists("./images/articles/$item[id].jpg")){
                $dir="./images/articles/$item[id].jpg";
            }else{
                $dir="./images/articles/$item[id].png";
            }

        }*/
        return view('articles');
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

    public function getProduct_api(){
        $filter = isset($_GET['search_text'])?$_GET['search_text']:'';
        $result = AbArticle::query()->where(('ab_name'),'ILIKE','%'.strtolower($filter).'%')->get()->toArray();
        $array = array();
        $i=0;
        foreach ($result as $item) {
            if(file_exists("./images/articles/$item[id].jpg")){
                $dir="./images/articles/$item[id].jpg";
            }else{
                $dir="./images/articles/$item[id].png";
            }
            $array[$i]=array("id"=>$item['id'],"picture"=>$dir,"ab_name"=>$item['ab_name'],
                "ab_price"=>$item['ab_price'],"ab_description"=>$item['ab_description']);
            $i++;
        }
        $array=json_encode($array);
        return response($array);
    }

}
