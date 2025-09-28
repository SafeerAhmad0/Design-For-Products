"use client";

import React, { useState } from 'react';

const products = [
  { id: 1, name: "Modern Office Chair", description: "Ergonomic design with premium comfort", price: "$299" },
  { id: 2, name: "Wireless Headphones", description: "Premium sound quality with noise cancellation", price: "$199" },
  { id: 3, name: "Smart Watch", description: "Track your fitness and stay connected", price: "$399" },
  { id: 4, name: "Laptop Stand", description: "Adjustable aluminum laptop stand", price: "$89" },
  { id: 5, name: "Desk Lamp", description: "LED desk lamp with adjustable brightness", price: "$79" },
  { id: 6, name: "Bluetooth Speaker", description: "Portable speaker with crystal clear sound", price: "$149" },
  { id: 7, name: "Mechanical Keyboard", description: "Premium mechanical keyboard for productivity", price: "$179" },
  { id: 8, name: "Monitor Stand", description: "Wooden monitor stand with storage", price: "$69" },
  { id: 9, name: "Phone Case", description: "Protective case with wireless charging support", price: "$39" },
  { id: 10, name: "Coffee Mug", description: "Insulated travel mug keeps drinks hot", price: "$29" }
];

const heroImages = [
  "https://via.placeholder.com/1200x400/f8f9fa/6c757d?text=Premium+Office+Setup",
  "https://via.placeholder.com/1200x400/e9ecef/495057?text=Modern+Workspace",
  "https://via.placeholder.com/1200x400/dee2e6/343a40?text=Minimal+Design"
];

export default function PolishedMinimalStore() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroImages.length) % heroImages.length);
  };

  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-gray-100 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-light text-gray-900">Minimal Store</h1>
        </div>
      </header>

      <section className="relative mb-12">
        <div className="relative h-96 overflow-hidden bg-gray-50">
          {heroImages.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-500 ${
                index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <div
                className="w-full h-full bg-cover bg-center flex items-center justify-center"
                style={{ backgroundImage: `url(${image})` }}
              >
                <div className="text-center text-gray-700">
                  <h2 className="text-4xl font-light mb-2">Premium Quality</h2>
                  <p className="text-lg font-light">Discover our curated collection</p>
                </div>
              </div>
            </div>
          ))}

          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 shadow-sm transition-all"
          >
            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 shadow-sm transition-all"
          >
            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentSlide ? 'bg-gray-600' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-light text-gray-900 mb-4">Featured Products</h2>
          <p className="text-gray-600 font-light">Carefully selected items for modern living</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="group bg-white border border-gray-100 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div className="aspect-square bg-gray-50 flex items-center justify-center border-b border-gray-100">
                <div
                  className="w-full h-full bg-cover bg-center"
                  style={{ backgroundImage: `url(https://via.placeholder.com/300x300/f8f9fa/6c757d?text=${encodeURIComponent(product.name)})` }}
                />
              </div>

              <div className="p-4">
                <h3 className="text-lg font-medium text-gray-900 mb-2 group-hover:text-gray-700 transition-colors">
                  {product.name}
                </h3>
                <p className="text-sm text-gray-600 mb-3 font-light leading-relaxed">
                  {product.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xl font-light text-gray-900">{product.price}</span>
                  <button className="px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded hover:bg-gray-800 transition-colors">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      <footer className="bg-gray-50 border-t border-gray-100 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-600 font-light">© 2024 Minimal Store. Crafted with care.</p>
        </div>
      </footer>
    </div>
  );
}