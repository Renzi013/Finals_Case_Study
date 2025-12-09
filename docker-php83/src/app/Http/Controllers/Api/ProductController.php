<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    // Get all products (supports ?category=Tops query)
    public function index(Request $request)
    {
        $query = Product::query();

        if ($request->has('category') && $request->category != '') {
            $query->where('category', $request->category);
        }
        
        if ($request->has('search')) {
            $search = $request->search;
            $query->where(function($q) use ($search) {
                $q->where('name', 'LIKE', "%{$search}%")
                  ->orWhere('description', 'LIKE', "%{$search}%");
            });
        }

        return response()->json($query->get());
    }

    // Get single product
    public function show($id)
    {
        $product = Product::find($id);
        if (!$product) {
            return response()->json(['message' => 'Product not found'], 404);
        }
        return response()->json($product);
    }

    // Create Product (Admin only)
    public function store(Request $request)
    {
        if (!request()->user()->is_admin) {
            return response()->json(['message' => 'Unauthorized: Admins only.'], 403);
        }

        $validated = $request->validate([
            'name' => 'required|string',
            'price' => 'required|numeric',
            'category' => 'required|string',
            'sizes' => 'required|array',
            'description' => 'required|string',
            'image' => 'nullable|string' 
        ]);

        $product = Product::create($validated);
        return response()->json($product, 201);
    }

    // Update Product (Admin only)
    public function update(Request $request, $id)
    {
        if (!request()->user()->is_admin) {
            return response()->json(['message' => 'Unauthorized: Admins only.'], 403);
        }

        $product = Product::find($id);
        if (!$product) return response()->json(['message' => 'Not found'], 404);

        $product->update($request->all());
        return response()->json($product);
    }

    // Delete Product (Admin only)
    public function destroy(Request $request, $id)
    {
        if (!$request->user()->is_admin) {
            return response()->json(['message' => 'Unauthorized: Admins only.'], 403);
        }
        
        $product = Product::find($id);
        if (!$product) return response()->json(['message' => 'Not found'], 404);
        
        $product->delete();
        return response()->json(['message' => 'Product deleted']);
    }
}