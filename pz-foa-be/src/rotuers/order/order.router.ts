import { Router } from 'express';
import { UserEntity } from '../../Entities/user.entity';
import { AddProductToOrderInterface } from '../../Interfaces/productOrder-interface';
import { serviceResult } from '../../Interfaces/serviceReturn-interface';
import { authService } from '../../Services/authService';
import { orderService } from '../../Services/orderService';
import { AuthErrorLackOfPrivilages } from '../../utils/errors';
import { RequestBodyValidator } from '../../utils/middlewares/RequestBodyValidator';
import { OrderPositionDataDTO } from './dto/orderPositionData.dto';
import { OrderDataDTO } from './dto/orderData.dto';
import { NewOrderDataDTO } from './dto/newOrderData.dto';
import { NewOrderDataInterface } from '../../Interfaces/order-interface';

const OrderRouter = Router();

OrderRouter.get('/list', async (req, res, next) => {
  try {
    const user: UserEntity = await authService.validate(req.cookies.jwt);

    const result: serviceResult = await orderService.getAll(user);
    res.status(result.status).json(result.data);
    // [x]: Return list of user orders
    // [x]: User mush be logged in
  } catch (err) {
    next(err);
  }
})
  .get('/list-all', async (req, res, next) => {
    try {
      const user: UserEntity = await authService.validate(req.cookies.jwt);
      if (!user.isAdmin) throw new AuthErrorLackOfPrivilages();

      const result: serviceResult = await orderService.getAll(user, true);
      res.status(result.status).json(result.data);
      // [x]: Return list of all orders
      // [x]: Only users with admin privilages can access this endpoint
    } catch (err) {
      next(err);
    }
  })
  .get('/:id', async (req, res, next) => {
    try {
      const user: UserEntity = await authService.validate(req.cookies.jwt);

      const result: serviceResult = await orderService.get(user, req.params.id);
      res.status(result.status).json(result.data);
      // [X]: Get single order details
    } catch (err) {
      next(err);
    }
  })
  .patch(
    '/:orderId/position/:positionId',
    RequestBodyValidator(OrderPositionDataDTO),
    async (req, res, next) => {
      try {
        // [x] Admin only function
        const user: UserEntity = await authService.validate(req.cookies.jwt);
        if (!user.isAdmin) throw new AuthErrorLackOfPrivilages();

        const result: serviceResult = await orderService.updateOrderPosition(
          req.params.orderId,
          req.params.positionId,
          req.body
        );
        res.status(result.status).json(result.data);
      } catch (err) {
        next(err);
      }
    }
  )
  .delete('/:orderId/position/:positionId', async (req, res, next) => {
    try {
      // [x] Admin only function
      const user: UserEntity = await authService.validate(req.cookies.jwt);
      if (!user.isAdmin) throw new AuthErrorLackOfPrivilages();

      const result: serviceResult = await orderService.deleteOrderPosition(
        req.params.orderId,
        req.params.positionId
      );
      res.status(result.status).json(result.data);
    } catch (err) {
      next(err);
    }
  })
  .post(
    '/:orderId/position/',
    RequestBodyValidator(OrderPositionDataDTO),
    async (req, res, next) => {
      try {
        // [x] Admin only function
        const user: UserEntity = await authService.validate(req.cookies.jwt);
        if (!user.isAdmin) throw new AuthErrorLackOfPrivilages();

        const productData: AddProductToOrderInterface = req.body;
        const result: serviceResult = await orderService.addProduct(
          productData.productId,
          req.params.orderId,
          productData.amount,
          productData.price
        );
        res.status(result.status).json(result.data);
      } catch (err) {
        next(err);
      }
    }
  )
  .get('/:orderId/position/:positionId', async (req, res, next) => {
    try {
      const user: UserEntity = await authService.validate(req.cookies.jwt);

      const result: serviceResult = await orderService.getOrderPosition(
        user,
        req.params.orderId,
        req.params.positionId
      );
      res.status(result.status).json(result.data);
    } catch (err) {
      next(err);
    }
  })
  .patch('/:id', RequestBodyValidator(OrderDataDTO), async (req, res, next) => {
    try {
      const user: UserEntity = await authService.validate(req.cookies.jwt);

      const result: serviceResult = await orderService.update(
        user,
        req.params.id,
        req.body
      );
      res.status(result.status).json(result.data);
      // [x]: Update single order
      // [x]: check is user the admin
      // [x]: check is user the owner
    } catch (err) {
      next(err);
    }
  })
  .delete('/:id', async (req, res, next) => {
    try {
      const user: UserEntity = await authService.validate(req.cookies.jwt);
      if (!user.isAdmin) throw new AuthErrorLackOfPrivilages();

      const result: serviceResult = await orderService.delete(req.params.id);
      res.status(result.status).json(result.data);
      // [x]: Remove single order
      // [x]: check if user is admin
    } catch (err) {
      next(err);
    }
  })
  .post('/', RequestBodyValidator(NewOrderDataDTO), async (req, res, next) => {
    try {
      // TODO: ADD ADDRESS FIELD
      const user: UserEntity = await authService.validate(req.cookies.jwt);
      const data: NewOrderDataInterface = req.body;

      const result: serviceResult = await orderService.create(user, data);

      res.status(result.status).json(result.data);
      // [x]: Create new Order
      // [X]: Gets array of products
    } catch (err) {
      next(err);
    }
  });

export { OrderRouter };
