import { Router } from 'express';
import { NewProductInterface } from './../../src/Interfaces/product-interface';
import { productService } from './../../src/Services/product/productService';
import { authService } from './../../src/Services/auth/authService';

const ProductRouter = Router();

ProductRouter.get('/list', async (req, res) => {
  productService.getAll(res);
})
  .get('/:id', async (req, res) => {
    const id: string = req.params.id;
    productService.get(id, res);
  })
  .post('/', async (req, res, next) => {
    try {
      const token = req.cookies.jwt;
      await authService.validate(token);
      const data: NewProductInterface = req.body;

      productService.create(data, req.cookies.jwt, res, next);
    } catch (err) {
      next(err);
    }
  })
  .patch('/:id', async (req, res, next) => {
    try {
      const token = req.cookies.jwt;
      await authService.validate(token);
      const id: string = req.params.id;
      const data: NewProductInterface = req.body;
      productService.update(id, data, req.cookies.jwt, res, next);
    } catch (err) {
      next(err);
    }
  })
  .delete('/:id', async (req, res, next) => {
    try {
      const token = req.cookies.jwt;
      const user = await authService.validate(token);
      const id: string = req.params.id;
      await productService.delete(id, user, res);
    } catch (err) {
      next(err);
    }
  });

export { ProductRouter };
