<?php

namespace App\Http\Controllers;
use App\Models\AbArticle;
use App\Models\AbUser;
use Illuminate\Http\Request;
use Psy\Util\Json;

class ArticleController extends Controller
{
    public function getProductList(Request $request) {
        /*$filter = $_GET['search']??'';
        //$filter = pg_escape_string($filter);
        $res = AbArticle::query()->where(('ab_name'),'ILIKE','%'.strtolower($filter).'%')->get()->toArray();
        $result = array();
        $i=0;
        foreach ($res as $item) {
            if(file_exists("./images/articles/$item[id].jpg")){
                $dir="./images/articles/$item[id].jpg";
            }else{
                $dir="./images/articles/$item[id].png";
            }
            $result[$i]=array("id"=>$item['id'],"picture"=>$dir,"name"=>$item['ab_name'],
                "price"=>$item['ab_price'],"description"=>$item['ab_description']);
            $i++;
        }*/
        return view('articles',[//"filter"=>$filter,
            //"result"=>$result,
            'shoppingcartid' => $request->session()->get('abalo_shoppingcartid')]);
    }
    public function getProduct_api(Request $request){
        if(isset($_GET['SearchText'])) {
            $filter = $_GET['SearchText'];
        }else{
            $filter = "";
        }
        $res = AbArticle::query()->where(('ab_name'),'ILIKE','%'.strtolower($filter).'%')->get()->toArray();
        $result = array();
        $i=0;
        foreach ($res as $item) {
            if(file_exists("./images/articles/$item[id].jpg")){
                $dir="./images/articles/$item[id].jpg";
            }else{
                $dir="./images/articles/$item[id].png";
            }
            $result[$i]=array("id"=>$item['id'],"picture"=>$dir,"name"=>$item['ab_name'],
                "price"=>$item['ab_price'],"description"=>$item['ab_description']);
            $i++;
        }
        $result = json_encode($result);
        return response($result);
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

    public function newArticle_api(Request $request){
        $name = trim($_POST["name"] ?? NULL);
        $price = trim($_POST["price"] ?? NULL);
        $desc = trim($_POST["desc"] ?? NULL);
        $user = trim($_POST["user"]?? NULL);


        if (strlen($name) < 3) { $fehler = "Minimal name length is 3 characters"; }
        if ($price <= 0) { $fehler = "Minimum price is 0.01"; }
        if(!$user){$fehler = "You have to login before creating a new article";}

        if (isset($fehler)) {
            $fehler = array('response'=>$fehler);
            $fehler = json_encode($fehler);
            return response($fehler);
        } else {
            $article = new AbArticle();
            $article->ab_name = $name;
            $article->ab_price = $price;
            $article->ab_description = $desc;
            $article->ab_creator_id = AbUser::firstWhere("ab_name", $user)->id;
            $article->ab_create_date = date("Y-m-d H:i:s");
            $article->save();
            $id = AbArticle::firstWhere("ab_name",$name)->id;
            $res = array('response'=>"Article successfully saved with id :".$id);
            $res = json_encode($res);
            return response($res);
        }
    }

    public function soldArticle_api($id, $userid)
    {
        $article = AbArticle::find($id);
        if (isset($userid) && $article->ab_creator_id == $userid) {
            $articleName = $article->ab_name;
            \Ratchet\Client\connect("ws://localhost:8085/nachricht")->then(function($conn) use ($articleName){
                $conn->on('message', function($msg) use ($conn) {
                    echo "Received: {$msg}\n";
                    $conn->close();
                });
                $conn->send("Großartig! Ihr Artikel: $articleName wurde erfolgreich verkauft!");
                $conn->close();
            }, function ($e) {
                echo "Could not connect: {$e->getMessage()}\n";
            });
        }
    }
    public function getMyArticle_api(Request $request){
        $user = trim($_SESSION['abalo_user'] ?? NULL);
        if($user){
            $id = AbUser::firstWhere("ab_name", $user)->id;
            $res = AbArticle::query()->where("ab_creator_id","LIKE",$user)->get()->toArray();
        }
        $result = array();
        $i=0;
        foreach ($res as $item) {
            if(file_exists("./images/articles/$item[id].jpg")){
                $dir="./images/articles/$item[id].jpg";
            }else{
                $dir="./images/articles/$item[id].png";
            }
            $result[$i]=array("id"=>$item['id'],"picture"=>$dir,"name"=>$item['ab_name'],
                "price"=>$item['ab_price'],"description"=>$item['ab_description']);
            $i++;
        }
        $result = json_encode($result);
        return response($result);


    }




}
