import { Router } from 'express';

const profileRouter = Router();

profileRouter
  .get('/:id', (req, res, next) => {
    try {
      // TODO: Get single profile
    } catch (err) {
      next(err);
    }
  })
  .patch('/:id', (req, res, next) => {
    try {
      // TODO: Update single profile
      // [ ]: check is user the admin
      // [ ]: check is user the owner
    } catch (err) {
      next(err);
    }
  })
  .delete('/:id', (req, res, next) => {
    try {
      // TODO: Remove single profile
      // [ ]: check if user is admin
    } catch (err) {
      next(err);
    }
  });
