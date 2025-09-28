"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';

interface Theme {
  id: string;
  title: string;
  description: string;
  features: string[];
  color: string;
  textColor: string;
  accentColor: string;
  preview: string;
}

interface FloatingElement {
  id: number;
  size: number;
  x: number;
  y: number;
  duration: number;
}

const themes = [
  {
    id: 'main',
    title: 'Polished & Minimal',
    description: 'Clean, modern design with subtle shadows and elegant typography. Perfect for premium brands seeking sophistication.',
    features: ['Clean Grid Layout', 'Subtle Hover Effects', 'Modern Typography', 'Premium Feel'],
    color: 'from-gray-100 to-gray-200',
    textColor: 'text-gray-900',
    accentColor: 'bg-gray-900',
    preview: 'https://via.placeholder.com/400x300/f8f9fa/6c757d?text=Minimal+Design'
  },
  {
    id: 'one',
    title: 'Warm & Lifestyle',
    description: 'Cozy, natural design with warm tones and organic shapes. Ideal for home decor and lifestyle brands.',
    features: ['Warm Color Palette', 'Natural Textures', 'Lifestyle Focus', 'Cozy Atmosphere'],
    color: 'from-amber-50 to-orange-100',
    textColor: 'text-amber-900',
    accentColor: 'bg-amber-600',
    preview: 'https://via.placeholder.com/400x300/e6d7c3/8b4513?text=Warm+Lifestyle'
  },
  {
    id: 'two',
    title: 'Bold & Premium',
    description: 'Dark, futuristic design with gold accents and dramatic effects. Perfect for tech and luxury brands.',
    features: ['Dark Theme', 'Gold Accents', 'Futuristic Design', 'Premium Tech'],
    color: 'from-gray-900 to-black',
    textColor: 'text-yellow-400',
    accentColor: 'bg-yellow-400',
    preview: 'https://via.placeholder.com/400x300/1a1a1a/FFD700?text=Bold+Premium'
  },
  {
    id: 'three',
    title: 'Editorial & Magazine',
    description: 'Sophisticated editorial layout with clean typography and magazine-style presentation. Perfect for content-focused brands.',
    features: ['Editorial Layout', 'Magazine Design', 'Typography Focus', 'Content First'],
    color: 'from-gray-50 to-gray-100',
    textColor: 'text-gray-900',
    accentColor: 'bg-gray-900',
    preview: 'https://via.placeholder.com/400x300/f8f9fa/6c757d?text=Editorial+Style'
  },
  {
    id: 'four',
    title: 'Geometric & Architecture',
    description: 'Mathematical precision meets functional design. Clean geometric forms with architectural principles and blueprint aesthetics.',
    features: ['Geometric Forms', 'Blueprint View', 'Mathematical Precision', 'Architectural Design'],
    color: 'from-gray-100 to-gray-200',
    textColor: 'text-gray-900',
    accentColor: 'bg-gray-900',
    preview: 'https://via.placeholder.com/400x300/f8f9fa/6c757d?text=Geometric+Design'
  }
];

const floatingElements = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  size: Math.random() * 100 + 50,
  x: Math.random() * 100,
  y: Math.random() * 100,
  duration: Math.random() * 20 + 10
}));

