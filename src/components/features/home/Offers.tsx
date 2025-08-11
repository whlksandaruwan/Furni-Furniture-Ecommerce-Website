import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';
import { Clock, Star, Percent, Gift } from 'lucide-react';
import { ImageWithFallback } from '../../common/ImageWithFallback';

const offers = [
  {
    id: 1,
    title: "Summer Sale",
    description: "Up to 50% off on selected furniture",
    discount: "50% OFF",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    validUntil: "July 31, 2024",
    icon: Percent,
    bgColor: "bg-gradient-to-r from-red-500 to-pink-500",
    textColor: "text-white"
  },
  {
    id: 2,
    title: "New Arrivals",
    description: "Get 20% off on all new furniture pieces",
    discount: "20% OFF",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    validUntil: "Limited Time",
    icon: Star,
    bgColor: "bg-gradient-to-r from-emerald-500 to-teal-500",
    textColor: "text-white"
  },
  {
    id: 3,
    title: "Bundle Deal",
    description: "Buy 2 items and get the 3rd one free",
    discount: "BUY 2 GET 1",
    image: "https://images.unsplash.com/photo-1549497538-303791108f95?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    validUntil: "This Month",
    icon: Gift,
    bgColor: "bg-gradient-to-r from-purple-500 to-indigo-500",
    textColor: "text-white"
  }
];

export function Offers() {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-emerald-50">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12">
        <div className="text-center mb-16">
          <Badge className="bg-emerald-100 text-emerald-800 mb-4 text-lg px-4 py-2">Special Offers</Badge>
          <h2 className="text-5xl font-bold text-navyBlue-500 mb-4">Limited Time Deals</h2>
          <p className="text-2xl text-navyBlue-400 max-w-3xl mx-auto">
            Don't miss out on these amazing offers. Transform your space for less!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {offers.map((offer) => (
            <div key={offer.id} className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              {/* Background Image */}
              <div className="aspect-[4/3] overflow-hidden">
                <ImageWithFallback
                  src={offer.image}
                  alt={offer.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors duration-300" />
              
              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-between p-6 text-white">
                {/* Top Section */}
                <div className="flex justify-between items-start">
                  <div className={`p-3 rounded-full ${offer.bgColor}`}>
                    <offer.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-right">
                    <div className="bg-white/20 backdrop-blur-sm rounded-lg px-3 py-1 mb-2">
                      <div className="flex items-center text-sm">
                        <Clock className="w-4 h-4 mr-1" />
                        {offer.validUntil}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom Section */}
                <div className="space-y-4">
                  <div>
                    <div className={`inline-block px-4 py-2 rounded-full text-sm font-bold mb-3 ${offer.bgColor}`}>
                      {offer.discount}
                    </div>
                    <h3 className="text-2xl font-bold mb-2">{offer.title}</h3>
                    <p className="text-white/90 text-lg">{offer.description}</p>
                  </div>
                  
                  <Button 
                    className="w-full bg-white text-navyBlue-500 hover:bg-emerald-50 font-semibold py-3 transform group-hover:scale-105 transition-transform duration-200"
                  >
                    Shop Now
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="bg-white rounded-2xl p-8 shadow-lg max-w-2xl mx-auto">
            <h3 className="text-3xl font-bold text-navyBlue-500 mb-4">
              Don't Miss Out!
            </h3>
            <p className="text-lg text-navyBlue-400 mb-6">
              Subscribe to our newsletter and be the first to know about exclusive deals and new arrivals.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 border border-emerald-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              />
              <Button className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}