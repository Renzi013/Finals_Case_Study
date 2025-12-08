import React, { useContext, useState, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Container, Row, Col, Button, Pagination, Spinner } from 'react-bootstrap';
import { ProductContext } from '../contexts/ProductContext';
import './ProductListPage.css';

const ProductListPage = () => {
  const { products, loading, getCategories, searchProducts } = useContext(ProductContext);

  const [searchParams] = useSearchParams();
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 200]);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 12;
  const searchQuery = searchParams.get('search') || '';
  const categories = getCategories();

  // FILTER AND SEARCH PRODUCTS
  const filteredProducts = useMemo(() => {
    let results = products;

    if (searchQuery) results = searchProducts(searchQuery);

    if (selectedCategories.length > 0) {
      results = results.filter(p => selectedCategories.includes(p.category));
    }

    results = results.filter(
      p => p.price >= priceRange[0] && p.price <= priceRange[1]
    );

    return results;
  }, [products, searchQuery, selectedCategories, priceRange, searchProducts]);

  // PAGINATION
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredProducts.slice(start, start + itemsPerPage);
  }, [filteredProducts, currentPage]);

  // HANDLERS
  const handleCategoryChange = (category) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
    setCurrentPage(1);
  };

  const handlePriceChange = (e) => {
    const value = parseInt(e.target.value);
    e.target.name === 'minPrice'
      ? setPriceRange([value, priceRange[1]])
      : setPriceRange([priceRange[0], value]);

    setCurrentPage(1);
  };

  const handleResetFilters = () => {
    setSelectedCategories([]);
    setPriceRange([0, 200]);
    setCurrentPage(1);
  };

  // LOADING STATE
  if (loading) {
    return (
      <Container className="text-center py-5">
        <Spinner animation="border" variant="primary" />
        <p className="mt-3">Loading collection...</p>
      </Container>
    );
  }

  return (
    <div className="product-list-page">
      <Container>
        <h1 className="my-5">Our Collection</h1>

        <Row>
          {/* SIDEBAR FILTERS */}
          <Col lg={3} md={4} className="mb-4">
            <div className="filter-sidebar">
              <h5 className="filter-title">Filters</h5>

              {/* CATEGORY FILTER */}
              <div className="filter-group">
                <h6 className="filter-subtitle">Category</h6>
                {categories.map(category => (
                  <div key={category} className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id={`cat-${category}`}
                      checked={selectedCategories.includes(category)}
                      onChange={() => handleCategoryChange(category)}
                    />
                    <label className="form-check-label" htmlFor={`cat-${category}`}>
                      {category}
                    </label>
                  </div>
                ))}
              </div>

              {/* PRICE FILTER */}
              <div className="filter-group">
                <h6 className="filter-subtitle">Price Range</h6>

                <div className="mb-3">
                  <label>Min: Php {priceRange[0]}</label>
                  <input
                    type="range"
                    className="form-range"
                    name="minPrice"
                    min="0"
                    max="200"
                    value={priceRange[0]}
                    onChange={handlePriceChange}
                  />
                </div>

                <div className="mb-3">
                  <label>Max: Php {priceRange[1]}</label>
                  <input
                    type="range"
                    className="form-range"
                    name="maxPrice"
                    min="0"
                    max="200"
                    value={priceRange[1]}
                    onChange={handlePriceChange}
                  />
                </div>
              </div>

              <Button
                variant="outline-primary"
                className="w-100"
                onClick={handleResetFilters}
              >
                Reset Filters
              </Button>
            </div>
          </Col>

          {/* PRODUCT GRID */}
          <Col lg={9} md={8}>
            {searchQuery && (
              <div className="alert alert-info mb-4">
                Search: <strong>{searchQuery}</strong>
              </div>
            )}

            {filteredProducts.length === 0 ? (
              <div className="alert alert-warning text-center py-5">
                <h4>No products found</h4>
                <p>Try adjusting your filters</p>
              </div>
            ) : (
              <>
                <div className="mb-4 text-muted">
                  Showing {paginatedProducts.length} of {filteredProducts.length} products
                </div>

                <div className="product-grid">
                  {paginatedProducts.map(product => (
                    <div key={product.id} className="product-card">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="product-image"
                      />

                      <div className="product-body">
                        <h5 className="product-name">{product.name}</h5>

                        <div className="product-meta">
                          <span className="badge bg-secondary">{product.category}</span>
                        </div>

                        <p className="product-price">Php {product.price.toFixed(2)}</p>
                        <p className="product-description">{product.description}</p>

                        <Link to={`/products/${product.id}`}>
                          <Button className="btn btn-primary w-100 mt-auto">
                            View Details
                          </Button>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>

                {/* PAGINATION */}
                {totalPages > 1 && (
                  <Pagination className="justify-content-center mt-5">
                    <Pagination.Prev
                      onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                      disabled={currentPage === 1}
                    />

                    {[...Array(totalPages)].map((_, i) => (
                      <Pagination.Item
                        key={i + 1}
                        active={currentPage === i + 1}
                        onClick={() => setCurrentPage(i + 1)}
                      >
                        {i + 1}
                      </Pagination.Item>
                    ))}

                    <Pagination.Next
                      onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                      disabled={currentPage === totalPages}
                    />
                  </Pagination>
                )}
              </>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ProductListPage;
