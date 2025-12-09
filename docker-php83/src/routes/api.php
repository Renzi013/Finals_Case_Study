<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\OrderController;

// Authentication (AuthContext.js)
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Products (ProductContext.js)
// GET /api/products (List all, supports ?search= & ?category=)
Route::get('/products', [ProductController::class, 'index']);
// GET /api/products/{id} (Single product details)
Route::get('/products/{id}', [ProductController::class, 'show']);


//PROTECTED ROUTES (Login Required via Sanctum)
Route::middleware('auth:sanctum')->group(function () {

    // User Operations
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::put('/profile', [AuthController::class, 'updateProfile']);

    // Orders (CheckoutPage.js & AccountPage.js)
    Route::post('/orders', [OrderController::class, 'store']);
    Route::get('/orders', [OrderController::class, 'index']); 

    // Product Management (AdminDashboard.js)
    Route::post('/products', [ProductController::class, 'store']);
    Route::put('/products/{id}', [ProductController::class, 'update']);
    Route::delete('/products/{id}', [ProductController::class, 'destroy']);
    Route::get('/admin/stats', [OrderController::class, 'stats']);
    Route::get('/admin/users', [AuthController::class, 'index']);
    Route::get('/admin/orders', [OrderController::class, 'indexAdmin']);
    Route::put('/admin/orders/{id}/status', [OrderController::class, 'updateStatus']);
});