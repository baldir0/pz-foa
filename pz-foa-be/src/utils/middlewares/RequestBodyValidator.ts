import { ClassConstructor, plainToClass } from 'class-transformer';
import { ValidationError, ValidatorOptions, validate } from 'class-validator';
import { NextFunction, Request, Response } from 'express';
import { DataTransferError } from '../errors';

export const RequestBodyValidator = <T extends object>(
  validatorClass: ClassConstructor<T>,
  validatorOption: ValidatorOptions = {
    whitelist: true,
    stopAtFirstError: true,
  }
) => {
  return async function (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const validatorObject = plainToClass(validatorClass, req.body);
      const validationError: ValidationError = (
        await validate(validatorObject, validatorOption)
      )[0];
      if (validationError) {
        const target =
          validationError.contexts ??
          validationError.children[0].children[0].contexts;

        const error = Object.values(target)[0]['error'];
        const field = validationError.property;
        DataTransferError.dispatch(error, field);
      }

      next();
    } catch (err) {
      console.log(err);
      next(err);
    }
  };
};
