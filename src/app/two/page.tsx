"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView, useScroll, useTransform, useAnimation } from 'framer-motion';

interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  featured: boolean;
  rating: number;
  reviews: number;
  tier: string;
  specs: string;
}

interface MousePosition {
  x: number;
  y: number;
}

const products = [
  { id: 1, name: "Elite Gaming Setup", description: "Professional gaming workstation with RGB lighting", price: "$2,499", featured: true, rating: 4.9, reviews: 1247, tier: "ELITE", specs: "RTX 4090 | 64GB RAM | 2TB SSD" },
  { id: 2, name: "Titanium Smartwatch", description: "Premium wearable with advanced health monitoring", price: "$899", featured: false, rating: 4.8, reviews: 892, tier: "PRO", specs: "7-day battery | GPS | Health sensors" },
  { id: 3, name: "Carbon Fiber Laptop", description: "Ultra-lightweight with maximum performance", price: "$3,299", featured: true, rating: 4.9, reviews: 567, tier: "ELITE", specs: "M3 Max | 128GB RAM | 8TB SSD" },
  { id: 4, name: "Studio Monitor Speakers", description: "Professional-grade audio for creators", price: "$1,599", featured: false, rating: 4.7, reviews: 234, tier: "PRO", specs: "Hi-Res Audio | Active monitors | Studio grade" },
  { id: 5, name: "Mechanical Masterpiece", description: "Handcrafted keyboard with custom switches", price: "$499", featured: true, rating: 4.8, reviews: 789, tier: "PRO", specs: "Custom switches | RGB | Wireless" },
  { id: 6, name: "4K Webcam Pro", description: "Crystal clear video for professional streaming", price: "$349", featured: false, rating: 4.6, reviews: 445, tier: "STANDARD", specs: "4K 60fps | Auto focus | HDR" },
  { id: 7, name: "Wireless Charging Pad", description: "Fast charging with sleek aluminum design", price: "$129", featured: false, rating: 4.5, reviews: 678, tier: "STANDARD", specs: "15W fast charge | Aluminum | Qi certified" },
  { id: 8, name: "Noise-Canceling Headset", description: "Industry-leading audio technology", price: "$449", featured: false, rating: 4.7, reviews: 923, tier: "PRO", specs: "40hr battery | ANC | Hi-Res Audio" },
  { id: 9, name: "Smart Home Hub", description: "Control your entire smart home ecosystem", price: "$299", featured: false, rating: 4.4, reviews: 356, tier: "STANDARD", specs: "Matter support | Voice control | 100+ devices" },
  { id: 10, name: "Premium Phone Case", description: "Military-grade protection with style", price: "$89", featured: false, rating: 4.3, reviews: 1123, tier: "STANDARD", specs: "Drop test 12ft | Wireless charging | Carbon fiber" }
];

const featuredProducts = products.filter(p => p.featured);
const tiers = ['ELITE', 'PRO', 'STANDARD'];

const heroImages = [
  "https://via.placeholder.com/1200x400/000000/FFD700?text=Premium+Tech+Collection",
  "https://via.placeholder.com/1200x400/1a1a1a/00FFFF?text=Next-Gen+Innovation",
  "https://via.placeholder.com/1200x400/111111/FF6B35?text=Elite+Performance"
];

