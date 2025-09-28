"use client";

import React, { useState } from 'react';

const products = [
  { id: 1, name: "Cozy Reading Chair", description: "Perfect for your favorite corner", price: "$349" },
  { id: 2, name: "Wooden Coffee Table", description: "Handcrafted from sustainable oak", price: "$289" },
  { id: 3, name: "Ceramic Plant Pot", description: "Bring nature indoors with style", price: "$45" },
  { id: 4, name: "Soft Throw Blanket", description: "Ultra-soft merino wool blend", price: "$89" },
  { id: 5, name: "Vintage Floor Lamp", description: "Warm ambient lighting for any room", price: "$159" },
  { id: 6, name: "Artisan Candle Set", description: "Hand-poured soy candles with natural scents", price: "$39" },
  { id: 7, name: "Bamboo Serving Tray", description: "Eco-friendly and beautifully crafted", price: "$29" },
  { id: 8, name: "Linen Cushion Cover", description: "Natural texture meets comfort", price: "$24" },
  { id: 9, name: "Cork Coaster Set", description: "Protect your surfaces in style", price: "$19" },
  { id: 10, name: "Macrame Wall Hanging", description: "Bohemian charm for your walls", price: "$55" }
];

const heroImages = [
  "https://via.placeholder.com/1200x400/d4b89a/8b4513?text=Cozy+Living+Room",
  "https://via.placeholder.com/1200x400/e6d7c3/a0522d?text=Natural+Materials",
  "https://via.placeholder.com/1200x400/f5e6d3/cd853f?text=Warm+Atmosphere"
];

export default function WarmLifestyleStore() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroImages.length) % heroImages.length);
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#faf8f5' }}>
      <header className="py-6" style={{ borderBottom: '1px solid #e8e2db' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-serif text-amber-800">Cozy Home</h1>
          <p className="text-amber-700 mt-1">Creating warm spaces for better living</p>
        </div>
      </header>

      <section className="relative mb-16">
        <div className="relative h-80 overflow-hidden">
          {heroImages.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-700 ${
                index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <div
                className="w-full h-full bg-cover bg-center flex items-center justify-center"
                style={{ backgroundImage: `url(${image})` }}
              >
                <div className="text-center text-amber-900 bg-white bg-opacity-80 p-8 rounded-lg">
                  <h2 className="text-4xl font-serif mb-3">Welcome Home</h2>
                  <p className="text-lg">Discover comfort in every detail</p>
                </div>
              </div>
            </div>
          ))}

          <button
            onClick={prevSlide}
            className="absolute left-6 top-1/2 transform -translate-y-1/2 bg-amber-100 hover:bg-amber-200 rounded-full p-3 shadow-lg transition-all"
          >
            <svg className="w-6 h-6 text-amber-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-6 top-1/2 transform -translate-y-1/2 bg-amber-100 hover:bg-amber-200 rounded-full p-3 shadow-lg transition-all"
          >
            <svg className="w-6 h-6 text-amber-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentSlide ? 'bg-amber-600' : 'bg-amber-300'
              }`}
            />
          ))}
        </div>
      </section>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-serif text-amber-900 mb-4">Curated Collection</h2>
          <p className="text-amber-700 text-lg max-w-2xl mx-auto leading-relaxed">
            Each piece is thoughtfully selected to bring warmth and character to your living space
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              style={{ border: '1px solid #f0e6d6' }}
            >
              <div className="aspect-square bg-gradient-to-br from-amber-50 to-orange-50 flex items-center justify-center p-6">
                <div
                  className="w-full h-full bg-cover bg-center rounded-xl"
                  style={{
                    backgroundImage: `url(https://via.placeholder.com/280x280/e6d7c3/8b4513?text=${encodeURIComponent(product.name)})`,
                    boxShadow: '0 8px 16px rgba(139, 69, 19, 0.1)'
                  }}
                />
              </div>

              <div className="p-6" style={{ backgroundColor: '#fffbf7' }}>
                <h3 className="text-xl font-serif text-amber-900 mb-3 group-hover:text-amber-700 transition-colors">
                  {product.name}
                </h3>
                <p className="text-amber-700 mb-4 leading-relaxed text-sm">
                  {product.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-serif text-amber-800">{product.price}</span>
                  <button className="px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white rounded-full font-medium transition-all duration-300 shadow-md hover:shadow-lg">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      <footer className="py-12" style={{ backgroundColor: '#f5ede4', borderTop: '1px solid #e8e2db' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="text-2xl font-serif text-amber-800 mb-2">Cozy Home</h3>
            <p className="text-amber-700">Creating beautiful, comfortable spaces since 2020</p>
          </div>
        </div>
      </footer>
    </div>
  );
}