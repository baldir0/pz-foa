import { Router } from 'express';

const orderRouter = Router();

orderRouter
  .get('/list', (req, res, next) => {
    try {
      // TODO: Return list of user orders
      // [ ]: User mush be logged in
    } catch (err) {
      next(err);
    }
  })
  .get('/list-all', (req, res, next) => {
    try {
      // TODO: Return list of all orders
      // [ ]: Only users with admin privilages can access this endpoint
    } catch (err) {
      next(err);
    }
  })
  .get('/:id', (req, res, next) => {
    try {
      // TODO: Get single order details
    } catch (err) {
      next(err);
    }
  })
  .patch('/:id', (req, res, next) => {
    try {
      // TODO: Update single order
      // [ ]: check is user the admin
      // [ ]: check is user the owner
    } catch (err) {
      next(err);
    }
  })
  .delete('/:id', (req, res, next) => {
    try {
      // TODO: Remove single order
      // [ ]: check if user is admin
    } catch (err) {
      next(err);
    }
  })
  .put('', (req, res, next) => {
    try {
    } catch (err) {
      next(err);
    }
  });
