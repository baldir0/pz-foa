import { MaxLength, IsString, IsNotEmpty, IsEmail } from 'class-validator';
import { DataTransferErrorType } from './../../../utils/errors';
import { UserRegisterInterface } from './../../../Interfaces/user-interface';

export class AuthRegisterDTO implements UserRegisterInterface {
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
  login: string;

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
  email: string;

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