export default function BoldPremiumStore() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [hoveredProduct, setHoveredProduct] = useState<number | string | null>(null);
  const [selectedTier, setSelectedTier] = useState<string>('ALL');
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [isMatrixEffect, setIsMatrixEffect] = useState<boolean>(false);
  const [mousePosition, setMousePosition] = useState<MousePosition>({ x: 0, y: 0 });
  const featuredRef = useRef(null);
  const controls = useAnimation();
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);
  const rotateX = useTransform(scrollYProgress, [0, 1], [0, 360]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroImages.length) % heroImages.length);
  };

  const addToCart = (product: Product) => {
    setCartItems(prev => [...prev, product]);
    setIsMatrixEffect(true);
    setTimeout(() => setIsMatrixEffect(false), 2000);
  };

  const filteredProducts = selectedTier === 'ALL'
    ? products
    : products.filter(p => p.tier === selectedTier);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    controls.start({
      background: [
        'linear-gradient(45deg, #000000, #1a1a1a)',
        'linear-gradient(135deg, #000000, #2d2d2d)',
        'linear-gradient(225deg, #1a1a1a, #000000)',
        'linear-gradient(315deg, #2d2d2d, #000000)'
      ],
      transition: { duration: 10, repeat: Infinity, ease: 'linear' }
    });
  }, [controls]);

  return (
    <motion.div
      className="min-h-screen text-white relative overflow-hidden"
      animate={controls}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
    >
      <motion.div
        className="absolute inset-0 bg-black opacity-90"
        animate={{
          background: isMatrixEffect
            ? 'radial-gradient(circle at 50% 50%, #00ff00 0%, #000000 70%)'
            : 'linear-gradient(45deg, #000000, #1a1a1a)'
        }}
        transition={{ duration: 0.5 }}
      />

      <motion.div
        className="absolute w-2 h-2 bg-yellow-400 rounded-full pointer-events-none z-50"
        animate={{
          x: mousePosition.x - 4,
          y: mousePosition.y - 4,
          scale: hoveredProduct ? 2 : 1
        }}
        transition={{ type: "spring", stiffness: 500, damping: 28 }}
      />
      <motion.header
        className="border-b border-gray-800 py-6 sticky top-0 bg-black bg-opacity-95 backdrop-blur-md z-40"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, type: "spring", stiffness: 100 }}
        style={{ y: y }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <motion.h1
              className="text-4xl font-bold tracking-wider text-yellow-400"
              whileHover={{
                scale: 1.1,
                textShadow: '0 0 20px #FFD700, 0 0 40px #FFD700',
                letterSpacing: '0.3em'
              }}
              animate={{
                textShadow: [
                  '0 0 10px #FFD700',
                  '0 0 20px #FFD700, 0 0 30px #FFD700',
                  '0 0 10px #FFD700'
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              APEX TECH
            </motion.h1>
            <motion.p
              className="text-gray-300 mt-2 font-light tracking-widest"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              PREMIUM TECHNOLOGY FOR ELITE USERS
            </motion.p>
          </motion.div>

          <motion.div
            className="relative"
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <motion.div
              className="flex items-center space-x-4 bg-gray-900 border border-yellow-400 px-6 py-3 rounded-none"
              whileHover={{
                scale: 1.05,
                boxShadow: '0 0 30px rgba(255, 215, 0, 0.5)',
                borderColor: '#FFD700'
              }}
              animate={isMatrixEffect ? {
                boxShadow: [
                  '0 0 20px #00ff00',
                  '0 0 40px #00ff00, 0 0 60px #00ff00',
                  '0 0 20px #00ff00'
                ]
              } : {}}
              transition={{ duration: 0.3 }}
            >
              <motion.svg
                className="w-6 h-6 text-yellow-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                animate={{
                  rotate: cartItems.length > 0 ? [0, 360] : 0,
                  scale: cartItems.length > 0 ? [1, 1.2, 1] : 1
                }}
                transition={{ duration: 0.8 }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 11-4 0v-6m4 0V9a2 2 0 10-4 0v4.01" />
              </motion.svg>
              <span className="text-yellow-400 font-bold tracking-wider">{cartItems.length} ITEMS</span>
            </motion.div>

            <AnimatePresence>
              {cartItems.length > 0 && (
                <motion.div
                  className="absolute -top-2 -right-2 bg-yellow-400 text-black text-sm font-bold rounded-none w-8 h-8 flex items-center justify-center"
                  initial={{ scale: 0, rotate: 180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  exit={{ scale: 0, rotate: 180 }}
                  transition={{ type: "spring", stiffness: 500 }}
                  style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }}
                >
                  {cartItems.length}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </motion.header>

      <section className="relative mb-24">
        <motion.div
          className="relative h-[500px] overflow-hidden bg-gray-900"
          style={{ rotateX }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              className="absolute inset-0"
              initial={{ opacity: 0, scale: 1.2, rotateY: 90 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              exit={{ opacity: 0, scale: 0.8, rotateY: -90 }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
            >
              <motion.div
                className="w-full h-full bg-cover bg-center flex items-center justify-center relative"
                style={{ backgroundImage: `url(${heroImages[currentSlide]})` }}
                animate={{
                  filter: [
                    'brightness(1) contrast(1.2) saturate(1.5)',
                    'brightness(1.1) contrast(1.3) saturate(1.6)',
                    'brightness(1) contrast(1.2) saturate(1.5)'
                  ]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <motion.div
                  className="absolute inset-0 bg-black bg-opacity-60"
                  animate={{
                    background: [
                      'radial-gradient(circle at 20% 80%, rgba(255,215,0,0.3) 0%, rgba(0,0,0,0.8) 50%)',
                      'radial-gradient(circle at 80% 20%, rgba(255,215,0,0.3) 0%, rgba(0,0,0,0.8) 50%)',
                      'radial-gradient(circle at 50% 50%, rgba(255,215,0,0.3) 0%, rgba(0,0,0,0.8) 50%)'
                    ]
                  }}
                  transition={{ duration: 4, repeat: Infinity }}
                />

                <motion.div
                  className="relative text-center z-10"
                  initial={{ y: 150, opacity: 0, scale: 0.5 }}
                  animate={{ y: 0, opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5, duration: 1, type: "spring", stiffness: 100 }}
                >
                  <motion.h2
                    className="text-7xl font-bold mb-6 text-yellow-400 tracking-widest"
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.8, duration: 0.8 }}
                    whileHover={{
                      scale: 1.1,
                      textShadow: '0 0 40px #FFD700, 0 0 80px #FFD700',
                      letterSpacing: '0.5em'
                    }}
                    animate={{
                      textShadow: [
                        '0 0 20px #FFD700',
                        '0 0 40px #FFD700, 0 0 60px #FFD700',
                        '0 0 20px #FFD700'
                      ]
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    UNLEASH POWER
                  </motion.h2>

                  <motion.p
                    className="text-2xl text-gray-200 tracking-widest font-light mb-8"
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 1, duration: 0.8 }}
                  >
                    EXPERIENCE THE FUTURE OF TECHNOLOGY
                  </motion.p>

                  <motion.div
                    className="flex justify-center space-x-4"
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 1.2, duration: 0.8 }}
                  >
                    <motion.div
                      className="h-1 bg-yellow-400"
                      initial={{ width: 0 }}
                      animate={{ width: 100 }}
                      transition={{ delay: 1.5, duration: 1 }}
                    />
                    <motion.div
                      className="h-1 bg-yellow-400"
                      initial={{ width: 0 }}
                      animate={{ width: 50 }}
                      transition={{ delay: 1.7, duration: 0.8 }}
                    />
                    <motion.div
                      className="h-1 bg-yellow-400"
                      initial={{ width: 0 }}
                      animate={{ width: 75 }}
                      transition={{ delay: 1.9, duration: 0.6 }}
                    />
                  </motion.div>
                </motion.div>
              </motion.div>
            </motion.div>
          </AnimatePresence>

          <motion.button
            onClick={prevSlide}
            className="absolute left-8 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-70 hover:bg-opacity-90 border border-yellow-400 hover:border-yellow-300 rounded-none p-4 group"
            whileHover={{
              scale: 1.2,
              x: -10,
              boxShadow: '0 0 30px rgba(255, 215, 0, 0.8)',
              backgroundColor: 'rgba(255, 215, 0, 0.1)'
            }}
            whileTap={{ scale: 0.9 }}
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 2, type: "spring", stiffness: 200 }}
          >
            <motion.svg
              className="w-6 h-6 text-yellow-400 group-hover:text-yellow-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              whileHover={{ x: -5, scale: 1.2 }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </motion.svg>
          </motion.button>

          <motion.button
            onClick={nextSlide}
            className="absolute right-8 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-70 hover:bg-opacity-90 border border-yellow-400 hover:border-yellow-300 rounded-none p-4 group"
            whileHover={{
              scale: 1.2,
              x: 10,
              boxShadow: '0 0 30px rgba(255, 215, 0, 0.8)',
              backgroundColor: 'rgba(255, 215, 0, 0.1)'
            }}
            whileTap={{ scale: 0.9 }}
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 2, type: "spring", stiffness: 200 }}
          >
            <motion.svg
              className="w-6 h-6 text-yellow-400 group-hover:text-yellow-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              whileHover={{ x: 5, scale: 1.2 }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </motion.svg>
          </motion.button>
        </motion.div>

        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-6"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 2.2, duration: 0.8 }}
        >
          {heroImages.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-6 h-6 border-2 transition-all duration-500 ${
                index === currentSlide
                  ? 'border-yellow-400 bg-yellow-400'
                  : 'border-gray-500 hover:border-yellow-400'
              }`}
              style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }}
              whileHover={{
                scale: 1.5,
                rotate: 180,
                boxShadow: '0 0 20px rgba(255, 215, 0, 0.8)'
              }}
              whileTap={{ scale: 0.8 }}
              animate={{
                rotate: index === currentSlide ? [0, 360] : 0,
                boxShadow: index === currentSlide
                  ? '0 0 20px rgba(255, 215, 0, 0.8)'
                  : '0 0 0px rgba(255, 215, 0, 0)'
              }}
              transition={{ duration: 0.8 }}
            />
          ))}
        </motion.div>
      </section>

      <motion.section
        ref={featuredRef}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-32"
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2 }}
        viewport={{ once: true }}
      >
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <motion.h2
            className="text-5xl font-bold text-yellow-400 mb-8 tracking-widest"
            whileHover={{
              scale: 1.1,
              textShadow: '0 0 40px #FFD700, 0 0 80px #FFD700',
              letterSpacing: '0.5em'
            }}
            animate={{
              textShadow: [
                '0 0 20px #FFD700',
                '0 0 40px #FFD700, 0 0 60px #FFD700',
                '0 0 20px #FFD700'
              ]
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            ELITE COLLECTION
          </motion.h2>

          <motion.div
            className="flex justify-center space-x-4 mb-8"
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.div
              className="h-2 bg-yellow-400"
              initial={{ width: 0 }}
              whileInView={{ width: 150 }}
              transition={{ delay: 0.5, duration: 1 }}
              viewport={{ once: true }}
            />
            <motion.div
              className="h-2 bg-yellow-400"
              initial={{ width: 0 }}
              whileInView={{ width: 100 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              viewport={{ once: true }}
            />
            <motion.div
              className="h-2 bg-yellow-400"
              initial={{ width: 0 }}
              whileInView={{ width: 75 }}
              transition={{ delay: 0.9, duration: 0.6 }}
              viewport={{ once: true }}
            />
          </motion.div>

          <p className="text-gray-300 text-xl max-w-4xl mx-auto leading-relaxed tracking-wide mb-12">
            CUTTING-EDGE TECHNOLOGY DESIGNED FOR THOSE WHO DEMAND THE ABSOLUTE BEST
          </p>

          <motion.div
            className="flex justify-center space-x-6"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.button
              onClick={() => setSelectedTier('ALL')}
              className={`px-8 py-4 border-2 font-bold tracking-widest transition-all ${
                selectedTier === 'ALL'
                  ? 'border-yellow-400 bg-yellow-400 text-black'
                  : 'border-gray-500 text-gray-300 hover:border-yellow-400 hover:text-yellow-400'
              }`}
              whileHover={{
                scale: 1.1,
                boxShadow: '0 0 30px rgba(255, 215, 0, 0.8)'
              }}
              whileTap={{ scale: 0.95 }}
            >
              ALL TIERS
            </motion.button>
            {tiers.map((tier) => (
              <motion.button
                key={tier}
                onClick={() => setSelectedTier(tier)}
                className={`px-8 py-4 border-2 font-bold tracking-widest transition-all ${
                  selectedTier === tier
                    ? 'border-yellow-400 bg-yellow-400 text-black'
                    : 'border-gray-500 text-gray-300 hover:border-yellow-400 hover:text-yellow-400'
                }`}
                whileHover={{
                  scale: 1.1,
                  boxShadow: '0 0 30px rgba(255, 215, 0, 0.8)'
                }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 * tiers.indexOf(tier) }}
              >
                {tier}
              </motion.button>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          className="relative"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="flex space-x-10 overflow-x-auto pb-8 scrollbar-hide"
            drag="x"
            dragConstraints={{ left: -1200, right: 0 }}
          >
            {featuredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                className="flex-none w-[500px] bg-gray-900 border border-gray-700 hover:border-yellow-400 transition-all duration-700 overflow-hidden relative"
                style={{
                  background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)',
                  boxShadow: '0 20px 40px rgba(0, 0, 0, 0.8)'
                }}
                initial={{ opacity: 0, x: 200, rotateY: 45 }}
                whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
                transition={{ duration: 1, delay: index * 0.3 }}
                viewport={{ once: true }}
                whileHover={{
                  boxShadow: '0 30px 60px rgba(255, 215, 0, 0.3)',
                  borderColor: '#FFD700'
                }}
                onMouseEnter={() => setHoveredProduct(`featured-${product.id}`)}
                onMouseLeave={() => setHoveredProduct(null)}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-yellow-400/0 via-yellow-400/10 to-yellow-400/0 opacity-0"
                  animate={{
                    opacity: hoveredProduct === `featured-${product.id}` ? 1 : 0,
                    x: hoveredProduct === `featured-${product.id}` ? ['-100%', '100%'] : '-100%'
                  }}
                  transition={{ duration: 1.5, repeat: hoveredProduct === `featured-${product.id}` ? Infinity : 0 }}
                />

                <div className="flex h-80">
                  <div className="w-1/2 relative overflow-hidden">
                    <motion.div
                      className="w-full h-full bg-cover bg-center"
                      style={{
                        backgroundImage: `url(https://via.placeholder.com/400x400/1a1a1a/FFD700?text=${encodeURIComponent(product.name)})`,
                        filter: 'brightness(1.1) contrast(1.3)'
                      }}
                      animate={{
                        scale: hoveredProduct === `featured-${product.id}` ? 1.2 : 1,
                        rotate: hoveredProduct === `featured-${product.id}` ? 5 : 0
                      }}
                      transition={{ duration: 0.8 }}
                    />

                    <motion.div
                      className="absolute inset-0 bg-black bg-opacity-30"
                      animate={{
                        opacity: hoveredProduct === `featured-${product.id}` ? 0 : 0.3
                      }}
                      transition={{ duration: 0.5 }}
                    />

                    <motion.div
                      className="absolute top-4 right-4 bg-yellow-400 text-black px-3 py-1 font-bold text-sm tracking-widest"
                      style={{ clipPath: 'polygon(0 0, 100% 0, 85% 100%, 0% 100%)' }}
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ delay: 0.5 + index * 0.1, type: "spring", stiffness: 200 }}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                    >
                      {product.tier}
                    </motion.div>

                    <motion.div
                      className="absolute bottom-4 left-4 w-4 h-4 bg-yellow-400 rounded-full"
                      animate={{
                        scale: [1, 1.5, 1],
                        opacity: [1, 0.7, 1]
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </div>

                  <div className="w-1/2 p-8 flex flex-col justify-center relative">
                    <motion.div
                      className="absolute top-0 left-0 w-2 h-full bg-yellow-400"
                      initial={{ scaleY: 0 }}
                      animate={{
                        scaleY: hoveredProduct === `featured-${product.id}` ? 1 : 0
                      }}
                      transition={{ duration: 0.8 }}
                      style={{ originY: 0 }}
                    />

                    <motion.h3
                      className="text-2xl font-bold text-white mb-4 tracking-wide"
                      animate={{
                        x: hoveredProduct === `featured-${product.id}` ? 10 : 0,
                        color: hoveredProduct === `featured-${product.id}` ? '#FFD700' : '#FFFFFF'
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
                              i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-600'
                            }`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            initial={{ opacity: 0, rotate: -180, scale: 0 }}
                            animate={{ opacity: 1, rotate: 0, scale: 1 }}
                            transition={{ delay: i * 0.1 }}
                            whileHover={{ scale: 1.3, rotate: 360 }}
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </motion.svg>
                        ))}
                      </div>
                      <span className="text-gray-400 ml-3 font-bold">({product.reviews})</span>
                    </motion.div>

                    <motion.p
                      className="text-gray-400 mb-4 leading-relaxed tracking-wide text-sm"
                      animate={{
                        x: hoveredProduct === `featured-${product.id}` ? 10 : 0
                      }}
                      transition={{ duration: 0.3, delay: 0.2 }}
                    >
                      {product.description}
                    </motion.p>

                    <motion.p
                      className="text-yellow-400 mb-6 text-xs font-bold tracking-widest"
                      animate={{
                        x: hoveredProduct === `featured-${product.id}` ? 10 : 0
                      }}
                      transition={{ duration: 0.3, delay: 0.25 }}
                    >
                      {product.specs}
                    </motion.p>

                    <motion.div
                      className="flex items-center justify-between"
                      animate={{
                        x: hoveredProduct === `featured-${product.id}` ? 10 : 0
                      }}
                      transition={{ duration: 0.3, delay: 0.3 }}
                    >
                      <span className="text-4xl font-bold text-yellow-400 tracking-wider">{product.price}</span>
                      <motion.button
                        className="bg-black border-2 border-yellow-400 text-yellow-400 px-8 py-4 font-bold tracking-widest hover:bg-yellow-400 hover:text-black transition-all duration-500"
                        onClick={() => addToCart(product)}
                        whileHover={{
                          scale: 1.1,
                          boxShadow: '0 0 30px rgba(255, 215, 0, 0.8)'
                        }}
                        whileTap={{ scale: 0.9 }}
                      >
                        ACQUIRE
                      </motion.button>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </motion.section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <motion.h2
            className="text-5xl font-bold text-yellow-400 mb-8 tracking-widest"
            whileHover={{
              scale: 1.1,
              textShadow: '0 0 40px #FFD700, 0 0 80px #FFD700',
              letterSpacing: '0.5em'
            }}
          >
            COMPLETE ARSENAL
          </motion.h2>

          <motion.div
            className="flex justify-center space-x-6 mb-12"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.button
              onClick={() => setSelectedTier('ALL')}
              className={`px-6 py-3 border-2 font-bold tracking-widest transition-all ${
                selectedTier === 'ALL'
                  ? 'border-yellow-400 bg-yellow-400 text-black'
                  : 'border-gray-500 text-gray-300 hover:border-yellow-400 hover:text-yellow-400'
              }`}
              whileHover={{
                scale: 1.1,
                boxShadow: '0 0 30px rgba(255, 215, 0, 0.8)'
              }}
              whileTap={{ scale: 0.95 }}
            >
              ALL ITEMS
            </motion.button>
            {tiers.map((tier) => (
              <motion.button
                key={tier}
                onClick={() => setSelectedTier(tier)}
                className={`px-6 py-3 border-2 font-bold tracking-widest transition-all ${
                  selectedTier === tier
                    ? 'border-yellow-400 bg-yellow-400 text-black'
                    : 'border-gray-500 text-gray-300 hover:border-yellow-400 hover:text-yellow-400'
                }`}
                whileHover={{
                  scale: 1.1,
                  boxShadow: '0 0 30px rgba(255, 215, 0, 0.8)'
                }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * tiers.indexOf(tier) }}
              >
                {tier}
              </motion.button>
            ))}
          </motion.div>

          <motion.div
            className="flex justify-center space-x-4 mb-8"
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.div
              className="h-2 bg-yellow-400"
              initial={{ width: 0 }}
              whileInView={{ width: 200 }}
              transition={{ delay: 0.7, duration: 1.2 }}
              viewport={{ once: true }}
            />
            <motion.div
              className="h-2 bg-yellow-400"
              initial={{ width: 0 }}
              whileInView={{ width: 150 }}
              transition={{ delay: 0.9, duration: 1 }}
              viewport={{ once: true }}
            />
            <motion.div
              className="h-2 bg-yellow-400"
              initial={{ width: 0 }}
              whileInView={{ width: 100 }}
              transition={{ delay: 1.1, duration: 0.8 }}
              viewport={{ once: true }}
            />
          </motion.div>

          <p className="text-gray-300 text-xl max-w-4xl mx-auto leading-relaxed tracking-wide">
            EVERY PIECE OF TECHNOLOGY ENGINEERED FOR MAXIMUM PERFORMANCE AND STYLE
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={selectedTier}
            className="grid grid-cols-1 lg:grid-cols-2 gap-10"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.8 }}
          >
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                className="group relative bg-gray-900 border border-gray-700 hover:border-yellow-400 transition-all duration-700 overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)',
                  boxShadow: '0 20px 40px rgba(0, 0, 0, 0.8)'
                }}
                initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100, rotateY: 30 }}
                animate={{ opacity: 1, x: 0, rotateY: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                whileHover={{
                  boxShadow: '0 30px 60px rgba(255, 215, 0, 0.3)',
                  borderColor: '#FFD700'
                }}
                onMouseEnter={() => setHoveredProduct(product.id)}
                onMouseLeave={() => setHoveredProduct(null)}
                layout
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-yellow-400/0 via-yellow-400/10 to-yellow-400/0 opacity-0"
                  animate={{
                    opacity: hoveredProduct === product.id ? 1 : 0,
                    x: hoveredProduct === product.id ? ['-100%', '100%'] : '-100%'
                  }}
                  transition={{ duration: 1.5, repeat: hoveredProduct === product.id ? Infinity : 0 }}
                />

                <div className="flex h-80">
                  <div className="w-1/2 relative overflow-hidden">
                    <motion.div
                      className="w-full h-full bg-cover bg-center"
                      style={{
                        backgroundImage: `url(https://via.placeholder.com/400x400/1a1a1a/FFD700?text=${encodeURIComponent(product.name)})`,
                        filter: 'brightness(1.1) contrast(1.3)'
                      }}
                      animate={{
                        scale: hoveredProduct === product.id ? 1.2 : 1,
                        rotate: hoveredProduct === product.id ? 5 : 0
                      }}
                      transition={{ duration: 0.8 }}
                    />

                    <motion.div
                      className="absolute inset-0 bg-black bg-opacity-30"
                      animate={{
                        opacity: hoveredProduct === product.id ? 0 : 0.3
                      }}
                      transition={{ duration: 0.5 }}
                    />

                    <motion.div
                      className="absolute top-4 right-4 bg-yellow-400 text-black px-3 py-1 font-bold text-sm tracking-widest"
                      style={{ clipPath: 'polygon(0 0, 100% 0, 85% 100%, 0% 100%)' }}
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ delay: 0.3 + index * 0.1, type: "spring", stiffness: 200 }}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                    >
                      {product.tier}
                    </motion.div>

                    <motion.div
                      className="absolute bottom-4 left-4 w-4 h-4 bg-yellow-400 rounded-full"
                      animate={{
                        scale: [1, 1.5, 1],
                        opacity: [1, 0.7, 1]
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />

                    <AnimatePresence>
                      {hoveredProduct === product.id && (
                        <motion.div
                          className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <motion.button
                            className="bg-yellow-400 text-black px-8 py-3 font-bold tracking-widest hover:bg-yellow-300 transition-colors"
                            onClick={() => addToCart(product)}
                            initial={{ scale: 0, rotate: 180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            exit={{ scale: 0, rotate: -180 }}
                            transition={{ type: "spring", stiffness: 300 }}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            QUICK ADD
                          </motion.button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <div className="w-1/2 p-8 flex flex-col justify-center relative">
                    <motion.div
                      className="absolute top-0 left-0 w-2 h-full bg-yellow-400"
                      initial={{ scaleY: 0 }}
                      animate={{
                        scaleY: hoveredProduct === product.id ? 1 : 0
                      }}
                      transition={{ duration: 0.8 }}
                      style={{ originY: 0 }}
                    />

                    <motion.h3
                      className="text-2xl font-bold text-white mb-4 tracking-wide"
                      animate={{
                        x: hoveredProduct === product.id ? 10 : 0,
                        color: hoveredProduct === product.id ? '#FFD700' : '#FFFFFF'
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      {product.name}
                    </motion.h3>

                    <motion.div
                      className="flex items-center mb-4"
                      animate={{
                        x: hoveredProduct === product.id ? 10 : 0
                      }}
                      transition={{ duration: 0.3, delay: 0.1 }}
                    >
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <motion.svg
                            key={i}
                            className={`w-4 h-4 ${
                              i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-600'
                            }`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            initial={{ opacity: 0, rotate: -180, scale: 0 }}
                            animate={{ opacity: 1, rotate: 0, scale: 1 }}
                            transition={{ delay: i * 0.05 }}
                            whileHover={{ scale: 1.3, rotate: 360 }}
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </motion.svg>
                        ))}
                      </div>
                      <span className="text-gray-400 ml-3 font-bold text-sm">({product.reviews})</span>
                    </motion.div>

                    <motion.p
                      className="text-gray-400 mb-4 leading-relaxed text-sm tracking-wide"
                      animate={{
                        x: hoveredProduct === product.id ? 10 : 0
                      }}
                      transition={{ duration: 0.3, delay: 0.2 }}
                    >
                      {product.description}
                    </motion.p>

                    <motion.p
                      className="text-yellow-400 mb-6 text-xs font-bold tracking-widest"
                      animate={{
                        x: hoveredProduct === product.id ? 10 : 0
                      }}
                      transition={{ duration: 0.3, delay: 0.25 }}
                    >
                      {product.specs}
                    </motion.p>

                    <motion.div
                      className="flex items-center justify-between"
                      animate={{
                        x: hoveredProduct === product.id ? 10 : 0
                      }}
                      transition={{ duration: 0.3, delay: 0.3 }}
                    >
                      <span className="text-3xl font-bold text-yellow-400 tracking-wider">{product.price}</span>
                      <motion.button
                        className="bg-black border-2 border-yellow-400 text-yellow-400 px-6 py-3 font-bold tracking-widest hover:bg-yellow-400 hover:text-black transition-all duration-500"
                        onClick={() => addToCart(product)}
                        whileHover={{
                          scale: 1.1,
                          boxShadow: '0 0 30px rgba(255, 215, 0, 0.8)'
                        }}
                        whileTap={{ scale: 0.9 }}
                      >
                        ACQUIRE
                      </motion.button>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </main>

      <motion.footer
        className="bg-gray-900 border-t border-gray-800 py-20 relative overflow-hidden"
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2 }}
        viewport={{ once: true }}
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-yellow-400/5 via-yellow-400/10 to-yellow-400/5"
          animate={{
            x: ['-100%', '100%']
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <motion.h3
              className="text-5xl font-bold text-yellow-400 mb-8 tracking-widest"
              whileHover={{
                scale: 1.1,
                textShadow: '0 0 40px #FFD700, 0 0 80px #FFD700',
                letterSpacing: '0.5em'
              }}
              animate={{
                textShadow: [
                  '0 0 20px #FFD700',
                  '0 0 40px #FFD700, 0 0 60px #FFD700',
                  '0 0 20px #FFD700'
                ]
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              APEX TECH
            </motion.h3>

            <motion.div
              className="flex justify-center space-x-4 mb-8"
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              viewport={{ once: true }}
            >
              <motion.div
                className="h-2 bg-yellow-400"
                initial={{ width: 0 }}
                whileInView={{ width: 150 }}
                transition={{ delay: 0.5, duration: 1 }}
                viewport={{ once: true }}
              />
              <motion.div
                className="h-2 bg-yellow-400"
                initial={{ width: 0 }}
                whileInView={{ width: 100 }}
                transition={{ delay: 0.7, duration: 0.8 }}
                viewport={{ once: true }}
              />
              <motion.div
                className="h-2 bg-yellow-400"
                initial={{ width: 0 }}
                whileInView={{ width: 75 }}
                transition={{ delay: 0.9, duration: 0.6 }}
                viewport={{ once: true }}
              />
            </motion.div>

            <motion.p
              className="text-gray-300 tracking-widest text-xl"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              viewport={{ once: true }}
            >
              DEFINING THE FUTURE OF PREMIUM TECHNOLOGY
            </motion.p>
          </div>
        </div>
      </motion.footer>
    </motion.div>
  );
}