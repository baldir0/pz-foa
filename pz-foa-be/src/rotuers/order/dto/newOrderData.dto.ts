import {
  IsNotEmpty,
  ValidateNested,
  IsString,
  MaxLength,
} from 'class-validator';
import { DataTransferErrorType } from './../../../utils/errors';
import { NewOrderDataInterface } from './../../../Interfaces/order-interface';
import { Type } from 'class-transformer';
import { OrderPositionDataDTO } from './orderPositionData.dto';

export class NewOrderDataDTO implements NewOrderDataInterface {
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

  @ValidateNested({
    each: true,
    context: {
      error: DataTransferErrorType.DTE_INVALID_TYPE,
    },
  })
  @Type(() => OrderPositionDataDTO)
  products: OrderPositionDataDTO[];
}
