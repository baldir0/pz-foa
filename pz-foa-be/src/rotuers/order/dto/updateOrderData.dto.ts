import {
  IsEmpty,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
} from 'class-validator';
import { UpdateOrderDataInterface } from './../../../Interfaces/order-interface';
import { DataTransferErrorType } from './../../../utils/errors';

export class UpdateOrderDataDTO implements UpdateOrderDataInterface {
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
  @IsOptional()
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
  @IsOptional()
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
  @IsOptional()
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
  @IsOptional()
  address: string;
}
