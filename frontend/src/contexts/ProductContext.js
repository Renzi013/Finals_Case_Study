import React, { createContext, useState, useCallback } from 'react';
import white from '../assets/images/whiteTshirt.jpg';
import jeans from '../assets/images/jeans.jpg';
import summer from '../assets/images/summer.jpg';
import vneck from '../assets/images/vneck.jpg';
import chinos from '../assets/images/chinos.jpg';
import red from '../assets/images/red.jpg';
import floral from '../assets/images/floral.jpg';
import denimJacket from '../assets/images/denimJacket.jpg';
import jogger from '../assets/images/jogger.jpg';
import cardigan from '../assets/images/cardigan.jpg';
import plaid from '../assets/images/plaid.jpg';
import skinny from '../assets/images/skinny.jpg';
import sneakers from '../assets/images/sneakers.jpg';
import skirt from '../assets/images/skirt.jpg';
import puffer from '../assets/images/puffer.jpg';
import graphic from '../assets/images/graphic.jpeg';
import windbreaker from '../assets/images/windbreaker.jpg';
import hoodie from '../assets/images/hoodie.jpg';
import Mshirt6 from '../assets/images/Mshirt6.jpeg';


export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([
    // Sample products
    { id: 1, name: 'Classic White T-Shirt', price: 29.99, category: 'Tops', size: ['XS', 'S', 'M', 'L', 'XL'], image: white, description: 'Comfortable and versatile white t-shirt' },
    { id: 2, name: 'Denim Blue Jeans', price: 59.99, category: 'Bottoms', size: ['28', '30', '32', '34', '36'], image: jeans, description: 'Classic fit denim jeans' },
    { id: 3, name: 'Black Hoodie', price: 49.99, category: 'Tops', size: ['XS', 'S', 'M', 'L', 'XL'], image: hoodie, description: 'Cozy and warm black hoodie' },
    { id: 4, name: 'Striped Summer Dress', price: 39.99, category: 'Dresses', size: ['XS', 'S', 'M', 'L', 'XL'], image: summer, description: 'Lightweight and breathable summer dress' },
    { id: 5, name: 'Khaki Chinos', price: 44.99, category: 'Bottoms', size: ['28', '30', '32', '34', '36'], image: chinos, description: 'Versatile khaki chinos for casual wear' },
    { id: 6, name: 'Red Polo Shirt', price: 34.99, category: 'Tops', size: ['XS', 'S', 'M', 'L', 'XL'], image: red, description: 'Classic polo shirt in vibrant red' },
    { id: 7, name: 'Floral Maxi Skirt', price: 54.99, category: 'Bottoms', size: ['XS', 'S', 'M', 'L', 'XL'], image: floral, description: 'Beautiful floral maxi skirt' },
    { id: 8, name: 'Blue Denim Jacket', price: 74.99, category: 'Outerwear', size: ['XS', 'S', 'M', 'L', 'XL'], image: denimJacket, description: 'Casual blue denim jacket for all seasons' },
    { id: 9, name: 'Athletic Jogger Pants', price: 42.99, category: 'Bottoms', size: ['S', 'M', 'L', 'XL'], image: jogger, description: 'Comfortable joggers perfect for exercise or casual wear' },
    { id: 11, name: 'Beige Cardigan', price: 39.99, category: 'Tops', size: ['XS', 'S', 'M', 'L', 'XL'], image: cardigan, description: 'Soft knit cardigan ideal for layering' },
    { id: 10, name: 'Plaid Button-Up Shirt', price: 33.99, category: 'Tops', size: ['S', 'M', 'L', 'XL'], image: plaid, description: 'Classic plaid long-sleeve button-up shirt' },
    { id: 11, name: 'Black Skinny Jeans', price: 49.99, category: 'Bottoms', size: ['28', '30', '32', '34', '36'], image: skinny, description: 'Stretch-fit black skinny jeans' },
    { id: 12, name: 'Green V-Neck Sweater', price: 45.99, category: 'Tops', size: ['XS', 'S', 'M', 'L', 'XL'], image: vneck, description: 'Warm and stylish green v-neck sweater' },
    { id: 13, name: 'Casual Sneakers', price: 69.99, category: 'Footwear', size: ['6', '7', '8', '9', '10', '11'], image: sneakers, description: 'Lightweight and comfortable casual sneakers' },
    { id: 14, name: 'Black Mini Skirt', price: 38.99, category: 'Bottoms', size: ['XS', 'S', 'M', 'L'], image: skirt, description: 'Chic black mini skirt for everyday wear' },
    { id: 15, name: 'Winter Puffer Coat', price: 109.99, category: 'Outerwear', size: ['S', 'M', 'L', 'XL'], image: puffer, description: 'Extra warm puffer coat for cold seasons' },
    { id: 16, name: 'Graphic Print Tee', price: 27.99, category: 'Tops', size: ['XS', 'S', 'M', 'L', 'XL'], image: graphic, description: 'Trendy graphic tee with a modern design' },
    { id: 17, name: 'Striped Sweatshirt', price: 48.99, category: 'Tops', size: ['XS', 'S', 'M', 'L', 'XL'], image: Mshirt6, description: 'Flowy wide-leg trousers for comfort and style' },
    { id: 18, name: 'Lightweight Windbreaker', price: 52.99, category: 'Outerwear', size: ['S', 'M', 'L', 'XL'], image: windbreaker, description: 'Water-resistant windbreaker jacket' },

  ]);

  const getProductById = useCallback((id) => {
    return products.find(p => p.id === parseInt(id));
  }, [products]);

  const getFilteredProducts = useCallback((category = null, minPrice = 0, maxPrice = Infinity) => {
    return products.filter(p => {
      if (category && p.category !== category) return false;
      if (p.price < minPrice || p.price > maxPrice) return false;
      return true;
    });
  }, [products]);

  const searchProducts = useCallback((query) => {
    const lowerQuery = query.toLowerCase();
    return products.filter(p => 
      p.name.toLowerCase().includes(lowerQuery) || 
      p.description.toLowerCase().includes(lowerQuery)
    );
  }, [products]);

  const getCategories = useCallback(() => {
    return [...new Set(products.map(p => p.category))];
  }, [products]);

  const addProduct = useCallback((product) => {
    setProducts([...products, { ...product, id: Math.max(...products.map(p => p.id)) + 1 }]);
  }, [products]);

  const updateProduct = useCallback((id, updatedProduct) => {
    setProducts(products.map(p => p.id === id ? { ...p, ...updatedProduct } : p));
  }, [products]);

  const deleteProduct = useCallback((id) => {
    setProducts(products.filter(p => p.id !== id));
  }, [products]);

  return (
    <ProductContext.Provider value={{
      products,
      getProductById,
      getFilteredProducts,
      searchProducts,
      getCategories,
      addProduct,
      updateProduct,
      deleteProduct
    }}>
      {children}
    </ProductContext.Provider>
  );
};
