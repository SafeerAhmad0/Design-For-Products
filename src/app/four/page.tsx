"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView, useScroll, useTransform } from 'framer-motion';

interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  featured: boolean;
  rating: number;
  reviews: number;
  dimension: string;
  material: string;
  coordinates: { x: number; y: number };
}

const products: Product[] = [
  { id: 1, name: "Hexagonal Shelf System", description: "Modular wall storage with mathematical precision", price: "$189", featured: true, rating: 4.9, reviews: 287, dimension: "40×40×12", material: "Oak", coordinates: { x: 0.1, y: 0.2 } },
  { id: 2, name: "Triangle Coffee Table", description: "Acute-angled surface with hidden geometry", price: "$449", featured: false, rating: 4.8, reviews: 156, dimension: "120×60×40", material: "Steel", coordinates: { x: 0.7, y: 0.1 } },
  { id: 3, name: "Cubic Storage Unit", description: "Perfect proportions in three dimensions", price: "$329", featured: true, rating: 4.7, reviews: 203, dimension: "50×50×50", material: "Birch", coordinates: { x: 0.3, y: 0.6 } },
  { id: 4, name: "Linear Light Series", description: "Illumination following geometric principles", price: "$129", featured: false, rating: 4.6, reviews: 178, dimension: "100×5×5", material: "Aluminum", coordinates: { x: 0.8, y: 0.4 } },
  { id: 5, name: "Pentagonal Mirror", description: "Five-sided reflection creating infinite space", price: "$219", featured: true, rating: 4.8, reviews: 234, dimension: "60×60×3", material: "Glass", coordinates: { x: 0.2, y: 0.8 } },
  { id: 6, name: "Rhomboid Bookend", description: "Parallelogram support for vertical libraries", price: "$89", featured: false, rating: 4.5, reviews: 145, dimension: "20×15×25", material: "Concrete", coordinates: { x: 0.6, y: 0.3 } },
  { id: 7, name: "Cylindrical Planter", description: "Circular growth in architectural form", price: "$149", featured: false, rating: 4.4, reviews: 167, dimension: "35×35×40", material: "Ceramic", coordinates: { x: 0.9, y: 0.7 } },
  { id: 8, name: "Trapezoidal Stool", description: "Four-sided seating with angular precision", price: "$179", featured: false, rating: 4.7, reviews: 198, dimension: "40×30×45", material: "Walnut", coordinates: { x: 0.4, y: 0.5 } },
  { id: 9, name: "Octagonal Clock", description: "Eight-sided time in geometric harmony", price: "$99", featured: false, rating: 4.3, reviews: 134, dimension: "30×30×5", material: "Metal", coordinates: { x: 0.1, y: 0.9 } },
  { id: 10, name: "Dodecagon Vase", description: "Twelve-sided vessel for organic display", price: "$159", featured: false, rating: 4.6, reviews: 189, dimension: "25×25×35", material: "Porcelain", coordinates: { x: 0.5, y: 0.1 } }
];

const featuredProducts = products.filter(p => p.featured);
const materials = [...new Set(products.map(p => p.material))];

const heroShapes = [
  { type: 'triangle', size: 100, x: '10%', y: '20%', rotation: 0 },
  { type: 'square', size: 80, x: '80%', y: '15%', rotation: 45 },
  { type: 'circle', size: 60, x: '70%', y: '70%', rotation: 0 },
  { type: 'hexagon', size: 90, x: '15%', y: '75%', rotation: 30 },
  { type: 'pentagon', size: 70, x: '60%', y: '40%', rotation: 0 }
];

