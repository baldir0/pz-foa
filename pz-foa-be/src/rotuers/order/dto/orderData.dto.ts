import {
  IsEmpty,
  IsNotEmpty,
  IsString,
  IsUUID,
  MaxLength,
} from 'class-validator';
import { OrderDataInterface } from './../../../Interfaces/order-interface';
import { DataTransferErrorType } from './../../../utils/errors';

export class OrderDataDTO implements OrderDataInterface {
  @IsUUID('4', {
    context: {
      error: DataTransferErrorType.DTE_INVALID_TYPE,
    },
  })
  @IsEmpty({
    context: {
      error: DataTransferErrorType.DTE_EMPTY_FIELD,
    },
  })
  userId: string;

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
  @MaxLength(128, {
    context: {
      error: DataTransferErrorType.DTE_TOO_LONG,
    },
  })
  firstName: string;

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
  @MaxLength(128, {
    context: {
      error: DataTransferErrorType.DTE_TOO_LONG,
    },
  })
  lastName: string;

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
  address: string;
}
