import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { 
  FiFilter, FiShoppingCart, FiHeart, FiX, FiChevronDown, 
  FiSearch, FiStar, FiAlertCircle, FiShoppingBag, FiHome, 
  FiUser, FiTool, FiUsers, FiMail
} from 'react-icons/fi';

const ShopPage = () => {
  // Color palette
  const colors = {
    primary: '#2D3B2D',
    secondary: '#D4B982',
    tertiary: '#4A6741',
    background: '#F9F6F0',
    accent: '#A8C69F',
    deep: '#1B4D3E',
    highlight: '#F3E5AB',
    warm: '#E6BAA3',
    error: '#FF6B6B'
  };

  // Navigation items
  const navItems = [
    { icon: <FiHome />, label: "Home", to: "/home" },
    { icon: <FiUser />, label: "Profile", to: "/home/profile" },
    { icon: <FiShoppingBag />, label: "Shop", to: "/home/shop" },
    { icon: <FiTool />, label: "Services", to: "/home/services" },
    { icon: <FiUsers />, label: "Community", to: "/home/community" },
    { icon: <FiMail />, label: "Contact", to: "/contact" }
  ];

  const location = useLocation();

  // NavItem component with active state styling
  const NavItem = ({ to, icon, label }) => {
    const isActive = location.pathname === to;
    return (
      <motion.li
        whileHover={{ x: 5 }}
        className={`flex items-center p-3 rounded-lg cursor-pointer transition-colors ${
          isActive ? 'bg-white shadow' : 'hover:bg-white/50'
        }`}
      >
        <Link to={to} className="flex items-center w-full">
          <span className="mr-3" style={{ color: isActive ? colors.tertiary : colors.primary }}>
            {icon}
          </span>
          <span className={`font-medium ${isActive ? 'text-gray-800' : 'text-gray-600'}`}>
            {label}
          </span>
        </Link>
      </motion.li>
    );
  };

  // Shop page state management
  const [activeCategory, setActiveCategory] = useState('all');
  const [showFilters, setShowFilters] = useState(true);
  const [priceRange, setPriceRange] = useState([0, 200]);
  const [sortBy, setSortBy] = useState('popular');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilters, setSelectedFilters] = useState({
    plantType: [],
    maintenance: [],
    light: []
  });
  const [cartItems, setCartItems] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [loading, setLoading] = useState(false);

  // Sample product data
  const products = [
    {
      id: 1,
      name: 'Snake Plant',
      category: 'plants',
      price: 29.99,
      rating: 4.5,
      image: '/api/placeholder/300/300',
      tags: ['Low Maintenance', 'Air Purifying'],
      stock: 15,
      description: 'Perfect for beginners, the snake plant is known for its air-purifying qualities.',
      care: { water: 'Low', light: 'Low to Bright', humidity: 'Any' }
    },
    {
      id: 2,
      name: 'Ceramic Plant Pot',
      category: 'pots',
      price: 24.99,
      rating: 4.8,
      image: '/api/placeholder/300/300',
      tags: ['Drainage Hole', 'Hand-crafted'],
      stock: 23,
      description: 'Handcrafted ceramic pot with excellent drainage for healthy plants.',
      dimensions: { width: '6 inches', height: '7 inches' }
    },
    {
      id: 3,
      name: 'Pruning Shears',
      category: 'tools',
      price: 19.99,
      rating: 4.7,
      image: '/api/placeholder/300/300',
      tags: ['Stainless Steel', 'Ergonomic'],
      stock: 45,
      description: 'Professional-grade pruning shears for precise cuts.',
      features: ['Stainless steel blades', 'Comfort grip handle', 'Safety lock']
    }
  ];

  // Categories for shop filters
  const categories = [
    { id: 'all', name: 'All Products', icon: FiShoppingBag },
    { id: 'plants', name: 'Plants', icon: FiFilter },
    { id: 'pots', name: 'Pots & Planters', icon: FiFilter },
    { id: 'tools', name: 'Gardening Tools', icon: FiFilter }
  ];

  // Filter options for additional filtering (if needed)
  const filterOptions = {
    plantType: ['Indoor', 'Outdoor', 'Succulents', 'Herbs'],
    maintenance: ['Low', 'Medium', 'High'],
    light: ['Low Light', 'Bright Indirect', 'Full Sun']
  };

  // Cart functions
  const addToCart = (product) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item.id === product.id);
      if (existingItem) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCartItems(prev => prev.filter(item => item.id !== productId));
  };

  const updateCartQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems(prev =>
      prev.map(item =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // Wishlist functions
  const toggleWishlist = (productId) => {
    setWishlist(prev =>
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  // Filter functions
  const handleFilterChange = (category, value) => {
    setSelectedFilters(prev => ({
      ...prev,
      [category]: prev[category].includes(value)
        ? prev[category].filter(item => item !== value)
        : [...prev[category], value]
    }));
  };

  // Search and filter products
  const filteredProducts = products.filter(product => {
    const matchesCategory = activeCategory === 'all' || product.category === activeCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
    return matchesCategory && matchesSearch && matchesPrice;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      default:
        return 0;
    }
  });

  // Cart Drawer component
  const CartDrawer = () => (
    <motion.div
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      className="fixed right-0 top-0 h-full w-96 z-50 p-6 overflow-y-auto"
      style={{ backgroundColor: colors.background }}
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold" style={{ color: colors.deep }}>Shopping Cart</h2>
        <button onClick={() => setShowCart(false)}>
          <FiX size={24} style={{ color: colors.deep }} />
        </button>
      </div>
      {cartItems.length === 0 ? (
        <div className="text-center py-8" style={{ color: colors.deep }}>
          Your cart is empty
        </div>
      ) : (
        <>
          <div className="space-y-4 mb-6">
            {cartItems.map(item => (
              <div 
                key={item.id}
                className="flex items-center gap-4 p-4 rounded-lg"
                style={{ backgroundColor: colors.accent }}
              >
                <img 
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded"
                />
                <div className="flex-1">
                  <h3 className="font-bold" style={{ color: colors.deep }}>{item.name}</h3>
                  <p style={{ color: colors.tertiary }}>${item.price}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      className="px-2 rounded"
                      style={{ backgroundColor: colors.tertiary, color: colors.background }}
                      onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                    >
                      -
                    </button>
                    <span style={{ color: colors.deep }}>{item.quantity}</span>
                    <button
                      className="px-2 rounded"
                      style={{ backgroundColor: colors.tertiary, color: colors.background }}
                      onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="p-2 rounded-full"
                  style={{ backgroundColor: colors.warm }}
                >
                  <FiX style={{ color: colors.deep }} />
                </button>
              </div>
            ))}
          </div>
          <div
            className="p-4 rounded-lg mb-4"
            style={{ backgroundColor: colors.highlight }}
          >
            <div className="flex justify-between mb-2">
              <span style={{ color: colors.deep }}>Subtotal</span>
              <span style={{ color: colors.deep }}>
                ${cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}
              </span>
            </div>
            <button
              className="w-full py-2 rounded-lg mt-4"
              style={{ backgroundColor: colors.tertiary, color: colors.background }}
            >
              Checkout
            </button>
          </div>
        </>
      )}
    </motion.div>
  );

  return (
    <div className="flex min-h-screen" style={{ backgroundColor: colors.background }}>
      {/* Side Navigation */}
      <motion.nav 
        className="w-64 p-6 border-r-2 overflow-y-auto h-screen sticky top-0"
        style={{ backgroundColor: colors.background, borderColor: colors.accent }}
        initial={{ x: -20 }}
        animate={{ x: 0 }}
      >
        <div className="mb-8">
          {/* You can add header/logo content here */}
        </div>
        <ul className="space-y-3">
          {navItems.map((item, index) => (
            <NavItem key={index} to={item.to} icon={item.icon} label={item.label} />
          ))}
        </ul>
      </motion.nav>

      {/* Main Shop Content */}
      <div className="flex-1">
        {/* Shop Header */}
        <div className="p-8 sticky top-0 z-10" style={{ backgroundColor: colors.background }}>
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-4xl font-bold" style={{ color: colors.deep }}>Shop</h1>
              <div className="flex items-center gap-4">
                <div 
                  className="relative flex items-center p-2 rounded-lg w-64"
                  style={{ backgroundColor: colors.accent }}
                >
                  <FiSearch className="mr-2" style={{ color: colors.deep }} />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search products..."
                    className="bg-transparent outline-none w-full"
                    style={{ color: colors.deep }}
                  />
                </div>
                <button
                  className="p-2 rounded-full relative"
                  style={{ backgroundColor: colors.tertiary }}
                  onClick={() => setShowCart(true)}
                >
                  <FiShoppingCart style={{ color: colors.background }} />
                  {cartItems.length > 0 && (
                    <span 
                      className="absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-xs"
                      style={{ backgroundColor: colors.warm, color: colors.deep }}
                    >
                      {cartItems.length}
                    </span>
                  )}
                </button>
              </div>
            </div>

            {/* Categories */}
            <div className="flex gap-4 mb-8 overflow-x-auto pb-2">
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className="px-6 py-2 rounded-full transition-all whitespace-nowrap"
                  style={{
                    backgroundColor: activeCategory === category.id ? colors.tertiary : colors.accent,
                    color: activeCategory === category.id ? colors.background : colors.deep
                  }}
                >
                  <div className="flex items-center gap-2">
                    <category.icon size={16} />
                    {category.name}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main Shop Section */}
        <div className="max-w-7xl mx-auto px-8 pb-8">
          <div className="flex gap-8">
            {/* Filters Sidebar */}
            <AnimatePresence>
              {showFilters && (
                <motion.div 
                  className="w-64 flex-shrink-0"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -20, opacity: 0 }}
                >
                  <div 
                    className="p-6 rounded-xl sticky top-32"
                    style={{ backgroundColor: colors.highlight }}
                  >
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-xl font-bold" style={{ color: colors.deep }}>Filters</h2>
                      <button onClick={() => setShowFilters(false)}>
                        <FiX style={{ color: colors.deep }} />
                      </button>
                    </div>

                    {/* Price Range */}
                    <div className="mb-6">
                      <h3 className="font-medium mb-3" style={{ color: colors.deep }}>Price Range</h3>
                      <div className="flex gap-2 mb-2">
                        <input
                          type="number"
                          value={priceRange[0]}
                          onChange={(e) => setPriceRange([parseInt(e.target.value) || 0, priceRange[1]])}
                          className="w-20 p-1 rounded"
                          style={{ backgroundColor: colors.background }}
                        />
                        <span style={{ color: colors.deep }}>to</span>
                        <input
                          type="number"
                          value={priceRange[1]}
                          onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value) || 0])}
                          className="w-20 p-1 rounded"
                          style={{ backgroundColor: colors.background }}
                        />
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="200"
                        value={priceRange[1]}
                        onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value) || 0])}
                        className="w-full"
                      />
                    </div>

                    {/* Filter Sections */}
                    {Object.entries(filterOptions).map(([category, options]) => (
                      <div key={category} className="mb-6">
                        <h3 className="font-medium mb-3" style={{ color: colors.deep }}>
                          {category.charAt(0).toUpperCase() + category.slice(1)}
                        </h3>
                        <div className="space-y-2">
                          {options.map(option => (
                            <label key={option} className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                checked={selectedFilters[category].includes(option)}
                                onChange={() => handleFilterChange(category, option)}
                              />
                              <span style={{ color: colors.primary }}>{option}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Products Grid */}
            <div className="flex-1">
              {/* Sort Controls */}
              <div 
                className="flex justify-between items-center mb-6 p-4 rounded-xl"
                style={{ backgroundColor: colors.accent }}
              >
                <span style={{ color: colors.deep }}>
                  Showing {sortedProducts.length} products
                </span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="p-2 rounded"
                  style={{ backgroundColor: colors.background, color: colors.deep }}
                >
                  <option value="popular">Most Popular</option>
                  <option value="rating">Highest Rated</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>
              </div>

              {/* Products Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {loading ? (
                  // Loading skeletons
                  [...Array(6)].map((_, i) => (
                    <div
                      key={i}
                      className="rounded-xl overflow-hidden animate-pulse"
                      style={{ backgroundColor: colors.accent }}
                    >
                      <div className="h-64 bg-gray-200"></div>
                      <div className="p-4 space-y-4">
                        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                      </div>
                    </div>
                  ))
                ) : sortedProducts.length === 0 ? (
                  // No products found message
                  <div 
                    className="col-span-full text-center py-12"
                    style={{ color: colors.deep }}
                  >
                    <FiAlertCircle size={48} className="mx-auto mb-4" />
                    <h3 className="text-xl font-bold mb-2">No Products Found</h3>
                    <p>Try adjusting your filters or search terms</p>
                  </div>
                ) : (
                  // Product Cards
                  sortedProducts.map(product => (
                    <motion.div
                      key={product.id}
                      className="rounded-xl overflow-hidden"
                      style={{ backgroundColor: colors.background }}
                      whileHover={{ y: -5 }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <div className="relative">
                        <img 
                          src={product.image} 
                          alt={product.name}
                          className="w-full h-64 object-cover"
                        />
                        <button
                          onClick={() => toggleWishlist(product.id)}
                          className="absolute top-4 right-4 p-2 rounded-full"
                          style={{ backgroundColor: colors.background }}
                        >
                          <FiHeart 
                            style={{ 
                              color: wishlist.includes(product.id) ? colors.error : colors.warm,
                              fill: wishlist.includes(product.id) ? colors.error : 'none'
                            }} 
                          />
                        </button>
                        {product.stock < 5 && (
                          <div
                            className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs"
                            style={{ backgroundColor: colors.error, color: colors.background }}
                          >
                            Low Stock: {product.stock} left
                          </div>
                        )}
                      </div>
                      <div className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="font-bold" style={{ color: colors.deep }}>
                              {product.name}
                            </h3>
                            <div className="flex items-center gap-1">
                              <FiStar style={{ color: colors.secondary }} />
                              <span style={{ color: colors.primary }}>{product.rating}</span>
                            </div>
                          </div>
                          <span className="font-bold" style={{ color: colors.tertiary }}>
                            ${product.price}
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {product.tags.map(tag => (
                            <span
                              key={tag}
                              className="text-xs px-2 py-1 rounded-full"
                              style={{ backgroundColor: colors.accent, color: colors.deep }}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                        <button
                          onClick={() => addToCart(product)}
                          className="w-full py-2 rounded-lg transition-colors"
                          style={{ backgroundColor: colors.tertiary, color: colors.background }}
                        >
                          Add to Cart
                        </button>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Cart Drawer */}
      <AnimatePresence>
        {showCart && <CartDrawer />}
      </AnimatePresence>
    </div>
  );
};

export default ShopPage;
