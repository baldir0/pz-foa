import { Router } from 'express';
import { NewProductInterface } from './../../src/Interfaces/product-interface';
import { productService } from '../Services/productService';
import { authService } from '../Services/authService';
import { serviceResult } from '../../src/Interfaces/serviceReturn-interface';

const ProductRouter = Router();

ProductRouter.get('/list', async (req, res, next) => {
  try {
    const result: serviceResult = await productService.getAll();
    res.status(result.status).json(result.data);
  } catch (err) {
    next(err);
  }
})
  .get('/:id', async (req, res, next) => {
    try {
      const id: string = req.params.id;
      const result: serviceResult = await productService.get(id);
      res.status(result.status).json(result.data);
    } catch (err) {
      next(err);
    }
  })
  .post('/', async (req, res, next) => {
    try {
      const token = req.cookies.jwt;
      const user = await authService.validate(token);
      const data: NewProductInterface = req.body;

      const result: serviceResult = await productService.create(user, data);
      res.status(result.status).json(result.data);
    } catch (err) {
      next(err);
    }
  })
  .patch('/:id', async (req, res, next) => {
    try {
      const token = req.cookies.jwt;
      const user = await authService.validate(token);
      const id: string = req.params.id;
      const data: NewProductInterface = req.body;
      const result: serviceResult = await productService.update(user, id, data);

      res.status(result.status).json(result.data);
    } catch (err) {
      next(err);
    }
  })
  .delete('/:id', async (req, res, next) => {
    try {
      const token = req.cookies.jwt;
      const user = await authService.validate(token);
      const id: string = req.params.id;
      const result: serviceResult = await productService.delete(user, id);

      res.status(result.status).json(result.data);
    } catch (err) {
      next(err);
    }
  });

export { ProductRouter };
