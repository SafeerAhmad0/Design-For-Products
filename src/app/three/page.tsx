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
  category: string;
  size: 'large' | 'medium' | 'small';
}

const products: Product[] = [
  { id: 1, name: "Architectural Vase", description: "Sculptural ceramic piece inspired by brutalist architecture", price: "$189", featured: true, rating: 4.8, reviews: 234, category: "decor", size: "large" },
  { id: 2, name: "Minimalist Clock", description: "Time piece that disappears into your space", price: "$129", featured: false, rating: 4.7, reviews: 156, category: "decor", size: "medium" },
  { id: 3, name: "Geometric Planter", description: "Angular form meets organic function", price: "$79", featured: true, rating: 4.9, reviews: 289, category: "garden", size: "medium" },
  { id: 4, name: "Abstract Bookend", description: "Functional sculpture for your library", price: "$95", featured: false, rating: 4.6, reviews: 178, category: "office", size: "small" },
  { id: 5, name: "Linear Light Fixture", description: "Illumination as architectural element", price: "$349", featured: true, rating: 4.8, reviews: 145, category: "lighting", size: "large" },
  { id: 6, name: "Modular Storage", description: "Stackable geometry for organized living", price: "$159", featured: false, rating: 4.5, reviews: 203, category: "storage", size: "medium" },
  { id: 7, name: "Floating Shelf", description: "Invisible support, maximum impact", price: "$69", featured: false, rating: 4.4, reviews: 167, category: "storage", size: "small" },
  { id: 8, name: "Sculptural Mirror", description: "Reflection through artistic lens", price: "$229", featured: false, rating: 4.7, reviews: 198, category: "decor", size: "medium" },
  { id: 9, name: "Concrete Candleholder", description: "Industrial beauty meets intimate light", price: "$45", featured: false, rating: 4.3, reviews: 134, category: "decor", size: "small" },
  { id: 10, name: "Textile Wall Art", description: "Fabric as architectural material", price: "$275", featured: false, rating: 4.6, reviews: 112, category: "art", size: "large" }
];

const featuredProducts = products.filter(p => p.featured);
const categories = [...new Set(products.map(p => p.category))];

const heroImages = [
  "https://via.placeholder.com/1400x600/f8f9fa/6c757d?text=Editorial+Design+Collection",
  "https://via.placeholder.com/1400x600/e9ecef/495057?text=Curated+Modern+Living",
  "https://via.placeholder.com/1400x600/dee2e6/343a40?text=Minimal+Aesthetic"
];

