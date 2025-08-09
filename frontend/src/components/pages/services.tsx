import React from 'react';
import { Header } from '../../../components/Header';
import { Footer } from '../../../components/Footer';
import { Button } from '../../../components/ui/button';
import { Badge } from '../../../components/ui/badge';
import { 
  Truck, 
  Shield, 
  RotateCcw, 
  Headphones, 
  Palette, 
  Wrench, 
  Home, 
  Clock,
  CheckCircle,
  Star
} from 'lucide-react';
import { ImageWithFallback } from '../../../components/figma/ImageWithFallback';

const mainServices = [
  {
    icon: Truck,
    title: 'Free Delivery',
    description: 'Free delivery on orders over $500. Fast, reliable shipping to your doorstep.',
    features: ['Orders over $500', 'Same-day delivery available', 'White glove service', 'Assembly included'],
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
  },
  {
    icon: Palette,
    title: 'Interior Design',
    description: 'Professional interior design consultation to help you create your dream space.',
    features: ['Free consultation', '3D room visualization', 'Custom color schemes', 'Furniture placement'],
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
  },
  {
    icon: Wrench,
    title: 'Assembly Service',
    description: 'Professional furniture assembly service. Sit back and relax while we set up your furniture.',
    features: ['Expert assembly', 'All tools included', 'Cleanup service', '30-day warranty'],
    image: 'https://images.unsplash.com/photo-1581539250439-c96689b516dd?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
  },
];

const supportServices = [
  {
    icon: Shield,
    title: 'Quality Guarantee',
    description: 'All our furniture comes with a comprehensive quality guarantee for your peace of mind.',
  },
  {
    icon: RotateCcw,
    title: 'Easy Returns',
    description: '30-day hassle-free returns. Not satisfied? We\'ll make it right or take it back.',
  },
  {
    icon: Headphones,
    title: '24/7 Support',
    description: 'Our customer support team is available around the clock to help with any questions.',
  },
  {
    icon: Home,
    title: 'Home Consultation',
    description: 'In-home consultation service to help you choose the perfect furniture for your space.',
  },
  {
    icon: Clock,
    title: 'Flexible Scheduling',
    description: 'Schedule delivery and assembly at your convenience, including evenings and weekends.',
  },
  {
    icon: Star,
    title: 'Premium Care',
    description: 'Ongoing care and maintenance tips to keep your furniture looking beautiful for years.',
  },
];

const process = [
  {
    step: '01',
    title: 'Consultation',
    description: 'We start with understanding your needs, style preferences, and space requirements.',
  },
  {
    step: '02',
    title: 'Design',
    description: 'Our designers create a custom plan with 3D visualizations and product recommendations.',
  },
  {
    step: '03',
    title: 'Selection',
    description: 'Choose from our curated selection of furniture that matches your style and budget.',
  },
  {
    step: '04',
    title: 'Delivery',
    description: 'Professional delivery and assembly service ensures everything is perfect in your space.',
  },
];

export function Services() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-emerald-50 to-teal-50 py-24">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12">
          <div className="text-center">
            <Badge className="bg-emerald-100 text-emerald-800 mb-4">Our Services</Badge>
            <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
              Complete Furniture
              <span className="text-emerald-600"> Solutions</span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto mb-8">
              From design consultation to delivery and assembly, we provide end-to-end furniture solutions 
              to make your home beautiful and functional.
            </p>
            <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700">
              Get Started
            </Button>
          </div>
        </div>
      </section>

      {/* Main Services */}
      <section className="py-20 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Premium Services</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our comprehensive services ensure you get the perfect furniture experience from start to finish
            </p>
          </div>

          <div className="space-y-20">
            {mainServices.map((service, index) => (
              <div key={index} className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
              }`}>
                <div className={`space-y-6 ${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                  <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center">
                    <service.icon className="w-8 h-8 text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold text-gray-900 mb-4">{service.title}</h3>
                    <p className="text-xl text-gray-600 mb-6">{service.description}</p>
                    <ul className="space-y-3">
                      {service.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center">
                          <CheckCircle className="w-5 h-5 text-emerald-600 mr-3" />
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <Button className="bg-emerald-600 hover:bg-emerald-700">
                    Learn More
                  </Button>
                </div>
                <div className={`${index % 2 === 1 ? 'lg:col-start-1' : ''}`}>
                  <ImageWithFallback
                    src={service.image}
                    alt={service.title}
                    className="w-full h-auto rounded-2xl shadow-lg"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Support Services Grid */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose Furni?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We go above and beyond to ensure your complete satisfaction
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {supportServices.map((service, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-shadow duration-300">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-6">
                  <service.icon className="w-8 h-8 text-emerald-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{service.title}</h3>
                <p className="text-gray-600 leading-relaxed">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Process</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Simple, transparent, and designed around your needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {process.map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-20 h-20 bg-emerald-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mb-6 mx-auto">
                  {step.step}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{step.title}</h3>
                <p className="text-gray-600 leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-emerald-600 to-teal-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-emerald-100 mb-8 max-w-2xl mx-auto">
            Contact us today for a free consultation and let us help you create the perfect space.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-emerald-600 hover:bg-gray-50">
              Schedule Consultation
            </Button>
            <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-emerald-600">
              Call Us Now
            </Button>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}