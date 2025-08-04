import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async create(createProductDto: CreateProductDto) {
    const product = this.productRepository.create(createProductDto);
    return this.productRepository.save(product);
  }

  async findAll(query?: any) {
    const queryBuilder = this.productRepository.createQueryBuilder('product')
      .leftJoinAndSelect('product.category', 'category')
      .where('product.isActive = :isActive', { isActive: true });

    if (query.categoryId) {
      queryBuilder.andWhere('product.categoryId = :categoryId', { categoryId: query.categoryId });
    }

    if (query.isFeatured) {
      queryBuilder.andWhere('product.isFeatured = :isFeatured', { isFeatured: true });
    }

    if (query.isNew) {
      queryBuilder.andWhere('product.isNew = :isNew', { isNew: true });
    }

    if (query.isOnSale) {
      queryBuilder.andWhere('product.isOnSale = :isOnSale', { isOnSale: true });
    }

    if (query.search) {
      queryBuilder.andWhere('(product.name LIKE :search OR product.description LIKE :search)', {
        search: `%${query.search}%`,
      });
    }

    const page = query.page ? parseInt(query.page) : 1;
    const limit = query.limit ? parseInt(query.limit) : 10;
    const skip = (page - 1) * limit;

    queryBuilder.skip(skip).take(limit);

    const [products, total] = await queryBuilder.getManyAndCount();

    return {
      products,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findOne(id: number) {
    const product = await this.productRepository.findOne({
      where: { id },
      relations: ['category'],
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return product;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const product = await this.findOne(id);
    Object.assign(product, updateProductDto);
    return this.productRepository.save(product);
  }

  async remove(id: number) {
    const product = await this.findOne(id);
    product.isActive = false;
    return this.productRepository.save(product);
  }

  async getFeaturedProducts() {
    return this.productRepository.find({
      where: { isFeatured: true, isActive: true },
      relations: ['category'],
      take: 6,
    });
  }

  async getNewProducts() {
    return this.productRepository.find({
      where: { isNew: true, isActive: true },
      relations: ['category'],
      take: 6,
    });
  }

  async getOnSaleProducts() {
    return this.productRepository.find({
      where: { isOnSale: true, isActive: true },
      relations: ['category'],
      take: 6,
    });
  }
} 