export default function MagazineEditorialStore() {
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [hoveredProduct, setHoveredProduct] = useState<number | string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [readingMode, setReadingMode] = useState<boolean>(false);
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);

  const addToCart = (product: Product) => {
    setCartItems(prev => [...prev, product]);
  };

  const filteredProducts = selectedCategory === 'all'
    ? products
    : products.filter(p => p.category === selectedCategory);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroImages.length) % heroImages.length);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  const getMasonryClass = (index: number, size: string) => {
    const patterns = [
      'col-span-2 row-span-2', // large
      'col-span-1 row-span-1', // small
      'col-span-2 row-span-1', // wide
      'col-span-1 row-span-2', // tall
    ];

    if (size === 'large') return 'col-span-2 row-span-2';
    if (size === 'small') return 'col-span-1 row-span-1';
    return index % 2 === 0 ? 'col-span-2 row-span-1' : 'col-span-1 row-span-2';
  };

  return (
    <motion.div
      className="min-h-screen bg-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Elegant Header */}
      <motion.header
        className="border-b border-gray-100 py-8 sticky top-0 bg-white/95 backdrop-blur-sm z-50"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <h1 className="text-3xl font-light tracking-[0.2em] text-gray-900 mb-1">
                EDITORIAL
              </h1>
              <div className="h-px w-16 bg-gray-900"></div>
            </motion.div>

            <motion.nav
              className="hidden md:flex space-x-12"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              {['Collection', 'About', 'Journal', 'Contact'].map((item, index) => (
                <motion.a
                  key={item}
                  href="#"
                  className="text-sm tracking-widest text-gray-600 hover:text-gray-900 transition-colors relative"
                  whileHover={{ y: -2 }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                >
                  {item.toUpperCase()}
                  <motion.div
                    className="absolute bottom-0 left-0 h-px bg-gray-900"
                    initial={{ width: 0 }}
                    whileHover={{ width: '100%' }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.a>
              ))}
            </motion.nav>

            <motion.div
              className="flex items-center space-x-6"
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <motion.button
                onClick={() => setReadingMode(!readingMode)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </motion.button>

              <motion.div
                className="relative"
                whileHover={{ scale: 1.05 }}
              >
                <div className="flex items-center space-x-2 border border-gray-200 px-4 py-2 rounded-full">
                  <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                  <span className="text-sm font-medium text-gray-700">{cartItems.length}</span>
                </div>
                <AnimatePresence>
                  {cartItems.length > 0 && (
                    <motion.div
                      className="absolute -top-1 -right-1 bg-gray-900 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
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
      </motion.header>

      {/* Magazine-Style Hero */}
      <section className="relative h-[80vh] overflow-hidden">
        <motion.div
          className="relative h-full"
          style={{ y }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              className="absolute inset-0"
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
            >
              <div
                className="w-full h-full bg-cover bg-center relative"
                style={{ backgroundImage: `url(${heroImages[currentSlide]})` }}
              >
                <div className="absolute inset-0 bg-white bg-opacity-20"></div>
                <motion.div
                  className="absolute left-12 top-1/2 transform -translate-y-1/2 max-w-lg"
                  initial={{ x: -100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.5, duration: 1 }}
                >
                  <motion.div
                    className="text-xs tracking-[0.3em] text-gray-600 mb-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                  >
                    ISSUE 001 — CURATED LIVING
                  </motion.div>
                  <motion.h2
                    className="text-6xl font-light leading-none text-gray-900 mb-6"
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 1, duration: 0.8 }}
                  >
                    Modern
                    <br />
                    <span className="font-normal">Minimalism</span>
                  </motion.h2>
                  <motion.p
                    className="text-lg text-gray-700 leading-relaxed mb-8"
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 1.2, duration: 0.8 }}
                  >
                    Discover objects that define space through absence,
                    creating environments of intentional simplicity.
                  </motion.p>
                  <motion.button
                    className="border border-gray-900 px-8 py-3 text-sm tracking-widest hover:bg-gray-900 hover:text-white transition-all duration-500"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 1.4, duration: 0.8 }}
                  >
                    EXPLORE COLLECTION
                  </motion.button>
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Minimal Navigation */}
          <div className="absolute bottom-8 right-12 flex space-x-3">
            {heroImages.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 border border-gray-900 transition-all duration-300 ${
                  index === currentSlide ? 'bg-gray-900' : 'bg-transparent'
                }`}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              />
            ))}
          </div>
        </motion.div>
      </section>

      {/* Featured Editorial Section */}
      <motion.section
        className="py-24 px-6 lg:px-8"
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
            <div className="text-xs tracking-[0.3em] text-gray-500 mb-4">FEATURED ARTICLES</div>
            <h2 className="text-4xl font-light text-gray-900 mb-8">Curated Objects</h2>
            <div className="w-24 h-px bg-gray-900 mx-auto"></div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {featuredProducts.map((product, index) => (
              <motion.article
                key={product.id}
                className="group cursor-pointer"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                onMouseEnter={() => setHoveredProduct(product.id)}
                onMouseLeave={() => setHoveredProduct(null)}
              >
                <div className="relative aspect-[4/5] mb-6 overflow-hidden">
                  <motion.div
                    className="w-full h-full bg-cover bg-center"
                    style={{ backgroundImage: `url(https://via.placeholder.com/400x500/f8f9fa/6c757d?text=${encodeURIComponent(product.name)})` }}
                    animate={{
                      scale: hoveredProduct === product.id ? 1.05 : 1
                    }}
                    transition={{ duration: 0.8 }}
                  />
                  <motion.div
                    className="absolute inset-0 bg-black"
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: hoveredProduct === product.id ? 0.1 : 0
                    }}
                    transition={{ duration: 0.3 }}
                  />
                  <motion.div
                    className="absolute bottom-6 left-6 text-white"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{
                      y: hoveredProduct === product.id ? 0 : 20,
                      opacity: hoveredProduct === product.id ? 1 : 0
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="text-xs tracking-widest mb-2">FEATURED</div>
                    <div className="text-lg font-light">{product.price}</div>
                  </motion.div>
                </div>

                <motion.div
                  animate={{
                    x: hoveredProduct === product.id ? 10 : 0
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="text-xs tracking-[0.2em] text-gray-500 mb-2 uppercase">
                    {product.category}
                  </div>
                  <h3 className="text-xl font-light text-gray-900 mb-3 group-hover:text-gray-700 transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-sm mb-4">
                    {product.description}
                  </p>
                  <motion.button
                    className="text-xs tracking-widest text-gray-900 border-b border-transparent hover:border-gray-900 transition-colors"
                    onClick={() => addToCart(product)}
                    whileHover={{ y: -2 }}
                  >
                    ADD TO COLLECTION
                  </motion.button>
                </motion.div>
              </motion.article>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Category Filter */}
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
            <div className="text-xs tracking-[0.3em] text-gray-500 mb-4">BROWSE BY CATEGORY</div>
            <div className="flex justify-center space-x-8">
              <motion.button
                onClick={() => setSelectedCategory('all')}
                className={`text-sm tracking-widest transition-colors relative ${
                  selectedCategory === 'all' ? 'text-gray-900' : 'text-gray-500 hover:text-gray-900'
                }`}
                whileHover={{ y: -2 }}
              >
                ALL
                {selectedCategory === 'all' && (
                  <motion.div
                    className="absolute bottom-0 left-0 w-full h-px bg-gray-900"
                    layoutId="categoryIndicator"
                  />
                )}
              </motion.button>
              {categories.map((category) => (
                <motion.button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`text-sm tracking-widest transition-colors relative uppercase ${
                    selectedCategory === category ? 'text-gray-900' : 'text-gray-500 hover:text-gray-900'
                  }`}
                  whileHover={{ y: -2 }}
                >
                  {category}
                  {selectedCategory === category && (
                    <motion.div
                      className="absolute bottom-0 left-0 w-full h-px bg-gray-900"
                      layoutId="categoryIndicator"
                    />
                  )}
                </motion.button>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Masonry Grid Layout */}
      <motion.section
        className="pb-24 px-6 lg:px-8"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedCategory}
              className="grid grid-cols-3 gap-4 auto-rows-[200px]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              {filteredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  className={`${getMasonryClass(index, product.size)} group cursor-pointer relative overflow-hidden`}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  onMouseEnter={() => setHoveredProduct(product.id)}
                  onMouseLeave={() => setHoveredProduct(null)}
                  layout
                >
                  <motion.div
                    className="w-full h-full bg-cover bg-center relative"
                    style={{ backgroundImage: `url(https://via.placeholder.com/400x400/f8f9fa/6c757d?text=${encodeURIComponent(product.name)})` }}
                    animate={{
                      scale: hoveredProduct === product.id ? 1.02 : 1
                    }}
                    transition={{ duration: 0.6 }}
                  >
                    <motion.div
                      className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center"
                      initial={{ opacity: 0 }}
                      animate={{
                        opacity: hoveredProduct === product.id ? 1 : 0
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <motion.div
                        className="text-center text-white"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{
                          y: hoveredProduct === product.id ? 0 : 20,
                          opacity: hoveredProduct === product.id ? 1 : 0
                        }}
                        transition={{ duration: 0.3, delay: 0.1 }}
                      >
                        <div className="text-xs tracking-[0.2em] mb-2 uppercase opacity-80">
                          {product.category}
                        </div>
                        <h3 className="text-lg font-light mb-2">{product.name}</h3>
                        <div className="text-xl font-normal mb-4">{product.price}</div>
                        <motion.button
                          className="border border-white px-6 py-2 text-xs tracking-widest hover:bg-white hover:text-black transition-all duration-300"
                          onClick={() => addToCart(product)}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          ADD TO CART
                        </motion.button>
                      </motion.div>
                    </motion.div>
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.section>

      {/* Editorial Footer */}
      <motion.footer
        className="border-t border-gray-100 py-16 px-6 lg:px-8"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h3 className="text-lg font-light text-gray-900 mb-4">Editorial</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Curating objects that define modern living through considered design and thoughtful simplicity.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h4 className="text-sm tracking-widest text-gray-500 mb-4">EXPLORE</h4>
              <div className="space-y-2">
                {['Collection', 'About', 'Journal', 'Contact'].map((item) => (
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
              <h4 className="text-sm tracking-widest text-gray-500 mb-4">SUBSCRIBE</h4>
              <p className="text-sm text-gray-600 mb-4">
                Stay informed about new arrivals and editorial features.
              </p>
              <motion.div
                className="flex border-b border-gray-300 pb-2"
                whileHover={{ borderColor: '#1f2937' }}
              >
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 text-sm bg-transparent outline-none text-gray-900 placeholder-gray-500"
                />
                <motion.button
                  className="text-sm tracking-widest text-gray-900"
                  whileHover={{ x: 5 }}
                >
                  SUBMIT
                </motion.button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.footer>
    </motion.div>
  );
}