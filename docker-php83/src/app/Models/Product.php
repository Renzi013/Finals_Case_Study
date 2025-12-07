<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'price',
        'category',
        'sizes',
        'image'
    ];

    protected $casts = [
        'sizes' => 'array',
        'price' => 'decimal:2',
    ];


    public function orderItems()
    {
        return $this->hasMany(OrderItem::class);
    }
}