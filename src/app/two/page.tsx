"use client";

import React, { useState } from 'react';

const products = [
  { id: 1, name: "Elite Gaming Setup", description: "Professional gaming workstation with RGB lighting", price: "$2,499" },
  { id: 2, name: "Titanium Smartwatch", description: "Premium wearable with advanced health monitoring", price: "$899" },
  { id: 3, name: "Carbon Fiber Laptop", description: "Ultra-lightweight with maximum performance", price: "$3,299" },
  { id: 4, name: "Studio Monitor Speakers", description: "Professional-grade audio for creators", price: "$1,599" },
  { id: 5, name: "Mechanical Masterpiece", description: "Handcrafted keyboard with custom switches", price: "$499" },
  { id: 6, name: "4K Webcam Pro", description: "Crystal clear video for professional streaming", price: "$349" },
  { id: 7, name: "Wireless Charging Pad", description: "Fast charging with sleek aluminum design", price: "$129" },
  { id: 8, name: "Noise-Canceling Headset", description: "Industry-leading audio technology", price: "$449" },
  { id: 9, name: "Smart Home Hub", description: "Control your entire smart home ecosystem", price: "$299" },
  { id: 10, name: "Premium Phone Case", description: "Military-grade protection with style", price: "$89" }
];

const heroImages = [
  "https://via.placeholder.com/1200x400/000000/FFD700?text=Premium+Tech+Collection",
  "https://via.placeholder.com/1200x400/1a1a1a/00FFFF?text=Next-Gen+Innovation",
  "https://via.placeholder.com/1200x400/111111/FF6B35?text=Elite+Performance"
];

export default function BoldPremiumStore() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroImages.length) % heroImages.length);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="border-b border-gray-800 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-wider text-yellow-400">
            APEX TECH
          </h1>
          <p className="text-gray-300 mt-2 font-light tracking-wide">PREMIUM TECHNOLOGY FOR ELITE USERS</p>
        </div>
      </header>

      <section className="relative mb-20">
        <div className="relative h-96 overflow-hidden bg-gray-900">
          {heroImages.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-all duration-1000 ${
                index === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
              }`}
            >
              <div
                className="w-full h-full bg-cover bg-center flex items-center justify-center relative"
                style={{ backgroundImage: `url(${image})` }}
              >
                <div className="absolute inset-0 bg-black bg-opacity-40"></div>
                <div className="relative text-center z-10">
                  <h2 className="text-5xl font-bold mb-4 text-yellow-400 tracking-widest">
                    UNLEASH POWER
                  </h2>
                  <p className="text-xl text-gray-200 tracking-wide font-light">
                    Experience the future of technology
                  </p>
                  <div className="w-24 h-1 bg-yellow-400 mx-auto mt-6"></div>
                </div>
              </div>
            </div>
          ))}

          <button
            onClick={prevSlide}
            className="absolute left-8 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-70 hover:bg-opacity-90 border border-yellow-400 hover:border-yellow-300 rounded-none p-4 transition-all duration-300 group"
          >
            <svg className="w-6 h-6 text-yellow-400 group-hover:text-yellow-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-8 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-70 hover:bg-opacity-90 border border-yellow-400 hover:border-yellow-300 rounded-none p-4 transition-all duration-300 group"
          >
            <svg className="w-6 h-6 text-yellow-400 group-hover:text-yellow-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-4">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-4 h-4 border-2 transition-all duration-300 ${
                index === currentSlide
                  ? 'border-yellow-400 bg-yellow-400'
                  : 'border-gray-500 hover:border-yellow-400'
              }`}
              style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }}
            />
          ))}
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-yellow-400 mb-6 tracking-widest">
            ELITE COLLECTION
          </h2>
          <div className="w-32 h-1 bg-yellow-400 mx-auto mb-6"></div>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto leading-relaxed tracking-wide">
            Cutting-edge technology designed for those who demand the absolute best in performance and style
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {products.map((product, index) => (
            <div
              key={product.id}
              className="group relative bg-gray-900 border border-gray-700 hover:border-yellow-400 transition-all duration-500 overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)'
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/0 via-yellow-400/5 to-yellow-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              <div className="flex">
                <div className="w-1/2 aspect-square bg-gray-800 relative overflow-hidden">
                  <div
                    className="w-full h-full bg-cover bg-center transform group-hover:scale-110 transition-transform duration-700"
                    style={{
                      backgroundImage: `url(https://via.placeholder.com/400x400/1a1a1a/FFD700?text=${encodeURIComponent(product.name)})`,
                      filter: 'brightness(1.1) contrast(1.2)'
                    }}
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-0 transition-all duration-500"></div>

                  <div className="absolute top-4 right-4">
                    <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
                  </div>
                </div>

                <div className="w-1/2 p-8 flex flex-col justify-center relative">
                  <div className="absolute top-0 left-0 w-1 h-full bg-yellow-400 transform scale-y-0 group-hover:scale-y-100 transition-transform duration-500 origin-top"></div>

                  <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-yellow-400 transition-colors duration-300 tracking-wide">
                    {product.name}
                  </h3>
                  <p className="text-gray-400 mb-6 leading-relaxed text-sm tracking-wide">
                    {product.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <span className="text-3xl font-bold text-yellow-400 tracking-wider">
                      {product.price}
                    </span>
                    <button className="bg-black border-2 border-yellow-400 text-yellow-400 px-6 py-3 font-bold tracking-widest hover:bg-yellow-400 hover:text-black transition-all duration-300 transform hover:scale-105">
                      ACQUIRE
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      <footer className="bg-gray-900 border-t border-gray-800 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="text-3xl font-bold text-yellow-400 mb-4 tracking-widest">APEX TECH</h3>
            <div className="w-24 h-1 bg-yellow-400 mx-auto mb-4"></div>
            <p className="text-gray-400 tracking-wide">
              DEFINING THE FUTURE OF PREMIUM TECHNOLOGY
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}