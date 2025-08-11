import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useState, useEffect } from 'react';

const heroSlides = [
  {
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    title: "Premium Quality",
    subtitle: "Handcrafted furniture"
  },
  {
    image: "https://plus.unsplash.com/premium_photo-1683121382153-63d04dc20c8a?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8c29mYXxlbnwwfDJ8MHx8fDA%3D",
    title: "Modern Design",
    subtitle: "Contemporary living spaces"
  },
  {
    image: "https://plus.unsplash.com/premium_photo-1681487772142-e97e8c90a6c6?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8dGFibGV8ZW58MHwyfDB8fHww",
    title: "Sustainable Materials",
    subtitle: "Eco-friendly craftsmanship"
  },
  {
    image: "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80https://plus.unsplash.com/premium_photo-1683133939183-edd5476e6200?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y2hhaXJ8ZW58MHwyfDB8fHww",
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
    <section className="bg-gradient-to-r from-emerald-50 to-teal-50 py-24">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <h1 className="text-6xl lg:text-7xl font-bold text-navyBlue-500 leading-tight">
              Modern Interior
              <span className="text-emerald-600"> Design Studio</span>
            </h1>
            <p className="text-xl text-navyBlue-400 leading-relaxed">
            We design interiors that combine style, comfort, and functionality—crafted to reflect your personality and enhance your everyday life.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white text-lg px-8 py-4">
                Shop Now
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-4 border-emerald-600 text-emerald-600 hover:bg-emerald-50">
                Explore
              </Button>
            </div>
          </div>
          
          <div className="relative">
            <div className="relative overflow-hidden rounded-2xl shadow-2xl w-full h-[550px]">
              <ImageWithFallback
                src={heroSlides[currentSlide].image}
                alt={heroSlides[currentSlide].title}
                className="w-full h-full object-cover object-center transition-opacity duration-1000 ease-in-out"
              />
              
              {/* Slide indicators */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {heroSlides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentSlide 
                        ? 'bg-white shadow-lg' 
                        : 'bg-white/50 hover:bg-white/75'
                    }`}
                  />
                ))}
              </div>
            </div>
            
            {/* Floating card with slide content */}
            <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-lg transition-all duration-500 border border-emerald-200">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                  <span className="text-emerald-600 font-bold text-lg">✓</span>
                </div>
                <div>
                  <p className="font-semibold text-navyBlue-500 text-lg">{heroSlides[currentSlide].title}</p>
                  <p className="text-sm text-navyBlue-400">{heroSlides[currentSlide].subtitle}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}