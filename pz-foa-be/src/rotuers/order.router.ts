import { Router } from 'express';
import { UserEntity } from 'src/Entities/user.entity';
import { serviceResult } from 'src/Interfaces/serviceReturn-interface';
import { authService } from 'src/Services/auth/authService';
import { orderService } from 'src/Services/order/orderService';
import { AuthErrorLackOfPrivilages } from 'src/utils/errors';

const orderRouter = Router();

orderRouter
  .get('/list', async (req, res, next) => {
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
  .patch('/:id', async (req, res, next) => {
    try {
      const user: UserEntity = await authService.validate(req.cookies.jwt);
      const orderData = req.body;

      const result: serviceResult = await orderService.update(
        user,
        req.params.id,
        orderData
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
      res.status(result.status).send(result.data);
      // [x]: Remove single order
      // [x]: check if user is admin
    } catch (err) {
      next(err);
    }
  })
  .put('/', async (req, res, next) => {
    try {
      const user: UserEntity = await authService.validate(req.cookies.jwt);

      const result: serviceResult = await orderService.create(user);
      res.status(result.status).send(result.data);
      // [x]: Create new Order
    } catch (err) {
      next(err);
    }
  });
