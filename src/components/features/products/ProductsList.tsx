@@ .. @@
 import React, { useState } from 'react';
 import { useQuery } from '@tanstack/react-query';
import { Header } from '../../layout/Header';
import { Footer } from '../../layout/Footer';
-import { productsService } from '../../services/products.service';
+import { Header } from '../../layout/Header';
+import { Footer } from '../../layout/Footer';
+import { productsService } from '../../../services/products.service';
 import { ProductCard } from './ProductCard';
-import { Button } from '../../../components/ui/button';
-import { Input } from '../../../components/ui/input';
+import { Button } from '../../ui/button';
+import { Input } from '../../ui/input';
 import { Search, Filter, Grid, List, ChevronDown } from 'lucide-react';