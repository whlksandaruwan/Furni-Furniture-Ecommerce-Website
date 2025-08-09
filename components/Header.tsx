@@ .. @@
-import { Search, ShoppingCart as ShoppingCartIcon, Menu, X, User, LogOut, Settings } from 'lucide-react';
+import { Search, ShoppingCart as ShoppingCartIcon, Menu, X, User, LogOut, Settings, Home } from 'lucide-react';
 import { Button } from './ui/button';
 import { Badge } from './ui/badge';
 import { useState } from 'react';
@@ .. @@
   return (
   )
-    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
+    <header className="bg-white/95 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50 shadow-sm">
       <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12">
-        <div className="flex items-center justify-between h-16">
+        <div className="flex items-center justify-between h-20">
           {/* Logo */}
           <div className="flex-shrink-0">
-            <h1 className="text-2xl font-bold text-primary">Furni.</h1>
+            <Link to="/" className="flex items-center space-x-2">
+              <div className="w-10 h-10 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-lg flex items-center justify-center">
+                <Home className="h-6 w-6 text-white" />
+              </div>
+              <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
+                Furni.
+              </h1>
+            </Link>
           </div>
 
           {/* Desktop Navigation */}
          <nav className="hidden lg:flex space-x-2">
-            <Link to="/" className="text-gray-700 hover:text-primary transition-colors">Home</Link>
-            <Link to="/products" className="text-gray-700 hover:text-primary transition-colors">Shop</Link>
-            <Link to="/about" className="text-gray-700 hover:text-primary transition-colors">About us</Link>
-            <Link to="/services" className="text-gray-700 hover:text-primary transition-colors">Services</Link>
-            <Link to="/blog" className="text-gray-700 hover:text-primary transition-colors">Blog</Link>
-            <Link to="/contact" className="text-gray-700 hover:text-primary transition-colors">Contact us</Link>
+          <nav className="hidden lg:flex space-x-1">
+            <Link to="/" className="px-4 py-2 text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all duration-200 font-medium">
+              Home
+            </Link>
            <Link to="/products" className="px-5 py-2 text-lg text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all duration-200 font-semibold">
+              Shop
+            </Link>
            <Link to="/about" className="px-5 py-2 text-lg text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all duration-200 font-semibold">
+              About us
+            </Link>
            <Link to="/services" className="px-5 py-2 text-lg text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all duration-200 font-semibold">
+              Services
+            </Link>
            <Link to="/blog" className="px-5 py-2 text-lg text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all duration-200 font-semibold">
+              Blog
+            </Link>
            <Link to="/contact" className="px-5 py-2 text-lg text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all duration-200 font-semibold">
+              Contact us
+            </Link>
           </nav>
 
           {/* Search and Cart */}
-          <div className="flex items-center space-x-4">
-            <Button variant="ghost" size="icon" className="hidden sm:flex">
+          <div className="flex items-center space-x-2">
+            <Button variant="ghost" size="icon" className="hidden sm:flex hover:bg-emerald-50 hover:text-emerald-600">
               <Search className="h-5 w-5" />
             </Button>
             
@@ -65,25 +80,25 @@ export function Header() {
             {/* Auth buttons */}
             {isAuthenticated ? (
             )
             }
}
-              <div className="flex items-center space-x-2">
+              <div className="flex items-center space-x-1">
                 {isAdmin && (
                   <Link to="/admin">
-                    <Button variant="ghost" size="icon">
+                    <Button variant="ghost" size="icon" className="hover:bg-emerald-50 hover:text-emerald-600">
                       <Settings className="h-5 w-5" />
                     </Button>
                   </Link>
                 )}
                 <Link to="/account">
-                  <Button variant="ghost" size="icon">
+                  <Button variant="ghost" size="icon" className="hover:bg-emerald-50 hover:text-emerald-600">
                     <User className="h-5 w-5" />
                   </Button>
                 </Link>
-                <Button variant="ghost" size="icon" onClick={logout}>
+                <Button variant="ghost" size="icon" onClick={logout} className="hover:bg-red-50 hover:text-red-600">
                   <LogOut className="h-5 w-5" />
                 </Button>
               </div>
             ) : (
-              <div className="flex items-center space-x-2">
+              <div className="flex items-center space-x-3">
                 <Link to="/login">
-                  <Button variant="outline" size="sm">
+                  <Button variant="outline" size="sm" className="border-emerald-600 text-emerald-600 hover:bg-emerald-600 hover:text-white">
                     Sign In
                   </Button>
                 </Link>
                 <Link to="/signup">
-                  <Button size="sm">
+                  <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700">
                     Sign Up
                   </Button>
                 </Link>
@@ .. @@
             {/* Mobile menu button */}
             <Button 
               variant="ghost" 
               size="icon" 
)
}
-              className="md:hidden"
+              className="lg:hidden hover:bg-emerald-50 hover:text-emerald-600"
               onClick={() => setIsMenuOpen(!isMenuOpen)}
             >
               {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
@@ .. @@
         {/* Mobile Navigation */}
         {isMenuOpen && (
             )
             }
-          <div className="md:hidden border-t border-gray-200 py-4">
-            <nav className="flex flex-col space-y-4">
-              <Link to="/" className="text-gray-700 hover:text-primary transition-colors">Home</Link>
-              <Link to="/products" className="text-gray-700 hover:text-primary transition-colors">Shop</Link>
-              <Link to="/about" className="text-gray-700 hover:text-primary transition-colors">About us</Link>
-              <Link to="/services" className="text-gray-700 hover:text-primary transition-colors">Services</Link>
-              <Link to="/blog" className="text-gray-700 hover:text-primary transition-colors">Blog</Link>
-              <Link to="/contact" className="text-gray-700 hover:text-primary transition-colors">Contact us</Link>
+          <div className="lg:hidden border-t border-gray-200 py-4 bg-white/95 backdrop-blur-md">
+            <nav className="flex flex-col space-y-2">
+              <Link 
+                to="/" 
                className="px-4 py-3 text-lg text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all duration-200 font-semibold"
+                onClick={() => setIsMenuOpen(false)}
+              >
+                Home
+              </Link>
+              <Link 
+                to="/products" 
                className="px-4 py-3 text-lg text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all duration-200 font-semibold"
+                onClick={() => setIsMenuOpen(false)}
+              >
+                Shop
+              </Link>
+              <Link 
+                to="/about" 
                className="px-4 py-3 text-lg text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all duration-200 font-semibold"
+                onClick={() => setIsMenuOpen(false)}
+              >
+                About us
+              </Link>
+              <Link 
+                to="/services" 
                className="px-4 py-3 text-lg text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all duration-200 font-semibold"
+                onClick={() => setIsMenuOpen(false)}
+              >
+                Services
+              </Link>
+              <Link 
+                to="/blog" 
                className="px-4 py-3 text-lg text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all duration-200 font-semibold"
+                onClick={() => setIsMenuOpen(false)}
+              >
+                Blog
+              </Link>
+              <Link 
+                to="/contact" 
                className="px-4 py-3 text-lg text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all duration-200 font-semibold"
+                onClick={() => setIsMenuOpen(false)}
+              >
+                Contact us
+              </Link>
             </nav>
           </div>
         )}