import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useState, useEffect } from 'react';

const heroSlides = [
  {
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
    title: "Premium Quality",
    subtitle: "Handcrafted furniture"
  },
  {
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    title: "Modern Design",
    subtitle: "Contemporary living spaces"
  },
  {
    image: "https://images.unsplash.com/photo-1549497538-303791108f95?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    title: "Sustainable Materials",
    subtitle: "Eco-friendly craftsmanship"
  },
  {
    image: "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    title: "Comfort First",
    subtitle: "Ergonomic excellence"
  }
];

export function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 8000); // Change slide every 8 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="bg-gradient-to-r from-emerald-50 to-teal-50 py-16 lg:py-24 min-h-[80vh] flex items-center">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-10">
            <h1 className="text-7xl lg:text-8xl xl:text-9xl font-bold text-gray-900 leading-[0.9]">
              Modern Interior
              <span className="text-emerald-600 block"> Design Studio</span>
            </h1>
            <p className="text-2xl lg:text-3xl text-gray-600 leading-relaxed max-w-2xl">
              Donec vitae odio quis nisl dapibus malesuada. Nullam ac aliquet velit. 
              Aliquam vulputate velit imperdiet dolor tempor tristique.
            </p>
            <div className="flex flex-col sm:flex-row gap-6">
              <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-xl px-12 py-6 h-auto">
                Shop Now
              </Button>
              <Button variant="outline" size="lg" className="text-xl px-12 py-6 h-auto border-2">
                Explore
              </Button>
            </div>
          </div>
          
          <div className="relative">
            <div className="relative overflow-hidden rounded-3xl shadow-2xl aspect-[4/3] lg:aspect-[3/2]">
              <ImageWithFallback
                src={heroSlides[currentSlide].image}
                alt={heroSlides[currentSlide].title}
                className="w-full h-full object-cover transition-opacity duration-1000 ease-in-out"
              />
              
              {/* Slide indicators */}
              <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3">
                {heroSlides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-4 h-4 rounded-full transition-all duration-300 ${
                      index === currentSlide 
                        ? 'bg-white shadow-lg' 
                        : 'bg-white/50 hover:bg-white/75'
                    }`}
                  />
                ))}
              </div>
            </div>
            
            {/* Floating card with slide content */}
            <div className="absolute -bottom-8 -left-8 bg-white p-8 rounded-2xl shadow-xl transition-all duration-500 max-w-xs">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center">
                  <span className="text-emerald-600 font-bold text-2xl">✓</span>
                </div>
                <div>
                  <p className="font-semibold text-gray-900 text-xl">{heroSlides[currentSlide].title}</p>
                  <p className="text-base text-gray-600">{heroSlides[currentSlide].subtitle}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}