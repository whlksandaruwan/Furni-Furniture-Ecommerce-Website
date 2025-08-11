@@ .. @@
 import React, { useState } from 'react';
 import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
-import { Button } from '../../../components/ui/button';
-import { Badge } from '../../../components/ui/badge';
+import { Button } from '../../ui/button';
+import { Badge } from '../../ui/badge';
 import { 
   ShoppingCart as ShoppingCartIcon, 
   Plus, 
@@ -10,7 +10,7 @@ import { 
   X 
 } from 'lucide-react';
-import { cartService, Cart, CartItem } from '../../services/cart.service';
-import { ImageWithFallback } from '../../../components/figma/ImageWithFallback';
+import { cartService, Cart, CartItem } from '../../../services/cart.service';
+import { ImageWithFallback } from '../../common/ImageWithFallback';