export default function Home() {
  const [selectedTheme, setSelectedTheme] = useState<string | null>(null);
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 0.6]);

  return (
    <motion.div
      className="min-h-screen bg-white relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Floating Background Elements */}
      {floatingElements.map((element) => (
        <motion.div
          key={element.id}
          className="absolute rounded-full bg-gray-100 opacity-20"
          style={{
            width: element.size,
            height: element.size,
            left: `${element.x}%`,
            top: `${element.y}%`,
          }}
          animate={{
            y: [-20, 20, -20],
            x: [-10, 10, -10],
            rotate: [0, 360]
          }}
          transition={{
            duration: element.duration,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}

      {/* Hero Section */}
      <motion.section
        className="relative z-10 min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8"
        style={{ y, opacity }}
      >
        <div className="max-w-6xl mx-auto text-center">
          <motion.h1
            className="text-6xl sm:text-8xl lg:text-9xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-gray-600 to-gray-900"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            DESIGN
          </motion.h1>

          <motion.h2
            className="text-2xl sm:text-4xl lg:text-5xl font-light mb-12 text-gray-700"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            E-Commerce Theme Collection
          </motion.h2>

          <motion.div
            className="w-32 h-1 bg-gray-900 mx-auto mb-12"
            initial={{ width: 0 }}
            animate={{ width: 128 }}
            transition={{ duration: 1, delay: 0.8 }}
          />

          <motion.p
            className="text-xl text-gray-600 max-w-3xl mx-auto mb-16 leading-relaxed"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
          >
            Explore three distinct e-commerce design approaches. Each theme offers a unique aesthetic and user experience,
            showcasing different ways to present products and engage customers.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-6 justify-center"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
          >
            <motion.button
              className="px-8 py-4 bg-gray-900 text-white font-medium rounded-none hover:bg-gray-800 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                const element = document.getElementById('themes');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              Explore Themes
            </motion.button>

            <motion.a
              href="#about"
              className="px-8 py-4 border-2 border-gray-900 text-gray-900 font-medium rounded-none hover:bg-gray-900 hover:text-white transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Learn More
            </motion.a>
          </motion.div>
        </div>
      </motion.section>

      {/* Themes Section */}
      <motion.section
        id="themes"
        className="relative z-10 py-24 px-4 sm:px-6 lg:px-8 bg-gray-50"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-20"
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl font-bold text-gray-900 mb-6">Theme Showcase</h2>
            <div className="w-24 h-1 bg-gray-900 mx-auto mb-6"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Each theme demonstrates different design philosophies and target audiences.
              Click on any theme to experience the full implementation.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">
            {themes.map((theme, index) => (
              <motion.div
                key={theme.id}
                className="group cursor-pointer"
                initial={{ y: 100, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                onMouseEnter={() => setSelectedTheme(theme.id)}
                onMouseLeave={() => setSelectedTheme(null)}
              >
                <Link href={`/${theme.id}`}>
                  <motion.div
                    className={`bg-gradient-to-br ${theme.color} rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-500`}
                    whileHover={{ y: -10 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {/* Preview Image */}
                    <div className="relative h-64 overflow-hidden">
                      <motion.div
                        className="w-full h-full bg-cover bg-center"
                        style={{ backgroundImage: `url(${theme.preview})` }}
                        animate={{
                          scale: selectedTheme === theme.id ? 1.1 : 1
                        }}
                        transition={{ duration: 0.6 }}
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-0 transition-all duration-500"></div>

                      <AnimatePresence>
                        {selectedTheme === theme.id && (
                          <motion.div
                            className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <motion.div
                              className="text-white text-center"
                              initial={{ scale: 0.8, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              exit={{ scale: 0.8, opacity: 0 }}
                              transition={{ duration: 0.3 }}
                            >
                              <div className="text-2xl font-bold mb-2">View Theme</div>
                              <div className="text-sm opacity-80">Click to explore</div>
                            </motion.div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Content */}
                    <div className="p-8">
                      <h3 className={`text-2xl font-bold ${theme.textColor} mb-4`}>
                        {theme.title}
                      </h3>

                      <p className={`${theme.textColor} opacity-80 mb-6 leading-relaxed`}>
                        {theme.description}
                      </p>

                      <div className="space-y-2 mb-6">
                        {theme.features.map((feature, featureIndex) => (
                          <motion.div
                            key={featureIndex}
                            className={`flex items-center ${theme.textColor} opacity-70`}
                            initial={{ x: -20, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 0.7 }}
                            transition={{ delay: featureIndex * 0.1 }}
                            viewport={{ once: true }}
                          >
                            <div className={`w-2 h-2 ${theme.accentColor} rounded-full mr-3`}></div>
                            <span className="text-sm">{feature}</span>
                          </motion.div>
                        ))}
                      </div>

                      <motion.div
                        className={`${theme.accentColor} ${theme.id === 'two' ? 'text-black' : 'text-white'} px-6 py-3 font-medium text-center rounded-none hover:opacity-90 transition-opacity`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Explore Theme
                      </motion.div>
                    </div>
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* About Section */}
      <motion.section
        id="about"
        className="relative z-10 py-24 px-4 sm:px-6 lg:px-8 bg-white"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            className="text-5xl font-bold text-gray-900 mb-8"
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Design Philosophy
          </motion.h2>

          <motion.div
            className="w-24 h-1 bg-gray-900 mx-auto mb-12"
            initial={{ width: 0 }}
            whileInView={{ width: 96 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          />

          <motion.p
            className="text-xl text-gray-600 leading-relaxed mb-12"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: true }}
          >
            These themes represent three distinct approaches to e-commerce design. From the clean minimalism
            that appeals to premium brands, to the warm lifestyle aesthetic perfect for home goods,
            to the bold futuristic design ideal for tech products - each theme tells a different story
            and creates a unique shopping experience.
          </motion.p>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            viewport={{ once: true }}
          >
            <div className="text-center">
              <div className="text-4xl font-bold text-gray-900 mb-2">5</div>
              <div className="text-gray-600">Unique Themes</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-gray-900 mb-2">10+</div>
              <div className="text-gray-600">Products Each</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-gray-900 mb-2">100%</div>
              <div className="text-gray-600">Responsive</div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Footer */}
      <motion.footer
        className="relative z-10 bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.h3
            className="text-2xl font-bold mb-4"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            E-Commerce Design Showcase
          </motion.h3>

          <motion.p
            className="text-gray-400 mb-8"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Demonstrating the versatility of modern web design through three distinct e-commerce experiences.
          </motion.p>

          <motion.div
            className="flex justify-center space-x-8"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            {themes.map((theme) => (
              <Link
                key={theme.id}
                href={`/${theme.id}`}
                className="text-gray-400 hover:text-white transition-colors"
              >
                {theme.title}
              </Link>
            ))}
          </motion.div>
        </div>
      </motion.footer>
    </motion.div>
  );
}