export default function GeometricArchitectureStore() {
  const [currentView, setCurrentView] = useState<'grid' | 'blueprint'>('grid');
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);
  const [selectedMaterial, setSelectedMaterial] = useState<string>('all');
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [blueprintMode, setBlueprintMode] = useState<boolean>(false);
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 45]);

  const addToCart = (product: Product) => {
    setCartItems(prev => [...prev, product]);
  };

  const filteredProducts = selectedMaterial === 'all'
    ? products
    : products.filter(p => p.material === selectedMaterial);

  useEffect(() => {
    const interval = setInterval(() => {
      setBlueprintMode(prev => !prev);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const getShapeComponent = (shape: string, size: number) => {
    const baseProps = {
      width: size,
      height: size,
      className: "stroke-current text-gray-300 fill-none stroke-2"
    };

    switch (shape) {
      case 'triangle':
        return (
          <svg {...baseProps} viewBox="0 0 100 100">
            <polygon points="50,10 90,80 10,80" />
          </svg>
        );
      case 'square':
        return (
          <svg {...baseProps} viewBox="0 0 100 100">
            <rect x="20" y="20" width="60" height="60" />
          </svg>
        );
      case 'circle':
        return (
          <svg {...baseProps} viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="30" />
          </svg>
        );
      case 'hexagon':
        return (
          <svg {...baseProps} viewBox="0 0 100 100">
            <polygon points="50,15 75,30 75,60 50,75 25,60 25,30" />
          </svg>
        );
      case 'pentagon':
        return (
          <svg {...baseProps} viewBox="0 0 100 100">
            <polygon points="50,20 80,40 65,75 35,75 20,40" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <motion.div
      className="min-h-screen bg-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Geometric Header */}
      <motion.header
        className="border-b border-gray-200 py-6 sticky top-0 bg-white/95 backdrop-blur-sm z-50 relative"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <motion.div
              className="flex items-center space-x-4"
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <motion.div
                className="w-8 h-8 border-2 border-gray-900"
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              />
              <div>
                <h1 className="text-2xl font-light tracking-[0.15em] text-gray-900">
                  GEOMETRIC
                </h1>
                <div className="text-xs tracking-[0.2em] text-gray-500">ARCHITECTURE</div>
              </div>
            </motion.div>

            <motion.div
              className="flex items-center space-x-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <motion.button
                onClick={() => setCurrentView(currentView === 'grid' ? 'blueprint' : 'grid')}
                className="flex items-center space-x-2 px-4 py-2 border border-gray-300 hover:border-gray-900 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="w-4 h-4 grid grid-cols-2 gap-px">
                  <div className="bg-gray-400"></div>
                  <div className="bg-gray-400"></div>
                  <div className="bg-gray-400"></div>
                  <div className="bg-gray-400"></div>
                </div>
                <span className="text-xs tracking-widest">{currentView === 'grid' ? 'BLUEPRINT' : 'GRID'}</span>
              </motion.button>

              <motion.div
                className="relative"
                whileHover={{ scale: 1.05 }}
              >
                <div className="flex items-center space-x-3 border border-gray-300 px-4 py-2">
                  <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 11-4 0v-6m4 0V9a2 2 0 10-4 0v4.01" />
                  </svg>
                  <span className="text-sm font-medium text-gray-700">{cartItems.length}</span>
                  <div className="w-px h-4 bg-gray-300"></div>
                  <span className="text-xs tracking-widest text-gray-500">ITEMS</span>
                </div>
                <AnimatePresence>
                  {cartItems.length > 0 && (
                    <motion.div
                      className="absolute -top-2 -right-2 bg-gray-900 text-white text-xs w-6 h-6 flex items-center justify-center"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      transition={{ type: "spring", stiffness: 500 }}
                    >
                      {cartItems.length}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Floating Geometric Shapes */}
        {heroShapes.map((shape, index) => (
          <motion.div
            key={index}
            className="absolute pointer-events-none"
            style={{ left: shape.x, top: shape.y }}
            initial={{ opacity: 0, scale: 0, rotate: shape.rotation }}
            animate={{
              opacity: 0.1,
              scale: 1,
              rotate: shape.rotation + 360
            }}
            transition={{
              duration: 2,
              delay: index * 0.2,
              rotate: { duration: 20, repeat: Infinity, ease: "linear" }
            }}
          >
            {getShapeComponent(shape.type, shape.size)}
          </motion.div>
        ))}
      </motion.header>

      {/* Blueprint/Grid Hero */}
      <motion.section
        className="relative h-[90vh] overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.div
          className="absolute inset-0"
          animate={{
            backgroundImage: blueprintMode
              ? 'radial-gradient(circle at 25px 25px, rgba(156, 163, 175, 0.3) 2px, transparent 0), radial-gradient(circle at 75px 75px, rgba(156, 163, 175, 0.3) 2px, transparent 0)'
              : 'linear-gradient(to right, rgba(156, 163, 175, 0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(156, 163, 175, 0.1) 1px, transparent 1px)',
            backgroundSize: blueprintMode ? '50px 50px' : '25px 25px'
          }}
          transition={{ duration: 1 }}
        />

        <div className="relative z-10 h-full flex items-center justify-center">
          <motion.div
            className="text-center max-w-4xl mx-auto px-6"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            <motion.div
              className="text-xs tracking-[0.3em] text-gray-500 mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              PRECISION × FUNCTION × BEAUTY
            </motion.div>

            <motion.h1
              className="text-8xl md:text-9xl font-light text-gray-900 mb-8 leading-none"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1, duration: 1 }}
            >
              FORM
              <br />
              <motion.span
                className="block"
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 1.5, duration: 1 }}
              >
                FUNCTION
              </motion.span>
            </motion.h1>

            <motion.p
              className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 2, duration: 0.8 }}
            >
              Where mathematical precision meets human need. Objects designed through
              the lens of geometric purity and architectural principles.
            </motion.p>

            <motion.div
              className="flex justify-center space-x-8"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 2.3, duration: 0.8 }}
            >
              <motion.button
                className="border-2 border-gray-900 px-8 py-4 text-sm tracking-[0.15em] hover:bg-gray-900 hover:text-white transition-all duration-500"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                EXPLORE COLLECTION
              </motion.button>
              <motion.button
                className="px-8 py-4 text-sm tracking-[0.15em] text-gray-600 hover:text-gray-900 transition-colors"
                whileHover={{ scale: 1.05, x: 10 }}
                whileTap={{ scale: 0.95 }}
              >
                VIEW BLUEPRINTS →
              </motion.button>
            </motion.div>
          </motion.div>
        </div>

        {/* Animated Geometric Elements */}
        <motion.div
          className="absolute top-20 left-20"
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        >
          <svg width="120" height="120" className="stroke-gray-200 fill-none stroke-1">
            <polygon points="60,10 110,80 10,80" />
          </svg>
        </motion.div>

        <motion.div
          className="absolute bottom-20 right-20"
          animate={{ rotate: -360 }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        >
          <svg width="100" height="100" className="stroke-gray-200 fill-none stroke-1">
            <polygon points="50,15 75,30 75,60 50,75 25,60 25,30" />
          </svg>
        </motion.div>
      </motion.section>

      {/* Featured Geometric Objects */}
      <motion.section
        className="py-24 px-6 lg:px-8 border-t border-gray-100"
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="text-xs tracking-[0.3em] text-gray-500 mb-4">FEATURED GEOMETRY</div>
            <h2 className="text-5xl font-light text-gray-900 mb-8">Precision Objects</h2>
            <div className="w-32 h-px bg-gray-900 mx-auto mb-8"></div>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Each piece represents the intersection of mathematical principles and functional design,
              creating objects that embody both beauty and utility.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {featuredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                className="group cursor-pointer"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                onMouseEnter={() => setHoveredProduct(product.id)}
                onMouseLeave={() => setHoveredProduct(null)}
              >
                <div className="relative aspect-square mb-6 overflow-hidden border border-gray-100">
                  <motion.div
                    className="w-full h-full bg-cover bg-center relative"
                    style={{ backgroundImage: `url(https://via.placeholder.com/400x400/f8f9fa/6c757d?text=${encodeURIComponent(product.name)})` }}
                    animate={{
                      scale: hoveredProduct === product.id ? 1.05 : 1
                    }}
                    transition={{ duration: 0.6 }}
                  />

                  {/* Technical Overlay */}
                  <motion.div
                    className="absolute inset-0 bg-white bg-opacity-95 flex items-center justify-center"
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: hoveredProduct === product.id ? 1 : 0
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.div
                      className="text-center text-gray-900"
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{
                        scale: hoveredProduct === product.id ? 1 : 0.8,
                        opacity: hoveredProduct === product.id ? 1 : 0
                      }}
                      transition={{ duration: 0.3, delay: 0.1 }}
                    >
                      <div className="text-xs tracking-[0.2em] mb-4 text-gray-500">SPECIFICATIONS</div>
                      <div className="space-y-2 mb-6">
                        <div className="text-sm">
                          <span className="text-gray-500">DIMENSIONS:</span> {product.dimension}cm
                        </div>
                        <div className="text-sm">
                          <span className="text-gray-500">MATERIAL:</span> {product.material}
                        </div>
                        <div className="text-sm">
                          <span className="text-gray-500">PRICE:</span> {product.price}
                        </div>
                      </div>
                      <motion.button
                        className="border border-gray-900 px-6 py-2 text-xs tracking-[0.15em] hover:bg-gray-900 hover:text-white transition-all duration-300"
                        onClick={() => addToCart(product)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        ADD TO COLLECTION
                      </motion.button>
                    </motion.div>
                  </motion.div>

                  {/* Corner Coordinates */}
                  <div className="absolute top-2 left-2 text-xs text-gray-400 font-mono">
                    {product.coordinates.x.toFixed(2)}, {product.coordinates.y.toFixed(2)}
                  </div>
                </div>

                <motion.div
                  animate={{
                    x: hoveredProduct === product.id ? 5 : 0
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div className="text-xs tracking-[0.2em] text-gray-500 uppercase">
                      {product.material}
                    </div>
                    <div className="text-lg font-light text-gray-900">{product.price}</div>
                  </div>
                  <h3 className="text-xl font-light text-gray-900 mb-2 group-hover:text-gray-700 transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed mb-3">
                    {product.description}
                  </p>
                  <div className="text-xs text-gray-400 font-mono">
                    {product.dimension}cm × {product.material}
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Material Filter */}
      <motion.section
        className="py-16 border-t border-gray-100"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            className="text-center mb-12"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="text-xs tracking-[0.3em] text-gray-500 mb-6">FILTER BY MATERIAL</div>
            <div className="flex justify-center space-x-8 flex-wrap gap-4">
              <motion.button
                onClick={() => setSelectedMaterial('all')}
                className={`px-6 py-3 border text-sm tracking-[0.1em] transition-all ${
                  selectedMaterial === 'all'
                    ? 'border-gray-900 bg-gray-900 text-white'
                    : 'border-gray-300 text-gray-600 hover:border-gray-900'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                ALL MATERIALS
              </motion.button>
              {materials.map((material) => (
                <motion.button
                  key={material}
                  onClick={() => setSelectedMaterial(material)}
                  className={`px-6 py-3 border text-sm tracking-[0.1em] transition-all uppercase ${
                    selectedMaterial === material
                      ? 'border-gray-900 bg-gray-900 text-white'
                      : 'border-gray-300 text-gray-600 hover:border-gray-900'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {material}
                </motion.button>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Blueprint View Toggle */}
      <AnimatePresence mode="wait">
        <motion.section
          key={currentView}
          className="pb-24 px-6 lg:px-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
        >
          <div className="max-w-7xl mx-auto">
            {currentView === 'grid' ? (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {filteredProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    className="group cursor-pointer relative aspect-square border border-gray-200 overflow-hidden"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    onMouseEnter={() => setHoveredProduct(product.id)}
                    onMouseLeave={() => setHoveredProduct(null)}
                    layout
                  >
                    <motion.div
                      className="w-full h-full bg-cover bg-center"
                      style={{ backgroundImage: `url(https://via.placeholder.com/300x300/f8f9fa/6c757d?text=${encodeURIComponent(product.name)})` }}
                      animate={{
                        scale: hoveredProduct === product.id ? 1.1 : 1
                      }}
                      transition={{ duration: 0.6 }}
                    />
                    <motion.div
                      className="absolute inset-0 bg-white bg-opacity-90 flex flex-col justify-center items-center text-center p-4"
                      initial={{ opacity: 0 }}
                      animate={{
                        opacity: hoveredProduct === product.id ? 1 : 0
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <h3 className="text-sm font-light text-gray-900 mb-2">{product.name}</h3>
                      <div className="text-xs text-gray-500 mb-2">{product.dimension}cm</div>
                      <div className="text-lg font-light text-gray-900 mb-3">{product.price}</div>
                      <motion.button
                        className="text-xs tracking-widest border border-gray-900 px-4 py-2 hover:bg-gray-900 hover:text-white transition-all"
                        onClick={() => addToCart(product)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        ADD
                      </motion.button>
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="relative">
                <div
                  className="w-full h-[600px] relative border border-gray-300"
                  style={{
                    backgroundImage: 'linear-gradient(to right, rgba(156, 163, 175, 0.2) 1px, transparent 1px), linear-gradient(to bottom, rgba(156, 163, 175, 0.2) 1px, transparent 1px)',
                    backgroundSize: '20px 20px'
                  }}
                >
                  {filteredProducts.map((product, index) => (
                    <motion.div
                      key={product.id}
                      className="absolute w-16 h-16 border-2 border-gray-400 cursor-pointer flex items-center justify-center bg-white hover:bg-gray-50 transition-colors"
                      style={{
                        left: `${product.coordinates.x * 100}%`,
                        top: `${product.coordinates.y * 100}%`
                      }}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      whileHover={{ scale: 1.2, zIndex: 10 }}
                      onClick={() => setHoveredProduct(hoveredProduct === product.id ? null : product.id)}
                    >
                      <span className="text-xs font-mono">{product.id}</span>
                      <AnimatePresence>
                        {hoveredProduct === product.id && (
                          <motion.div
                            className="absolute left-full top-0 ml-2 bg-white border border-gray-300 p-4 w-64 z-20"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                            transition={{ duration: 0.2 }}
                          >
                            <h3 className="text-sm font-light text-gray-900 mb-2">{product.name}</h3>
                            <div className="text-xs text-gray-500 mb-2">
                              Dimensions: {product.dimension}cm
                            </div>
                            <div className="text-xs text-gray-500 mb-2">
                              Material: {product.material}
                            </div>
                            <div className="text-lg font-light text-gray-900 mb-3">{product.price}</div>
                            <motion.button
                              className="text-xs tracking-widest border border-gray-900 px-4 py-2 hover:bg-gray-900 hover:text-white transition-all w-full"
                              onClick={(e) => {
                                e.stopPropagation();
                                addToCart(product);
                              }}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              ADD TO COLLECTION
                            </motion.button>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  ))}
                </div>
                <div className="mt-4 text-xs text-gray-500 text-center">
                  Click on numbered positions to view product details
                </div>
              </div>
            )}
          </div>
        </motion.section>
      </AnimatePresence>

      {/* Technical Footer */}
      <motion.footer
        className="border-t border-gray-200 py-16 px-6 lg:px-8"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-6 h-6 border-2 border-gray-900"></div>
                <h3 className="text-lg font-light text-gray-900">Geometric</h3>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">
                Precision-engineered objects where form follows mathematical function.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h4 className="text-sm tracking-[0.15em] text-gray-500 mb-4">COORDINATES</h4>
              <div className="space-y-2">
                {['Collection', 'Materials', 'Dimensions', 'Specifications'].map((item) => (
                  <motion.a
                    key={item}
                    href="#"
                    className="block text-sm text-gray-600 hover:text-gray-900 transition-colors"
                    whileHover={{ x: 5 }}
                  >
                    {item}
                  </motion.a>
                ))}
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <h4 className="text-sm tracking-[0.15em] text-gray-500 mb-4">MATERIALS</h4>
              <div className="space-y-2">
                {materials.map((material) => (
                  <div key={material} className="text-sm text-gray-600">
                    {material}
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
            >
              <h4 className="text-sm tracking-[0.15em] text-gray-500 mb-4">PRECISION</h4>
              <div className="space-y-2 text-sm text-gray-600">
                <div>Tolerance: ±0.1mm</div>
                <div>Materials: Certified</div>
                <div>Assembly: Manual</div>
                <div>Quality: Verified</div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.footer>
    </motion.div>
  );
}