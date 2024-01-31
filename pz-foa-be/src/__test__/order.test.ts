import 'dotenv/config';
import { AddProductToOrderInterface } from '../Interfaces/productOrder-interface';
import { UserEntity } from '../Entities/user.entity';
import { DB, connect } from '../utils/database/database';
import { orderService } from '../Services/orderService';
import { productService } from '../Services/productService';
import { NewProductInterface } from '../Interfaces/product-interface';

describe('Order Tests', () => {
  let orderId;
  let productId;

  const mockUser: UserEntity = {
    id: '12345-12345-12345-12345-12345',
    login: 'TestUser',
    passwordHSW: '123412341234',
    token: '12341231241251',
    salt: '1234567890',
    email: 'TestUser@email.com',
    isAdmin: true,
    changedAt: '01012024111111',
    createdAt: '01012024111111',
  };

  const mockProductList: AddProductToOrderInterface[] = [
    {
      productId: '7a45d937-e825-4398-9434-1337c8b035c2',
      amount: 20,
      price: 24.99,
    },
    {
      productId: '7a45d937-e825-4398-9434-1337c8b035c2',
      amount: 20,
      price: 24.99,
    },
    {
      productId: '7a45d937-e825-4398-9434-1337c8b035c2',
      amount: 10,
      price: 24.99,
    },
  ];

  const mockProduct: NewProductInterface = {
    name: 'Test Product',
    avalaibleStocks: 2000,
    description: 'Test product short description',
    price: 21.44,
    imgSrc: 'test link',
  };

  beforeAll(async () => {
    await connect();
    productId = (await productService.create(mockUser, mockProduct)).data.id;
  });

  afterAll(async () => {
    await productService.delete(mockUser, productId);
    await DB.destroy();
  });

  it('Create order without products', async () => {
    async function test() {
      await orderService.create(mockUser, {
        firstName: 'Test name',
        lastName: 'Test last name',
        address: 'My test address',
        products: [],
      });
    }

    await expect(test).rejects.toThrow();
  });

  it('Create Order', async () => {
    const result = await orderService.create(mockUser, {
      firstName: 'Test name',
      lastName: 'Test last name',
      address: 'My test address',
      products: mockProductList,
    });

    expect(result).toBeDefined();
    expect(result).toHaveProperty('status', 201);
    expect(result).toHaveProperty('data');
    expect(result).toHaveProperty(['data', 'orderId']);

    orderId = result.data.orderId;
  });

  it('Update created order', async () => {
    const result = await orderService.update(mockUser, orderId, {
      firstName: 'Update test name',
      lastName: 'update last name',
      address: 'update address',
      userId: mockUser.id,
    });

    expect(result).toBeDefined();
    expect(result).toHaveProperty('status', 200);
    expect(result).toHaveProperty('data');
    expect(result).toHaveProperty(['data', 'orderId'], orderId);
    expect(result).toHaveProperty(['data', 'newData']);
    expect(result).toHaveProperty(
      ['data', 'newData', 'firstName'],
      'Update test name'
    );
    expect(result).toHaveProperty(
      ['data', 'newData', 'lastName'],
      'update last name'
    );
    expect(result).toHaveProperty(
      ['data', 'newData', 'address'],
      'update address'
    );
    expect(result).toHaveProperty(['data', 'newData', 'userId'], mockUser.id);
  });

  it('Partial update order', async () => {
    const result = await orderService.update(mockUser, orderId, {
      firstName: 'Partial Update',
    });

    expect(result).toBeDefined();
    expect(result).toHaveProperty('status', 200);
    expect(result).toHaveProperty('data');
    expect(result).toHaveProperty(['data', 'orderId'], orderId);
    expect(result).toHaveProperty(['data', 'newData']);
    expect(result).toHaveProperty(
      ['data', 'newData', 'firstName'],
      'Partial Update'
    );
  });

  it('Get order positions', async () => {
    const result = await orderService.get(mockUser, orderId);

    expect(result).toBeDefined();
    expect(result).toHaveProperty('status', 200);
    expect(result).toHaveProperty('data');
    expect(result).toHaveProperty(['data', 'order']);
    expect(result).toHaveProperty(['data', 'order', 'id']);
    expect(result).toHaveProperty(['data', 'order', 'userId']);
    expect(result).toHaveProperty(['data', 'order', 'firstName']);
    expect(result).toHaveProperty(['data', 'order', 'lastName']);
    expect(result).toHaveProperty(['data', 'order', 'address']);
    expect(result).toHaveProperty(['data', 'positions']);
  });

  let positionId;
  it('Add order position', async () => {
    const result = await orderService.addProduct(productId, orderId, 1, 9.99);

    expect(result).toBeDefined();
    expect(result).toHaveProperty('status', 201);
    expect(result).toHaveProperty('data');
    expect(result).toHaveProperty(['data', 'productId'], productId);
    expect(result).toHaveProperty(['data', 'positionId']);

    positionId = result.data.positionId;
  });

  it('Get order position', async () => {
    const result = await orderService.getOrderPosition(
      mockUser,
      orderId,
      positionId
    );

    expect(result).toBeDefined();
    expect(result).toHaveProperty('status', 200);
    expect(result).toHaveProperty('data');
    expect(result).toHaveProperty(['data', 'id']);
    expect(result).toHaveProperty(['data', 'orderId']);
    expect(result).toHaveProperty(['data', 'productId']);
    expect(result).toHaveProperty(['data', 'amount']);
    expect(result).toHaveProperty(['data', 'price']);
  });

  it('Update order position', async () => {
    const result = await orderService.updateOrderPosition(orderId, positionId, {
      amount: 10,
      price: 9.99,
      productId: productId,
    });

    expect(result).toBeDefined();
    expect(result).toHaveProperty('status', 200);
    expect(result).toHaveProperty('data');
    expect(result).toHaveProperty(['data', 'positionId']);
    expect(result).toHaveProperty(['data', 'updated']);
    expect(result).toHaveProperty(['data', 'updated', 'amount'], 10);
    expect(result).toHaveProperty(['data', 'updated', 'price'], 9.99);
    expect(result).toHaveProperty(['data', 'updated', 'productId'], productId);
  });

  it('Delete oreder position', async () => {
    const result = await orderService.deleteOrderPosition(orderId, positionId);

    expect(result).toBeDefined();
    expect(result).toHaveProperty('status', 200);
    expect(result).toHaveProperty('data');
    expect(result).toHaveProperty(['data', 'positionId']);
  });

  it('Delete order', async () => {
    const result = await orderService.delete(orderId);

    expect(result).toBeDefined();
    expect(result).toHaveProperty('status', 200);
    expect(result).toHaveProperty('data');
    expect(result).toHaveProperty(['data', 'orderId']);
  });
});
