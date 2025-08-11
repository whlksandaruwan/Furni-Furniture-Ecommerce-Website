@@ .. @@
 import React from 'react';
 import { useMutation, useQueryClient } from '@tanstack/react-query';
-import { Button } from '../../../components/ui/button';
-import { Badge } from '../../../components/ui/badge';
+import { Button } from '../../ui/button';
+import { Badge } from '../../ui/badge';
 import { Heart, Star, ShoppingCart } from 'lucide-react';
-import { Product } from '../../services/products.service';
-import { cartService } from '../../services/cart.service';
-import { ImageWithFallback } from '../../../components/figma/ImageWithFallback';
+import { Product } from '../../../services/products.service';
+import { cartService } from '../../../services/cart.service';
+import { ImageWithFallback } from '../../common/ImageWithFallback';