import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CartItem } from '../entities/cart-item.entity';
import { Product } from '../entities/product.entity';
import { User } from '../entities/user.entity';
import { AddToCartDto } from './dto/add-to-cart.dto';
import { UpdateCartItemDto } from './dto/update-cart-item.dto';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(CartItem)
    private cartItemRepository: Repository<CartItem>,
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async getCart(userId: number) {
    const cartItems = await this.cartItemRepository.find({
      where: { userId },
      relations: ['product'],
    });

    const total = cartItems.reduce((sum, item) => {
      return sum + (item.product.price * item.quantity);
    }, 0);

    return {
      items: cartItems,
      total,
      itemCount: cartItems.length,
    };
  }

  async addToCart(userId: number, addToCartDto: AddToCartDto) {
    const { productId, quantity } = addToCartDto;

    // Check if product exists and is active
    const product = await this.productRepository.findOne({
      where: { id: productId, isActive: true },
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    // Check if product is already in cart
    const existingCartItem = await this.cartItemRepository.findOne({
      where: { userId, productId },
    });

    if (existingCartItem) {
      // Update quantity
      existingCartItem.quantity += quantity;
      await this.cartItemRepository.save(existingCartItem);
      return existingCartItem;
    }

    // Create new cart item
    const cartItem = this.cartItemRepository.create({
      userId,
      productId,
      quantity,
    });

    return this.cartItemRepository.save(cartItem);
  }

  async updateCartItem(userId: number, cartItemId: number, updateCartItemDto: UpdateCartItemDto) {
    const { quantity } = updateCartItemDto;

    if (quantity <= 0) {
      throw new BadRequestException('Quantity must be greater than 0');
    }

    const cartItem = await this.cartItemRepository.findOne({
      where: { id: cartItemId, userId },
      relations: ['product'],
    });

    if (!cartItem) {
      throw new NotFoundException('Cart item not found');
    }

    cartItem.quantity = quantity;
    return this.cartItemRepository.save(cartItem);
  }

  async removeFromCart(userId: number, cartItemId: number) {
    const cartItem = await this.cartItemRepository.findOne({
      where: { id: cartItemId, userId },
    });

    if (!cartItem) {
      throw new NotFoundException('Cart item not found');
    }

    await this.cartItemRepository.remove(cartItem);
    return { message: 'Item removed from cart' };
  }

  async clearCart(userId: number) {
    await this.cartItemRepository.delete({ userId });
    return { message: 'Cart cleared' };
  }
} 