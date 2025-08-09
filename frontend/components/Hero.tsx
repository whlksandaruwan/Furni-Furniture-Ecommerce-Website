import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function Hero() {
  return (
    <section className="bg-gradient-to-r from-emerald-50 to-teal-50 py-24">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <h1 className="text-6xl lg:text-7xl font-bold text-gray-900 leading-tight">
              Modern Interior
              <span className="text-emerald-600"> Design Studio</span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Donec vitae odio quis nisl dapibus malesuada. Nullam ac aliquet velit. 
              Aliquam vulputate velit imperdiet dolor tempor tristique.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700">
                Shop Now
              </Button>
              <Button variant="outline" size="lg">
                Explore
              </Button>
            </div>
          </div>
          
          <div className="relative">
            <div className="relative overflow-hidden rounded-2xl shadow-2xl aspect-square">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                alt="Modern chair"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-lg">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                  <span className="text-emerald-600 font-bold text-lg">✓</span>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Premium Quality</p>
                  <p className="text-sm text-gray-600">Handcrafted furniture</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}