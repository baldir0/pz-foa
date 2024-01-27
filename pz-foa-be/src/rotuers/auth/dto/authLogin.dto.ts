import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  ValidateIf,
} from 'class-validator';

import { loginDataInterface } from '../../../Interfaces/loginData-interface';
import { DataTransferErrorType } from '../../../utils/errors';

export class AuthLoginDTO implements loginDataInterface {
  @MaxLength(255)
  @IsString({
    context: {
      error: DataTransferErrorType.DTE_INVALID_TYPE,
    },
  })
  @IsNotEmpty({
    context: {
      error: DataTransferErrorType.DTE_EMPTY_FIELD,
    },
  })
  @ValidateIf((req) => !req.email || req.login, {
    context: {
      error: DataTransferErrorType.DTE_EMPTY_FIELD,
    },
  })
  login?: string;

  @IsNotEmpty({
    context: {
      error: DataTransferErrorType.DTE_EMPTY_FIELD,
    },
  })
  @IsEmail(
    {},
    {
      context: {
        error: DataTransferErrorType.DTE_INVALID_EMAIL,
      },
    }
  )
  @IsString({
    context: {
      error: DataTransferErrorType.DTE_INVALID_TYPE,
    },
  })
  @MaxLength(255, {
    context: {
      error: DataTransferErrorType.DTE_TOO_LONG,
    },
  })
  @ValidateIf((req) => !req.login || req.email, {
    context: {
      error: DataTransferErrorType.DTE_EMPTY_FIELD,
    },
  })
  email?: string;

  @IsNotEmpty({
    context: {
      error: DataTransferErrorType.DTE_EMPTY_FIELD,
    },
  })
  @IsString({
    context: {
      error: DataTransferErrorType.DTE_INVALID_TYPE,
    },
  })
  passwordHSW: string;
}
