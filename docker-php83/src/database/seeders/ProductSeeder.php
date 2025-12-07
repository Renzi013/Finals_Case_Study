<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Product;

class ProductSeeder extends Seeder
{
   public function run()
    {
        $products = [
            [
                'name' => 'Classic White T-Shirt',
                'price' => 29.99,
                'category' => 'Tops',
                'sizes' => ['XS', 'S', 'M', 'L', 'XL'],
                'image' => 'whiteTshirt.jpg',
                'description' => 'Comfortable and versatile white t-shirt'
            ],
            [
                'name' => 'Denim Blue Jeans',
                'price' => 59.99,
                'category' => 'Bottoms',
                'sizes' => ['28', '30', '32', '34', '36'],
                'image' => 'jeans.jpg',
                'description' => 'Classic fit denim jeans'
            ],
            [
                'name' => 'Black Hoodie',
                'price' => 49.99,
                'category' => 'Tops',
                'sizes' => ['XS', 'S', 'M', 'L', 'XL'],
                'image' => 'hoodie.jpg',
                'description' => 'Cozy and warm black hoodie'
            ],
            [
                'name' => 'Striped Summer Dress',
                'price' => 39.99,
                'category' => 'Dresses',
                'sizes' => ['XS', 'S', 'M', 'L', 'XL'],
                'image' => 'summer.jpg',
                'description' => 'Lightweight and breathable summer dress'
            ],
            [
                'name' => 'Khaki Chinos',
                'price' => 44.99,
                'category' => 'Bottoms',
                'sizes' => ['28', '30', '32', '34', '36'],
                'image' => 'chinos.jpg',
                'description' => 'Versatile khaki chinos for casual wear'
            ],
            [
                'name' => 'Red Polo Shirt',
                'price' => 34.99,
                'category' => 'Tops',
                'sizes' => ['XS', 'S', 'M', 'L', 'XL'],
                'image' => 'red.jpg',
                'description' => 'Classic polo shirt in vibrant red'
            ],
            [
                'name' => 'Floral Maxi Skirt',
                'price' => 54.99,
                'category' => 'Bottoms',
                'sizes' => ['XS', 'S', 'M', 'L', 'XL'],
                'image' => 'floral.jpg',
                'description' => 'Beautiful floral maxi skirt'
            ],
            [
                'name' => 'Blue Denim Jacket',
                'price' => 74.99,
                'category' => 'Outerwear',
                'sizes' => ['XS', 'S', 'M', 'L', 'XL'],
                'image' => 'denimJacket.jpg',
                'description' => 'Casual blue denim jacket for all seasons'
            ],
            [
                'name' => 'Athletic Jogger Pants',
                'price' => 42.99,
                'category' => 'Bottoms',
                'sizes' => ['S', 'M', 'L', 'XL'],
                'image' => 'jogger.jpg',
                'description' => 'Comfortable joggers perfect for exercise or casual wear'
            ],
            [
                'name' => 'Beige Cardigan',
                'price' => 39.99,
                'category' => 'Tops',
                'sizes' => ['XS', 'S', 'M', 'L', 'XL'],
                'image' => 'cardigan.jpg',
                'description' => 'Soft knit cardigan ideal for layering'
            ],
            [
                'name' => 'Plaid Button-Up Shirt',
                'price' => 33.99,
                'category' => 'Tops',
                'sizes' => ['S', 'M', 'L', 'XL'],
                'image' => 'plaid.jpg',
                'description' => 'Classic plaid long-sleeve button-up shirt'
            ],
            [
                'name' => 'Black Skinny Jeans',
                'price' => 49.99,
                'category' => 'Bottoms',
                'sizes' => ['28', '30', '32', '34', '36'],
                'image' => 'skinny.jpg',
                'description' => 'Stretch-fit black skinny jeans'
            ],
            [
                'name' => 'Green V-Neck Sweater',
                'price' => 45.99,
                'category' => 'Tops',
                'sizes' => ['XS', 'S', 'M', 'L', 'XL'],
                'image' => 'vneck.jpg',
                'description' => 'Warm and stylish green v-neck sweater'
            ],
            [
                'name' => 'Casual Sneakers',
                'price' => 69.99,
                'category' => 'Footwear',
                'sizes' => ['6', '7', '8', '9', '10', '11'],
                'image' => 'sneakers.jpg',
                'description' => 'Lightweight and comfortable casual sneakers'
            ],
            [
                'name' => 'Black Mini Skirt',
                'price' => 38.99,
                'category' => 'Bottoms',
                'sizes' => ['XS', 'S', 'M', 'L'],
                'image' => 'skirt.jpg',
                'description' => 'Chic black mini skirt for everyday wear'
            ],
            [
                'name' => 'Winter Puffer Coat',
                'price' => 109.99,
                'category' => 'Outerwear',
                'sizes' => ['S', 'M', 'L', 'XL'],
                'image' => 'puffer.jpg',
                'description' => 'Extra warm puffer coat for cold seasons'
            ],
            [
                'name' => 'Graphic Print Tee',
                'price' => 27.99,
                'category' => 'Tops',
                'sizes' => ['XS', 'S', 'M', 'L', 'XL'],
                'image' => 'graphic.jpeg',
                'description' => 'Trendy graphic tee with a modern design'
            ],
            [
                'name' => 'Striped Sweatshirt',
                'price' => 48.99,
                'category' => 'Tops',
                'sizes' => ['XS', 'S', 'M', 'L', 'XL'],
                'image' => 'Mshirt6.jpeg', 
                'description' => 'Flowy wide-leg trousers for comfort and style'
            ],
            [
                'name' => 'Lightweight Windbreaker',
                'price' => 52.99,
                'category' => 'Outerwear',
                'sizes' => ['S', 'M', 'L', 'XL'],
                'image' => 'windbreaker.jpg',
                'description' => 'Water-resistant windbreaker jacket'
            ],
        ];

        foreach ($products as $product) {
            Product::create($product);
        }
    }
}
