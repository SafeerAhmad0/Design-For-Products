"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView, useScroll, useTransform } from 'framer-motion';
import { allProducts, featuredProducts, getProductsByCategory, categories as productCategories } from '@/data/products';
import Image from 'next/image';

interface Product {
  id: number;
  name: string;
  description?: string;
  price?: string;
  rating?: number;
  reviews?: number;
  mainImage: string;
  images: string[];
  category: string;
}

const products = allProducts;
const featured = featuredProducts;
const categories = productCategories;

const heroImages = [
  featuredProducts[0]?.mainImage || "/products/bedrooms/bedroom15.jpg",
  featuredProducts[1]?.mainImage || "/products/kitchens/kitchen/k1.jpeg",
  featuredProducts[2]?.mainImage || "/products/sofas/modern/m1.jpeg"
];

export default function WarmLifestyleStore() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [hoveredProduct, setHoveredProduct] = useState<number | string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [isFloating, setIsFloating] = useState<boolean>(false);
  const featuredRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 0.6]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroImages.length) % heroImages.length);
  };

  const addToCart = (product: Product) => {
    setCartItems(prev => [...prev, product]);
    setIsFloating(true);
    setTimeout(() => setIsFloating(false), 1000);
  };

  const filteredProducts = selectedCategory === 'all'
    ? products
    : products.filter(p => p.category === selectedCategory);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div
      className="min-h-screen"
      style={{ backgroundColor: '#faf8f5' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <motion.header
        className="py-6 sticky top-0 bg-opacity-95 backdrop-blur-md z-50"
        style={{ borderBottom: '1px solid #e8e2db', backgroundColor: '#faf8f5' }}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <motion.h1
              className="text-3xl font-serif text-amber-800"
              whileHover={{ scale: 1.05, rotate: 1 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              Cozy Home
            </motion.h1>
            <motion.p
              className="text-amber-700 mt-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Creating warm spaces for better living
            </motion.p>
          </motion.div>

          <motion.div
            className="relative"
            initial={{ x: 50, opacity: 0 }}
            animate={isFloating ? {
              x: 0,
              opacity: 1,
              y: [-5, -15, -5],
              scale: [1, 1.1, 1]
            } : {
              x: 0,
              opacity: 1
            }}
            transition={isFloating ? {
              delay: 0.4,
              duration: 0.6,
              repeat: 1
            } : {
              delay: 0.4,
              duration: 0.6
            }}
          >
            <motion.div
              className="flex items-center space-x-3 bg-amber-100 px-4 py-2 rounded-full shadow-lg"
              whileHover={{ scale: 1.05, backgroundColor: '#f3e8d0' }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <motion.svg
                className="w-5 h-5 text-amber-700"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                animate={{ rotate: cartItems.length > 0 ? [0, 10, -10, 0] : 0 }}
                transition={{ duration: 0.5 }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 11-4 0v-6m4 0V9a2 2 0 10-4 0v4.01" />
              </motion.svg>
              <span className="text-sm font-medium text-amber-800">{cartItems.length} items</span>
            </motion.div>
            <AnimatePresence>
              {cartItems.length > 0 && (
                <motion.div
                  className="absolute -top-1 -right-1 bg-amber-600 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center"
                  initial={{ scale: 0, rotate: 180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  exit={{ scale: 0, rotate: 180 }}
                  transition={{ type: "spring", stiffness: 500 }}
                >
                  {cartItems.length}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </motion.header>

      <section className="relative mb-20">
        <motion.div
          className="relative h-96 overflow-hidden"
          style={{ y: y, opacity: opacity }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              className="absolute inset-0"
              initial={{ opacity: 0, scale: 1.2, rotate: 2 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.8, rotate: -2 }}
              transition={{ duration: 1, ease: "easeInOut" }}
            >
              <motion.div
                className="w-full h-full bg-cover bg-center flex items-center justify-center relative"
                style={{ backgroundImage: `url(${heroImages[currentSlide]})` }}
              >
                <div className="absolute inset-0 bg-black bg-opacity-20"></div>
                <motion.div
                  className="relative text-center text-amber-900 bg-white bg-opacity-90 p-8 rounded-2xl shadow-2xl"
                  initial={{ y: 100, opacity: 0, scale: 0.8 }}
                  animate={{ y: 0, opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4, duration: 0.8, type: "spring", stiffness: 100 }}
                  whileHover={{ scale: 1.05, rotate: 1 }}
                >
                  <motion.h2
                    className="text-5xl font-serif mb-4"
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.6, duration: 0.6 }}
                  >
                    Welcome Home
                  </motion.h2>
                  <motion.p
                    className="text-xl"
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.8, duration: 0.6 }}
                  >
                    Discover comfort in every detail
                  </motion.p>
                  <motion.div
                    className="w-16 h-1 bg-amber-600 mx-auto mt-4"
                    initial={{ width: 0 }}
                    animate={{ width: 64 }}
                    transition={{ delay: 1, duration: 0.8 }}
                  ></motion.div>
                </motion.div>
              </motion.div>
            </motion.div>
          </AnimatePresence>

          <motion.button
            onClick={prevSlide}
            className="absolute left-6 top-1/2 transform -translate-y-1/2 bg-amber-100 hover:bg-amber-200 rounded-full p-4 shadow-xl transition-all"
            whileHover={{ scale: 1.1, x: -5, backgroundColor: '#f3e8d0' }}
            whileTap={{ scale: 0.9 }}
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 1.2, type: "spring", stiffness: 200 }}
          >
            <motion.svg
              className="w-6 h-6 text-amber-800"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              whileHover={{ x: -2 }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </motion.svg>
          </motion.button>

          <motion.button
            onClick={nextSlide}
            className="absolute right-6 top-1/2 transform -translate-y-1/2 bg-amber-100 hover:bg-amber-200 rounded-full p-4 shadow-xl transition-all"
            whileHover={{ scale: 1.1, x: 5, backgroundColor: '#f3e8d0' }}
            whileTap={{ scale: 0.9 }}
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 1.2, type: "spring", stiffness: 200 }}
          >
            <motion.svg
              className="w-6 h-6 text-amber-800"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              whileHover={{ x: 2 }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </motion.svg>
          </motion.button>
        </motion.div>

        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-4"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.6 }}
        >
          {heroImages.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-4 h-4 rounded-full transition-all ${
                index === currentSlide ? 'bg-amber-600 shadow-lg' : 'bg-amber-300'
              }`}
              whileHover={{ scale: 1.3 }}
              whileTap={{ scale: 0.8 }}
              animate={{
                scale: index === currentSlide ? 1.2 : 1,
                backgroundColor: index === currentSlide ? '#d97706' : '#fcd34d'
              }}
            />
          ))}
        </motion.div>
      </section>

      <motion.section
        ref={featuredRef}
        className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-24"
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.h2
            className="text-4xl font-serif text-amber-900 mb-6"
            whileHover={{ scale: 1.05, rotate: 1 }}
          >
            Featured Treasures
          </motion.h2>
          <motion.div
            className="w-32 h-1 bg-amber-600 mx-auto mb-6"
            initial={{ width: 0 }}
            whileInView={{ width: 128 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            viewport={{ once: true }}
          ></motion.div>
          <p className="text-amber-700 text-lg max-w-2xl mx-auto leading-relaxed">
            Handpicked items that bring warmth and character to your home
          </p>
        </motion.div>

        <div className="relative">
          <motion.div
            className="flex space-x-8 overflow-x-auto pb-6 scrollbar-hide"
            drag="x"
            dragConstraints={{ left: -800, right: 0 }}
          >
            {featured.map((product, index) => (
              <motion.div
                key={product.id}
                className="flex-none w-96 bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500"
                style={{ border: '2px solid #f0e6d6' }}
                initial={{ opacity: 0, x: 100, rotate: 5 }}
                whileInView={{ opacity: 1, x: 0, rotate: 0 }}
                transition={{ duration: 0.8, delay: index * 0.3 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.01 }}
                onMouseEnter={() => setHoveredProduct(`featured-${product.id}`)}
                onMouseLeave={() => setHoveredProduct(null)}
              >
                <div className="relative aspect-square overflow-hidden p-8">
                  {/* Theme 2: Warm beige/cream gradient background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50"></div>
                  <motion.div
                    className="relative w-full h-full rounded-2xl shadow-lg overflow-hidden"
                    animate={{
                      scale: hoveredProduct === `featured-${product.id}` ? 1.1 : 1,
                      rotate: hoveredProduct === `featured-${product.id}` ? 2 : 0
                    }}
                    transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
                  >
                    <Image
                      src={product.mainImage}
                      alt={product.name}
                      fill
                      className="object-contain"
                      sizes="(max-width: 768px) 100vw, 320px"
                    />
                  </motion.div>

                  <motion.div
                    className="absolute top-4 right-4 bg-amber-600 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg"
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.5 + index * 0.1, type: "spring", stiffness: 200 }}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    FEATURED
                  </motion.div>

                  <AnimatePresence>
                    {hoveredProduct === `featured-${product.id}` && (
                      <motion.div
                        className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center rounded-2xl"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <motion.button
                          className="bg-white text-amber-800 px-8 py-3 rounded-full font-semibold hover:bg-amber-50 transition-colors shadow-xl"
                          onClick={() => addToCart(product)}
                          initial={{ scale: 0, rotate: 180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          exit={{ scale: 0, rotate: -180 }}
                          transition={{ type: "spring", stiffness: 300 }}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          Add to Cart
                        </motion.button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="p-8" style={{ backgroundColor: '#fffbf7' }}>
                  <motion.h3
                    className="text-2xl font-serif text-amber-900 mb-4"
                    animate={{
                      x: hoveredProduct === `featured-${product.id}` ? 10 : 0
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {product.name}
                  </motion.h3>

                  <motion.div
                    className="flex items-center mb-4"
                    animate={{
                      x: hoveredProduct === `featured-${product.id}` ? 10 : 0
                    }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                  >
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <motion.svg
                          key={i}
                          className={`w-5 h-5 ${
                            i < Math.floor(product.rating || 0) ? 'text-yellow-500' : 'text-gray-300'
                          }`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          initial={{ opacity: 0, rotate: -180, scale: 0 }}
                          animate={{ opacity: 1, rotate: 0, scale: 1 }}
                          transition={{ delay: i * 0.1 }}
                          whileHover={{ scale: 1.2, rotate: 10 }}
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </motion.svg>
                      ))}
                    </div>
                    <span className="text-sm text-amber-600 ml-3 font-medium">({product.reviews} reviews)</span>
                  </motion.div>

                  <motion.p
                    className="text-amber-700 mb-6 leading-relaxed"
                    animate={{
                      x: hoveredProduct === `featured-${product.id}` ? 10 : 0
                    }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                  >
                    {product.description}
                  </motion.p>

                  <motion.div
                    className="flex items-center justify-between"
                    animate={{
                      x: hoveredProduct === `featured-${product.id}` ? 10 : 0
                    }}
                    transition={{ duration: 0.3, delay: 0.3 }}
                  >
                    <span className="text-3xl font-serif text-amber-800">{product.price}</span>
                    <motion.button
                      className="px-8 py-3 bg-amber-600 hover:bg-amber-700 text-white rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
                      onClick={() => addToCart(product)}
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Add to Cart
                    </motion.button>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.h2
            className="text-4xl font-serif text-amber-900 mb-6"
            whileHover={{ scale: 1.05, rotate: 1 }}
          >
            Complete Collection
          </motion.h2>
          <motion.div
            className="w-32 h-1 bg-amber-600 mx-auto mb-6"
            initial={{ width: 0 }}
            whileInView={{ width: 128 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            viewport={{ once: true }}
          ></motion.div>

          <motion.div
            className="flex justify-center space-x-4 mb-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            viewport={{ once: true }}
          >
            <motion.button
              onClick={() => setSelectedCategory('all')}
              className={`px-6 py-2 rounded-full font-medium transition-all ${
                selectedCategory === 'all'
                  ? 'bg-amber-600 text-white shadow-lg'
                  : 'bg-amber-100 text-amber-800 hover:bg-amber-200'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              All Items
            </motion.button>
            {categories.map((category) => (
              <motion.button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full font-medium transition-all capitalize ${
                  selectedCategory === category
                    ? 'bg-amber-600 text-white shadow-lg'
                    : 'bg-amber-100 text-amber-800 hover:bg-amber-200'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 * categories.indexOf(category) }}
              >
                {category}
              </motion.button>
            ))}
          </motion.div>

          <p className="text-amber-700 text-lg max-w-2xl mx-auto leading-relaxed">
            Each piece is thoughtfully selected to bring warmth and character to your living space
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCategory}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500"
                style={{ border: '2px solid #f0e6d6' }}
                initial={{ opacity: 0, y: 50, rotate: 2 }}
                animate={{ opacity: 1, y: 0, rotate: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.01 }}
                onMouseEnter={() => setHoveredProduct(product.id)}
                onMouseLeave={() => setHoveredProduct(null)}
                layout
              >
                <div className="relative aspect-square overflow-hidden p-6">
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50"></div>
                  <motion.div
                    className="relative w-full h-full rounded-2xl shadow-lg overflow-hidden"
                    animate={{
                      scale: hoveredProduct === product.id ? 1.1 : 1,
                      rotate: hoveredProduct === product.id ? 3 : 0
                    }}
                    transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
                  >
                    <Image
                      src={product.mainImage}
                      alt={product.name}
                      fill
                      className="object-contain"
                      sizes="(max-width: 768px) 100vw, 280px"
                    />
                  </motion.div>

                  <motion.div
                    className="absolute top-3 left-3 bg-amber-600 text-white px-2 py-1 rounded-full text-xs font-semibold capitalize"
                    initial={{ scale: 0, x: -20 }}
                    animate={{ scale: 1, x: 0 }}
                    transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    {product.category}
                  </motion.div>

                  <AnimatePresence>
                    {hoveredProduct === product.id && (
                      <motion.div
                        className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center rounded-2xl"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <motion.button
                          className="bg-white text-amber-800 px-6 py-2 rounded-full font-semibold hover:bg-amber-50 transition-colors shadow-xl"
                          onClick={() => addToCart(product)}
                          initial={{ scale: 0, rotate: 180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          exit={{ scale: 0, rotate: -180 }}
                          transition={{ type: "spring", stiffness: 300 }}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          Quick Add
                        </motion.button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="p-6" style={{ backgroundColor: '#fffbf7' }}>
                  <motion.h3
                    className="text-xl font-serif text-amber-900 mb-3 group-hover:text-amber-700 transition-colors"
                    animate={{
                      x: hoveredProduct === product.id ? 8 : 0
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {product.name}
                  </motion.h3>

                  <motion.div
                    className="flex items-center mb-3"
                    animate={{
                      x: hoveredProduct === product.id ? 8 : 0
                    }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                  >
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <motion.svg
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(product.rating || 0) ? 'text-yellow-500' : 'text-gray-300'
                          }`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          initial={{ opacity: 0, rotate: -90 }}
                          animate={{ opacity: 1, rotate: 0 }}
                          transition={{ delay: i * 0.05 }}
                          whileHover={{ scale: 1.2, rotate: 15 }}
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </motion.svg>
                      ))}
                    </div>
                    <span className="text-sm text-amber-600 ml-2 font-medium">({product.reviews})</span>
                  </motion.div>

                  <motion.p
                    className="text-amber-700 mb-4 leading-relaxed text-sm"
                    animate={{
                      x: hoveredProduct === product.id ? 8 : 0
                    }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                  >
                    {product.description}
                  </motion.p>

                  <motion.div
                    className="flex items-center justify-between"
                    animate={{
                      x: hoveredProduct === product.id ? 8 : 0
                    }}
                    transition={{ duration: 0.3, delay: 0.3 }}
                  >
                    <span className="text-2xl font-serif text-amber-800">{product.price}</span>
                    <motion.button
                      className="px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
                      onClick={() => addToCart(product)}
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Add to Cart
                    </motion.button>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </main>

      <motion.footer
        className="py-16"
        style={{ backgroundColor: '#f5ede4', borderTop: '1px solid #e8e2db' }}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.h3
              className="text-3xl font-serif text-amber-800 mb-4"
              whileHover={{ scale: 1.05, rotate: 1 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              Cozy Home
            </motion.h3>
            <motion.div
              className="w-24 h-1 bg-amber-600 mx-auto mb-4"
              initial={{ width: 0 }}
              whileInView={{ width: 96 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              viewport={{ once: true }}
            ></motion.div>
            <motion.p
              className="text-amber-700 text-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              viewport={{ once: true }}
            >
              Creating beautiful, comfortable spaces since 2020
            </motion.p>
          </div>
        </div>
      </motion.footer>
    </motion.div>
  );
}