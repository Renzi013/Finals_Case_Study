import React, { createContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';

export const ProductContext = createContext();

const api = axios.create({ baseURL: process.env.REACT_APP_API_BASE_URL });

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Axios setup
  const STORAGE_URL = process.env.REACT_APP_STORAGE_URL || 'http://localhost:8082/storage';

  const formatProductImage = useCallback(
    (product) => {
      return {
        ...product,

        image:
          product.image && !product.image.startsWith('http')
            ? `${STORAGE_URL}/${product.image}`
            : product.image,

        size: product.sizes || product.size || [],

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
