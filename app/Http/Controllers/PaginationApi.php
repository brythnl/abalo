<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\AbArticle;

class PaginationApi
{
    public function Pagination_Api(Request $request){
        if(isset($_GET['SearchText'])){
            $res = AbArticle::query()->where(('ab_name'),'ILIKE','%'.strtolower($_GET['SearchText']).'%')->get()->toArray();
        }else {
            $limit = 5;
            $offset = $_GET['page']-1 ?? 0;
            $offset = $offset * $limit;
            $res = AbArticle::query()->offset($offset)->limit($limit)->get()->toArray();
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
    public function getPageCount_api(Request $request){
        $limit = 5;
        $datacount = AbArticle::query()->count();
        $data = array();
        for($i=1;$i<=ceil($datacount/$limit);$i++ ){
            $data[$i-1]=$i;
        }
        $data=json_encode($data);
        return response($data);
    }

}
