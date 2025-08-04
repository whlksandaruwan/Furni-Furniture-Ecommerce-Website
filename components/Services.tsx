import { Truck, Shield, RotateCcw, Headphones } from 'lucide-react';

const services = [
  {
    icon: Truck,
    title: "Free Shipping",
    description: "Donec vitae odio quis nisl dapibus malesuada nullam"
  },
  {
    icon: RotateCcw,
    title: "Easy to Shop",
    description: "Donec vitae odio quis nisl dapibus malesuada nullam"
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description: "Donec vitae odio quis nisl dapibus malesuada nullam"
  },
  {
    icon: Shield,
    title: "Hassle Free Returns",
    description: "Donec vitae odio quis nisl dapibus malesuada nullam"
  }
];

export function Services() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div key={index} className="text-center group">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-100 rounded-full mb-6 group-hover:bg-emerald-200 transition-colors duration-300">
                <service.icon className="h-8 w-8 text-emerald-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">{service.title}</h3>
              <p className="text-gray-600 leading-relaxed">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}