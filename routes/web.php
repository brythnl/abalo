<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ArticleController;
use App\Http\Controllers\NewSiteController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

// homepage
Route::view('/newsite', 'homepage');
Route::view('/nnewarticle','new-article-newsite');
Route::view('/myarticle','myarticle');

// authentication
Route::get('/login', [AuthController::class, 'login'])->name('login');
Route::get('/sellerlogin', [AuthController::class, 'sellerlogin'])->name('login');
Route::get('/logout', [AuthController::class, 'logout'])->name('logout');
Route::get('/isloggedin', [AuthController::class, 'isloggedin'])->name('haslogin');

// show articles
Route::get('/articles', [ArticleController::class, 'getProductList']);

// new article input
Route::view('/newarticle', 'new-article');
// receive new article data
Route::post('/articles', [ArticleController::class, 'storeNewArticle']);
