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
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    title: "Modern Design",
    subtitle: "Contemporary living spaces"
  },
  {
    image: "https://images.unsplash.com/photo-1549497538-303791108f95?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    title: "Sustainable Materials",
    subtitle: "Eco-friendly craftsmanship"
  },
  {
    image: "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
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
    <section className="bg-gradient-to-r from-sage-50 to-primary-50 py-24 animate-in fade-in duration-1000">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 animate-in slide-in-from-left-8 duration-1000 delay-300">
            <h1 className="text-6xl lg:text-7xl font-bold text-sage-800 leading-tight">
              Modern Interior
              <span className="text-primary-500"> Design Studio</span>
            </h1>
            <p className="text-xl text-sage-600 leading-relaxed">
              Donec vitae odio quis nisl dapibus malesuada. Nullam ac aliquet velit. 
              Aliquam vulputate velit imperdiet dolor tempor tristique.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-primary-500 hover:bg-primary-600 text-white text-lg px-8 py-4 transform hover:scale-105 transition-all duration-300">
                Shop Now
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-4 border-primary-500 text-primary-500 hover:bg-primary-50 transform hover:scale-105 transition-all duration-300">
                Explore
              </Button>
            </div>
          </div>
          
          <div className="relative animate-in slide-in-from-right-8 duration-1000 delay-500">
            <div className="relative overflow-hidden rounded-2xl shadow-2xl w-full h-[600px] hover:shadow-3xl transition-shadow duration-500">
              <ImageWithFallback
                src={heroSlides[currentSlide].image}
                alt={heroSlides[currentSlide].title}
                className="w-full h-full object-cover object-center transition-all duration-1000 ease-in-out hover:scale-105"
              />
              
              {/* Slide indicators */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {heroSlides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentSlide 
                        ? 'bg-white shadow-lg scale-125' 
                        : 'bg-white/50 hover:bg-white/75'
                    }`}
                  />
                ))}
              </div>
            </div>
            
            {/* Floating card with slide content */}
            <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-lg transition-all duration-500 border border-primary-200 animate-in slide-in-from-bottom-4 duration-1000 delay-1000 hover:shadow-xl hover:-translate-y-1">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                  <span className="text-primary-500 font-bold text-lg">✓</span>
                </div>
                <div>
                  <p className="font-semibold text-sage-800 text-lg">{heroSlides[currentSlide].title}</p>
                  <p className="text-sm text-sage-600">{heroSlides[currentSlide].subtitle}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}