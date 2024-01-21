import { Router } from 'express';
import { NewProductInterface } from 'src/Interfaces/product-interface';
import { ProductService } from 'src/Services/product/productService';

const ProductRouter = Router();
const productService = new ProductService();

ProductRouter.get('/:id', (req, res) => {
  const id: string = req.params.id;
  productService.get(id, res);
})
  .get('/list', (req, res) => {
    productService.getAll(res);
  })
  .post('/create', (req, res) => {
    // TODO: ADD PRIVILAGES CHECK
    const data: NewProductInterface = req.body;
    productService.create(data, res);
  })
  .patch('/update/:id', (req, res) => {
    // TODO: ADD PRIVILAGES CHECK
    const id: string = req.params.id;
    const data: NewProductInterface = req.body;
    productService.update(id, data, res);
  })
  .delete('/:id', (req, res) => {
    // TODO: ADD PRIVILAGES CHECK
    const id: string = req.params.id;
    productService.delete(id, res);
  });

export { ProductRouter };
