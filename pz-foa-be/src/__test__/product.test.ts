import 'dotenv/config';
import { UserEntity } from '../Entities/user.entity';
import { productService } from '../Services/productService';
import {
  NewProductInterface,
  UpdateProductInterface,
} from '../Interfaces/product-interface';

import { DB, connect } from '../utils/database/database';

describe('Product Tests', () => {
  let productId;

  const mockUser: UserEntity = {
    id: '12345-12345-12345-12345-12345',
    login: 'TestUser',
    passwordHSW: '123412341234',
    token: '12341231241251',
    salt: '1234567890',
    email: 'TestUser@email.com',
    isAdmin: false,
    changedAt: '01012024111111',
    createdAt: '01012024111111',
  };

  beforeAll(async () => {
    await connect();
  });

  afterAll(async () => {
    await DB.destroy();
  });

  it('Create a new product', async () => {
    const mockProduct: NewProductInterface = {
      name: 'Test Product',
      avalaibleStocks: 2000,
      description: 'Test product short description',
      price: 21.44,
      imgSrc: 'test link',
    };

    const result = await productService.create(mockUser, mockProduct);

    expect(result).toBeDefined();
    expect(result).toHaveProperty('status', 201);
    expect(result).toHaveProperty('data');
    expect(result).toHaveProperty('data.id');
    productId = result.data.id;
    return;
  });

  it('Partial update product', async () => {
    const mockProduct: UpdateProductInterface = {
      name: 'Partial Updated',
      price: 10.99,
    };

    const result = await productService.update(
      mockUser,
      productId,
      mockProduct
    );

    expect(result).toBeDefined();
    expect(result).toHaveProperty('status', 200);
    expect(result).toHaveProperty('data');
    expect(result).toHaveProperty('data.productId');
    expect(result).toHaveProperty('data.updated');
    expect(result).toHaveProperty('data.updated.name');
    expect(result).toHaveProperty('data.updated.price');
  });

  it('Update product', async () => {
    const mockProduct: UpdateProductInterface = {
      name: 'Updated Test Product',
      avalaibleStocks: 2000,
      description: 'Test product short description',
      price: 21.44,
      imgSrc: 'tttttttttttttttttttt',
    };

    const result = await productService.update(
      mockUser,
      productId,
      mockProduct
    );
    expect(result).toBeDefined();
    expect(result).toHaveProperty('status', 200);
    expect(result).toHaveProperty('data');
    expect(result).toHaveProperty('data.productId');
    expect(result).toHaveProperty('data.updated');
    expect(result).toHaveProperty('data.updated.name');
    expect(result).toHaveProperty('data.updated.avalaibleStocks');
    expect(result).toHaveProperty('data.updated.description');
    expect(result).toHaveProperty('data.updated.price');
  });

  it('Get product', async () => {
    const result = await productService.get(productId);

    expect(result).toBeDefined();
    expect(result).toHaveProperty('status', 200);
    expect(result).toHaveProperty('data');
    expect(result).toHaveProperty('data.id');
    expect(result).toHaveProperty('data.name');
    expect(result).toHaveProperty('data.description');
    expect(result).toHaveProperty('data.price');
    expect(result).toHaveProperty('data.avalaibleStocks');
    expect(result).toHaveProperty('data.imgSrc');
  });

  it('Get not exisitng product throws error', async () => {
    async function testing() {
      await productService.get('qwertyqwrqwrtq');
    }

    await expect(testing).rejects.toThrow();
  });

  it('Delete product', async () => {
    const result = await productService.delete(mockUser, productId);

    expect(result).toBeDefined();
    expect(result).toHaveProperty('status', 200);
    expect(result).toHaveProperty('data');
    expect(result).toHaveProperty('data.productId');
  });

  it('Delete product (second time)', async () => {
    async function test() {
      await productService.delete(mockUser, productId);
    }

    await expect(test).rejects.toThrow();
  });
});
