import { Button } from './ui/button';
import { Input } from './ui/input';

export function Newsletter() {
  return (
    <section className="py-20 bg-gradient-to-r from-emerald-600 to-teal-600">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
          Subscribe to our Newsletter
        </h2>
        <p className="text-xl text-emerald-100 mb-8 max-w-2xl mx-auto">
          Get updates on new products, special offers, and design inspiration delivered straight to your inbox.
        </p>
        
        <div className="max-w-md mx-auto">
          <div className="flex flex-col sm:flex-row gap-3">
            <Input
              type="email"
              placeholder="Enter your email"
              className="flex-1 h-12 bg-white border-0 text-navyBlue-500 placeholder:text-navyBlue-400"
            />
            <Button 
              size="lg" 
              className="bg-white text-emerald-600 hover:bg-gray-50 font-semibold h-12 px-8"
            >
              Subscribe
            </Button>
          </div>
          <p className="text-emerald-100 text-sm mt-3">
            By subscribing, you agree to our Privacy Policy and Terms of Service.
          </p>
        </div>
      </div>
    </section>
  );
}