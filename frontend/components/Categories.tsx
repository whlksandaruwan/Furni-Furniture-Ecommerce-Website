import { ImageWithFallback } from './figma/ImageWithFallback';

const categories = [
  {
    name: "Chairs",
    image: "https://images.unsplash.com/photo-1598300056393-4aac492f4344?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2hhaXJ8ZW58MHwyfDB8fHww",
    count: "25+ Products"
  },
  {
    name: "Tables",
    image: "https://images.unsplash.com/photo-1745635621480-6a258cc1b1a2?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTR8fHRhYmxlfGVufDB8MnwwfHx8MA%3D%3D",
    count: "18+ Products"
  },
  {
    name: "Sofas",
    image: "https://images.unsplash.com/photo-1616047006789-b7af5afb8c20?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHNvZmF8ZW58MHwyfDB8fHww",
    count: "15+ Products"
  },
  {
    name: "Storage",
    image: "https://images.unsplash.com/photo-1641725968226-6531c9b642c4?q=80&w=1160&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    count: "12+ Products"
  }
];

export function Categories() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-navyBlue-500 mb-4">Shop by Category</h2>
          <p className="text-xl text-navyBlue-400 max-w-3xl mx-auto">
            Discover our carefully curated collection of modern furniture pieces
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category, index) => (
            <div
              key={index}
              className="group cursor-pointer bg-emerald-50 rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300 border border-emerald-200"
            >
              <div className="aspect-square overflow-hidden">
                <ImageWithFallback
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6 text-center">
                <h3 className="text-xl font-semibold text-navyBlue-500 mb-2">{category.name}</h3>
                <p className="text-navyBlue-400">{category.count}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}