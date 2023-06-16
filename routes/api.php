<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ShoppingcartController;
use App\Http\Controllers\ArticleController;
use App\Http\Controllers\PaginationApi;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
Route::post('/shoppingcart/{shoppingcartid}/{articleid}', [ShoppingcartController::class, 'addToCart_api']);
Route::delete('/shoppingcart/{shoppingcartid}/articles/{articleid}', [ShoppingcartController::class, 'removeFromCart_api']);
Route::get('/shoppingcart/items/{shoppingcartid}', [ShoppingcartController::class, 'getCartItems_api']);

Route::get('/articles',[ArticleController::class,'getProduct_api']);
Route::post('/articles',[ArticleController::class,'newArticle_api']);

Route::get('/page',[PaginationApi::class,'Pagination_Api']);
Route::get('/pageCount',[PaginationApi::class,'getPageCount_api']);

Route::get('/myArticle',[ArticleController::class,'getMyArticle_api']);
route::post('/offerarticle',[ArticleController::class,'offerArticle_api']);

Route::post('/articles/{id}/sold',[ArticleController::class,'soldArticle_api']);
