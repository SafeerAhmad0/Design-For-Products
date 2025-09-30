"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView, useScroll, useTransform } from 'framer-motion';
import { allProducts, featuredProducts, getProductsByCategory, categories } from '@/data/products';
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

const heroImages = [
  featuredProducts[0]?.mainImage || "/products/bedrooms/bedroom15.jpg",
  featuredProducts[1]?.mainImage || "/products/kitchens/kitchen/k1.jpeg",
  featuredProducts[2]?.mainImage || "/products/sofas/modern/m1.jpeg"
];

export default function PolishedMinimalStore() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [hoveredProduct, setHoveredProduct] = useState<number | string | null>(null);
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const featuredRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroImages.length) % heroImages.length);
  };

  const addToCart = (product: Product) => {
    setCartItems(prev => [...prev, product]);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div
      className="min-h-screen bg-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <motion.header
        className="border-b border-gray-100 py-4 sticky top-0 bg-white/80 backdrop-blur-md z-50"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <motion.h1
            className="text-2xl font-light text-gray-900"
            whileHover={{ scale: 1.05 }}
          >
            Minimal Store
          </motion.h1>
          <motion.div
            className="relative"
            whileHover={{ scale: 1.1 }}
          >
            <div className="flex items-center space-x-2 bg-gray-100 px-4 py-2 rounded-full">
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 11-4 0v-6m4 0V9a2 2 0 10-4 0v4.01" />
              </svg>
              <span className="text-sm font-medium text-gray-700">{cartItems.length}</span>
            </div>
            {cartItems.length > 0 && (
              <motion.div
                className="absolute -top-1 -right-1 bg-gray-900 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              >
                {cartItems.length}
              </motion.div>
            )}
          </motion.div>
        </div>
      </motion.header>

      <section className="relative mb-16">
        <motion.div
          className="relative h-96 overflow-hidden bg-gray-50"
          style={{ y }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              className="absolute inset-0"
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.7 }}
            >
              <div
                className="w-full h-full bg-cover bg-center flex items-center justify-center"
                style={{ backgroundImage: `url(${heroImages[currentSlide]})` }}
              >
                <motion.div
                  className="text-center text-gray-700"
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                >
                  <motion.h2
                    className="text-4xl font-light mb-2"
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                  >
                    Premium Quality
                  </motion.h2>
                  <motion.p
                    className="text-lg font-light"
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.7, duration: 0.6 }}
                  >
                    Discover our curated collection
                  </motion.p>
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>

          <motion.button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 shadow-sm transition-all"
            whileHover={{ scale: 1.1, x: -5 }}
            whileTap={{ scale: 0.9 }}
          >
            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </motion.button>

          <motion.button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 shadow-sm transition-all"
            whileHover={{ scale: 1.1, x: 5 }}
            whileTap={{ scale: 0.9 }}
          >
            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </motion.button>
        </motion.div>

        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {heroImages.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentSlide ? 'bg-gray-600' : 'bg-gray-300'
              }`}
              whileHover={{ scale: 1.5 }}
              whileTap={{ scale: 0.8 }}
            />
          ))}
        </div>
      </section>

      <motion.section
        ref={featuredRef}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20"
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-light text-gray-900 mb-4">Featured Items</h2>
          <div className="w-24 h-0.5 bg-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600 font-light">Handpicked favorites from our collection</p>
        </motion.div>

        <div className="relative">
          <div className="flex space-x-6 overflow-x-auto pb-4 scrollbar-hide">
            {featured.map((product, index) => (
              <motion.div
                key={product.id}
                className="flex-none w-80 bg-white border border-gray-100 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500"
                initial={{ opacity: 0, x: 100 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.01 }}
                onMouseEnter={() => setHoveredProduct(`featured-${product.id}`)}
                onMouseLeave={() => setHoveredProduct(null)}
              >
                <div className="relative aspect-square bg-gray-50 overflow-hidden">
                  {/* Theme 1: Clean white background with soft shadow */}
                  <div className="absolute inset-0 bg-white flex items-center justify-center p-6">
                    <motion.div
                      className="relative w-full h-full"
                      animate={{
                        scale: hoveredProduct === `featured-${product.id}` ? 1.1 : 1
                      }}
                      transition={{ duration: 0.6 }}
                    >
                      <Image
                        src={product.mainImage}
                        alt={product.name}
                        fill
                        className="object-contain drop-shadow-xl"
                        sizes="(max-width: 768px) 100vw, 320px"
                      />
                    </motion.div>
                  </div>
                  <motion.div
                    className="absolute top-2 right-2 bg-gray-900 text-white px-2 py-1 rounded-full text-xs font-medium"
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
                  >
                    FEATURED
                  </motion.div>

                  <AnimatePresence>
                    {hoveredProduct === `featured-${product.id}` && (
                      <motion.div
                        className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <motion.button
                          className="bg-white text-gray-900 px-6 py-2 rounded-full font-medium hover:bg-gray-100 transition-colors"
                          onClick={() => addToCart(product)}
                          initial={{ scale: 0, rotate: 180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          exit={{ scale: 0, rotate: -180 }}
                          transition={{ type: "spring", stiffness: 200 }}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          Quick Add
                        </motion.button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="p-6">
                  <motion.h3
                    className="text-lg font-medium text-gray-900 mb-2"
                    animate={{
                      x: hoveredProduct === `featured-${product.id}` ? 10 : 0
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {product.name}
                  </motion.h3>

                  <motion.div
                    className="flex items-center mb-3"
                    animate={{
                      x: hoveredProduct === `featured-${product.id}` ? 10 : 0
                    }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                  >
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <motion.svg
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(product.rating || 0) ? 'text-yellow-400' : 'text-gray-300'
                          }`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          initial={{ opacity: 0, rotate: -180 }}
                          animate={{ opacity: 1, rotate: 0 }}
                          transition={{ delay: i * 0.1 }}
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </motion.svg>
                      ))}
                    </div>
                    <span className="text-sm text-gray-500 ml-2">({product.reviews})</span>
                  </motion.div>

                  <motion.p
                    className="text-sm text-gray-600 mb-4 font-light leading-relaxed"
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
                    <span className="text-xl font-light text-gray-900">{product.price}</span>
                    <motion.button
                      className="px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded hover:bg-gray-800 transition-colors"
                      onClick={() => addToCart(product)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Add to Cart
                    </motion.button>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-light text-gray-900 mb-4">All Products</h2>
          <div className="w-24 h-0.5 bg-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600 font-light">Carefully selected items for modern living</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              className="group bg-white border border-gray-100 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-100px" }}
              whileHover={{ scale: 1.01 }}
              onMouseEnter={() => setHoveredProduct(product.id)}
              onMouseLeave={() => setHoveredProduct(null)}
            >
              <div className="relative aspect-square bg-white flex items-center justify-center border-b border-gray-100 overflow-hidden p-4">
                <motion.div
                  className="relative w-full h-full"
                  animate={{
                    scale: hoveredProduct === product.id ? 1.1 : 1
                  }}
                  transition={{ duration: 0.6 }}
                >
                  <Image
                    src={product.mainImage}
                    alt={product.name}
                    fill
                    className="object-contain drop-shadow-lg"
                    sizes="(max-width: 768px) 100vw, 300px"
                  />
                </motion.div>

                <AnimatePresence>
                  {hoveredProduct === product.id && (
                    <motion.div
                      className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <motion.button
                        className="bg-white text-gray-900 px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-100 transition-colors"
                        onClick={() => addToCart(product)}
                        initial={{ scale: 0, y: 20 }}
                        animate={{ scale: 1, y: 0 }}
                        exit={{ scale: 0, y: 20 }}
                        transition={{ type: "spring", stiffness: 300 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Quick Add
                      </motion.button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="p-4">
                <motion.h3
                  className="text-lg font-medium text-gray-900 mb-2 group-hover:text-gray-700 transition-colors"
                  animate={{
                    x: hoveredProduct === product.id ? 5 : 0
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {product.name}
                </motion.h3>

                <motion.div
                  className="flex items-center mb-2"
                  animate={{
                    x: hoveredProduct === product.id ? 5 : 0
                  }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                >
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <motion.svg
                        key={i}
                        className={`w-3 h-3 ${
                          i < Math.floor(product.rating || 0) ? 'text-yellow-400' : 'text-gray-300'
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.05 }}
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </motion.svg>
                    ))}
                  </div>
                  <span className="text-xs text-gray-500 ml-2">({product.reviews})</span>
                </motion.div>

                <motion.p
                  className="text-sm text-gray-600 mb-3 font-light leading-relaxed"
                  animate={{
                    x: hoveredProduct === product.id ? 5 : 0
                  }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                >
                  {product.description}
                </motion.p>

                <motion.div
                  className="flex items-center justify-between"
                  animate={{
                    x: hoveredProduct === product.id ? 5 : 0
                  }}
                  transition={{ duration: 0.3, delay: 0.3 }}
                >
                  <span className="text-xl font-light text-gray-900">{product.price}</span>
                  <motion.button
                    className="px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded hover:bg-gray-800 transition-colors"
                    onClick={() => addToCart(product)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Add to Cart
                  </motion.button>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </main>

      <motion.footer
        className="bg-gray-50 border-t border-gray-100 py-8"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.p
            className="text-gray-600 font-light"
            whileHover={{ scale: 1.05 }}
          >
            © 2024 Minimal Store. Crafted with care.
          </motion.p>
        </div>
      </motion.footer>
    </motion.div>
  );
}