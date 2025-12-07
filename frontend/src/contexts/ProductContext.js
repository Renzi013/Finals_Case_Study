import React, { createContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); // Added loading state

  // Axios setup
  const api = axios.create({ baseURL: process.env.REACT_APP_API_BASE_URL });
  const STORAGE_URL = process.env.REACT_APP_STORAGE_URL;

  // CRITICAL HELPER: Formats backend data for frontend
  const formatProductImage = useCallback(
    (product) => {
      return {
        ...product,

        // 1. Fix Image Path: Prepend storage URL if it's just a filename
        image:
          product.image && !product.image.startsWith('http')
            ? `${STORAGE_URL}/${product.image}`
            : product.image,

        // 2. Fix Size Mismatch: Backend sends 'sizes' (plural), Frontend uses 'size' (singular)
        size: product.sizes || product.size || [],

        // 3. Ensure Price is a Number
        price: parseFloat(product.price),
      };
    },
    [STORAGE_URL]
  );

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);

      const response = await api.get('/products');
      const formattedData = response.data.map(formatProductImage);

      setProducts(formattedData);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  }, [api, formatProductImage]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const getProductById = useCallback(
    (id) => {
      return products.find((p) => p.id === parseInt(id));
    },
    [products]
  );

  // Keep search client-side to prevent UI breakage
  const searchProducts = useCallback(
    (query) => {
      const lowerQuery = query.toLowerCase();
      return products.filter(
        (p) =>
          p.name.toLowerCase().includes(lowerQuery) ||
          p.description.toLowerCase().includes(lowerQuery)
      );
    },
    [products]
  );

  const getCategories = useCallback(() => {
    return [...new Set(products.map((p) => p.category))];
  }, [products]);

  return (
    <ProductContext.Provider
      value={{
        products,
        loading,
        getProductById,
        searchProducts,
        getCategories,
        fetchProducts,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
