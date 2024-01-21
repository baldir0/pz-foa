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
    const token = req.cookies.jwt;
    await authService.validate(token);
    const data: NewProductInterface = req.body;

    productService.create(data, req.cookies.jwt, res, next);
  })
  .patch('/:id', async (req, res, next) => {
    const token = req.cookies.jwt;
    await authService.validate(token);
    const id: string = req.params.id;
    const data: NewProductInterface = req.body;
    productService.update(id, data, req.cookies.jwt, res, next);
  })
  .delete('/:id', async (req, res, next) => {
    const token = req.cookies.jwt;
    await authService.validate(token);
    const id: string = req.params.id;
    productService.delete(id, res, next);
  });

export { ProductRouter };
