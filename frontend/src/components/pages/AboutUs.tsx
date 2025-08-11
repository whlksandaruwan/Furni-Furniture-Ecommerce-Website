import React from 'react';
import { Header } from '../../../components/Header';
import { Footer } from '../../../components/Footer';
import { Button } from '../../../components/ui/button';
import { Badge } from '../../../components/ui/badge';
import { Users, Award, Target, Heart, CheckCircle, Star } from 'lucide-react';
import { ImageWithFallback } from '../../../components/figma/ImageWithFallback';

const stats = [
  { label: 'Years of Experience', value: '15+' },
  { label: 'Happy Customers', value: '10,000+' },
  { label: 'Products Sold', value: '50,000+' },
  { label: 'Countries Served', value: '25+' },
];

const values = [
  {
    icon: Target,
    title: 'Quality First',
    description: 'We never compromise on quality. Every piece is crafted with attention to detail and built to last.',
  },
  {
    icon: Heart,
    title: 'Customer Focused',
    description: 'Your satisfaction is our priority. We listen, understand, and deliver exactly what you need.',
  },
  {
    icon: Award,
    title: 'Innovation',
    description: 'We constantly evolve our designs and processes to bring you the latest in furniture trends.',
  },
  {
    icon: Users,
    title: 'Sustainability',
    description: 'We care about our planet. Our furniture is made from sustainable materials and eco-friendly processes.',
  },
];

const team = [
  {
    name: 'Sarah Johnson',
    role: 'Founder & CEO',
    image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    description: 'With over 20 years in furniture design, Sarah founded Furni with a vision to make beautiful furniture accessible to everyone.',
  },
  {
    name: 'Michael Chen',
    role: 'Head of Design',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    description: 'Michael brings innovative design concepts to life, ensuring every piece is both functional and aesthetically pleasing.',
  },
  {
    name: 'Emily Rodriguez',
    role: 'Quality Manager',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    description: 'Emily oversees our quality control processes, ensuring every product meets our high standards before reaching you.',
  },
];

export function AboutUs() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-sage-50 to-primary-50 py-24 animate-in fade-in duration-1000">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-in slide-in-from-left-8 duration-1000 delay-300">
              <div>
                <Badge className="bg-primary-100 text-primary-800 mb-4 text-lg px-4 py-2">About Furni</Badge>
                <h1 className="text-5xl lg:text-6xl font-bold text-sage-800 leading-tight mb-6">
                  Crafting Beautiful
                  <span className="text-primary-500"> Spaces</span> Since 2008
                </h1>
                <p className="text-2xl text-sage-600 leading-relaxed">
                  We believe that great furniture should be accessible to everyone. Our mission is to create 
                  beautiful, functional, and sustainable furniture that transforms houses into homes.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-primary-500 hover:bg-primary-600 text-lg px-8 py-4 transform hover:scale-105 transition-all duration-300">
                  Our Story
                </Button>
                <Button variant="outline" size="lg" className="text-lg px-8 py-4 border-primary-500 text-primary-500 hover:bg-primary-50 transform hover:scale-105 transition-all duration-300">
                  Meet the Team
                </Button>
              </div>
            </div>
            
            <div className="relative animate-in slide-in-from-right-8 duration-1000 delay-500">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Beautiful living room"
                className="w-full h-auto rounded-2xl shadow-2xl hover:shadow-3xl transition-shadow duration-500"
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-lg animate-in slide-in-from-bottom-4 duration-1000 delay-1000 hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                    <Star className="w-6 h-6 text-primary-500 fill-current" />
                  </div>
                  <div>
                    <p className="font-semibold text-sage-800">4.9/5 Rating</p>
                    <p className="text-sm text-sage-600">From 10,000+ customers</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center animate-in slide-in-from-bottom-4 duration-700" style={{ animationDelay: `${index * 200}ms` }}>
                <div className="text-4xl font-bold text-primary-500 mb-2 hover:scale-110 transition-transform duration-300">{stat.value}</div>
                <div className="text-sage-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-sage-800 mb-4 animate-in slide-in-from-bottom-4 duration-700">Our Values</h2>
            <p className="text-2xl text-sage-600 max-w-3xl mx-auto animate-in slide-in-from-bottom-4 duration-700 delay-200">
              These core values guide everything we do, from design to delivery
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-2 animate-in slide-in-from-bottom-4 duration-700" style={{ animationDelay: `${index * 150}ms` }}>
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <value.icon className="w-8 h-8 text-primary-500" />
                </div>
                <h3 className="text-2xl font-semibold text-sage-800 mb-4">{value.title}</h3>
                <p className="text-lg text-sage-600 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-sage-800 mb-4 animate-in slide-in-from-bottom-4 duration-700">Meet Our Team</h2>
            <p className="text-2xl text-sage-600 max-w-3xl mx-auto animate-in slide-in-from-bottom-4 duration-700 delay-200">
              The passionate people behind Furni who make it all possible
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div key={index} className="bg-sage-50 rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-2 animate-in slide-in-from-bottom-4 duration-700" style={{ animationDelay: `${index * 200}ms` }}>
                <div className="aspect-square overflow-hidden">
                  <ImageWithFallback
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-semibold text-sage-800 mb-1">{member.name}</h3>
                  <p className="text-lg text-primary-500 font-medium mb-4">{member.role}</p>
                  <p className="text-lg text-sage-600 leading-relaxed">{member.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-500 to-sage-600 animate-in fade-in duration-1000">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4 animate-in slide-in-from-bottom-4 duration-700">
            Ready to Transform Your Space?
          </h2>
          <p className="text-2xl text-white/90 mb-8 max-w-2xl mx-auto animate-in slide-in-from-bottom-4 duration-700 delay-200">
            Discover our collection of beautiful, sustainable furniture designed to make your house feel like home.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-in slide-in-from-bottom-4 duration-700 delay-400">
            <Button size="lg" className="bg-white text-primary-500 hover:bg-gray-50 text-lg px-8 py-4 transform hover:scale-105 transition-all duration-300">
              Shop Now
            </Button>
            <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-primary-500 text-lg px-8 py-4 transform hover:scale-105 transition-all duration-300">
              Contact Us
            </Button>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}